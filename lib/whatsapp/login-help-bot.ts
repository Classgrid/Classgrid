/**
 * Fixed WhatsApp replies that explain how WhatsApp verification works in Classgrid: the phone app, the desktop app
 * and the website (chat.classgrid.in).
 * Used instead of the AI reply while WHATSAPP_AI_ENABLED is not "true" (see server-ai/server.ts).
 *
 * Why this matters: Meta only lets us send the OTP to someone who messaged our number in the last 24 hours,
 * so new users send "Hi" here first. The reply must tell them to go back and send the code.
 *
 * Each Classgrid opens WhatsApp with its own first message, so the reply names the right place to go back to:
 *   "Hi Classgrid App"      the phone app (its button says "Send code")
 *   "Hi Classgrid Desktop"  the desktop app
 *   "Hi Classgrid Web"      the website, chat.classgrid.in
 * A plain "Hi" (typed by hand) gets a reply that names all three.
 *
 * Someone asking where to download Classgrid gets the download page, with the desktop app's latest Windows version
 * read live from Sanity (lib/ai/live-facts.ts). The phone app is not listed for download on the website yet, so no
 * phone link is given.
 */
import { getCachedDesktopFacts } from "@/lib/ai/live-facts";

const SUPPORT_URL = "https://classgrid.in/support/ticket";
const DOWNLOAD_URL = "https://classgrid.in/download";

export type ClassgridClient = "app" | "desktop" | "web";

/** Where the person goes back to, and what the button there is called. */
const PLACE: Record<ClassgridClient | "any", { name: string; open: string; button: string }> = {
  app: { name: "the Classgrid app on your phone", open: "the Classgrid app on your phone", button: "Send code" },
  desktop: { name: "the Classgrid desktop app", open: "the Classgrid desktop app", button: "Send OTP" },
  web: { name: "chat.classgrid.in", open: "chat.classgrid.in", button: "Send OTP" },
  any: {
    name: "Classgrid (the phone app, the desktop app or chat.classgrid.in)",
    open: "Classgrid (the phone app, the desktop app or chat.classgrid.in)",
    button: "Send OTP",
  },
};

/** Which Classgrid a message came from, from the words its first message carries; null for a plain message. */
export function clientOf(text: string): ClassgridClient | null {
  const t = String(text || "").toLowerCase();
  if (/\bdesktop\b/.test(t)) return "desktop";
  if (/\b(web|website)\b/.test(t)) return "web";
  if (/\b(app|mobile|phone)\b/.test(t)) return "app";
  return null;
}

const firstMessage = (client: ClassgridClient | null) => {
  const place = PLACE[client || "any"];
  return [
    "Hi! 👋 Thanks for messaging Classgrid.",
    "",
    "✅ Done! Your WhatsApp is now ready to receive your login code.",
    "",
    "*Now:*",
    `1. Go back to the *Verify WhatsApp* screen in ${place.name}`,
    "2. Choose your country code (India: +91) and enter your WhatsApp number",
    `3. Tap *${place.button}*`,
    "4. Your 6-digit code will arrive in this chat within a few seconds. Enter it on the screen and you're in!",
    "",
    "The code is valid for 10 minutes. You can ask for a new one after 60 seconds.",
    "— Team Classgrid",
  ].join("\n");
};

const againMessage = (client: ClassgridClient | null) => {
  const place = PLACE[client || "any"];
  return [
    "You're all set here 👍 No need to message again.",
    "",
    `👉 Go back to ${place.name}, enter your WhatsApp number and tap *${place.button}*. Your code will arrive in this chat.`,
  ].join("\n");
};

const CODE_HELP_MESSAGE = [
  "Didn't get your code? Try this:",
  "",
  "1. Check the number you entered: country code + number, e.g. +91 98765 43210",
  "2. Wait 60 seconds, then tap *Resend* on the screen",
  "3. Make sure you're using the same WhatsApp number that sent us this message",
  "4. Codes expire after 10 minutes, so request a fresh one if it's old",
  "",
  `Still stuck? Raise a ticket: ${SUPPORT_URL}`,
].join("\n");

const helpMessage = (client: ClassgridClient | null) => {
  const place = PLACE[client || "any"];
  return [
    "We're here to help! 🙌",
    "",
    "*How to log in:*",
    `1. Open ${place.open} and sign in (Google, GitHub or email)`,
    "2. Send \"Hi\" here (done ✅)",
    `3. Enter your WhatsApp number on the screen and tap *${place.button}*`,
    "4. Enter the 6-digit code from this chat",
    "",
    `For anything else: ${SUPPORT_URL} or email support@classgrid.in`,
  ].join("\n");
};

const NUMBER_TAKEN_MESSAGE = [
  "Each WhatsApp number can be linked to only one Classgrid account.",
  "",
  `If you used this number on another account, log in with that account instead. If you need it moved, raise a ticket: ${SUPPORT_URL}`,
].join("\n");

// The desktop version comes from the last live read (none yet right after a start: then only the page is named)
const downloadMessage = () => {
  const win = getCachedDesktopFacts()?.windows;
  return [
    "*Download Classgrid*",
    "",
    win
      ? `💻 Desktop app for Windows (version ${win.version}): ${DOWNLOAD_URL}`
      : `💻 Desktop app: ${DOWNLOAD_URL}`,
    "📱 The phone app is not listed for download on the website yet.",
    "🌐 On the web: https://chat.classgrid.in",
  ].join("\n");
};

const slowDownMessage =(client: ClassgridClient | null) => {
  const place = PLACE[client || "any"];
  return `Got it! 🙂 We've already sent the steps above. Please go back to ${place.name} and tap *${place.button}*. Your code will come here.`;
};

// Whole message is a greeting or "start" word, optionally + "classgrid" and + which Classgrid it is ("Hi Classgrid App",
// "Hello Classgrid Desktop App", "Hi Classgrid Web"): always answer with the full steps
const GREETING_ONLY =
  /^(hi+|hii+|hello+|helo|hlo|hey+|hay|namaste|namaskar|good\s+(morning|afternoon|evening)|start|login|log\s?in|verify|sign\s?up)(\s+(classgrid|team|there))?(\s+(desktop\s+app|mobile\s+app|phone\s+app|app|mobile|phone|desktop|web|website))?[\s!.,🙏👋]*$/iu;
const CODE_WORDS = /\b(otp|code|not\s+(received|receive|coming|came|getting)|didn'?t\s+(get|receive|come)|no\s+code|resend|expired?)\b/i;
const HELP_WORDS = /\b(help|support|problem|issue|stuck|error|not\s+working|how)\b/i;
const TAKEN_WORDS = /\b(already\s+linked|another\s+(account|email)|already\s+(used|registered))\b/i;
const DOWNLOAD_WORDS = /\b(download|downloads|install|installer|apk|play\s?store|app\s?store)\b/i;

const DAY_MS = 24 * 60 * 60 * 1000;
const BURST_WINDOW_MS = 10 * 60 * 1000; // 4+ messages in 10 minutes = flooding
const BURST_LIMIT = 4;
const QUIET_MS = 60 * 60 * 1000; // after the "got it" reply, stay quiet for 1 hour

type NumberState = { firstAt: number; count: number; recent: number[]; quietUntil: number; client: ClassgridClient | null };
const stateByNumber = new Map<string, NumberState>();

/**
 * The reply for one inbound message, or null when the bot should stay quiet (number is flooding).
 * State is in memory: a server restart just means the next message gets the welcome text again.
 */
export function pickLoginHelpReply(fromNumber: string, text: string, now = Date.now()): string | null {
  let state = stateByNumber.get(fromNumber);
  if (!state || now - state.firstAt > DAY_MS) {
    state = { firstAt: now, count: 0, recent: [], quietUntil: 0, client: null };
    stateByNumber.set(fromNumber, state);
  }
  state.count += 1;
  state.recent = state.recent.filter((t) => now - t < BURST_WINDOW_MS);
  state.recent.push(now);

  const t = String(text || "").trim();
  const greeting = GREETING_ONLY.test(t);
  // Which Classgrid they came from is read from the greeting and remembered for the later replies
  if (greeting) {
    const named = clientOf(t);
    if (named) state.client = named;
  }
  const client = state.client;

  if (now < state.quietUntil) return null;
  if (state.recent.length >= BURST_LIMIT) {
    state.quietUntil = now + QUIET_MS;
    return slowDownMessage(client);
  }

  if (greeting) return firstMessage(client); // "hi", "hello classgrid", "hi classgrid app" etc. always get the steps
  if (TAKEN_WORDS.test(t)) return NUMBER_TAKEN_MESSAGE;
  if (CODE_WORDS.test(t)) return CODE_HELP_MESSAGE;
  if (DOWNLOAD_WORDS.test(t)) return downloadMessage();
  if (state.count === 1) return firstMessage(client);
  if (HELP_WORDS.test(t)) return helpMessage(client);
  return againMessage(client);
}

// Keep the map from growing forever on a long-running server
setInterval(() => {
  const now = Date.now();
  for (const [num, s] of stateByNumber) if (now - s.firstAt > DAY_MS) stateByNumber.delete(num);
}, 60 * 60 * 1000).unref?.();
