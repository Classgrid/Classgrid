---
title: Studio Tabs
slug: studio-tabs
category: studio-mode
order: 2
description: The six tabs in the Studio pane: Browser, Review, Files, Terminal, Project and Screenshots, and how to drag a file into the chat.
---

The pane on the right of Studio Mode has six tabs. Each one shows a different part of the agent's work.

| Tab | What it shows |
|---|---|
| **Browser** | A live browser that you and the agent share |
| **Review** | The changes the agent made to your files, to keep or reject |
| **Files** | Your project's files, updated live as the agent writes them |
| **Terminal** | Every command the agent runs in this chat |
| **Project** | Your project's GitHub, Vercel and commit details |
| **Screenshots** | Every screenshot the agent took in this chat |

## Open, close and switch tabs

- Click **+** (**New tab**) to open the tab launcher. Type in *"Search tabs: browser, files, terminal, project…"* and press **Enter** to open the first match.
- Click the **X** on a tab to close it. If you close every tab, the launcher shows.
- Review, Files, Terminal, Project and Screenshots open once; opening one again switches to it.
- You can open more than one Browser tab, but they all show the same live browser.

## Browser

A real browser running for you in the cloud. You can watch the agent use it, and click, scroll and type in it yourself. Full details: [The live browser](/docs/studio-live-browser).

## Review

Shows the files the agent changed in each answer, with what was added and removed. You can **Reject** a file, **Reject all**, or **Accept all**. Full details: [Review changes](/docs/studio-review-changes).

## Files

Your project's files, read-only.

| Part | What it does |
|---|---|
| **Workspace** bar | Shows the project name and branch. While the agent writes, you'll see *"Writing [file] +N"* |
| **File tree** | Folders first. Click a folder to open it, click a file to view it |
| **Copy file** | Copies the open file's text |
| **Hide file tree** / **Show file tree** | Gives the code more room |
| **Refresh** | Loads the files again |
| **Path bar** | Click any part of the path to see that folder and open another file |

When the agent writes or edits a file, the tree updates and that file opens by itself. A file being written shows **Writing…**, and a file that just changed flashes blue (**Just changed**).

The code view has colours and line numbers. Pictures show as images; click to zoom. Very large files show only the first 1 MB.

<callout type="info">

**You can't edit here.** The Files tab is for looking. Ask the agent to make a change, or open the chat in Project Mode to edit by hand.

</callout>

If no project is picked, it says: *"Pick a project above the chat input to see its files here."*

### Drag a file into the chat

You can point the agent at a file without typing its path:

1. In the Files tab, drag a file from the tree, or drag a file's tab.
2. Drop it on the chat box.
3. It shows as a small chip with the file name above your message. Click its **X** to remove it.
4. Send your message. The agent knows exactly which file you mean.

Folders can't be dragged.

### File names in the agent's answers

When the agent mentions a file, like `src/App.tsx` or `app.ts:25`, it shows as a grey chip. Click it to open that file in the Files tab, at that line if one is given. The **Edited** and **Created** steps in an answer open the file the same way.

## Terminal

Shows every command the agent runs in this chat, with its output: `$ command`, a spinner while it runs, then the result. Errors show in red. Code the agent runs shows as `[language] › [first line]`.

- **Running** with a blue dot means a command is still going.
- **Clear** empties the list.
- It follows new output unless you scroll up.

The terminal is read-only: you can't type commands. Ask the agent instead. When it's empty: *"Commands run by the agent in this chat appear here."*

## Project

A summary of the open project, *"Shared with Project Mode"*.

| Card | What it shows |
|---|---|
| **GitHub** | **Connected**, **Not connected** or **No repo**. The repo link, the branch the agent works on, and its open pull request |
| **Vercel** | **Connected** or **Not connected**, with your site's domain and Vercel project |
| **Last commit** | The newest commit's message and when it was made |
| **History** | The list of commits; click one to open it on GitHub |

**Open in Project Mode** opens the project in the code editor. **Refresh** loads the details again.

## Screenshots

Every screenshot the agent took in the browser during this chat, newest first. New ones appear as they're taken.

Click a screenshot to view it large:

- **Older** and **Newer** move between screenshots (or use **←** and **→**).
- **Download** saves it.
- **Open the page** opens the website it shows.
- **Esc** closes the viewer.

Full page screenshots you take from the Browser tab are saved here too.

When it's empty: *"Screenshots the agent takes in the browser are saved here."*

## FAQ

<details>
<summary>Why can't I type in the terminal?</summary>

The Terminal tab shows the agent's commands only. Ask the agent to run a command, for example "Run the tests."

</details>

<details>
<summary>The Files tab says "No project picked".</summary>

Start a new chat and pick a project above the chat box. See [Studio Mode](/docs/studio-mode).

</details>
