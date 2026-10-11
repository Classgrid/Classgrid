/**
 * Fixed WhatsApp replies that explain how WhatsApp verification works on chat.classgrid.in.
 * Used instead of the AI reply while WHATSAPP_AI_ENABLED is not "true" (see server-ai/server.ts).
 *
 * Why this matters: Meta only lets us send the OTP to someone who messaged our number in the last 24 hours,
 * so new users send "Hi" here first. The reply must tell them to go back and tap "Send OTP".
 */

const SUPPORT_URL = "https://classgrid.in/support/ticket";

const FIRST_MESSAGE = [
  "Hi! 👋 Thanks for messaging Classgrid.",
  "",
  "✅ Done! Your WhatsApp is now ready to receive your login code.",
  "",
  "*Now:*",
  "1. Go back to the *Verify WhatsApp* screen on chat.classgrid.in",
  "2. Choose your country code (India: +91) and enter your WhatsApp number",
  "3. Tap *Send OTP*",
  "4. Your 6-digit code will arrive in this chat within a few seconds. Enter it on the screen and you're in!",
  "",
  "The code is valid for 10 minutes. You can ask for a new one after 60 seconds.",
  "— Team Classgrid",
].join("\n");

const AGAIN_MESSAGE = [
  "You're all set here 👍 No need to message again.",
  "",
  "👉 Go back to chat.classgrid.in, enter your WhatsApp number and tap *Send OTP*. Your code will arrive in this chat.",
].join("\n");

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

const HELP_MESSAGE = [
  "We're here to help! 🙌",
  "",
  "*How to log in:*",
  "1. Open chat.classgrid.in and sign in (Google, GitHub or email)",
  "2. Send \"Hi\" here (done ✅)",
  "3. Enter your WhatsApp number on the screen and tap *Send OTP*",
  "4. Enter the 6-digit code from this chat",
  "",
  `For anything else: ${SUPPORT_URL} or email support@classgrid.in`,
].join("\n");

const NUMBER_TAKEN_MESSAGE = [
  "Each WhatsApp number can be linked to only one Classgrid account.",
  "",
  `If you used this number on another account, log in with that account instead. If you need it moved, raise a ticket: ${SUPPORT_URL}`,
].join("\n");

const SLOW_DOWN_MESSAGE =
  "Got it! 🙂 We've already sent the steps above. Please go back to chat.classgrid.in and tap *Send OTP*. Your code will come here.";

const CODE_WORDS = /\b(otp|code|not\s+(received|receive|coming|came|getting)|didn'?t\s+(get|receive|come)|no\s+code|resend|expired?)\b/i;
const HELP_WORDS = /\b(help|support|problem|issue|stuck|error|not\s+working|how)\b/i;
const TAKEN_WORDS = /\b(already\s+linked|another\s+(account|email)|already\s+(used|registered))\b/i;

const DAY_MS = 24 * 60 * 60 * 1000;
const BURST_WINDOW_MS = 10 * 60 * 1000; // 4+ messages in 10 minutes = flooding
const BURST_LIMIT = 4;
const QUIET_MS = 60 * 60 * 1000; // after the "got it" reply, stay quiet for 1 hour

type NumberState = { firstAt: number; count: number; recent: number[]; quietUntil: number };
const stateByNumber = new Map<string, NumberState>();

/**
 * The reply for one inbound message, or null when the bot should stay quiet (number is flooding).
 * State is in memory: a server restart just means the next message gets the welcome text again.
 */
export function pickLoginHelpReply(fromNumber: string, text: string, now = Date.now()): string | null {
  let state = stateByNumber.get(fromNumber);
  if (!state || now - state.firstAt > DAY_MS) {
    state = { firstAt: now, count: 0, recent: [], quietUntil: 0 };
    stateByNumber.set(fromNumber, state);
  }
  state.count += 1;
  state.recent = state.recent.filter((t) => now - t < BURST_WINDOW_MS);
  state.recent.push(now);

  if (now < state.quietUntil) return null;
  if (state.recent.length >= BURST_LIMIT) {
    state.quietUntil = now + QUIET_MS;
    return SLOW_DOWN_MESSAGE;
  }

  const t = String(text || "");
  if (TAKEN_WORDS.test(t)) return NUMBER_TAKEN_MESSAGE;
  if (CODE_WORDS.test(t)) return CODE_HELP_MESSAGE;
  if (state.count === 1) return FIRST_MESSAGE;
  if (HELP_WORDS.test(t)) return HELP_MESSAGE;
  return AGAIN_MESSAGE;
}

// Keep the map from growing forever on a long-running server
setInterval(() => {
  const now = Date.now();
  for (const [num, s] of stateByNumber) if (now - s.firstAt > DAY_MS) stateByNumber.delete(num);
}, 60 * 60 * 1000).unref?.();
