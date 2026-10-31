---
title: Studio Mode
slug: studio-mode
category: studio-mode
order: 1
description: A full agentic workspace. Chat with the agent on the left and watch it work on the right, in a live browser, your files, a terminal and more.
---

Studio Mode is a **full agentic workspace**. You tell the agent what you need, and it does the work: it browses websites, writes and changes code, runs commands and checks the result, all by itself, with no code editor needed.

You chat with the agent on the left. On the right, a pane with tabs shows everything it's doing: a **live browser** it can use for you, your project's **files**, the **terminal**, **screenshots** and the changes to **review**.

It uses the same projects as Project Mode, so you can start a job in one mode and finish it in the other.

## What Studio Mode is for

- Letting the agent use websites for you: open pages, click, fill in forms, read and compare.
- Checking how your site looks and works: the agent can open your running app and test it in the browser.
- Building or fixing a project by chatting, while you watch every file and command.
- Reviewing a website's design and UI, not just its text.

## Switch to Studio Mode

1. Open chat.classgrid.in and sign in.
2. Click your name at the top of the sidebar. A menu opens under **Switch Mode**.
3. Choose **Studio**. (Choose **Agent** or **Project** to switch back.)

Switching between **Project** and **Studio** keeps the chat you have open.

<callout type="info">

**Studio Mode is for everyone.** Any signed-in Classgrid AI user can use it.

</callout>

## The screen

| Part | Where | What it does |
|---|---|---|
| **Sidebar** | Left | New Chat, Search, Pinned Chats and Recent Chats. Drag its edge to make it wider; double-click the edge to reset it |
| **Chat** | Middle | Talk to the agent, as in Agent mode |
| **Pane** | Right | Tabs that show the browser, files, terminal and more |

The pane starts hidden. Click **Show pane** at the top right of the chat to open it. It also opens by itself:

- on the **Browser** tab, when the agent starts using the browser;
- on the **Files** tab, when you click a file name in the chat.

### Resize, maximise and hide the pane

- Drag the line between the chat and the pane to resize it.
- **Maximize pane** makes the pane fill the screen and hides the chat. **Restore pane** brings the chat back.
- **Hide pane** closes it.

When the pane is narrow, tabs show only their icons. Hover over an icon to see its name.

See [Studio tabs](/docs/studio-tabs) for every tab.

## Pick a project

A project gives the agent your code to work on. Above the chat box on a new chat, click the project button (it shows the project name, or **No project**) and choose one:

- **Search projects** to find one, under **Recent**.
- **New project** to make one: give it a **Name**, then choose **Start without a repo** or **Link a GitHub repo**.
- Hover over a project to **Rename** it, **Link a repo** or **Change repo**, or **Delete** it.
- **No project** to chat without one.

Projects are shared: *"Shared with Project Mode and Studio Mode."* The project you pick is also the open project in Project Mode.

When you pick a project, Classgrid gets its code ready. You'll see *"Downloading [name] from GitHub…"* or *"Getting [name] ready…"* at the top of the chat.

<callout type="info">

**You need GitHub connected to open a project.** Set up GitHub and the Classgrid app in Project Mode first. If something is missing, Studio shows *"GitHub is not connected. Set it up in Project Mode first, then come back."* or *"The Classgrid app is not installed on [repo]. Set it up in Project Mode first."*, with a **Go to Project Mode** button. See [Connect GitHub](/docs/connect-github).

</callout>

You can use the browser without a project. Files, the terminal, your dev server and Review need one.

## What the agent does in Studio

- It makes code changes itself. You don't need to edit files; if you want to edit by hand, switch to Project Mode.
- It uses the live browser to look at websites, not terminal commands.
- It asks your permission before risky steps, based on the mode you choose. See [Permissions](/docs/studio-permissions).
- For long jobs it can send helpers that work at the same time. See [Helpers and the scratchpad](/docs/studio-browser-helpers).

## Chat options

When the pane is hidden, three buttons sit at the top right of a chat:

| Button | What it does |
|---|---|
| **⋮ Chat options** | **Rename**, **Pin**/**Unpin**, **Archive**, **Archived chats**, **Copy** (link, chat or chat ID) and **Delete** |
| **Open** | Opens this chat in Project Mode, with its project |
| **Overview** | Jumps to the **Review**, **Files** or **Terminal** tab, and shows how many **Background commands** are running |

**Archived chats** are kept, not deleted: *"This project's archived chats. They are not deleted."* Click **Unarchive** to bring one back.

## Save your work to GitHub

If your project has a repo, a **Push** button sits in the pane's tab bar. Click it, describe what changed under **What did you change?**, and click **Push changes**. Your work goes to GitHub as a pull request. See [Pull requests and backups](/docs/pull-requests-and-backups).

If you leave Studio for about 30 minutes, Classgrid removes the working copy of your code. Anything you didn't push is first saved on GitHub in a backup branch, and you'll see: *"Your unpushed work from last time was saved on GitHub, in the branch [branch]."*

## Learn more

| Page | What it covers |
|---|---|
| [Studio tabs](/docs/studio-tabs) | Browser, Review, Files, Terminal, Project and Screenshots |
| [The live browser](/docs/studio-live-browser) | What the agent can do in the browser, and what you can do |
| [Permissions](/docs/studio-permissions) | The shield, the four modes and the permission card |
| [Review changes](/docs/studio-review-changes) | Check, keep or reject what the agent changed |
| [Helpers and the scratchpad](/docs/studio-browser-helpers) | How the agent splits up big browser jobs |

## FAQ

<details>
<summary>What's the difference between Studio Mode and Project Mode?</summary>

Project Mode is a full code editor (VS Code) with the agent beside it. Studio Mode has no code editor: the agent does the work and you watch it in the browser, files and terminal tabs. Both use the same projects and chats.

</details>

<details>
<summary>Can I edit files myself in Studio?</summary>

No. The Files tab is read-only. Ask the agent to make the change, or click **Open** to continue the chat in Project Mode and edit there.

</details>

<details>
<summary>Do I need GitHub?</summary>

To open a project, yes. To chat and use the live browser without a project, no.

</details>
