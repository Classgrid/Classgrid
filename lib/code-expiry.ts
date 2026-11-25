// Every one-time code Classgrid sends (by email or WhatsApp) works for 10 minutes, the same as on
// chat.classgrid.in and in the apps. Every route that makes a code, every email that sends one and every
// screen that asks for one reads these numbers, so the time can never differ between them.
export const CODE_VALID_MINUTES = 10;
export const CODE_VALID_SECONDS = CODE_VALID_MINUTES * 60;
export const CODE_VALID_MS = CODE_VALID_SECONDS * 1000;

// How long to wait before a new code can be asked for. This is not how long a code works.
export const CODE_RESEND_WAIT_SECONDS = 60;
