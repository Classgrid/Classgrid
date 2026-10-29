'use client';

import { Children, isValidElement, useState, type ReactNode } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LANG_LABELS: Record<string, string> = {
  bash: 'cURL',
  sh: 'Shell',
  python: 'Python',
  py: 'Python',
  js: 'Node.js',
  javascript: 'JavaScript',
  ts: 'TypeScript',
  typescript: 'TypeScript',
  jsx: 'React',
  tsx: 'React',
  html: 'HTML',
  md: 'Markdown',
  php: 'PHP',
  go: 'Go',
};

// Vercel-style code box with a language dropdown: several code blocks, one shown at a time. The shown block keeps
// its own header (badge + copy button); the dropdown sits in that header, left of the copy button.
// In the Markdown: <CodeTabs labels="cURL,Python,Node.js"> then the code blocks, then </CodeTabs>.
// Without labels, each choice is named after its code block's language.
export function CodeTabs({ children, labels }: { children: ReactNode; labels?: string }) {
  const blocks = Children.toArray(children).filter(isValidElement);
  const names = (labels || '').split(',').map((l) => l.trim()).filter(Boolean);
  const [active, setActive] = useState('0');

  const nameOf = (block: any, i: number) => {
    if (names[i]) return names[i];
    const code = Array.isArray(block?.props?.children) ? block.props.children[0] : block?.props?.children;
    const lang = /language-(\w+)/.exec(code?.props?.className || '')?.[1] || '';
    return LANG_LABELS[lang] || lang.toUpperCase() || `Example ${i + 1}`;
  };
  const options = blocks.map((block, i) => ({ value: String(i), label: nameOf(block, i) }));

  return (
    <div className="relative">
      <div className="absolute right-12 top-[6px] z-10">
        <Select value={active} onValueChange={(v) => setActive(String(v ?? '0'))}>
          <SelectTrigger className="!h-7 min-w-[120px] rounded-md border border-slate-200 bg-white px-2.5 text-[13px] font-normal text-slate-700 shadow-none dark:border-white/10 dark:bg-[#111113] dark:text-zinc-300">
            <SelectValue>{(v) => options.find((o) => o.value === String(v))?.label ?? options[0]?.label}</SelectValue>
          </SelectTrigger>
          <SelectContent side="bottom" align="end">
            {options.map((o) => (
              <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {blocks.map((block, i) => (
        <div key={i} hidden={active !== String(i)}>
          {block}
        </div>
      ))}
    </div>
  );
}
