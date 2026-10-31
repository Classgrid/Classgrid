---
title: Permissions
slug: studio-permissions
category: studio-mode
order: 4
description: Choose how often the agent asks before it acts, and answer the permission card to allow, block or skip a step.
---

In Studio Mode and Project Mode, you decide how much the agent can do without asking. Pick a mode with the **shield**, and answer the **permission card** when the agent asks.

## The shield

The shield sits in the chat box, to the left of the model picker, once a chat has started. Hover over it to see the mode: *"Permissions: [mode]"*. Click it to change.

| Mode | What it means |
|---|---|
| **Request Review** | *"Every command asks you first."* |
| **Default** | *"Asks before sensitive actions."* |
| **Auto** | *"Asks only before destructive actions."* |
| **Turbo** | *"Runs everything without asking."* |

**Default** is selected until you change it, and your choice is remembered.

<callout type="info">

The shield hides when the chat column is very narrow. Make the chat wider, or make the pane smaller, to see it.

</callout>

## What asks in each mode

✅ = runs without asking · ❓ = asks you first

| Action | Request Review | Default | Auto | Turbo |
|---|---|---|---|---|
| **Destructive commands**: `rm`, `rmdir`, `sudo`, `git push`, `git reset --hard`, `git clean -f`, `git branch -D` / `-d`, `git checkout -- `, `drop table` / `drop database`, `truncate table`, `npm publish`, `mkfs`, `dd if=`, `shred` | ❓ | ❓ | ❓ | ✅ |
| **Push to GitHub** | ❓ | ❓ | ❓ | ✅ |
| **Sensitive commands**: `mv`, `chmod`, `chown`, `kill` / `pkill` / `killall`, `docker`, `git commit` / `merge` / `rebase` / `checkout` / `reset` / `clean` / `tag`, `npm install` / `npm i` / `npm uninstall`, `yarn add` / `remove`, `pnpm add` / `remove` / `install`, `pip install` / `uninstall`, `curl`, `wget`, `ssh`, `scp`, `truncate` | ❓ | ❓ | ✅ | ✅ |
| **Create a GitHub repository** | ❓ | ❓ | ✅ | ✅ |
| **Change the repository settings** | ❓ | ❓ | ✅ | ✅ |
| **Open a website** in the live browser | ❓ | ❓ | ✅ | ✅ |
| **Type into a page** in the live browser | ❓ | ❓ | ✅ | ✅ |
| **Any other command**, like `npm run dev`, `ls`, `git status` | ❓ | ✅ | ✅ | ✅ |
| **Run code** (Python, JavaScript and so on) | ❓ | ✅ | ✅ | ✅ |
| **Click** or **press a key** in the live browser | ❓ | ✅ | ✅ | ✅ |
| Creating, editing and reading files; scrolling, reading pages and taking screenshots in the browser; sending helpers | ✅ | ✅ | ✅ | ✅ |

Commands started in the background, like a dev server, follow the same rules as other commands.

Helpers follow the same mode, and their permission cards show in the same chat. See [Helpers and the scratchpad](/docs/studio-browser-helpers).

<callout type="warning">

**File changes never ask, in any mode.** The agent can create and edit files freely. Use the **Review** tab to check them and reject what you don't want. See [Review changes](/docs/studio-review-changes).

</callout>

## The permission card

When the agent needs your OK, a card appears just above the chat box. It shows a question, like *"Run this command?"* or *"Open this website in the browser?"*, and the exact command, website or text.

| Choice | What it does |
|---|---|
| **1. Yes, allow this time** | Runs it once |
| **2. Yes, and always allow [this] in this chat** | Runs it, and won't ask again for the same thing in this chat |
| **3. Yes, and always allow [this]** | Runs it, and won't ask again for the same thing in any chat or project |
| **4. No** | Doesn't run it. Type a note to tell the agent what to do instead |
| **Skip** | Doesn't run it, and lets the agent carry on without it |

### Keyboard

- **1** to **4** pick a choice. **4** puts you in the note box.
- **Enter** sends (choice 1 is picked to start with).
- **Esc** skips.
- Double-click choice 1, 2 or 3 to send it straight away.

### What "this" means for 2 and 3

"Always allow" covers only one kind of thing:

| The card was for | "Always allow" covers |
|---|---|
| A command | That exact same command, word for word |
| Opening a website | That one website, for example *"opening example.com"* |
| Typing into a page | All typing in the browser |
| A click | All clicks in the browser |
| Pressing a key | All key presses in the browser |
| Running code | That language, for example *"running python"* |
| Pushing to GitHub | All pushes |
| Creating a repository | All new repositories |
| Changing repository settings | All repository setting changes |

"In this chat" is remembered for that chat. "Always" is remembered for your account, in every chat.

## What the agent is told

The agent always knows what you chose:

| You chose | The agent is told |
|---|---|
| **No** | It wasn't allowed and didn't run. It shouldn't try another way, and should ask you what to do |
| **No** with a note | It wasn't allowed and didn't run, plus your note, and it should do what you asked instead |
| **Skip** | You skipped the step and it didn't run. It should carry on without it, or ask you |
| No answer for 30 minutes | You didn't answer in time, so it didn't run. It should tell you what it wanted to do and wait |

If your answer can't be sent, the card comes back with *"Could not send your answer"*. The card also goes away when the agent's answer ends.

## Which mode should I use?

- **Default** is right for most people: everyday commands run, but the agent asks before installing, deleting, pushing, opening websites or typing into pages.
- **Request Review** if you want to see every command before it runs.
- **Auto** if you trust the agent with installs and websites, and only want to approve deleting and pushing.
- **Turbo** only for jobs you're happy to let run alone.

## FAQ

<details>
<summary>Does Turbo mean the agent can do anything?</summary>

Turbo runs every step without asking. The agent still follows its own rules, like never typing passwords or paying, but nothing stops for your OK. Use it with care.

</details>

<details>
<summary>I chose "Always allow". How do I undo it?</summary>

There's no button to clear "always" choices yet. Contact us at [Support Tickets](/support/ticket) if you need one removed.

</details>

<details>
<summary>Why doesn't the agent ask before it edits a file?</summary>

File changes are easy to check and undo, so they never ask. Review them in the Review tab and reject anything you don't want.

</details>
