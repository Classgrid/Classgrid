---
title: How do I review what the AI changed in Studio?
slug: review-what-the-ai-changed-in-studio
category: studio-mode
order: 5
summary: Open the Review tab to see every file the agent changed, and keep or reject the changes.
---

Classgrid takes a snapshot of your project before each answer, so you can see what the agent changed and put files back.

## Look at the changes

1. Open the **Review** tab in the pane.
2. Use the answer picker to choose **Newest answer** or another answer.
3. Read each file's changes. Turn on **View split diff** in the **⋮** menu to see **Before** and **After** side by side.

## Keep or reject

- **Reject file**: puts one file back as it was before the answer.
- **Reject all**: puts every file in that answer back.
- **Accept all**: marks the changes as kept. It doesn't save to GitHub.

Rejecting can't be undone, so read first.

## Undo a whole answer

To put the whole project back to before an answer:

1. Hide the pane, then click **Open** at the top right of the chat to open it in Project Mode.
2. Click **Undo** in that answer's files changed box, and confirm.

## Save your work

When you're happy, click **Push** in the pane's tab bar to save to GitHub.

## If it doesn't work

**"This answer's changes can't be reviewed anymore"?** After you leave Studio for about 30 minutes, the project's working copy is removed and the old changes can't be reviewed. Push your work before you leave.

Full details: [Review changes](/docs/studio-review-changes).
