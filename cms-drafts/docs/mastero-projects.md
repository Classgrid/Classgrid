---
title: Mastero Projects
slug: mastero
description: Put a folder project from your computer on GitHub in one step, so the same project works on your computer and in the Classgrid cloud.
lastUpdated: November 7, 2026
---

# Mastero Projects

Mastero puts a project from your computer on GitHub in one step. Classgrid makes the repo, pushes your code and links the project, and from then on the same project works on your computer and in the Classgrid cloud. GitHub is the master copy that keeps the two in step.

## What you need

| You need | Why |
|---|---|
| The Classgrid desktop app | Mastero starts from a folder on your computer |
| A folder project with no GitHub repo yet | A project that already has a repo is already on GitHub |
| GitHub connected | The repo is made in your GitHub account. See [Connect GitHub](/docs/connect-github) |
| Git installed on your computer | Your code is pushed from your computer. Get it from [git-scm.com](https://git-scm.com) |

## Make a Mastero project

1. Open your folder project in **Studio**.
2. Open the **Project** tab and click **Mastero**.
3. Check the GitHub account at the top. It shows your name and **Connected**. If it says "GitHub isn't connected", click **Connect GitHub**, finish signing in, then come back to the app.
4. Check the **Repo name**. It starts as your folder's name, shown the way GitHub shows it: `your-login / name`. Change it if you like.
5. Pick **Private** (only you can see it) or **Public** (anyone can see it). Private is picked by default.
6. Click **Make repo and push**.

Classgrid then does three steps, ticked off as they finish:

| Step | What happens |
|---|---|
| Making the repo | A new repo is made in your GitHub account with the name you picked |
| Pushing your code | Your folder's code is pushed to it from your computer |
| Linking the project | The project is linked to the repo, keeping its name, logo and chats |

When it's done you'll see **"{name} is on GitHub"** with the repo link. Click the copy button to copy the link, or **Open on GitHub** to see it.

A big folder can take a minute to push.

### What is left out of GitHub

If your folder has no `.gitignore` file, Mastero adds one before the first push, so these never go to GitHub:

- Installed packages: `node_modules/`, `.venv/`, `venv/`, `__pycache__/`
- Secrets: `.env` and `.env.*` (an `.env.example` file still goes)
- Build output: `dist/`, `build/`, `.next/`, `out/`, `.vercel/`
- Logs and system files: `*.log`, `.DS_Store`, `Thumbs.db`

If your folder already has a `.gitignore`, Mastero uses yours as it is.

### If your project is already on GitHub

If the folder was already pushed to a GitHub repo, or the project is already linked to one, Mastero doesn't make a new repo and doesn't push anything. The window shows the repo it keeps (and the folder's Vercel project, if it was deployed with Vercel), and the button says **Make Mastero project**.

If that repo is already another one of your projects, Mastero stops and tells you to open that project instead, so the same code is never two projects.

After you click the button, the **Mastero** button leaves the Project tab: the rest happens in the chat.

## Finish in the chat

Right after that, the agent takes over in the chat. It shows one **Mastero card** at a time, on top of the chat box:

1. **Name**: the agent suggests a name for the project in Classgrid. Change it if you like and click **Save**.
2. **Photo** (optional): click **Upload photo**, pick a picture and crop it. It becomes the project's logo. Or click **Skip**.
3. **Finish**: click **Finish** to make it a Mastero project.

Each card saves your answer straight away. Click **Cancel** on any card to stop there; the agent asks you once if you want to try again.

Your project becomes a Mastero project only when you click **Finish**. Before that, nothing changes: no Push button, no Mastero section, no automatic pushes. After **Finish**, the agent explains in a few simple lines what changed, with links to these docs.

## Where Mastero projects show

| Place | What you see |
|---|---|
| Sidebar | A **Mastero projects** section under **Pinned**, in the desktop app and on chat.classgrid.in, with each project's chats (after **Finish**) |
| Projects page | **Mastero projects** first, then **Cloud projects** |

## Continue a chat online

After **Finish**, the **Project** tab in the desktop app shows **Continue online** with a QR code for the chat you have open.

- **Scan the QR code** with your phone to open that chat on chat.classgrid.in.
- Or click **copy link** (or the QR code) to see it bigger, then copy the link to open it on another computer.

A chat from the desktop app stays only in the app until you do one of these yourself. Once you open or copy it, it shows on chat.classgrid.in too, in its project.

## Pushing changes

GitHub is the master copy, so a Mastero project's changes go to GitHub.

| Setting | What happens |
|---|---|
| **Push after every change** on (default) | After every agent answer that changes files, the changes are pushed to GitHub by themselves, without asking |
| **Push after every change** off | The agent asks you yes or no before it pushes |

Change it in **Settings → Mastero**.

You can also push yourself: in the **Project** tab, click **Push**, type what changed, and click **Push**. Your commit message is used exactly as you typed it.

Where the push goes:

- **From your computer:** to your folder's own branch (`main` for a new repo).
- **From the cloud:** to a `classgrid/` branch with a pull request that you merge on GitHub. See [Pull requests and backups](/docs/pull-requests-and-backups). Your computer gets those changes the next time you pull.

## Undo a change

| When | How |
|---|---|
| The project is still open | Use **Review** or **Undo** in the box under the agent's answer. See [Review and undo](/docs/review-and-undo) |
| The change is already on GitHub | Ask the agent to undo it. It uses `git revert`: a new commit that takes the change back, pushed like any other |

GitHub's history is never rewritten: no change is ever deleted from it, so you can always see what was changed and what was taken back.

## Where your code runs

| Place | What works |
|---|---|
| Your computer | Everything: run, build and test any kind of project |
| The Classgrid cloud | Node.js (Node 20 / TypeScript) and Python (3.13) projects run here. Other kinds (Go, Flutter, Java, C++ and more) can be read, written and pushed in the cloud, and run on your computer |

To use a Mastero project in the cloud (on chat.classgrid.in or your phone), install the **Classgrid GitHub app** on its repo: on the **Projects** page, click **Install app**. See [Connect GitHub](/docs/connect-github).

## Your code in the cloud

The cloud keeps your code only while you use it:

- It leaves the server **5 minutes** after the code editor closes, or after **30 minutes** without use in Studio.
- Anything not pushed yet is saved to a `classgrid-backup-…` branch on GitHub first.
- The next time you open the project in the cloud, the newest code downloads fresh from GitHub.

## Go live

A Mastero project can go live on your own Vercel account. Ask the agent, for example "Deploy this to Vercel." See [Deploy with Vercel](/docs/deploy-with-vercel). Pushing to GitHub never deploys by itself.

## FAQ

**Can I use Mastero on chat.classgrid.in?**
No. Mastero starts from a folder on your computer, so it's in the desktop app. Once it's done, the project works on chat.classgrid.in too.

**What if the repo name is taken?**
You'll see "You already have a repo called … on GitHub. Pick another name." Change the name and try again.

**What happens to the chats I had before?**
They stay in the project. Chats you had in the desktop app before Mastero stay in the desktop app.

**Does Classgrid keep my code?**
No. Your code is on your computer and on GitHub. The cloud keeps a working copy only while you use it.

**Can I stop the automatic pushes?**
Yes. Turn off **Push after every change** in **Settings → Mastero**. The agent then asks before every push.

## Learn more

| Page | What it covers |
|---|---|
| [Projects in the cloud and on your computer](/docs/projects-cloud-and-computer) | How projects live in both places |
| [Connect GitHub](/docs/connect-github) | Connect your account and install the Classgrid app |
| [Pull requests and backups](/docs/pull-requests-and-backups) | Cloud pushes, pull requests and backups |
| [Review and undo](/docs/review-and-undo) | Check and undo the agent's changes |
| [Deploy with Vercel](/docs/deploy-with-vercel) | Put your project live |
