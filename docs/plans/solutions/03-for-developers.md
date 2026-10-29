# Solution page: For Developers (Project Mode)

- **URL:** `/solutions/for-developers` (new)
- **Replaces:** `/solutions/for-engineering` (301 to here). The header item "Project Mode" also points here.
- **Who it's for:** developers, students learning to code, founders and agencies building sites and apps
- **Goal:** connect GitHub and open the first project in Project Mode
- **Sanity:** `solutionPage` slug `for-developers`, `category: role`, label "For developers"

---

## Hero

- **Eyebrow:** Project Mode
- **Headline:** Code with an agent. Ship by pull request.
- **One line:** A full code editor in your browser. The agent edits your files, runs your build and opens a pull request on your GitHub.
- **Buttons:** "Open Project Mode" → `https://chat.classgrid.in/c/project` (asks you to log in first) · "Book a demo" → `/demo`

---

## Interactive demo (custom design)

A wide `EditorMock` on the grey panel: file tree (left), code (middle), Agent panel (right), and the "Agent" button in the top bar. Three chips: **Fix the build** · **Explain the repo** · **New landing page**.

**Chip 1: Fix the build** (plays first)
- Agent panel, user types: "The build is failing. Fix it and open a PR."
- Step lines, one by one (the first four use the app's real step labels; "Build passed" is mock text):
  - "Started in background `npm run build`"
  - "Explored 3 files, 1 search"
  - "Edited src/App.tsx +26 -4"
  - "0 problems in the editor"
  - "Build passed"
- Under the answer: the box "2 files changed +31 -6" with buttons "Review" · "Undo"
- In the code pane, the changed lines flash green/red.
- **Floating `PullRequestCard`** (GitHub logo): "Pull request opened", branch `classgrid/20261027-1430` → `main`, "Waiting for review on GitHub", two avatars "Classgrid AI" + "you" (co-author).

**Chip 2: Explain the repo**
- User: "Explain how auth works in this repo"
- Steps: "Sending 3 helpers" → three helper rows each finishing with a tick ("Read server/auth", "Read middleware", "Read client login") → "Searched by meaning"
- Result: 4 short lines with clickable file names like `server/src/auth/session.ts:42` (underline on hover; "opens in the editor")

**Chip 3: New landing page** (empty project, no repo)
- Loading line: "You can ask the Agent to build a website or an app"
- User: "Build a landing page for my bakery"
- Plan card (the app's plan card) with "View Plan" → user clicks **Approve** (interactive)
- Steps: "Created index.html" · "Created styles.css" · "Created 4 more files"
- No-repo banner: "This project has no GitHub repo yet." + button "Ask Agent to create repo". **Click it**: step "Created private repo bakery-site". Floating card: "Pull request opened".

---

## Feature blocks

### 1. A real editor in your browser
- **Text:** Full VS Code in a browser tab, with a terminal, a Run button, auto-save, Prettier and ESLint. Your packages install on their own when you open a project. Nothing to set up on your computer.
- **Facts:** OpenVSCode Server ("Classgrid Code"), built-in terminal, Code Runner (▷ Run), auto-save, Prettier, ESLint; npm packages installed on open ("Installing the project's packages in the background…"); your own private editor box; Python 3.13 and Node 20 / TypeScript.
- **Mock:** text left, grey panel. `EditorMock` with the terminal open (`npm run dev` output). Floating toast card: "Installing the project's packages in the background…".

### 2. It knows your code
- **Text:** The agent sees the file you have open, what you selected and the red squiggles. It follows your repo's rules files and can send helpers to read different parts of the code at the same time.
- **Facts:** context = open file, cursor, selection, open tabs, editor errors, your own edits; reads `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md`; up to 5 read-only helpers; search by meaning; background commands (dev server, tests) that the agent can check with `curl localhost:3000`.
- **Mock:** text right, teal panel. Agent panel "Sending 3 helpers" with live rows. Floating card: a selected code block + user bubble "Why is this undefined?".

### 3. Review every change
- **Text:** After each answer you see exactly what changed. Look at the diff file by file, reject what you don't want, or undo the whole answer in one click.
- **Facts:** "N files changed +x -y" box with "Review" / "Undo"; "Review changes" modal with per-file diffs, "Reject", "Reject all", "Accept all"; Undo confirm text: "Put the project back to how it was before this answer? Changes made after it, by you or the AI, are undone too."
- **Mock:** text left, grey panel. `ReviewChangesMock`: 2 files, coloured diff, buttons "Reject" / "Reject all" / "Accept all". Floating card: "Changes undone".

### 4. Pull requests only, previews on your Vercel
- **Text:** Nothing goes straight to main. Every push is a new branch and a pull request you review and merge on GitHub. Connect Vercel and the agent can deploy that branch as a preview on your own account.
- **Facts:** "Push to GitHub" → "What did you change?" → "Push changes"; always pushes to `classgrid/YYYYMMDD-HHMM` + opens or updates a PR ("It is not merged: the repo owner reviews and merges it on GitHub."); author Classgrid AI with you as co-author; rebases onto teammates' work and stops on a clash ("Nothing was lost."); unpushed work auto-saved to a `classgrid-backup-…` branch; Vercel plugin: create project, add env variables, deploy a branch as preview or production.
- **Mock:** text right, teal panel. `PullRequestCard` (branch → main, co-author avatars). Floating Vercel card: "Preview ready" + domain `bakery-site-git-classgrid-….vercel.app` (made-up).

---

## Plugins strip

| Plugin | One line |
|---|---|
| GitHub | Repos, files, issues, pull requests and code search |
| Vercel | Create projects, add env variables, deploy a branch |
| Supabase | List projects, run SQL, see storage buckets |
| Sanity CMS | Query, create and update documents |
| Slack | Read and send messages, create canvases |
| Notion | Search, create and update pages |

Link: "See all plugins" → `/plugins`.

---

## Example tasks grid

Exact wording from the app (Project Mode loading lines, home lines, plugin demo prompts):
- "You can ask it to write, fix or explain code"
- "You can ask it to make a GitHub repo and push your code"
- "Debug an error in your code."
- "Explain how auth works in this repo"
- "Build a landing page for your idea."
- "Write SQL queries from plain English."
- "Write Python and run it for you."
- "List all my Supabase projects"

---

## FAQ

1. **Do I need GitHub?** Yes. "Project Mode needs your GitHub account." You also install the Classgrid GitHub app on the repos you work on.
2. **Where is my code kept?** On GitHub. While you work, a copy sits in your private editor box. It's removed after you close the editor, and anything not pushed is saved to a backup branch first.
3. **Will it push to main?** No. Every change goes to a `classgrid/` branch and a pull request. You review and merge it on GitHub.
4. **Can I see my app running?** There's no live preview link from the editor. Connect Vercel and the agent can deploy your branch as a preview on your Vercel account.
5. **Which languages work?** Python and Node.js / TypeScript, with npm packages installed for you.
6. **Can it host a simple site for me?** In Agent mode (not Project Mode) the agent can publish a site to `yourname.sites.classgrid.in`. In Project Mode, use Vercel.
- *Hold (add only when MCP is switched on):* "Can I use Classgrid from Claude, Cursor or ChatGPT?"

---

## Images to capture (real app, light + dark)

1. **"Connect GitHub to use Project Mode"** card (onboarding).
2. **Projects page** with 2–3 project cards (logo, last commit, branch, Vercel domain). Blur: real repo names, GitHub avatar/email if not the test account.
3. **Loading screen** with the lines "Downloading the latest code from GitHub" → "Starting the editor".
4. **Editor + Agent panel** mid-task, showing "Explored … files", "Edited … +N -M" and a terminal step.
5. **"Review changes" modal** with a coloured diff.
6. **"N files changed" box** with Review / Undo.
7. **A real pull request on GitHub** from a `classgrid/…` branch with the co-author line (use a public test repo).
- Blur: tokens, `.env` values, private repo names, emails in commits other than the test account.
- Don't capture the push modal's "main" badge as proof of anything.

## Custom design needed (coded mocks)

- `EditorMock` (file tree + code + Agent panel + terminal), `ReviewChangesMock`, "N files changed" box, `PullRequestCard`, Vercel "Preview ready" card, "Sending 3 helpers" rows, plan card with Approve.

## SEO

- **Title:** AI coding agent with GitHub pull requests | Classgrid Project Mode
- **Description:** Code in a browser editor with an AI agent that edits files, runs your build and opens pull requests on your GitHub. Review every change. Free to start.

## Do not claim (this page)

- A live preview link for the dev server, or a deploy button in Project Mode. No `sites.classgrid.in` from Project Mode.
- Picking a branch when you open a project (it opens the latest commit of the default branch).
- Go, Rust, Java or other languages. An extension marketplace. CI / GitHub Actions status in the app.
- Vercel rollback or build logs.
- "Accept all" saving or committing anything. Review/Undo surviving a fresh download.
- "Never on our servers." Say "kept on GitHub; a temporary copy while you work".
- Unlimited or always-free capacity, machine sizes, big-file handling.
- MCP (hold). Any price or credit number.

---

## What Project Mode can do, in plain English

Project Mode is the coding side of Classgrid AI. You switch from "Agent" to "Project" in the app,
and you get a full code editor right inside your browser, with an AI agent sitting next to it.
It is the same kind of editor that professional developers use every day (VS Code), so you do not
need to install anything on your computer. You open a tab and start building.

To use it you connect your GitHub account, because your code lives on GitHub, not with us. You
install the small Classgrid app on the GitHub repos you want to work on, and then you can open any
of your projects in one click. If you do not have a project yet, you can start an empty one and
ask the agent to build something from nothing, like a website or a small app. When you are ready,
the agent can even create a new GitHub repo for you and save the work there.

The editor has everything you expect. There is a file list, a code area, a terminal where you can
type commands, a Run button, auto-save, and tools that tidy your code and point out mistakes. When
you open a project, it installs the project's packages by itself in the background, so you can
start working straight away. Python and Node.js / TypeScript work out of the box.

The agent can really work on your code, not just give advice. You can ask it to fix a bug, add a
feature, explain how something works, or build a new page. It reads your files, searches through
the code, makes the changes, runs your build or tests, and checks for errors after every change.
For big questions, like "how does login work in this project?", it can send up to five small
helpers to read different parts of the code at the same time, so you get an answer much faster.

It understands what you are looking at. It knows which file you have open, which lines you have
selected and which red error lines the editor is showing. So you can simply select a piece of code
and ask "why is this not working?" If your project has a rules file for AI tools, the agent reads
it and follows your rules. For bigger jobs it can write a plan first, show it to you, and only start
building after you approve it.

You are always in control of every change. After each answer you see a small box that says how
many files changed and how many lines were added or removed. You can open "Review" to see every
change file by file, in colour, and reject the parts you do not want. Or you can press "Undo" and
the whole project goes back to exactly how it was before that answer.

Nothing ever goes straight into your main code. When you save your work, by pressing "Push to
GitHub" or by asking the agent, it goes to a new branch and opens a pull request on GitHub. You or
the repo owner look at it and decide to merge it. The work is signed by Classgrid AI with you as
co-author, so your name is on it too. If a teammate changed the same branch in the meantime, it
joins their work with yours carefully, and if the same lines clash it stops instead of overwriting
anything. If you close the editor and forget to save, your unsaved work is backed up to a separate
branch on GitHub, so nothing is lost.

You can put your work online through Vercel. If you connect your Vercel account, the agent can
create the Vercel project, add the secret settings your app needs, and deploy your branch as a
preview link or as the live site, all on your own Vercel account. Your project cards in Classgrid
then show the live address next to the project.

Your projects stay organised. Each project has its own card with a logo, the last change, the
branch and the time, plus its own chats, so you can keep one project per client or per idea. You
can also move a normal chat into a project if a conversation turns into real coding work.

In short: Project Mode is a full code editor in your browser with an AI that edits, runs and fixes
your code, while you stay in charge. Every change can be reviewed or undone, everything is saved
safely as a pull request on your GitHub, and you can ship it to your own Vercel when it is ready.
