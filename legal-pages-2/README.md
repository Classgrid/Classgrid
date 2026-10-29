# CLASSGRID LEGAL CORPUS: THE COMPLETE 10 LEGAL PAGES

> **Repository Directory:** `legal-pages-2/` (mirrored in `legal-pages/`)  
> **Platform:** Classgrid (`https://classgrid.in`, `https://chat.classgrid.in`)  
> **Operator:** Classgrid Technologies, Pune, Maharashtra, India  
> **Date of Compilation:** October 27, 2026  
> **Governing Laws:** Information Technology Act, 2000; Information Technology Rules, 2011; Digital Personal Data Protection Act, 2023 (DPDP Act); RBI Payment Guidelines; Meta Calling & WhatsApp Business Policies; GitHub App API Terms.

---

## 🏛️ THE 5 OLD LEGAL PAGES vs. ⚡ THE 5 NEW LEGAL PAGES

The legal corpus consists of exactly 10 legal pages: the **5 OLD Legal Pages** (as published in Sanity Studio CMS) and the **5 NEW Legal Pages** (rewritten and updated on top of the old ones incorporating all backend features: Login & Accounts, The AI Agent, Project Mode, Grids Chat, Credits & Usage, and WhatsApp Calling).

| Legal Page Type | OLD Version (Sanity Studio CMS) | NEW Version (Updated with Backend Code) |
| :--- | :--- | :--- |
| **1. Privacy Policy** | [`OLD-01-privacy-policy.md`](OLD-01-privacy-policy.md) | [`NEW-01-privacy-policy.md`](NEW-01-privacy-policy.md) |
| **2. Terms of Service** | [`OLD-02-terms-of-service.md`](OLD-02-terms-of-service.md) | [`NEW-02-terms-of-service.md`](NEW-02-terms-of-service.md) |
| **3. Security Policy** | [`OLD-03-security-policy.md`](OLD-03-security-policy.md) | [`NEW-03-security-policy.md`](NEW-03-security-policy.md) |
| **4. Cookie Policy** | [`OLD-04-cookie-policy.md`](OLD-04-cookie-policy.md) | [`NEW-04-cookie-policy.md`](NEW-04-cookie-policy.md) |
| **5. Disclaimer** | [`OLD-05-disclaimer.md`](OLD-05-disclaimer.md) | [`NEW-05-disclaimer.md`](NEW-05-disclaimer.md) |

---

## What was added in the 5 NEW Legal Pages on top of the OLD ones?

### 1. [NEW-01-privacy-policy.md](NEW-01-privacy-policy.md) (Privacy Policy)
Built on top of the Sanity Privacy Policy, adding full statutory disclosures for:
- WhatsApp mobile phone number collection and 1-to-1 account binding
- Inbound voice audio processing via Meta Calling API & Cloudflare Whisper (Speech-to-Text)
- Strict ephemeral voice processing in RAM (zero raw audio recordings stored on disk)
- Storage of textual call transcripts in MongoDB & PostgreSQL under the DPDP Act 2023
- Project Mode cloud sandbox code storage and GitHub App ephemeral tokens
- Grids chat 4-person visibility disclosures and the `hideEmail` privacy toggle
- 30-day account deletion purge cycle under the DPDP Act 2023

### 2. [NEW-02-terms-of-service.md](NEW-02-terms-of-service.md) (Terms of Service)
Built on top of the Sanity Terms of Service, adding complete contractual terms for:
- Account creation with dual email and WhatsApp OTP verification
- 5-attempt failed login lockout for 5 minutes
- AI Agent autonomous background tasks: 48-hour hard runtime limit, `sleep_until` zero-token sleep, 5-failure circuit breaker, and outbound agent email rules
- Project Mode cloud sandboxes: Linux execution on Ubuntu, 2MB file limit, GitHub App tokens, automated `Co-authored-by: Classgrid AI` commit attribution, prohibited uses (cryptomining, DDoS, malware)
- Grids chat: 4-person room capacity cap, cryptographic 12-byte invite tokens, host administrative removal powers
- Credits & Billing: 3-tier token deduction hierarchy (Free ➔ Granted ➔ Top-up), DeepSeek V4 Pro 1.0x baseline pricing, 90%+ prompt cache discounts, Cloudflare usage metering, zero-negative balance rule, Razorpay billing, 18% GST, non-refundable virtual tokens
- WhatsApp Calling: Inbound voice AI calling, 15-minute call ceiling, 50 calls/day limit, post-call agent task dispatch, and strict emergency services disclaimer

### 3. [NEW-03-security-policy.md](NEW-03-security-policy.md) (Security Policy)
Built on top of the Sanity Security Policy, adding infrastructure security controls for:
- Dummy hash timing-attack defense on login endpoints
- Google reCAPTCHA Enterprise automated bot mitigation
- Device fingerprinting via User-Agent OS/browser analysis
- Project Mode cloud sandbox isolation via NodeSSH and unprivileged user containment
- GitHub App private key and administrative SSH key isolation from sandbox disks
- Server-side WebRTC SRTP/DTLS media encryption over UDP ports 10000–60000
- Ephemeral in-memory audio processing with zero audio data written to disk

### 4. [NEW-04-cookie-policy.md](NEW-04-cookie-policy.md) (Cookie Policy)
Built on top of the Sanity Cookie Policy, adding technical disclosures for:
- Signed JWT authentication session cookies (`HttpOnly`, `Secure`, `SameSite`, 30-day validity)
- User-Agent device fingerprint identifiers for new-device verification
- Google reCAPTCHA Enterprise security tokens on login/signup endpoints
- LocalStorage keys for Project Mode workspace state (`UI_PROJECT`, layouts, theme preferences)
- Client-side token balance indicators in SessionStorage

### 5. [NEW-05-disclaimer.md](NEW-05-disclaimer.md) (Disclaimer)
Built on top of the Sanity Disclaimer, adding specific legal disclaimers for:
- Probabilistic nature of AI Agent outputs and code generation (hallucination disclaimer)
- Mandatory user obligation to review and test all AI code before production deployment
- Limitation of liability for automated Agent actions (API calls, emails, git commits)
- Disclaimer of liability for uncommitted local code lost in cloud sandboxes during maintenance
- Strict emergency telephony disclaimer (WhatsApp Voice AI is NOT a phone carrier and CANNOT dial 112, 100, 101, 108, or 911)
- Non-fiat virtual utility token disclaimer (AI credits have no cash surrender value)

---

## 📦 Raw Sanity JSON Files
The unaltered JSON documents fetched directly from Sanity Studio production are preserved in [`raw-sanity-json/`](raw-sanity-json/).
