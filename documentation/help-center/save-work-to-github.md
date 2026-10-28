---
title: How do I save my work to GitHub?
slug: save-work-to-github
category: project-mode
order: 4
summary: Use Push to GitHub to send your changes to a classgrid/ branch with a pull request you merge yourself.
---

Project Mode saves your work to GitHub as a **pull request**. It never pushes straight to your main branch, so the repo owner always decides what gets merged.

## Steps

1. Click **Push to GitHub** in the editor.
2. A window asks **"What did you change?"** Type a short note, or tap a suggestion.
3. Click **Push changes**.

You can also ask the agent: "Push my changes to GitHub."

## What happens next

1. On your first push, Classgrid makes a branch named like `classgrid/20261027-1430`. Later pushes go to the same branch.
2. Your changes are committed to that branch.
3. A pull request is opened, or updated if one is already open.
4. It is **not** merged. Open the pull request on GitHub, check it, and merge it when you're happy.

The push window may show a "main" label, but the push still goes to a `classgrid/` branch and a pull request.

## Who is the author?

Each commit is made by **Classgrid AI** (agent@classgrid.in), with **you added as co-author**.

## Forgot to push?

Don't worry. About 5 minutes after you close the editor, unpushed work is saved to a `classgrid-backup-…` branch on GitHub. If the project has no repo, it's saved to a **new private repo**. Next time you open the project, a message tells you a backup was made.

Backups are a safety net. Use **Push to GitHub** when you want your work in a pull request.

## Tips

- Push in small steps with clear notes. Small pull requests are easier to check.
- [Review the changes](/help-center/article/review-or-undo-ai-changes) before you push.
- Want to see it live? [Deploy the branch to Vercel](/help-center/article/deploy-to-vercel) as a preview.

## If it doesn't work

**Push stopped because someone else changed the same lines?** Classgrid stops instead of guessing and tells you "Nothing was lost." Look at the pull request on GitHub with your teammate and decide which version to keep.

Full details: [Pull requests and backups](/docs/pull-requests-and-backups).
