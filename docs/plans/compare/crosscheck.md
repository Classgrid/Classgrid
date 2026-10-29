# Cross-check: proposed-compare.json (checked 2026-10-28)

Passed: the JSON is valid and keeps the same shape. Every link is a real https URL. There are no Classgrid prices, no 50-calls number, no competitor prices, and no school/ERP wording. The number is +91 81492 77038 everywhere. All the Classgrid claims match the code and check-classgrid.md. The "Only you can give it work" card is TRUE. In `agent-task.service.js:691-695`, an email to agent@classgrid.in is only taken when its From address matches a Classgrid account email (`User.findOne({ email: ... })`, and the email is dropped if there is no match). This is true for an email that starts a new task too (`:709-718`). WhatsApp messages are only taken from a verified number (`:593-595`).

Two competitor points needed fixing after re-checking sources:
- **builtwithmuse.com does NOT say Muse in WhatsApp is "text only, no voice, no calls."** I re-opened the page (last checked 15 Oct 2026). It says Muse has **voice chat inside the Muse app**, rolling out in stages from 15 Oct 2026, and that you cannot phone Muse yourself. It does not talk about WhatsApp.
- **Grok Bot has a voice mode in its apps** (since 17 Sep 2026, per [Basenor](https://www.basenor.com/blogs/news/grok-bot-now-has-voice-mode-what-you-need-to-know), which cites @grok on X). The page says "no call to the agent found" for Grok Bot, which is unfair next to giving Dots credit for its in-app voice call.

## Required changes

1. **body[30]** (Muse, second sentence)
   - Current: "Third-party sites say that in WhatsApp it works by text only, with no voice and no calls ([builtwithmuse.com](…))."
   - Problem: the cited source does not say this.
   - Replace with: "We found no way to call Muse on WhatsApp or by phone. A voice chat inside the Muse app has been rolling out since mid-October 2026 ([builtwithmuse.com](https://builtwithmuse.com/blog/muse-voice-chat))."

2. **body[24]** (Grok Bot, last sentence)
   - Current: "We found no phone number or call feature in xAI's docs for calling Grok Bot yourself, and no official Grok WhatsApp number."
   - Problem: it leaves out the in-app voice mode, so it is unfair next to the Dots paragraph.
   - Replace with: "Its apps have a voice mode for talking to your Bot, added in September 2026 ([Basenor](https://www.basenor.com/blogs/news/grok-bot-now-has-voice-mode-what-you-need-to-know)), but we found no phone number for calling Grok Bot yourself and no official Grok WhatsApp number."

3. **body[37] table, row "You can call the AI on WhatsApp", Meta Muse cell**
   - Current: "No (message only, per third-party reports)"
   - Problem: it rests on the wrong source reading (see 1).
   - Replace with: "No (no call found; voice chat in the Muse app only)"

4. **body[37] table, same row, Grok Bot cell**
   - Current: "No (not found)"
   - Problem: it should match the Dots cell's style and mention the in-app voice.
   - Replace with: "No (voice mode inside its apps only)"

5. **featureMatrix[0].competitorStatus**
   - Current: "…Grok Bot: no way to call it found; it calls others for you. Muse: no; in WhatsApp it works by message."
   - Problem: same as 1 and 2.
   - Replace with: "Dots: no, but you can voice-call it inside ChatGPT. Grok Bot: no, but it has a voice mode inside its apps, and it can call others for you. Muse: no; it has voice chat inside the Muse app, and in WhatsApp it works by message."

6. **featureMatrix[1].competitorStatus**
   - Current: "Dots: yes, in a voice call inside ChatGPT. Grok Bot and Muse: no call to the agent found. …"
   - Problem: Grok Bot (voice mode) and Muse (voice chat, rolling out) can both talk live inside their own apps.
   - Replace with: "Dots: yes, in a voice call inside ChatGPT. Grok Bot: yes, by voice mode inside its apps. Muse: voice chat inside the Muse app is rolling out. None of them is on a WhatsApp call. Meta AI has voice chat inside WhatsApp, which is not a call to an agent."

No other required changes. The body, table, feature rows, USPs and FAQs agree with each other once the changes above are made. The research-web.md verdict #26 ("Muse in WhatsApp text only") should also be marked as not supported by its source.

VERDICT: FIX FIRST
