---
title: Connect GitHub
slug: connect-github
category: project-mode
order: 2
description: Connect your GitHub account, install the Classgrid app, and create a project with or without a repo.
---

Project Mode works on top of GitHub. Before you can open a project, you connect your GitHub account and install the Classgrid GitHub app on the repos you want to work on. Then you create a project and link it to a repo, or start without one and let the agent make the repo for you.

## Step 1: Connect GitHub

The first time you switch to Project Mode, you'll see:

> **Connect GitHub to use Project Mode**
> "Project Mode needs your GitHub account. Your code is only kept on GitHub, never on our servers."

1. Click **Connect GitHub**.
2. Sign in to GitHub and allow access.
3. You come back to the **Projects** page, which shows your GitHub picture, name and email.

If the link to GitHub stops working later, you'll see **Reconnect GitHub**. Click it and sign in again.

## Step 2: Install the Classgrid app

Classgrid uses its own GitHub app to read and push code. You install it on the repos you want to work on.

1. On the Projects page, find the card **Install the Classgrid app**. It shows *"Required for {repos}."* with the repos that need it. If you have no repos yet, it says *"New: the Classgrid GitHub app"* and *"Required for the repositories you work on."*
2. Click **Install app**.
3. On GitHub, choose the account or organisation and the repos to allow, then confirm.
4. GitHub sends you back to Classgrid and you see **"Classgrid app installed"**.

If you open a project whose repo doesn't have the app yet, the editor shows a banner: *"Install the Classgrid app on {repo}."* Click **Install Classgrid app** to fix it.

## Step 3: Create a project

1. On the Projects page, click **New project**.
2. Optional: click **Add logo** to upload a logo, then crop it in **Crop project logo**.
3. Type a **Project name**.
4. Click **Create**.

### Link a GitHub repo

Next you'll see **Link a GitHub repo**:

> "Pick a repo below, or enter the project without a repo. You or the Agent can make a repo any time."

- Pick a repo from the list. Private repos work too; they're tagged **private**.
- Or click **Enter project without a repo** to start empty.
- **Cancel** closes the dialog.

## Starting without a repo

Starting empty is a good way to build something new, like a landing page or a small app. While the project starts, you'll see tips such as *"You can ask the Agent to build a website or an app"* and *"You can ask it to make a GitHub repo and push your code"*.

Inside the editor, a banner reminds you:

> "This project has no GitHub repo yet. Code is only kept on GitHub, so make a repo and push your work."

Click **Ask Agent to create repo** and the agent makes one for you.

<callout type="info">

Repos the agent creates are **private by default**. The agent can also create a repo inside a GitHub organisation, rename a repo, and change its description, website and visibility. Just ask, for example *"Make this repo public"* or *"Create the repo in my company's organisation."*

</callout>

If you never make a repo, your work is still protected: a project with no repo is saved to a new private repo automatically after you close the editor. See [Pull requests and backups](/docs/pull-requests-and-backups).

## What gets downloaded

Opening a project downloads the **latest commit of the repo's default branch**. You can't pick a different branch to open. Your changes go back to GitHub as a pull request on a new branch.

## Edit or delete a project

- **Edit** lets you change the project's details.
- **Delete** removes the project from Classgrid only: *"Its code stays on GitHub. Only the project here is deleted."*

## FAQ

<details>
<summary>Do private repos work?</summary>

Yes. Private repos show in the list with a "private" tag.

</details>

<details>
<summary>Why does it ask me to install the Classgrid app?</summary>

The Classgrid GitHub app is what lets Project Mode download your code and open pull requests. It needs to be installed on each repo you work on.

</details>

<details>
<summary>Can I open a branch other than the default one?</summary>

No. Projects open the latest code on the default branch.

</details>
