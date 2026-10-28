---
title: How do I review or undo the AI's changes?
slug: review-or-undo-ai-changes
category: project-mode
order: 3
summary: Check each file the agent changed, reject what you don't want, or undo a whole answer.
---

Every time the agent answers in Project Mode, Classgrid takes a snapshot of your project. You can check what changed, reject single files, or undo a whole answer.

## The "files changed" box

Under each answer that changed code, you'll see a box like:

**3 files changed +42 -7** · **Review** · **Undo**

- **+x -y** is lines added and removed.
- **Review** opens the changes.
- **Undo** puts the project back to how it was before that answer.

## Review the changes

1. Click **Review**. The **Review changes** window shows each file's changes.
2. Read each file.
3. Click **Reject** on any file you don't want. Its changes are thrown away.
4. Or use **Reject all** or **Accept all** for every file in that answer.

**"Accept all" doesn't save to GitHub.** It only marks the changes as kept on your screen. To save, use **Push to GitHub**. See [Save your work to GitHub](/help-center/article/save-work-to-github).

## Undo a whole answer

1. Click **Undo** in the files changed box.
2. Read the message: "Put the project back to how it was before this answer? Changes made after it, by you or the AI, are undone too."
3. Confirm.

Undo also removes **later answers** and **your own edits** made after that answer. If you only want to drop one file, use **Reject** instead.

## A good routine

1. Ask for a change.
2. Click **Review** and read each file.
3. **Reject** what you don't want.
4. Ask: "Run the build and fix any errors."
5. Click **Push to GitHub**.

## If it doesn't work

**Review and Undo are gone for old answers?** Snapshots last only while your project is open. A while after you close the editor, the working copy is removed. Next time, the project downloads fresh from GitHub, and old answers can't be reviewed or undone. Push your work before you leave.

Full details: [Review and undo](/docs/review-and-undo).
