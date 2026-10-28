---
title: Deploy with Vercel
slug: deploy-with-vercel
category: project-mode
order: 6
description: Put a Project Mode project live on your own Vercel account by asking the agent.
---

Project Mode has no deploy button of its own. To put your project live, you connect your **Vercel** account and ask the agent to deploy it. The agent can create the Vercel project, add settings, and deploy a branch as a preview or to production.

## Before you start

You need:

1. A Project Mode project linked to a GitHub repo. See [Connect GitHub](/docs/connect-github).
2. Your work pushed to GitHub. See [Pull requests and backups](/docs/pull-requests-and-backups).
3. The **Vercel** plugin connected to your Classgrid AI account. See [Connect and disconnect apps](/docs/connect-and-disconnect-apps).

## Connect Vercel

1. Open **AI Hub** (the sliders icon in the message box).
2. Find **Vercel** in the plugins list.
3. Connect it and sign in to Vercel when asked.

Once connected, your project cards on the Projects page also show the **Vercel project** and its **live domain**, once that repo has a Vercel project.

## Deploy through the agent

In the agent panel of your project, ask in plain words. The agent can:

| Ask for | Example |
|---|---|
| **Create a Vercel project** | *"Create a Vercel project for this repo."* |
| **Add environment variables** | *"Add my API key to the Vercel project as a secret setting."* |
| **Deploy a preview** | *"Deploy the latest classgrid branch to Vercel as a preview."* |
| **Deploy to production** | *"Deploy this branch to production on Vercel."* |

### Preview the pull request branch

Every push from Project Mode goes to a `classgrid/…` branch with a pull request. You can ask the agent to deploy **that branch** as a Vercel preview. This lets you check the change in a real browser before the repo owner merges it.

A simple flow:

1. Ask the agent for a change and review it. See [Review and undo](/docs/review-and-undo).
2. Push to GitHub. A `classgrid/…` branch and pull request are created.
3. Ask: *"Deploy that branch to Vercel as a preview and give me the link."*
4. Open the preview link and check it.
5. When you're happy, merge the pull request on GitHub, or ask the agent to deploy to production.

<callout type="info">

Keep secret keys out of your website's code. Ask the agent to store them as environment variables in your Vercel project instead.

</callout>

## What Project Mode doesn't do

| Not available | What to use instead |
|---|---|
| A **Deploy** button in Project Mode | Ask the agent to deploy with the Vercel plugin |
| A **live preview** of a dev server running in the editor | Deploy a Vercel preview |
| **Classgrid Cloud** hosting (`yourname.sites.classgrid.in`) | Available only in Agent mode. See [Publish a website](/docs/publish-a-website) |
| Rolling back a Vercel deploy or reading build logs through the agent | Use your Vercel dashboard |

<callout type="warning">

Classgrid Cloud sites (`*.sites.classgrid.in`) can only be published from an **Agent mode** chat. In Project Mode, deploy with Vercel.

</callout>

## Which should I use?

| You want… | Use |
|---|---|
| A quick one-page site from a chat, no GitHub needed | Agent mode with [Publish a website](/docs/publish-a-website) |
| A real repo on GitHub with pull requests and your own hosting | Project Mode with Vercel |

## FAQ

<details>
<summary>Is there a deploy button in Project Mode?</summary>

No. Deploys happen through the agent, using your connected Vercel account.

</details>

<details>
<summary>Can I see my dev server running inside Project Mode?</summary>

No. There is no live preview link for dev servers. Deploy a Vercel preview to see your site in a browser.

</details>

<details>
<summary>Can I publish to sites.classgrid.in from Project Mode?</summary>

No. Classgrid Cloud sites are for Agent mode only.

</details>

<details>
<summary>Can the agent roll back a bad deploy?</summary>

Not through Classgrid. Roll back from your Vercel dashboard.

</details>
