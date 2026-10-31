---
title: How do I allow or block an AI action?
slug: allow-or-block-an-ai-action
category: studio-mode
order: 3
summary: Choose how often the agent asks before it acts, and answer the permission card.
---

In Studio Mode and Project Mode, the agent asks before risky steps, like installing packages, deleting files, pushing to GitHub or opening a website.

## Choose a mode

Click the **shield** in the chat box (next to the model picker) and pick:

- **Request Review**: every command asks you first.
- **Default**: asks before sensitive actions. *(Best for most people.)*
- **Auto**: asks only before destructive actions, like deleting or pushing.
- **Turbo**: runs everything without asking.

The shield shows once the chat has started. If you can't see it, make the chat wider.

## Answer the permission card

When the agent asks, a card appears above the chat box with the exact command, website or text. Pick one:

1. **Yes, allow this time**
2. **Yes, and always allow … in this chat**
3. **Yes, and always allow …** (in every chat)
4. **No**, and type what the agent should do instead

Or click **Skip** to let the agent carry on without that step.

Keys: **1** to **4** to pick, **Enter** to send, **Esc** to skip.

## Good to know

- With **No**, the agent won't try another way. It asks you what to do, or follows your note.
- If you don't answer within 30 minutes, the step doesn't run.
- Editing files never asks. Check the changes in the **Review** tab. See [Review what the AI changed in Studio](/help-center/article/review-what-the-ai-changed-in-studio).

Full details, including which commands ask in each mode: [Permissions](/docs/studio-permissions).
