// The [ESCALATE: ...] tag, read from its start to the END of the answer (the prompt puts it at the very end). Its fields
// may come in any order; DRAFT runs to the closing "]" of the tag, even when the draft itself has "]" in it (a markdown
// link, or the "[ADMIN_NAME]" signature). The regex this replaces (email-processor.ts, ESCALATE_RE) stopped at the first
// "]" inside the draft, and the rest of the draft went out in the customer's email (2026-11-13).
export type EscalationTag = { summary: string; subject?: string; category?: string; priority?: string; draft?: string; start: number };
const ESCALATE_FIELD_RE = /\s*\|?\s*(SUBJECT|CATEGORY|PRIORITY|DRAFT)\s*:\s*/gi;
export function parseEscalationTag(text: string): EscalationTag | null {
  const start = text.toUpperCase().lastIndexOf("[ESCALATE:");
  if (start === -1) return null;
  let body = text.slice(start + "[ESCALATE:".length).trim();
  if (body.endsWith("]")) body = body.slice(0, -1);
  const tag: EscalationTag = { summary: "", start };
  const parts: { key: string; from: number; to: number }[] = [];
  for (const m of body.matchAll(ESCALATE_FIELD_RE)) {
    parts.push({ key: m[1].toUpperCase(), from: m.index ?? 0, to: (m.index ?? 0) + m[0].length });
    if (m[1].toUpperCase() === "DRAFT") break; // (the draft is free text: a "SUBJECT:" inside it is part of the draft)
  }
  tag.summary = body.slice(0, parts.length ? parts[0].from : body.length).trim();
  parts.forEach((p, i) => {
    const value = body.slice(p.to, i + 1 < parts.length ? parts[i + 1].from : body.length).trim();
    if (p.key === "SUBJECT") tag.subject = value;
    else if (p.key === "CATEGORY") tag.category = value;
    else if (p.key === "PRIORITY") tag.priority = value;
    else if (p.key === "DRAFT") tag.draft = value;
  });
  return tag;
}
// The customer's email without the tag: everything from "[ESCALATE:" to the end goes
export const withoutEscalationTag = (text: string) => {
  const start = text.toUpperCase().lastIndexOf("[ESCALATE:");
  return (start === -1 ? text : text.slice(0, start)).replace(/[\s\-*]+$/, "").trim();
};
