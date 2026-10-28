---
title: Review and Undo
slug: review-and-undo
category: project-mode
order: 4
description: Check every file the agent changed, reject what you don't want, or put the project back the way it was.
---

Every time the agent answers in Project Mode, Classgrid takes a snapshot of your project. That means you can see exactly what changed, reject single files, or undo the whole answer with one click.

## The "files changed" box

Under each answer that changed code, you'll see a box like this:

> **3 files changed +42 -7**  **Review**  **Undo**

| Part | What it means |
|---|---|
| **N files changed** | How many files the agent touched in this answer |
| **+x -y** | Lines added and lines removed |
| **Review** | Opens the Review changes window |
| **Undo** | Puts the project back to how it was before this answer |

## Review changes

Click **Review** to open **Review changes**. It shows the diff for each file, with added lines and removed lines marked.

For each file you can click **Reject** to throw away the agent's changes to that file. There are also buttons for all files at once:

| Button | What it does |
|---|---|
| **Reject** (per file) | Undoes the agent's changes to that one file |
| **Reject all** | Undoes the agent's changes to every file in this answer |
| **Accept all** | Marks this answer's changes as kept |

<callout type="info">

**"Accept all" does not save to GitHub.** It only marks the answer as kept on your screen. It doesn't commit or push anything. When you're happy, use **Push to GitHub** to save your work. See [Pull requests and backups](/docs/pull-requests-and-backups).

</callout>

## Undo an answer

Click **Undo** in the files changed box. Classgrid asks you to confirm:

> "Put the project back to how it was before this answer? Changes made after it, by you or the AI, are undone too."

Read this carefully. Undo goes back to the snapshot taken **before** that answer. Anything that happened **after** it is undone too, including:

- Later answers from the agent.
- Edits you made yourself after that answer.

If you only want to remove one file's changes, use **Reject** in Review changes instead.

## After you review

The box updates to show what you chose:

| Box shows | Meaning |
|---|---|
| **Changes undone** | You used Undo on this answer |
| **Changes rejected** | You rejected the changes in Review |
| **· kept** | You accepted the changes |

## A good review routine

1. Ask the agent for a change.
2. Click **Review** and read each file's diff.
3. **Reject** any file you don't want.
4. Ask the agent to run the build or tests, for example *"Run the build and fix any errors."*
5. When everything looks right, click **Push to GitHub**.

## When review and undo stop working

Snapshots are kept while your project is open. A while after you close the editor, the working copy is removed. The next time you open the project, it downloads fresh from GitHub, and the old answers can no longer be reviewed or undone.

<callout type="warning">

Push your work before you leave, or rely on the automatic backup branch. Don't count on Undo for changes from a past session.

</callout>

## FAQ

<details>
<summary>Does Undo also undo my own typing?</summary>

Yes, if you typed after the answer you're undoing. Undo puts the whole project back to how it was before that answer, so changes made after it, by you or the AI, are undone too.

</details>

<details>
<summary>I clicked "Accept all". Is my code on GitHub now?</summary>

No. Accept all only marks the answer as kept. Use Push to GitHub to save it.

</details>

<details>
<summary>Can I reject just one file?</summary>

Yes. Open Review and click Reject on that file.

</details>
