---
title: Pull Requests and Backups
slug: pull-requests-and-backups
category: project-mode
order: 5
description: How Project Mode saves your work to GitHub as a pull request, and how unpushed work is backed up.
---

Project Mode never pushes straight to your main branch. Your work goes to its own `classgrid/` branch with a pull request, so the repo owner always decides what gets merged. And if you close the editor without pushing, your work is backed up to GitHub for you.

## Push to GitHub

1. Click **Push to GitHub** in the editor.
2. A window asks **"What did you change?"** Type a short note, or tap one of the suggestion chips.
3. Click **Push changes**.

You can also just ask the agent: *"Push my changes to GitHub."* It pushes the same way.

## What happens when you push

| Step | What Classgrid does |
|---|---|
| 1 | On the first push, creates a branch named like `classgrid/20261027-1430` (date and time). Later pushes go to the same branch and update its pull request |
| 2 | Commits your changes to that branch |
| 3 | Opens a pull request, or updates it if one is already open |
| 4 | Leaves the merge to you: *"It is not merged: the repo owner reviews and merges it on GitHub."* |

<callout type="info">

**Nothing lands on main by itself.** Pushes always go to a `classgrid/` branch with a pull request. The push window may show a "main" label, but the push still goes to a new `classgrid/` branch and a pull request.

</callout>

### Merge on GitHub

Open the pull request on GitHub, read the changes, and click merge when you're happy. If you work with a team, they can review it there like any other pull request.

## Who is the author

Each commit is made by **Classgrid AI** (`agent@classgrid.in`), with **you added as co-author**. On GitHub you'll see both, so it's always clear the change came from Classgrid AI working with you.

## When someone else pushed first

If a teammate pushed to the same branch while you were working, Classgrid builds your changes on top of theirs.

If you both changed **the same lines**, Classgrid stops instead of guessing, and tells you *"Nothing was lost."* Check the pull request on GitHub with your teammate and decide which version to keep.

## Automatic backups

You don't have to remember to push before you leave.

| Situation | What happens |
|---|---|
| You close the editor with unpushed work | About 5 minutes later, the work is saved to a `classgrid-backup-…` branch on GitHub |
| You open the project again | A message tells you a backup was made |
| Your project has no repo | The work is saved to a **new private repo** automatically |

<callout type="warning">

Backups are a safety net, not a replacement for pushing. When you're ready to share your work, use **Push to GitHub** so it goes into a pull request.

</callout>

## Tips

- Push in small steps, with clear notes in **What did you change?** Smaller pull requests are easier to review.
- Review the agent's changes first. See [Review and undo](/docs/review-and-undo).
- Want to see the result live? Deploy the `classgrid/` branch as a Vercel preview. See [Deploy with Vercel](/docs/deploy-with-vercel).

## FAQ

<details>
<summary>Can Project Mode push directly to main?</summary>

No. Every push goes to a `classgrid/` branch and opens or updates a pull request. The repo owner merges it on GitHub.

</details>

<details>
<summary>Why is Classgrid AI the commit author?</summary>

Commits are made by Classgrid AI with you as co-author, so it's clear who made the change and that you were part of it.

</details>

<details>
<summary>I closed the tab without pushing. Is my work lost?</summary>

No. About 5 minutes after the editor closes, unpushed work is saved to a `classgrid-backup-…` branch on GitHub.

</details>
