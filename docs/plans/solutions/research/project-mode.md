# Research: Project Mode (Classgrid Code)

Source: read-only code research of `C:\CLASSGRIDPLATFORM\classgrid_platoform-desktop-`, 2026-10-27.

Abbreviations: PMP = `client/src/features/superadmin/pages/ProjectModePage.tsx` (route `/c/project`, open to every logged-in user), IPS = `server/src/services/ide-project.service.js`, IR = `server/src/routes/ide.routes.js`, PTS = `client/src/components/ai/components/stepper/ProjectToolSteps.tsx`, TOOLS = `server/src/mcp/tools.js`, INFRA = `infra/ide/` (README calls the editor "Classgrid Code" — OpenVSCode Server, Classgrid-branded).

## 1. Capabilities

### Onboarding (PMP)
- Mode switch: "Switch Mode" → "Agent" / "Project" (`client/src/components/layout/SidebarSwitcher.tsx`).
- GitHub required: heading "Connect GitHub to use Project Mode" / "Reconnect GitHub"; body "Project Mode needs your GitHub account. Your code is only kept on GitHub, never on our servers."; button "Connect GitHub".
- Projects page: title "Projects", subtitle "Your code stays on GitHub. Opening a project downloads it fresh." Shows the connected GitHub avatar, name, email.
- "New project" / "Create project", optional "Add logo" ("Crop project logo"), placeholder "Project name", "Create".
- "Link a GitHub repo" dialog: "Pick a repo below, or enter the project without a repo. You or the Agent can make a repo any time." Buttons "Enter project without a repo", "Cancel". Private repos tagged "private".
- GitHub app gate: card "Install the Classgrid app" + "Required for {repos}." (no repos yet: "New: the Classgrid GitHub app" / "Required for the repositories you work on."), button "Install app". In-editor banner "Install the Classgrid app on {repo}." + "Install Classgrid app". After install GitHub returns to `/c/project?github_app=installed`, toast "Classgrid app installed" (`server/src/routes/github-app.routes.js`).
- Project cards (Vercel-style): last commit message, repo, branch, time ago; with Vercel connected also the Vercel project and live domain. Actions "Open", "Edit", "Delete" ("Its code stays on GitHub. Only the project here is deleted.").
- Loading lines: "Downloading the latest code from GitHub" → "Starting the editor" → "Almost ready"; on reload "Reconnecting to your project". New project without repo cycles: "Starting your new project", "You can ask the Agent to build a website or an app", "You can ask it to write, fix or explain code", "You can ask it to make a GitHub repo and push your code", "Getting your editor ready".
- No-repo banner: "This project has no GitHub repo yet. Code is only kept on GitHub, so make a repo and push your work." Button "Ask Agent to create repo".
- "Move to project": "The chat moves into this project and continues in Project Mode." (`AgentSidebar.tsx`). Chats kept per project.

### Editor (INFRA README, `infra/ide/files/*`)
- Full VS Code in the browser, built-in terminal, auto-save, Prettier, ESLint, Code Runner (▷ Run button). No extension store.
- npm packages installed automatically on open (toast "Installing the project's packages in the background…").
- Top bar "Agent" button + resizable AI panel.

### Agent tools in a project (TOOLS lines 377–571, IPS, `server/src/services/ai-tool-groups.js`)
- Read/search: list, view, text/regex search, search by meaning ("Searched by meaning").
- Edit: create files ("Created"), targeted edits ("Edited file +N -M"); after each edit the agent gets editor TypeScript/ESLint errors back ("N problem(s) in the editor").
- Run: `run_code` (python/js/bash) in the project folder; UI lists files each run changed. (`execute_terminal_command` is staff-only.)
- Background long commands: dev servers, builds, test suites ("Started in background `npm run dev`"); agent can check them and run e.g. `curl localhost:3000` inside.
- Up to 5 read-only helper agents explore the codebase in parallel ("Sending N helpers").
- GitHub repo tools: create repo (private by default, can be in an org), rename, change description/website/visibility; rename the project.
- Context the agent sees: open file, cursor, selection, open tabs, editor errors, the user's own edits since its last answer; reads repo `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md`.
- Planning: plans in `plan/*.md`, approved via a questions card and plan card ("View Plan").
- File names in chat are clickable and open in the editor at the line.

### Saving work (IPS pushProject; `server/src/services/github-app.service.js`)
- "Push to GitHub" button → modal "What did you change?" + suggestion chips + "Push changes" (`PushToGithubModal.tsx`). Agent can push the same way.
- Always pushes to a `classgrid/YYYYMMDD-HHMM` branch and opens or updates a pull request: "It is not merged: the repo owner reviews and merges it on GitHub." Never to main (only override: server setting `GITHUB_DIRECT_PUSH=1`).
- Commit author: Classgrid AI `<agent@classgrid.in>` (classgrid-agent) with the user as `Co-authored-by`, via the Classgrid GitHub app token.
- If someone else pushed to the branch, it rebases onto their work; if the same lines changed it stops ("Nothing was lost.").
- Auto-backup: 5 minutes after the editor closes, unpushed work goes to a `classgrid-backup-…` branch (toast on next open). A no-repo project is auto-saved to a new private repo.

### Review (PTS, PMP, IPS checkpoints)
- Every answer is snapshotted. Under it: "N files changed +x -y" box with "Review" and "Undo".
- "Review changes" modal: per-file diffs, "Reject" per file, "Reject all", "Accept all".
- Undo confirm: "Put the project back to how it was before this answer? Changes made after it, by you or the AI, are undone too." Box then shows "Changes undone" / "Changes rejected" / "· kept".

### Deploy
- No deploy button in Project Mode.
- From chat, the Vercel connector (if connected) can create a project, add env variables and deploy a branch (including the `classgrid/` PR branch) as preview or production.
- Classgrid Cloud (`*.sites.classgrid.in`) is OFF in Project Mode chats (`server/src/controllers/ai-chat.controller.js` ~line 4478); Agent mode only.

## 2. Solutions

**Professional developers**
- Fix a failing build and open a PR you can review (background build, editor errors, edits, PR push).
- "Explain how auth works in this repo" in minutes (parallel helpers, search by meaning).
- Refactor across files with per-file diffs and one-click Undo.
- The agent follows your repo's rules (AGENTS.md / CLAUDE.md / .cursorrules).
- Start the dev server and have the agent check the endpoint (background command + curl).

**Students learning to code**
- Ask about the line you selected (selection/cursor context).
- Understand red squiggles: the agent sees your errors and fixes them.
- Run Python or Node in the browser, nothing to install (terminal, ▷ Run).
- Build a real GitHub portfolio as you go (create repo, PRs with you as co-author).

**Founders and no-code builders**
- "Build me a landing page/app" from an empty project, no repo needed ("Ask Agent to create repo").
- Plan first, approve, then build (plan files + plan card).
- Ship a preview on your own Vercel (Vercel connector deploy of the PR branch; domain on the card).
- Keep API keys out of your frontend (secret-key rule + Vercel env variables).

**Agencies building client sites**
- One project per client repo, each with logo, chats and live Vercel link.
- Every change arrives as a PR for the client's repo owner to merge.
- Create repos straight in the client's GitHub org.
- Never lose work: auto-backup branches.

**Teams reviewing AI code**
- Nothing lands on main (PR-only).
- Clear authorship: Classgrid AI author, developer co-author.
- Accept or reject AI work file by file before pushing.
- Safe merges when teammates pushed first (rebase, stop on conflict).

## 3. Best visuals
1. Editor split view: VS Code left, Agent panel right with "Explored 3 files, 1 search", "Edited App.tsx +26 -4", a Terminal IN/OUT step.
2. "Review changes" modal with coloured diff + Reject / Reject all / Accept all.
3. "N files changed" box with Review / Undo.
4. Projects page cards: logo, last commit, branch, Vercel domain.
5. Loading screen: green/orange smoke with the word-by-word lines.
6. A GitHub PR from a `classgrid/…` branch with co-author avatars (mock).
7. "Sending 3 helpers" with live reports.
8. "Connect GitHub to use Project Mode" card (onboarding strip).

## 4. Limits / do not claim
- No live preview URL for dev servers (port forwarding removed); only Vercel previews.
- No deploy button in Project Mode; no Classgrid Cloud hosting there.
- GitHub account required; Classgrid app must be installed on each repo (when configured on the server).
- Shallow download: latest commit of the default branch only; you can't pick a branch.
- Push modal shows a "main" badge but pushes to a `classgrid/` branch + PR — don't use that badge as proof.
- "Accept all" only marks the answer as kept in the browser; it commits nothing.
- Review/Undo is lost after a fresh download (code removed 5 minutes after the editor closes).
- Capacity: 1.25 GB RAM + 1 CPU per box; only 5 boxes at once ("Project Mode is busy right now. Try again in a few minutes."); ~3 GB per-user disk soft limit; background jobs 30 min max, 3 per chat; helpers 4 min each; files over 2 MB can't be opened by the agent; search by meaning covers only part of very large projects.
- Languages: only Python 3.13 and Node 20 / TypeScript confirmed (Chromium + Playwright included). Don't claim Go, Rust, Java.
- Packages: only npm auto-install, with `--ignore-scripts`, skipped when the server is low on memory.
- No extension marketplace.
- Webhook CI results (Actions/check runs) are stored but not shown in the UI — don't claim CI status.
- Page lives under a "superadmin" folder but `/c/project` is open to every logged-in user.
- "Never on our servers" means code is only kept temporarily in the sandbox while you work, then removed.
- Raw terminal access for the agent (`execute_terminal_command`) is staff-only; users' agent runs commands via `run_code`.
