# PRIVACY POLICY

> **Document Type:** Privacy Policy  
> **Platform:** Classgrid Public AI Platform (`classgrid.in` & `chat.classgrid.in`)  
> **Entity:** Classgrid Technologies, Pune, Maharashtra, India  
> **Effective Date:** October 27, 2026  
> **Last Updated:** October 27, 2026  

---

## 1. INTRODUCTION & SCOPE

Classgrid Technologies ("**Company**", "**Classgrid**", "**We**", "**Us**", or "**Our**"), having its registered operational address at Akurdi Railway Station Road, Sector No. 26, Pradhikaran, Nigdi, Pimpri-Chinchwad, Maharashtra 411044, India, operates the public artificial intelligence and developer platform available at [https://classgrid.in](https://classgrid.in) and [https://chat.classgrid.in](https://chat.classgrid.in), including associated APIs, developer sandboxes, voice telephony integrations, and collaborative workspaces (collectively, the "**Platform**" or "**Services**").

This Privacy Policy describes how We collect, use, store, process, disclose, and protect personal data and technical telemetry when You ("**User**", "**Developer**", "**You**", or "**Your**") access or use the Platform. 

> **Important Scope Notice:** The Classgrid Platform is a public-facing cloud artificial intelligence workspace, developer sandbox environment, real-time collaboration suite, and voice assistant telephony gateway. Classgrid is **not** an educational ERP, school administration portal, or student record management system. Any legacy institutional services have been fully discontinued. This Privacy Policy governs the public-facing AI platform and developer toolchain exclusively.

By creating an account, connecting an OAuth provider (such as Google or GitHub), interacting with Our autonomous AI agents, launching cloud development sandboxes, participating in multi-user collaborative Grids, using WhatsApp voice telephony, or purchasing AI compute credits, You acknowledge and consent to the data practices described in this Privacy Policy. If You do not agree with this Policy, You must immediately cease accessing and using the Platform.

---

## 2. LEGAL & COMPLIANCE FRAMEWORK

This Privacy Policy is formulated, published, and enforced in strict compliance with applicable global and Indian data protection laws, including:
1. **The Digital Personal Data Protection Act, 2023 (DPDP Act, India)**;
2. **The Information Technology Act, 2000** and the **Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011**;
3. **The Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021**;
4. International data protection principles regarding lawfulness, fairness, purpose limitation, data minimization, accuracy, storage limitation, integrity, and confidentiality (such as the General Data Protection Regulation - GDPR where applicable to cross-border access).

Under the DPDP Act 2023, Classgrid Technologies acts as a **Data Fiduciary** for personal data directly collected from Users during account registration, profile setup, billing, and platform telemetry. When processing codebases, third-party repository contents, and agent tasks on behalf of a User or collaborative workspace team, Classgrid processes such data strictly in accordance with User instructions.

---

## 3. INFORMATION WE COLLECT

We collect only the categories of data necessary to provide, secure, meter, and enhance the Platform. Data is grouped into the following categories:

### 3.1 Account & Authentication Data
- **OAuth Identity Data:** When You register or sign in via Google OAuth or GitHub OAuth, We receive Your verified email address, full name, avatar/profile image URL, and provider-specific unique user identifier.
- **Passwordless Email OTP Data:** When signing in with email, We generate, transmit, and verify cryptographically hashed, short-lived One-Time Passwords (OTPs).
- **Session Credentials:** Cryptographically signed session tokens (JWTs) stored in secure, HttpOnly cookies or client-side storage keys, validated with constant-time comparison algorithms to prevent timing attacks.

### 3.2 Device Telemetry & Anti-Abuse Fingerprints
To protect the Platform, prevent credit farming, block distributed denial-of-service (DDoS) attacks, and enforce session integrity across distributed nodes, Our client applications gather non-reversible client security fingerprints:
- **Hardware Canvas & WebGL Hash:** A mathematical hash derived from client-side GPU rendering characteristics, canvas drawing output, and screen color depth.
- **Client System Environment:** Operating system architecture, user-agent string, browser version, client language, and screen dimensions.
- **Network Metadata:** Public IP address, reverse DNS, autonomous system number (ASN), and Cloudflare edge geolocation indicators.

### 3.3 Autonomous AI Agent & Workspace Data
- **Agent Tasks & Directives:** Natural language instructions, scheduled tasks, sleep intervals (`sleep_until` directives), task status history, and execution transcripts.
- **Execution Logs & Traceability:** Tool invocation logs, command inputs/outputs, error codes, and progress logs generated during autonomous agent runs (capped at a 48-hour continuous runtime window).
- **Agent Communication Records:** Email headers, subject lines, message bodies, and recipient addresses dispatched by the agent via `agent-mail.service.js` under explicit User authorization.

### 3.4 Project Mode & Cloud Development Sandbox Data
- **Source Code & Files:** Code files, project manifests, configuration files, and assets uploaded to or edited within cloud sandboxes (subject to a 2 megabyte individual file limit per upload).
- **Terminal Execution History:** Command strings executed in ephemeral Linux sandbox containers via secure NodeSSH sessions, including standard output (`stdout`) and standard error (`stderr`).
- **GitHub Integration Artifacts:** Dynamic, time-limited GitHub App installation tokens (`repoAppToken`), repository clones, branches, automated commits marked with `Co-authored-by: Classgrid AI`, and pull requests generated on Your behalf.

### 3.5 Grids Real-Time Collaborative Workspace Data
- **Multi-User Collaboration Logs:** Chat messages, shared prompt inputs, AI streaming response events, and real-time cursor/presence states shared among participants in a Grid room (capped at 4 users per Grid).
- **Privacy Preferences (`hideEmail`):** Settings chosen by collaborators to conceal their verified email address from non-admin participants within a multi-user Grid room.
- **Room Invite Metadata:** Cryptographically secure 12-byte base64url invitation tokens, join timestamps, and authorization state.

### 3.6 WhatsApp AI Voice Telephony Data
- **Phone Number Binding:** Verified telephone numbers linked 1-to-1 with Your registered Classgrid account.
- **Real-Time Audio Streams:** WebRTC 48 kHz Opus audio packets received during incoming and outgoing voice assistant phone calls via Meta's WhatsApp Calling Cloud API.
- **Transcripts & Synthesis Buffers:** Transient speech-to-text transcripts generated via Whisper STT, text responses generated by LLM reasoning engines (Claude Haiku / DeepSeek), and synthesized text-to-speech audio generated via Aura TTS.
- **Call Metadata:** Call connection timestamps, duration metrics (subject to a 15-minute maximum call limit), call termination reason codes, and automated post-call background task dispatch triggers.

### 3.7 Financial, Billing & Usage Telemetry Data
- **Transaction Records:** Payment order IDs, transaction references, Razorpay payment identifiers, and invoice amounts. **We do not store complete credit card numbers, debit card numbers, or UPI PINs.** All sensitive banking and card data is handled directly by Razorpay (an RBI-authorized payment aggregator).
- **Tax Compliance Records:** Indian Goods & Services Tax (GST) numbers, legal entity names, state codes, and billing addresses required for issuing valid GST tax invoices under Indian law.
- **AI Token Metering Records:** Input tokens, output tokens, prompt cache read tokens, prompt cache creation tokens, model identifiers, and compute credit deductions recorded per inference cycle against the DeepSeek V4 Pro 1.0x baseline unit standard.

---

## 4. HOW WE USE YOUR INFORMATION

We process personal and technical data strictly for the following lawful purposes:
1. **Service Provision & Workflow Execution:** Creating accounts, authenticating sessions, routing WebSocket payloads, provisioning Linux sandbox containers, and executing autonomous agent tasks.
2. **AI Inference & Voice Telephony:** Processing natural language prompts through dual-tier LLM infrastructure (GLM-4.7-Flash for low-latency classification and triage; DeepSeek V4 Pro / Claude 3.5 Sonnet for deep reasoning), and executing real-time voice speech pipelines.
3. **Usage Metering & Account Billing:** Calculating token consumption, applying 90%+ prompt caching cost reductions, deducting AI compute credits in real time, and maintaining zero-negative account balance guardrails.
4. **Security & Abuse Mitigation:** Detecting multiple fake accounts created to siphon free weekly promotional credits, mitigating DDoS attacks, identifying botnets, and enforcing container isolation boundaries.
5. **Git & Repository Synchronization:** Authorizing dynamic GitHub App tokens to enable branch commits, automated issue resolution, and repository pull requests.
6. **Regulatory Compliance:** Generating GST-compliant tax invoices, responding to lawful government data access requests under the IT Act 2000, and enforcing intellectual property rights.

---

## 5. ARTIFICIAL INTELLIGENCE & MODEL TRAINING COMMITMENTS

We respect Your intellectual property and code confidentiality. Our AI processing adheres to the following strict principles:

- **Zero Foundation Model Training on Private Code:** We do **not** use Your proprietary source code, private sandbox files, private prompt instructions, or personal data to train public foundation models without Your affirmative, explicit written consent.
- **Multi-Model Inference Routing:** Depending on task complexity, queries are routed through specialized model endpoints (e.g., GLM-4.7-Flash for rapid triage and classification; DeepSeek V4 Pro and Claude 3.5 Sonnet for code synthesis and analytical reasoning).
- **Prompt Caching Security:** Shared prefix prompt caches are isolated to tenant-safe, cryptographic memory spaces to optimize execution speed without leaking prompt boundaries across unrelated accounts.

---

## 6. DISCLOSURE & SHARING OF INFORMATION

Classgrid Technologies does **not** sell, rent, or trade Your personal data to third parties or data brokers. Data is shared exclusively with trusted third-party service providers and sub-processors necessary for delivering the Platform:

1. **Cloud & Sandbox Hosting:** Infrastructure providers hosting Our high-performance compute nodes, virtualized Linux sandboxes, Redis clusters, and PostgreSQL databases (e.g., Amazon Web Services, Cloudflare).
2. **AI Model Infrastructure:** API model providers (including Anthropic, DeepSeek, and Zhipu AI/GLM) that process prompt contexts under enterprise zero-data-retention or restricted retention agreements.
3. **Telephony & Messaging Providers:** Meta Platforms Inc. (WhatsApp Cloud Calling API for WebRTC voice telephony) and Resend/transactional SMTP relays for email OTP and agent notification delivery.
4. **Speech Processing Engines:** Deepgram / OpenAI Whisper for speech-to-text (STT) and Aura / ElevenLabs for text-to-speech (TTS) voice synthesis.
5. **Payment Aggregation:** Razorpay Software Private Limited for processing Indian and international payment methods, UPI, net banking, and generating statutory tax receipts.
6. **Legal & Law Enforcement Requirements:** We may disclose data if required by a court order, statutory subpoena, or lawful request under Indian law, or to protect the vital security of the Platform, its users, or the general public.

---

## 7. DATA RETENTION & DELETION

We retain data only as long as necessary to fulfill the operational purposes described in this Policy:
- **Account Profiles:** Retained for the active lifetime of Your account. Upon receiving a valid account deletion request, We purge personal identifiers within thirty (30) days, except for billing transaction logs required to be preserved under Indian tax and corporate laws.
- **Cloud Sandbox Environments:** Ephemeral Linux sandboxes in Project Mode are automatically terminated and wiped when closed or after periods of inactivity. Uncommitted files are permanently purged.
- **Agent Task Logs & Transcripts:** Task execution logs and agent message history are retained for ninety (90) days to allow debugging and audit verification, after which they are archived or deleted.
- **WhatsApp Audio Packets:** Real-time WebRTC audio streams are processed in memory and are **not** permanently recorded or stored on Classgrid servers after call termination, unless an explicit session recording feature is requested by the User.
- **Billing & Tax Records:** Invoices, GST numbers, and payment receipts are retained for a minimum of seven (7) years in accordance with Indian tax statutory requirements.

---

## 8. DATA SECURITY MEASURES

We implement comprehensive technical and organizational safeguards designed to protect personal and developer data:
- **Cryptographic Encryption:** All web traffic and WebSocket streams are encrypted using TLS 1.3 in transit. All database records, object storage, and disk volumes are encrypted at rest using industry-standard AES-256 encryption.
- **Isolated Linux Sandboxes:** Cloud development environments in Project Mode run inside isolated, restricted Linux environments preventing access to host hypervisors or neighboring tenant workloads.
- **Constant-Time Verification:** Session tokens and authentication secrets are compared using constant-time cryptographic algorithms (`crypto.timingSafeEqual`) to prevent timing side-channel attacks.
- **Circuit Breakers & Rate Limits:** Agent operations are guarded by a 5-consecutive-failure circuit breaker (`NO_PROGRESS_LIMIT = 5`), a 48-hour maximum continuous runtime cutoff (`MAX_WORK_MS`), and strict telephony rate limits (50 calls per 24 hours).
- **Edge Protection:** Cloudflare WAF, DDoS shielding, and rate-limiting daemons safeguard APIs against brute-force and credential-stuffing attacks.

---

## 9. YOUR RIGHTS UNDER THE DPDP ACT 2023 & GLOBAL REGULATIONS

Depending on Your jurisdiction, You have specific statutory rights concerning Your personal data:
1. **Right to Access & Summary:** You may request a summary of the personal data We hold about You, the processing activities carried out, and the identities of third parties with whom it has been shared.
2. **Right to Correction & Erasure:** You may update inaccurate personal data or request the deletion of data that is no longer necessary for the purpose it was collected.
3. **Right to Grievance Redressal:** You have the right to register a grievance with Our designated Grievance Officer regarding any matter relating to Your data processing.
4. **Right to Nominate:** Under the DPDP Act 2023, You have the right to nominate an individual who will exercise Your data privacy rights in the event of death or incapacity.
5. **Right to Withdraw Consent:** Where processing is based on consent, You may withdraw consent at any time through Your account dashboard or by writing to `privacy@classgrid.in`.

---

## 10. CHILDREN'S PRIVACY

The Classgrid Platform is designed for software developers, engineers, creators, and adult professionals. It is not intended for use by children under eighteen (18) years of age. We do not knowingly collect personal data from individuals under 18. If We become aware that an account has been created by a minor under 18 without verifiable parental consent, We will immediately terminate the account and purge associated data.

---

## 11. CROSS-BORDER DATA TRANSFERS

Classgrid operates globally utilizing cloud infrastructure, model inference clusters, and edge networks located in India, the United States, and the European Union. By accessing the Platform, You consent to the transfer, storage, and processing of Your data across international borders in compliance with the DPDP Act 2023 and applicable cross-border transfer mechanisms.

---

## 12. CHANGES TO THIS PRIVACY POLICY

We reserve the right to modify or update this Privacy Policy at any time to reflect technological advancements, new platform capabilities, or changes in legal regulations. When material changes are made, We will update the "Last Updated" date at the top of this document and notify Users via email or through a prominent banner on [https://chat.classgrid.in](https://chat.classgrid.in). Continued use of the Platform after the effective date of an updated policy constitutes Your acceptance of the revised terms.

---

## 13. GRIEVANCE OFFICER & CONTACT INFORMATION

In accordance with the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023, the details of the designated Grievance Officer are set forth below:

- **Entity Name:** Classgrid Technologies  
- **Attention:** Grievance Officer / Legal Counsel  
- **Operational Address:** Akurdi Railway Station Road, Sector No. 26, Pradhikaran, Nigdi, Pimpri-Chinchwad, Maharashtra 411044, India  
- **Grievance Email:** `grievance@classgrid.in`  
- **Privacy & Legal Inquiries:** `privacy@classgrid.in` / `legal@classgrid.in`  
- **Platform URL:** [https://chat.classgrid.in](https://chat.classgrid.in)  

We commit to acknowledging data privacy grievances within forty-eight (48) hours and resolving complaints within thirty (30) days from the date of receipt.
