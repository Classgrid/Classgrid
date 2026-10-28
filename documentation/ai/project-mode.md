---
title: Project Mode
slug: project-mode
category: project-mode
order: 1
description: A full code editor in your browser, linked to your GitHub, with the Classgrid agent built in.
---

Project Mode (Classgrid Code) is a real code editor that runs in your browser, with the Classgrid agent working beside you. You open a GitHub repo, ask the agent to build, fix or explain things, review every change it makes, and send the work back to GitHub as a pull request.

## What Project Mode is for

- Building a website or an app from an empty project, with the agent writing the code.
- Fixing a bug or a failing build in an existing repo.
- Understanding how an unfamiliar codebase works.
- Making changes across many files, then checking each file before you keep it.
- Shipping a preview of your site on your own Vercel account.

## Switch to Project Mode

1. Open chat.classgrid.in and sign in.
2. In the sidebar, click **Switch Mode**.
3. Choose **Project**. (Choose **Agent** to go back to the normal chat.)

The first time, you'll be asked to connect GitHub. See [Connect GitHub](/docs/connect-github).

<callout type="info">

**Your code stays on GitHub.** Project Mode says: *"Your code is only kept on GitHub, never on our servers."* Opening a project downloads the latest code fresh. Classgrid keeps a working copy only while you work, then removes it.

</callout>

## The Projects page

The **Projects** page lists your projects. Its subtitle says: *"Your code stays on GitHub. Opening a project downloads it fresh."*

Each project card shows:

| On the card | What it means |
|---|---|
| Logo and name | Set when you create or edit the project |
| Last commit message | The newest commit on the repo |
| Repo and branch | Which GitHub repo the project is linked to |
| Time ago | When the last commit was made |
| Vercel project and domain | Shown if you connected Vercel |

Card actions are **Open**, **Edit** and **Delete**. Deleting only removes the project from Classgrid: *"Its code stays on GitHub. Only the project here is deleted."*

## Opening a project

When you click **Open**, you'll see a short loading screen: *"Downloading the latest code from GitHub"*, then *"Starting the editor"*, then *"Almost ready"*. If you reload the page, it shows *"Reconnecting to your project"*.

At busy times you may see: *"Project Mode is busy right now. Try again in a few minutes."*

## The editor

The editor is VS Code in your browser, with Classgrid branding.

| Feature | What you get |
|---|---|
| **Terminal** | A built-in terminal for running commands |
| **Auto-save** | Your edits are saved as you type |
| **Formatting and error checks** | Prettier and ESLint are built in |
| **▷ Run** | Run the open file with one click |
| **Packages** | npm packages install by themselves when you open a project. You'll see *"Installing the project's packages in the background…"* |
| **Agent panel** | Click **Agent** in the top bar to open the agent panel. Drag its edge to resize it. |

Confirmed languages are **Python 3.13** and **Node 20 / TypeScript**, with a browser (Chromium and Playwright) available for testing. There is no extension store.

## Moving a chat into a project

Started something in Agent mode that turned into a coding job? Open the chat's menu, choose **Move to project**, then pick a project (or create a new one): *"The chat moves into this project and continues in Project Mode."* Each project keeps its own chats.

## Learn more

| Page | What it covers |
|---|---|
| [Connect GitHub](/docs/connect-github) | Connect your account, install the Classgrid app, link a repo or start without one |
| [Working with the agent](/docs/working-with-the-agent) | What the agent sees, helpers, background commands, rule files and plans |
| [Review and undo](/docs/review-and-undo) | Check each file the agent changed, reject or undo |
| [Pull requests and backups](/docs/pull-requests-and-backups) | How "Push to GitHub" works and how your work is backed up |
| [Deploy with Vercel](/docs/deploy-with-vercel) | Put your project live on Vercel through the agent |

## FAQ

<details>
<summary>Do I need a GitHub account?</summary>

Yes. Project Mode needs your GitHub account, because your code is kept on GitHub.

</details>

<details>
<summary>Can I see my site running live inside Project Mode?</summary>

No. There is no live preview link for a running dev server. Use a Vercel preview instead. See [Deploy with Vercel](/docs/deploy-with-vercel).

</details>

<details>
<summary>Can I install VS Code extensions?</summary>

No. The editor comes with its own set of tools and has no extension store.

</details>
