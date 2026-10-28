---
title: Working with the Agent
slug: working-with-the-agent
category: project-mode
order: 3
description: What the Project Mode agent can see and do, and how to get the best results from it.
---

In Project Mode, the agent works inside your project. It reads and searches your code, edits files, runs commands, and checks the editor's errors after each change. This page explains what it sees, what it can do, and how to guide it.

## What the agent sees

You don't have to copy and paste code into the chat. With each message, the agent knows:

| Context | What it means for you |
|---|---|
| **Open file and cursor** | Ask "What does this function do?" and it knows which one |
| **Selection** | Highlight some lines and ask "Why is this slow?" |
| **Open tabs** | It knows which files you're working with |
| **Editor errors** | It sees the red squiggles from TypeScript and ESLint |
| **Your own edits** | It sees what you changed since its last answer |

File names in the agent's replies are clickable. Click one to open that file in the editor at the right line.

## What the agent can do

### Read and search

The agent can list, open and search files by text or pattern. It can also **search by meaning**: ask *"Where do we handle login?"* and it finds the right code even if the word "login" isn't used. You'll see the step **Searched by meaning**. In very large projects, search by meaning may not cover every file, so the agent also uses normal search.

### Create and edit files

The agent creates new files (step **Created**) and makes targeted edits (step **Edited file +N -M**, showing lines added and removed). After every edit it gets the editor's errors back, for example *"2 problems in the editor"*, and fixes them.

### Run code

The agent can run Python, JavaScript or shell commands in your project folder. After each run, it lists the files that changed.

### Background commands

Long commands like a dev server, a build or a test suite run in the background, for example **Started in background `npm run dev`**. The agent can check on them while it keeps working, and test them from inside, for example by calling `localhost:3000` to see if a page loads.

<callout type="warning">

There is no live preview link to a running dev server. Only the agent can reach it from inside the project. To see your site in a browser, deploy a Vercel preview. See [Deploy with Vercel](/docs/deploy-with-vercel).

</callout>

### Helpers

For big questions, the agent can send **up to 5 helpers** to explore the codebase at the same time. You'll see **Sending N helpers** and their reports as they come back. Helpers only read code, they don't change it.

Try: *"Explain how payments work in this repo."*

### GitHub repo actions

The agent can create a repo (private by default, or inside an organisation), rename it, and change its description, website and visibility. It can also rename the project. See [Connect GitHub](/docs/connect-github).

## Rule files in your repo

If your repo has a rules file, the agent reads it and follows it. Supported files:

- `AGENTS.md`
- `CLAUDE.md`
- `.cursorrules`
- `.github/copilot-instructions.md`

Use these to set things like code style, which folders not to touch, or which test command to run.

## Plans for bigger jobs

For a large job, the agent plans first.

1. It may ask you a few questions in a clickable questions card.
2. It writes the plan to a file in the `plan/` folder and shows a plan card.
3. Click **View Plan** to read it.
4. Approve the plan, and the agent starts building.

You can also ask for this directly: *"Plan this first and wait for my OK before changing code."*

## Tips for good results

- **Be specific.** *"Add a contact form to the home page that sends to my email"* works better than *"improve the site"*.
- **Point at the code.** Open the file or select the lines you mean before asking.
- **Ask it to check its work.** *"Run the build and fix any errors."*
- **Review before you push.** Every answer can be reviewed and undone. See [Review and undo](/docs/review-and-undo).
- **Save to GitHub when happy.** See [Pull requests and backups](/docs/pull-requests-and-backups).

## FAQ

<details>
<summary>Which languages does it support?</summary>

Python 3.13 and Node 20 / TypeScript are confirmed, with Chromium and Playwright for browser testing.

</details>

<details>
<summary>Does the agent see what I typed myself?</summary>

Yes. It sees your own edits since its last answer, so it can build on them.

</details>

<details>
<summary>Can the agent use the terminal?</summary>

The agent runs Python, JavaScript and shell commands in your project folder, and can start long commands in the background. You can use the built-in terminal yourself at any time.

</details>
