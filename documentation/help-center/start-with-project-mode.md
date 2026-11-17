---
title: How do I start with Project in Studio?
slug: start-with-project-mode
category: project-mode
order: 1
summary: Go to Studio, click Project in the left sidebar, open a project and work on your GitHub code with the agent in your browser.
---

Project is a real code editor (VS Code) in your browser, linked to your GitHub, with the Classgrid agent built in. It is inside Studio, not a separate mode. You need a GitHub account.

## Open Project

1. Sign in at [chat.classgrid.in](https://chat.classgrid.in).
2. Go to **Studio**. See [How do I start with Studio Mode?](/help-center/article/start-with-studio-mode)
3. In Studio's left sidebar, click **Project**. Its page is [chat.classgrid.in/c/studio/project](https://chat.classgrid.in/c/studio/project).
4. The first time, click **Connect GitHub**. See [Connect GitHub and install the app](/help-center/article/connect-github-and-install-the-app).

## Open a project

1. On the **Projects** page, click **Open** on a project card. Or click **New project** to make one.
2. Wait for the loading screen: "Downloading the latest code from GitHub", then "Starting the editor", then "Almost ready".
3. Click **Agent** in the top bar to open the agent panel. Drag its edge to make it wider.

![The Project editor with the agent panel open on the right](SCREENSHOT:project-mode)

## Ask the agent

Type in the agent panel, for example:

- "Add a contact form to the home page."
- "Run the build and fix any errors."
- "Explain how payments work in this repo."

The agent sees your open file, your selection and the editor's errors, so you don't need to paste code. For a big job, say "Plan this first and wait for my OK."

## Move a chat into a project

Started something in Agent mode that became a coding job? Open the chat's menu, choose **Move to project**, and pick a project. The chat moves into that project and continues in Project.

## Good to know

- **Your code stays on GitHub.** Opening a project downloads the latest code fresh.
- It opens the **default branch** only.
- Python 3.13 and Node 20 / TypeScript work. There is no extension store.
- There is no live preview link. To see your site, [deploy to Vercel](/help-center/article/deploy-to-vercel).

## If it doesn't work

- Told that Project is busy right now? See [Project is busy](/help-center/article/project-mode-is-busy).
- Asked to install the Classgrid app? See [Connect GitHub and install the app](/help-center/article/connect-github-and-install-the-app).

Full details: [Project in Studio](/docs/project-mode).
