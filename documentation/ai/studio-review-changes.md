---
title: Review Changes
slug: studio-review-changes
category: studio-mode
order: 5
description: See exactly what the agent changed in each answer, keep it or throw it away, in the Review tab.
---

Before every answer in a project, Classgrid takes a snapshot of your code. So in Studio Mode you can see exactly what the agent changed, and put any file back the way it was.

## The "files changed" box

Under each answer that changed files, you'll see a box like:

> **3 files changed +42 -7**

- **+x -y** is lines added and lines removed.
- Click the box to list the files. Click a file name to open it in the **Files** tab.

After you review, the box shows what you chose: **Changes rejected**, **3 files changed · kept**, or **3 files changed · 1 rejected** (rejected files are struck through).

## The Review tab

Open the **Review** tab in the pane (or choose **Overview** → **Review**). It shows the changes from one answer at a time.

| Part | What it does |
|---|---|
| **Answer picker** | Choose which answer to look at: **Newest answer**, or **Answer N of M**. Each shows its status: **Kept**, **Rejected** or **Undone** |
| **N files +a -r** | Total files and lines changed in that answer |
| **Reject all** | Puts every file in that answer back as it was |
| **Accept all** | Marks the answer as kept |
| **Find** | Search inside the changes |
| **Files changed** list | Click a file to jump to it. Hide or show the list with its button |
| **Refresh** | Loads the changes again |

Each changed file opens as its own section, showing removed lines and added lines with their line numbers. Unchanged parts fold into *"⋯ N unchanged lines"*; click to unfold.

The Review tab refreshes by itself a moment after the agent changes files.

### View options (⋮)

| Option | What it does |
|---|---|
| **View split diff** | Shows **Before** and **After** side by side |
| **Hide whitespace changes** | Ignores changes that are only spaces |
| **Expand all** / **Collapse all** | Opens or closes every file |
| **Collapse unchanged lines** | Folds the lines that didn't change |

Your choices are remembered.

### Find in the changes

Click **Find** and type. Turn on **Aa** (match case), **ab** (whole word) or **.\*** (regular expression) if you need them. Matches are highlighted, with *"X of Y"* showing where you are.

- **Enter**: next match
- **Shift+Enter**: previous match
- **Esc**: close

## Keep or reject

### Reject one file

Open the file's section and click **Reject file**. Confirm:

> "The agent's changes to [file] will be thrown away and the file put back as it was before this answer."

### Reject a whole answer

Click **Reject all** and confirm:

> "All of this answer's changes will be thrown away and every file put back as it was before this answer."

Files the agent created in that answer are removed.

<callout type="warning">

**Rejecting can't be undone.** Read the change before you reject it.

</callout>

### Accept all

**Accept all** marks the answer as kept (*"Changes kept"*). It doesn't save anything to GitHub. To save your work, click **Push** in the tab bar. See [Pull requests and backups](/docs/pull-requests-and-backups).

## Undo a whole answer

Undo puts the **whole project** back to how it was before an answer, including any later changes. In Studio, do it from Project Mode:

1. Hide the pane, then click **Open** at the top right of the chat. The chat opens in Project Mode.
2. Click **Undo** in the answer's files changed box, and confirm.

See [Review and undo](/docs/review-and-undo) for how Undo works.

If you only want to remove some files, use **Reject file** in the Review tab instead.

## When changes can't be reviewed

Snapshots are kept while your project's code is ready on Classgrid. After you leave Studio for about 30 minutes, the working copy is removed, and the next time the project downloads fresh from GitHub. Older answers then can't be reviewed or rejected: *"This answer's changes can't be reviewed anymore."*

The Review tab also lists only the answers you've seen since you last opened the page. Push your work before you leave.

## A good routine

1. Ask the agent for a change.
2. Open **Review** and read each file.
3. **Reject file** for anything you don't want.
4. Ask: *"Run the build and fix any errors."*
5. Click **Push** to save to GitHub.

## FAQ

<details>
<summary>The Review tab says "Nothing to review".</summary>

The agent hasn't changed any files in this chat yet, or every change from the newest answer was already rejected.

</details>

<details>
<summary>Is "Accept all" the same as saving?</summary>

No. It only marks the answer as kept. Use **Push** to save to GitHub.

</details>
