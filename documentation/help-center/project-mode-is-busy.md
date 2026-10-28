---
title: Why does it say "Project Mode is busy"?
slug: project-mode-is-busy
category: troubleshooting
order: 3
summary: Project Mode can only run a set number of editors at once; wait a few minutes and try again.
---

Sometimes, when you open a project, you see:

"Project Mode is busy right now. Try again in a few minutes."

## Why it happens

Each open project gets its own editor running for you. Only a set number of editors can run at the same time. At busy times, all of them may be in use.

Your code is safe. It's kept on GitHub, and nothing is lost.

## What to do

1. Wait a few minutes.
2. Go back to the **Projects** page.
3. Click **Open** on your project again.

## While you wait

- Use **Agent mode** for questions, research or files. Click **Switch Mode** in the sidebar and choose **Agent**.
- Read your code or pull requests on GitHub.

## Other loading messages

| You see | What it means |
|---|---|
| "Downloading the latest code from GitHub" | Your project is being fetched fresh. Wait a moment. |
| "Starting the editor" / "Almost ready" | Nearly done. |
| "Reconnecting to your project" | You reloaded the page. It's reconnecting. |
| "Installing the project's packages in the background…" | npm packages are being installed. You can start working. |

## Other problems opening a project

- **"Install the Classgrid app on {repo}."** Click **Install Classgrid app** and allow that repo on GitHub. See [Connect GitHub and install the app](/help-center/article/connect-github-and-install-the-app).
- **"Reconnect GitHub"** Click it and sign in to GitHub again.
- **Old answers can't be reviewed or undone.** After you close the editor, the working copy is removed, and the project opens fresh next time. See [Review or undo the AI's changes](/help-center/article/review-or-undo-ai-changes).

## Still not working?

If you keep seeing the busy message for a long time, contact us from the [support page](/support).

Full details: [Project Mode](/docs/project-mode).
