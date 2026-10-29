# TERMS OF SERVICE

> **Document Type:** Terms of Service  
> **Platform:** Classgrid Public AI Platform (`classgrid.in` & `chat.classgrid.in`)  
> **Entity:** Classgrid Technologies, Pune, Maharashtra, India  
> **Effective Date:** October 27, 2026  
> **Last Updated:** October 27, 2026  

---

## 1. ACCEPTANCE OF TERMS

These Terms of Service ("**Terms**", "**Agreement**") constitute a legally binding agreement between You ("**User**", "**Developer**", "**You**", or "**Your**") and Classgrid Technologies ("**Company**", "**Classgrid**", "**We**", "**Us**", or "**Our**"), having its principal operational office at Akurdi Railway Station Road, Sector No. 26, Pradhikaran, Nigdi, Pimpri-Chinchwad, Maharashtra 411044, India.

These Terms govern Your access to and use of the Classgrid website ([https://classgrid.in](https://classgrid.in)), the Classgrid AI chat and development platform ([https://chat.classgrid.in](https://chat.classgrid.in)), associated software development tools, autonomous agent execution systems, ephemeral cloud sandboxes, real-time multi-user collaborative Grids, voice telephony integrations, and application programming interfaces (collectively, the "**Platform**" or "**Services**").

> **Important Scope Notice:** Classgrid is an autonomous artificial intelligence platform and cloud development workspace. Classgrid is **not** an educational ERP, school management system, or student administrative portal. All legacy educational institution ERP offerings have been permanently decommissioned. These Terms govern the public-facing AI platform exclusively.

BY CREATING AN ACCOUNT, CONNECTING VIA OAUTH (GOOGLE OR GITHUB), INITIALIZING AN AUTONOMOUS AGENT TASK, LAUNCHING A CLOUD SANDBOX, PARTICIPATING IN A COLLABORATIVE GRID, INITIATING A WHATSAPP VOICE CALL, OR PURCHASING AI CREDITS, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS. IF YOU DO NOT AGREE TO THESE TERMS IN THEIR ENTIRETY, YOU ARE NOT AUTHORIZED TO ACCESS OR USE THE PLATFORM.

---

## 2. ELIGIBILITY & ACCOUNT REGISTRATION

### 2.1 Age & Legal Capacity
You must be at least eighteen (18) years of age, or the age of legal majority in Your jurisdiction, and possess the legal capacity to enter into a binding contract under the Indian Contract Act, 1872, or other applicable laws. If You access the Platform on behalf of a company or legal entity, You represent and warrant that You have full authority to bind that entity to these Terms.

### 2.2 Account Creation & Authentication
To access core platform features, You must authenticate using:
- **Third-Party OAuth:** Google OAuth or GitHub OAuth; or
- **Passwordless Verification:** Cryptographically secure One-Time Passwords (OTPs) sent to Your verified email address.

You agree to provide accurate, current, and complete registration information. You are solely responsible for maintaining the confidentiality of Your session credentials, access tokens, and any activity occurring under Your account.

### 2.3 Account Integrity & Anti-Abuse Controls
Classgrid implements client-side device fingerprinting (including hardware Canvas and WebGL hashing, user-agent parsing, and IP address logging) to enforce platform security and prevent fraudulent exploitation. The creation of automated, scripted, or multiple dummy accounts designed to exploit free weekly promotional credits is strictly prohibited and constitutes a material breach resulting in immediate account termination.

---

## 3. PLATFORM SERVICES

Classgrid provides next-generation developer tooling, cloud intelligence, and autonomous compute environments, including:

1. **The Autonomous AI Agent:** An autonomous task engine capable of executing complex engineering workflows, scheduling recurring operations, running external tools, invoking APIs, and sending outbound notifications over continuous background execution cycles.
2. **Project Mode (Cloud Development Sandboxes):** Ephemeral, isolated Linux container environments enabling code authoring, dependency installation, command-line terminal execution via NodeSSH, and dynamic GitHub synchronization.
3. **Grids Collaborative Chat:** Real-time multi-user virtual collaboration rooms enabling teams to co-develop, stream LLM responses simultaneously, and manage workspace context.
4. **WhatsApp AI Voice Telephony:** Real-time voice interaction gateway powered by Meta's WhatsApp Calling API, integrating Whisper speech-to-text, deep reasoning models, and Aura speech synthesis.
5. **AI Credits & Metered Computing:** A unified token consumption and credit accounting mechanism powering multi-model LLM access.

---

## 4. AI CREDITS, TOKEN PRICING & PAYMENT BILLING

### 4.1 Nature of AI Credits
AI Credits are non-fiat, virtual platform units used solely to meter and pay for computational processing, large language model (LLM) inference, cloud sandbox uptime, voice telephony duration, and autonomous agent tool execution. **Credits do not constitute real currency, legal tender, bank deposits, or securities, and hold no cash surrender value outside the Platform.**

### 4.2 Credit Allocation Hierarchy
When executing compute or inference operations, credit deductions occur in the following strict order of priority:
1. **Free Weekly Allowance:** Promotional credits provided weekly to active accounts (non-cumulative, expiring at the end of each cycle).
2. **Granted / Promotional Credits:** Credits awarded via promotions, hackathons, or system bonuses.
3. **Purchased Top-Up Credits:** Balances acquired through direct commercial purchase.

### 4.3 Normalized Token Pricing & Prompt Caching
Model token consumption is normalized against an industry-standard baseline of **1.0x DeepSeek V4 Pro unit cost**. Advanced reasoning models (e.g., Claude 3.5 Sonnet) and lightweight triage models (e.g., GLM-4.7-Flash) are dynamically factored based on their computational cost relative to this baseline. Prompt caching benefits (up to 90%+ discount on cached input prefix tokens) are automatically passed through to reduce User credit burn.

### 4.4 Payments, Razorpay & GST Compliance
- All commercial credit top-up transactions are processed through **Razorpay Software Private Limited**, an RBI-authorized payment aggregator.
- Purchases made within India are subject to statutory Indian Goods & Services Tax (GST) at the prevailing rate of **18%**, which is added to the transaction at checkout.
- You agree to provide a valid GST identification number (GSTIN) if purchasing on behalf of a registered tax entity.

### 4.5 Non-Refundable Nature & Zero-Negative Floor
- **No Refunds:** All credit purchases are final and strictly non-refundable once purchased or partially consumed.
- **Zero-Negative Balance:** The Platform operates on a zero-negative balance model. If Your credit balance is depleted to zero, active background agent tasks, telephony sessions, and cloud sandbox executions will pause or gracefully terminate until top-up credits are acquired.

---

## 5. THE AUTONOMOUS AI AGENT & TASK EXECUTION

### 5.1 Autonomous Agency & User Instructions
Classgrid AI agents act strictly as autonomous software proxies executing instructions provided by You. You are solely responsible for all instructions, prompts, script commands, code generations, and network requests initiated through the agent.

### 5.2 Runtime Cutoffs & Scheduling
- **48-Hour Execution Ceiling (`MAX_WORK_MS`):** No individual autonomous task may run continuously for longer than 48 hours. Tasks exceeding this limit are automatically terminated by system daemons to prevent runaway execution.
- **Sleep & Polling Controls:** Tasks utilizing the `sleep_until` scheduler or background polling alarms must adhere to system minimum intervals (5 minutes) and cannot be configured to trigger denial-of-service loops against third parties.

### 5.3 Tool Execution Circuit Breaker (`NO_PROGRESS_LIMIT = 5`)
To protect Your credit balance and system stability, autonomous agent tasks incorporate an automated safety circuit breaker: if an agent experiences **five (5) consecutive tool execution failures** without measurable progress, the task is automatically aborted, and diagnostic failure logs are recorded.

### 5.4 Agent Outbound Communications (`agent-mail.service.js`)
If You authorize an autonomous agent to dispatch emails on Your behalf:
- You represent that You have obtained prior consent from all email recipients.
- You may not use the agent to send unsolicited bulk communications, spam, marketing blasts, phishing lures, or fraudulent messages.
- Classgrid reserves the right to immediately terminate the outbound mail capability of any account violating spam or email abuse policies.

---

## 6. PROJECT MODE & CLOUD DEVELOPMENT SANDBOXES

### 6.1 Ephemeral Container Architecture
Cloud sandboxes provisioned under Project Mode run inside isolated Linux environments accessible via secure NodeSSH sessions. **Sandboxes are ephemeral development environments and must not be used for long-term production hosting or persistent data storage.**

### 6.2 Data Loss Warning & Git Synchronization
You are responsible for regularly committing and pushing Your source code to remote git repositories (such as GitHub). **Classgrid is not responsible or liable for any loss of uncommitted source code, configuration files, or database dumps caused by sandbox timeout, container reboot, crash, or scheduled cluster maintenance.**

### 6.3 GitHub Dynamic Tokens & Automated Commits
- When Project Mode connects to GitHub, Classgrid generates short-lived, scoped installation tokens (`repoAppToken`) through the official Classgrid GitHub App.
- Automated commits or code modifications generated by the platform will be attributed with the standard trailer: `Co-authored-by: Classgrid AI <noreply@classgrid.in>`.
- You retain full authority and responsibility to review, test, merge, or revert any commits or pull requests created by the Platform.

### 6.4 File Limits & Upload Restrictions
Individual file uploads into Project Mode sandboxes are subject to a hard cap of **2 Megabytes (`MAX_FILE_BYTES = 2MB`)** to mitigate denial-of-service, storage exhaustion, and malicious archive decompression attacks (zip bombs).

---

## 7. WHATSAPP AI VOICE TELEPHONY

### 7.1 Telephony Gateway & Phone Binding
Classgrid provides voice telephony integration using Meta Platforms' WhatsApp Calling API. Voice calling features are restricted to phone numbers verified and linked 1-to-1 with Your authenticated Classgrid account.

### 7.2 Strict Emergency Services Disclaimer
> 🚨 **CRITICAL WARNING — NO EMERGENCY DISPATCH:**  
> CLASSGRID VOICE TELEPHONY IS AN EXPERIMENTAL ARTIFICIAL INTELLIGENCE CONVERSATIONAL TOOL. IT IS **NOT** A REPLACEMENT FOR TRADITIONAL TELEPHONE SERVICES AND CANNOT CONNECT TO EMERGENCY SERVICES (INCLUDING 112, 100, 101, 102, 108 IN INDIA, 911 IN THE UNITED STATES, 999 IN THE UNITED KINGDOM, OR ANY LOCAL POLICE, FIRE, AMBULANCE, OR DISASTER RESPONSE AGENCIES). DO NOT ATTEMPT TO USE CLASSGRID VOICE TELEPHONY FOR EMERGENCY ASSISTANCE.

### 7.3 Call Duration Limits & Automated Termination
- **15-Minute Hard Cap:** Individual voice calls are restricted to a maximum duration of fifteen (15) minutes.
- **Wrap-Up Warning & Grace Overtime:** An automated audio wrap-up announcement will play fifteen (15) seconds before the limit, followed by a thirty (30) second hard disconnect grace window.
- **Daily Rate Cap:** Accounts are limited to a maximum of fifty (50) voice calls per rolling 24-hour window.

### 7.4 Post-Call Autonomous Task Dispatch
Upon the termination of a voice call, the Platform may automatically initialize an autonomous background agent task to summarize conversation notes, generate code artifacts, or update project files as requested during the call. Standard AI credit metering rules apply to post-call tasks.

---

## 8. GRIDS REAL-TIME COLLABORATIVE CHAT

### 8.1 Multi-User Room Capacity & Access Tokens
- Grids chat rooms are limited to a maximum of **four (4) concurrent participants (`GRID_MAX_PEOPLE = 4`)**.
- Rooms are joined via secure, unguessable 12-byte base64url invitation tokens. The account creating the Grid ("Host") is responsible for all invitations issued.

### 8.2 Privacy Controls (`hideEmail`)
Participants in collaborative Grids have the option to enable the `hideEmail` privacy toggle, masking their verified email address from non-admin participants in the room while maintaining real-time collaborative state.

### 8.3 Collaborator Conduct
All users in a shared Grid must comply with these Terms. Hosts are responsible for immediately revoking access tokens if unauthorized or abusive individuals enter their collaborative workspace.

---

## 9. ACCEPTABLE USE POLICY (AUP)

You agree that You will not, and will not permit any third party or autonomous agent under Your direction to:
1. **Malicious Computing:** Use cloud sandboxes or terminal commands to mine cryptocurrencies, launch Distributed Denial of Service (DDoS) attacks, perform unauthorized network port scanning, or host command-and-control servers.
2. **Malware & Exploit Development:** Write, compile, distribute, or execute malicious software, viruses, worms, keyloggers, ransomware, or exploits designed to compromise computer systems or networks.
3. **Adversarial AI Attacks:** Attempt prompt injection, jailbreaking, model extraction, denial of service against LLM inference clusters, or circumvent safety filters.
4. **Illegal & Infringing Content:** Generate, store, upload, or transmit content that is defamatory, obscene, pornographic, harassing, promoting violence, violating privacy rights, or infringing any third-party patent, trademark, trade secret, or copyright.
5. **System Tampering:** Circumvent credit accounting systems, exploit sandbox hypervisor boundaries, reverse engineer proprietary platform microservices, or spoof device fingerprinting telemetry.
6. **Unauthorized Mass Telephony:** Exploit the WhatsApp voice calling API for robocalling, automated telemarketing, cold outreach harassment, or unsolicited voice spam.

Violation of this Acceptable Use Policy constitutes grounds for immediate suspension or permanent termination of Your account without refund, and may result in legal referral to law enforcement authorities.

---

## 10. INTELLECTUAL PROPERTY RIGHTS

### 10.1 Your Proprietary Content & Code
As between You and Classgrid, You retain all right, title, and interest (including all copyright and patent rights) in and to:
- Source code, software architectures, documents, and data authored or uploaded by You into the Platform;
- Prompts, task parameters, and instructions submitted to Our AI models.

### 10.2 AI-Generated Outputs
Subject to Your compliance with these Terms and the upstream licensing constraints of underlying foundation model providers (such as Anthropic, DeepSeek, and Zhipu AI), Classgrid assigns to You all of its right, title, and interest in and to the specific code, text, and synthetic artifacts generated for You by the Platform's AI models. You acknowledge that AI outputs are non-exclusive and that identical or similar outputs may be generated for other users submitting similar prompts.

### 10.3 Classgrid Platform Intellectual Property
Classgrid Technologies retains all right, title, and interest in and to the Platform, including all underlying source code, user interfaces, proprietary autonomous agent frameworks, scheduling engines, database schemas, trademarks, domain names, logos, and documentation. You may not copy, reverse engineer, decompile, or create derivative works of the Platform.

---

## 11. DISCLAIMER OF WARRANTIES

THE PLATFORM, INCLUDING ALL ARTIFICIAL INTELLIGENCE AGENTS, CLOUD DEVELOPMENT SANDBOXES, TERMINAL SHELLS, VOICE TELEPHONY INTEGRATIONS, AND REAL-TIME GRIDS, IS PROVIDED STRICTLY ON AN **"AS IS"** AND **"AS AVAILABLE"** BASIS, WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE.

CLASSGRID TECHNOLOGIES EXPRESSLY DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:
- WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT;
- WARRANTIES THAT THE PLATFORM WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE;
- WARRANTIES REGARDING THE ACCURACY, RELIABILITY, CODE QUALITY, COMPILABILITY, OR LOGICAL CORRECTNESS OF ANY CODE, TEXT, OR ADVICE GENERATED BY ARTIFICIAL INTELLIGENCE MODELS.

YOU ACKNOWLEDGE THAT LARGE LANGUAGE MODELS OPERATE PROBABILISTICALLY AND ARE PRONE TO OCCASIONAL "HALLUCINATIONS," COMPILATION ERRORS, OUTDATED API RECOMMENDATIONS, AND SYNTAX ANOMALIES. YOU AGREE TO INDEPENDENTLY AUDIT, COMPILE, TEST, AND VERIFY ALL CODE PRIOR TO PRODUCTION DEPLOYMENT.

---

## 12. LIMITATION OF LIABILITY

TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL CLASSGRID TECHNOLOGIES, ITS DIRECTORS, OFFICERS, EMPLOYEES, AFFILIATES, AGENTS, SUPPLIERS, OR LICENSORS BE LIABLE FOR:
- ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES;
- DAMAGES FOR LOSS OF PROFITS, REVENUE, GOODWILL, DATA, WORK STOPPAGE, OR COMPUTER/CONTAINER CRASHES;
- ANY LOSS OF UNCOMMITTED SOURCE CODE IN PROJECT MODE SANDBOXES;
- ANY ACTIONS TAKEN BY AUTONOMOUS AI AGENTS PURSUANT TO YOUR PROMPTS OR INSTRUCTIONS;
- ANY INABILITY TO CONNECT TO EMERGENCY RESCUE OR DISPATCH SERVICES VIA WHATSAPP TELEPHONY.

IN NO EVENT SHALL THE TOTAL AGGREGATE LIABILITY OF CLASSGRID TECHNOLOGIES ARISING OUT OF OR RELATING TO THESE TERMS OR THE PLATFORM EXCEED THE GREATER OF: (A) THE TOTAL AMOUNT ACTUALLY PAID BY YOU TO CLASSGRID FOR AI CREDITS IN THE THREE (3) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO LIABILITY; OR (B) FIVE THOUSAND INDIAN RUPEES (INR 5,000).

---

## 13. INDEMNIFICATION

You agree to defend, indemnify, and hold harmless Classgrid Technologies, its parent companies, subsidiaries, directors, officers, employees, contractors, and agents from and against any and all claims, damages, obligations, losses, liabilities, costs, debts, and expenses (including reasonable attorneys' fees and legal costs) arising from:
1. Your access to or use of the Platform, cloud sandboxes, or voice telephony;
2. Your violation of any provision of these Terms or the Acceptable Use Policy;
3. Any commands, tasks, or code executed by an autonomous agent on Your behalf;
4. Your infringement or violation of any third-party intellectual property or privacy right;
5. Any dispute between You and participants invited into Your collaborative Grids.

---

## 14. TERMINATION & SUSPENSION

### 14.1 Suspension for Security Threats
We reserve the right to immediately suspend or restrict Your access to the Platform, cloud sandboxes, or AI inference endpoints without notice if:
- We detect suspicious activity, botnet signatures, or device fingerprint anomalies;
- Your autonomous agent initiates excessive failing loops or unauthorized outbound attacks;
- You violate the Acceptable Use Policy or applicable laws.

### 14.2 Termination by User
You may terminate Your account at any time via Your account profile dashboard. Termination does not entitle You to any refund of unconsumed AI credits.

### 14.3 Effect of Termination
Upon termination of Your account, all active sandboxes, task schedules, and agent alarms will be cancelled immediately, and stored session tokens will be invalidated. Provisions that by their nature should survive termination shall survive (including Intellectual Property, Warranty Disclaimers, Limitation of Liability, Indemnification, and Governing Law).

---

## 15. GOVERNING LAW & DISPUTE RESOLUTION

### 15.1 Governing Law
These Terms and any dispute or claim arising out of or in connection with them shall be governed by and construed in accordance with the laws of the Republic of India, without giving effect to any principles of conflicts of law.

### 15.2 Exclusive Jurisdiction
Subject to the arbitration clause below, You agree that the competent courts located in **Pune / Pimpri-Chinchwad, Maharashtra, India**, shall have sole and exclusive jurisdiction to resolve any legal disputes arising under these Terms.

### 15.3 Arbitration
Any dispute, controversy, or claim arising out of or relating to this Agreement, including its formation or breach, shall be referred to and finally resolved by binding arbitration administered in Pune, Maharashtra, in accordance with the Arbitration and Conciliation Act, 1996. The arbitration tribunal shall consist of a sole arbitrator appointed mutually by the parties. The language of arbitration shall be English.

---

## 16. MISCELLANEOUS PROVISIONS

- **Entire Agreement:** These Terms, together with Our Privacy Policy, Security Policy, Cookie Policy, and Disclaimer, constitute the entire agreement between You and Classgrid Technologies regarding the Platform.
- **Severability:** If any provision of these Terms is found to be invalid or unenforceable, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force.
- **No Waiver:** Our failure to enforce any right or provision of these Terms will not be deemed a waiver of such right or provision.
- **Assignment:** You may not assign or transfer these Terms without Our prior written consent. We may assign Our rights and obligations without restriction.

---

## 17. CONTACT & LEGAL NOTICES

For legal notices, terms inquiries, or formal communications, please contact Us at:

- **Entity Name:** Classgrid Technologies  
- **Registered Address:** Akurdi Railway Station Road, Sector No. 26, Pradhikaran, Nigdi, Pimpri-Chinchwad, Maharashtra 411044, India  
- **Legal Notices Email:** `legal@classgrid.in`  
- **Developer Support:** `support@classgrid.in`  
- **Platform URL:** [https://chat.classgrid.in](https://chat.classgrid.in)
