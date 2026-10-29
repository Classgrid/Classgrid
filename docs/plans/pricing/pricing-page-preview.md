# Pricing page — preview (classgrid.in/pricing)

> Mockup of how the new pricing page looks and reads. Every value in `{curly braces}` is read **live** from the super admin dashboard (never typed in). Model prices come from the **AI Pricing** page in Sanity, so models and prices can be added, removed or updated there.

**Latest pricing (from 28 October 2026):**
- Top-ups start at **₹299** (was ₹1) and go up to **₹10,000**.
- Premium models unlock once your top-ups add up to **₹299** (was ₹100). One ₹299 top-up unlocks them.
- Top-up credits last **30 days**.

---

## 1. Top of the page

**Simple pricing. Start free.**

Use Classgrid AI for free, every {free_refill_period}. Top up only when you need more.

[ Start for free → ]   ( opens chat.classgrid.in )

---

## 2. Two plans, side by side

| **Free** | **Pay as you go** |
|---|---|
| **₹0** | **From ₹299** per top-up (up to ₹10,000) |
| For trying Classgrid AI and everyday tasks | For heavier work, bigger projects and long tasks |
| ✓ {free_tokens} tokens, refilled every {free_refill_period} | ✓ ₹1 = {tokens_per_inr} tokens |
| ✓ {image_limit} images every {image_refill_period} | ✓ Credits last 30 days from your top-up |
| ✓ {whatsapp_limit} WhatsApp tasks every {whatsapp_refill_period} | ✓ Premium models unlock after ₹299 in top-ups |
| ✓ Agent Mode, Project Mode, WhatsApp and connected apps | ✓ Everything in Free |
| **[ Start for free ]** | **[ Top up in the app ]** |

---

## 3. Top-up calculator

**See what you get**

Slider: ₹299 ……●…… ₹10,000

> ₹299 → **{299 × tokens_per_inr} tokens**, valid for 30 days, and premium models unlocked
> ₹1,000 → **{1000 × tokens_per_inr} tokens**, valid for 30 days

---

## 4. How your tokens are used

1. **Free tokens first.** Every account gets {free_tokens} tokens, refilled every {free_refill_period}.
2. **Then your credits.** When free tokens run out, Classgrid AI uses your top-up credits, oldest first.
3. **Nothing stops mid-task.** You can top up anytime from the AI Hub and keep going.

---

## 5. What uses tokens

| | |
|---|---|
| **Chats and agent steps** | Each message and each step the agent takes (searching, reading files, running code) |
| **Images** | {image_token_cost} tokens per image |
| **WhatsApp tasks** | Messages and calls handled by the agent |
| **Long background tasks** | Work that runs for hours, reported back on WhatsApp |

Bigger and premium models use tokens faster. You can see exactly where your tokens went in **Token activity** in your profile.

---

## 5b. Model pricing

**Every model, one simple price list**

Prices are in credits per 1 million tokens. DeepSeek V4 Pro is the base (1M tokens = 1M credits). Claude models cost more because they're bigger: Sonnet about 2x, Opus about 3x and more, Fable the most.

*Last updated: 28 October 2026* (set in Sanity → AI Pricing)

| Model | Input | Output | Cached input | Cache write |
|---|---|---|---|---|
| **Claude Fable 5.1** — Most capable · needs ₹299 in top-ups | 7.58M | 12.63M | 0.19M | 9.47M |
| **Claude Opus 5.5** | 3.03M | 5.05M | 0.15M | 3.79M |
| **Claude Sonnet 5.5** | 1.52M | 2.53M | 0.08M | 1.89M |
| **Claude Haiku 5.5** | 0.08M | 0.13M | 0.008M | 0.09M |
| **GLM 5.3** | 1.06M | 1.11M | 0.20M | – |
| **GLM 5.2** | 1.06M | 1.11M | 0.20M | – |
| **DeepSeek V4 Pro** (base) | 1.00M | 1.00M | 0.03M | – |
| **Kimi K2.6** | 0.72M | 1.01M | 0.12M | – |
| **Kimi K2.7 Code** | 0.72M | 1.01M | 0.14M | – |
| **NVIDIA Nemotron 3 120B** | 0.38M | 0.38M | – | – |
| **Qwen 3.8 27B** | 0.34M | 0.81M | 0.04M | – |
| **DeepSeek V4 Flash** | 0.33M | 0.33M | 0.01M | – |
| **Mistral Small 3.1** | 0.27M | 0.14M | – | – |
| **GPT-OSS 120B** | 0.27M | 0.19M | – | – |
| **Llama 4 Scout** | 0.20M | 0.21M | – | – |
| **GPT-OSS 20B** | 0.15M | 0.08M | – | – |
| **GLM 5.3 Flash** | 0.11M | 0.13M | 0.02M | – |
| **Gemma 4 26B** | 0.08M | 0.08M | 0.04M | – |
| **GLM 4.7 Flash** | 0.05M | 0.10M | – | – |

Toggle on the page: **Credits** / **₹** (₹ per 1M tokens = credits ÷ {tokens_per_inr}, worked out live).

Notes under the table:
- Cache write only applies to Claude models.
- Only models shown in the app's model picker are listed.
- The real charging happens in the app's code; if a price changes in Sanity, the code must match.

---

## 6. For teams

**Using Classgrid AI with your team?**

Tell us about your team and we'll help you get set up.

[ Book a Demo → ]   ( /#demo )

---

## 7. Questions

**Do unused free tokens roll over?**
No. Your free tokens refill every {free_refill_period}, back to {free_tokens}.

**How long do top-up credits last?**
30 days from the day you top up.

**Can I get a refund?**
Top-ups aren't refundable, except for failed or double payments. Those are refunded in full.

**How do I pay?**
Securely through Razorpay, right inside the app.

**Where can I see my usage?**
In **Token activity** on your profile at chat.classgrid.in.

**Is my data used to train AI models?**
No. Classgrid doesn't use your content to train its own models. See our [Privacy Policy](/privacy).

---

## Where each live value comes from (for building the page)

| On the page | Super admin setting |
|---|---|
| {free_tokens} | Public chat org `free_weekly_limit_per_user` (if its custom limits are on), else Global `global_user_weekly_limit` |
| {free_refill_period} | Public chat org `token_reset_value/unit`, else Global `global_token_reset_value/unit` |
| {image_limit}, {image_refill_period} | Global → public chat org custom → Classgrid card (`*_image_weekly_limit`, `*_image_reset_value/unit`) |
| {whatsapp_limit}, {whatsapp_refill_period} | Global → public chat org custom → Classgrid card (`*_whatsapp_scheduling_limit`, `*_whatsapp_reset_value/unit`) |
| {tokens_per_inr} | Global `credits_per_inr` |
| {image_token_cost} | Global `image_generation_token_cost` |
| {topup_min}, {topup_max} | Top-up range (₹299 – ₹10,000) |
| 30-day credit validity | Paid credits expire 30 days after top-up (`ai-credits.controller.js`) |
| ₹299 premium unlock | Premium models unlock after ₹299 of top-ups |

Needs one small **public** endpoint on the platform server (e.g. `GET /api/public/ai-pricing`) that returns only these values — no user data.
