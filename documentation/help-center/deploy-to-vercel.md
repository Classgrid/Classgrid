---
title: How do I deploy my project to Vercel?
slug: deploy-to-vercel
category: project-mode
order: 5
summary: Connect the Vercel plugin and ask the agent to deploy your branch as a preview or to production.
---

Project Mode has no deploy button. To put your project live, connect your own **Vercel** account and ask the agent to deploy.

## Before you start

- Your project is linked to a GitHub repo.
- Your work is pushed to GitHub. See [Save your work to GitHub](/help-center/article/save-work-to-github).

## Step 1: Connect Vercel

1. Click the sliders icon (**AI Hub**) in the message box.
2. In the plugins list, find **Vercel**.
3. Tap **Connect** and sign in to Vercel.

Once a repo has a Vercel project, its project card also shows the Vercel project and live domain.

## Step 2: Ask the agent

In your project's agent panel, ask in plain words:

| You want | Ask |
|---|---|
| A new Vercel project | "Create a Vercel project for this repo." |
| A secret setting | "Add my API key to the Vercel project as a secret setting." |
| A preview | "Deploy the latest classgrid branch to Vercel as a preview and give me the link." |
| To go live | "Deploy this branch to production on Vercel." |

## A simple flow

1. Ask for a change and [review it](/help-center/article/review-or-undo-ai-changes).
2. Click **Push to GitHub**. A `classgrid/…` branch and pull request are made.
3. Ask the agent to deploy that branch as a Vercel preview.
4. Open the preview link and check it.
5. When you're happy, merge the pull request on GitHub, or ask the agent to deploy to production.

Keep secret keys out of your code. Ask the agent to store them as environment settings in Vercel.

## What the Vercel plugin can't do

- **Roll back** a deploy.
- **Show build logs.**

Use your Vercel dashboard for both.

## If it doesn't work

- **Agent says Vercel isn't connected?** Connect it in AI Hub first.
- **Want a `sites.classgrid.in` address?** That works only from an Agent mode chat. See [Publish a website](/help-center/article/publish-a-website).
- **Deploy failed?** Open the build logs in your Vercel dashboard, copy the error, and paste it to the agent so it can fix it.

Full details: [Deploy with Vercel](/docs/deploy-with-vercel).
