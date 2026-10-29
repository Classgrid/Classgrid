# COOKIE & LOCAL STORAGE POLICY

> **Document Type:** Cookie Policy  
> **Platform:** Classgrid Public AI Platform (`classgrid.in` & `chat.classgrid.in`)  
> **Entity:** Classgrid Technologies, Pune, Maharashtra, India  
> **Effective Date:** October 27, 2026  
> **Last Updated:** October 27, 2026  

---

## 1. INTRODUCTION & SCOPE

This Cookie & Local Storage Policy explains how Classgrid Technologies ("**Company**", "**Classgrid**", "**We**", "**Us**", or "**Our**") uses cookies, local browser storage, session storage, and client-side device security hashes on the Classgrid marketing website ([https://classgrid.in](https://classgrid.in)) and the Classgrid public AI development platform ([https://chat.classgrid.in](https://chat.classgrid.in)) (collectively, the "**Platform**").

> **Scope Clarification:** Classgrid is a public cloud artificial intelligence workspace, developer sandbox environment, real-time collaboration suite, and voice telephony gateway. Classgrid is **not** an educational ERP, school administration portal, or student record management system. Any legacy institutional services have been fully decommissioned. This Policy applies exclusively to the public-facing AI platform.

This Cookie Policy should be read in conjunction with Our [Privacy Policy](file:///c:/classgrid_marketting/legal-pages-2/NEW-01-privacy-policy.md) and [Terms of Service](file:///c:/classgrid_marketting/legal-pages-2/NEW-02-terms-of-service.md).

---

## 2. TECHNOLOGIES WE USE

When You interact with the Platform, We utilize several client-side storage and telemetry technologies:

### 2.1 HTTP Cookies
Cookies are small data files placed on Your computer or mobile device by a web server. Cookies may be:
- **Session Cookies:** Temporary cookies that expire automatically when You close Your browser tab or session.
- **Persistent Cookies:** Cookies that remain stored on Your device for a predetermined period or until manually deleted.
- **HttpOnly & Secure Cookies:** Cryptographically secure cookies inaccessible to client-side JavaScript, protecting session tokens from Cross-Site Scripting (XSS) attacks.

### 2.2 HTML5 Local Storage (`localStorage`)
Local storage allows web applications to store data persistently within the user's browser with no expiration date. Classgrid uses local storage for non-sensitive client preferences (e.g., dark/light theme, code editor font size, minimized panels) and, where configured in standard browser flows, client bearer token caching for authenticated API requests.

### 2.3 HTML5 Session Storage (`sessionStorage`)
Session storage maintains data temporarily for the lifetime of a specific browser tab. Classgrid uses session storage to buffer transient streaming AI tokens, multi-user Grid room states, and active editor tab indexes, which are automatically purged upon tab closure.

### 2.4 Client-Side Hardware Telemetry & Device Hashing
To prevent credit farming, botnet infiltration, and brute-force account creation, Our web client computes a non-reversible cryptographic hash from client hardware rendering characteristics (Canvas rendering output, WebGL parameters, screen bit depth). This hash is used strictly for platform security and session anti-tamper verification; it is never shared with advertising networks.

---

## 3. CATEGORIES OF COOKIES & STORAGE USED

We organize cookies and local storage items into three clear functional categories:

### 3.1 Strictly Necessary (Essential) Cookies & Keys
These technologies are strictly required for the operation, security, and authentication of the Platform. Without them, core features such as logging in, executing sandbox commands, and communicating with AI models cannot function.

| Identifier / Key | Storage Type | Provider | Duration | Purpose & Function |
| :--- | :--- | :--- | :--- | :--- |
| `token` | Cookie (`HttpOnly`, `Secure`) | Classgrid | 30 Days | Stores signed session JWT for authenticated API and WebSocket access. |
| `token` | Local Storage | Classgrid | Persistent | Client-side bearer token fallback for direct browser API communication. |
| `cf_clearance` | Cookie | Cloudflare | 1 Year | Validates human challenge completion and mitigates DDoS / bot traffic. |
| `__cf_bm` | Cookie | Cloudflare | 30 Minutes | Cloudflare bot management cookie identifying automated attack patterns. |
| `grid_session` | Session Storage | Classgrid | Tab Session | Maintains real-time WebSocket connection state for collaborative Grids. |
| `csrf_token` | Cookie | Classgrid | Session | Protects against Cross-Site Request Forgery (CSRF) in form submissions. |

### 3.2 Functional & Preference Cookies & Keys
These technologies allow the Platform to remember Your interface configurations, editor customizations, and workspace states to provide a seamless development experience.

| Identifier / Key | Storage Type | Provider | Duration | Purpose & Function |
| :--- | :--- | :--- | :--- | :--- |
| `cg_theme` | Local Storage | Classgrid | Persistent | Stores preferred UI theme (e.g., dark mode, light mode, system default). |
| `editor_prefs` | Local Storage | Classgrid | Persistent | Caches IDE code editor preferences (font size, tab indentation, word wrap). |
| `hide_email_pref` | Local Storage | Classgrid | Persistent | Remembers Your `hideEmail` preference for multi-user collaborative Grids. |
| `chat_input_draft` | Session Storage | Classgrid | Tab Session | Buffers unfinished prompt drafts to prevent accidental data loss on refresh. |

### 3.3 Security, Telemetry & Performance
We collect aggregate, privacy-preserving performance telemetry to monitor model latency, token throughput, and server health.

| Identifier / Key | Storage Type | Provider | Duration | Purpose & Function |
| :--- | :--- | :--- | :--- | :--- |
| `cf_uvid` | Cookie | Cloudflare | 30 Days | Anonymous edge visitor identification for rate limiting and telemetry. |
| `telemetry_session` | Session Storage | Classgrid | Tab Session | Collects anonymous client-side error logs and WebSocket reconnect counts. |

---

## 4. STRICT ZERO-ADVERTISING & ZERO-TRACKING COMMITMENT

> 🛡️ **Zero Third-Party Advertising Trackers:**  
> Classgrid is a dedicated engineering, AI, and developer productivity platform. We **do not** host third-party behavioral advertising banners, do **not** sell Your browsing data, and do **not** embed tracking pixels from ad networks (such as Google AdSense, Meta Pixel, TikTok Pixel, or commercial data broker trackers).

---

## 5. THIRD-PARTY SERVICES & INTEGRATIONS

Certain features of the Platform integrate with trusted third-party providers who may set cookies or inspect client session headers:

1. **Cloudflare:** Provides global Content Delivery Network (CDN) acceleration, DDoS protection, and Web Application Firewall (WAF) filtering. Cloudflare cookies are strictly essential for security.
2. **Google OAuth & GitHub OAuth:** When You authenticate via Google or GitHub, their authentication pop-ups manage cookies on their respective domains (`accounts.google.com` and `github.com`) in accordance with their privacy policies.
3. **Razorpay Software Private Limited:** When You purchase AI compute credits, Razorpay's checkout modal loads payment security scripts that may set fraud prevention cookies. Razorpay complies with RBI regulations and PCI-DSS Level 1 security standards.

---

## 6. MANAGING & CONTROLLING YOUR COOKIES

You have the right to control how cookies are stored on Your device. You can manage or delete cookies through Your browser settings:

- **Google Chrome:** Go to `Settings > Privacy and Security > Third-Party Cookies`.
- **Mozilla Firefox:** Go to `Settings > Privacy & Security > Cookies and Site Data`.
- **Apple Safari:** Go to `Preferences > Privacy > Block all cookies`.
- **Microsoft Edge:** Go to `Settings > Cookies and site permissions > Manage and delete cookies`.

> ⚠️ **Impact of Disabling Cookies:**  
> Because the `token` cookie and related session keys are strictly necessary to authenticate Your account, maintain secure WebSocket connections in Grids, and launch Project Mode sandboxes, disabling cookies will prevent You from logging in or using the core features of the Classgrid AI platform.

---

## 7. UPDATES TO THIS COOKIE POLICY

We may update this Cookie Policy from time to time to reflect changes in platform technology, security practices, or legal requirements. When updates are published, the "Last Updated" date at the top of this document will be revised. Significant modifications will be announced via in-platform notifications on [https://chat.classgrid.in](https://chat.classgrid.in).

---

## 8. CONTACT US

If You have questions, feedback, or concerns regarding Our use of cookies or browser storage technologies, please contact Our data privacy team at:

- **Data Privacy Team:** `privacy@classgrid.in`  
- **Legal Inquiries:** `legal@classgrid.in`  
- **Operational Address:** Classgrid Technologies, Akurdi Railway Station Road, Sector No. 26, Pradhikaran, Nigdi, Pimpri-Chinchwad, Maharashtra 411044, India  
- **Public Platform:** [https://chat.classgrid.in](https://chat.classgrid.in)
