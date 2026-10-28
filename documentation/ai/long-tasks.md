---
title: Long Tasks
slug: long-tasks
category: agent-mode
order: 9
description: How Classgrid AI keeps working in the background for up to 48 hours, pausing and waking up until the job is done.
---

Some jobs take longer than one reply. Classgrid AI can run them as **long tasks** in the background. The agent works, pauses, wakes up later and carries on, for up to 48 hours. You can close the tab or put your phone away while it works.

## When a long task is used

Long tasks are useful when the agent has to wait for something before it can finish. For example:

- Waiting for **your reply on WhatsApp** before it moves to the next step.
- Waiting until **a set time** before it checks or does something again.
- Work you handed over from a **WhatsApp call** or an **email to agent@classgrid.in**. These always run as background tasks. See [WhatsApp calls](/docs/whatsapp-calls) and [Email the agent](/docs/email-the-agent).

## How it works

1. The agent starts working on your request.
2. When it needs to wait, it **pauses** itself and sets a wake-up: a time, your next WhatsApp reply, or both.
3. Classgrid checks regularly and **wakes the agent** when the time comes or when you reply.
4. The agent picks up where it left off, with the full chat so far.
5. When the job is done, it closes the task and sends you a message with a link to the chat.

| Step | What you see |
|---|---|
| Task started from a call | "Got it. Classgrid AI is working on it now. I'll send you the result here when it's done." |
| Task finished | "✅ **Task completed.**" plus a link to the chat |
| Results with files | PDFs and other files arrive on WhatsApp as real files |

<callout type="info">

The agent does all the work in a normal Classgrid AI chat. Open the chat link at any time to see every step it took.

</callout>

## Adding more while a task is running

While a task is open, you can send more details:

- **On WhatsApp:** send extra text, photos or PDFs to the Classgrid number. You get a short "got it" reply and the details are passed to the running task.
- **By email:** send them to agent@classgrid.in from the email on your account.

Texting the WhatsApp number when **no** task is running does not start a new task. New background tasks start from a WhatsApp call or an email to agent@classgrid.in.

## Time limit: 48 hours

A long task can run for **up to 48 hours**. If it is not finished by then, it stops and you are told:

> "Sorry, Classgrid AI could not finish your task in 48 hours, so it has stopped."

You can open the chat to see what was done and ask the agent to continue from there in a new message.

## If something goes wrong

| What happens | What Classgrid does |
|---|---|
| A run fails | It tries again a few minutes later. |
| It keeps failing | It stops and tells you it "could not finish your task after 3 tries". |
| The agent makes no progress for several runs | It stops and waits for you to reply before going on. |
| The server restarts | The task carries on afterwards. You don't need to do anything. |

## If your credits run out

Long tasks use your AI credits, the same as normal chats. If your credits run out in the middle of a task, the task is **paused**, not deleted, and you get a message that starts:

> "⏸️ Your AI tokens ran out, so I paused your task…"

Top up to keep using Classgrid AI. See [Credits and top-ups](/docs/credits-and-top-ups).

## Tips

- Verify your WhatsApp number first, so the agent can send results and read your replies. See [Verify WhatsApp](/docs/verify-whatsapp).
- Say clearly what "done" looks like, for example *"Send me the final PDF on WhatsApp when it's ready."*
- If the agent needs your answer, reply on WhatsApp. It wakes up when your reply arrives.

## FAQ

<details>
<summary>Do I need to keep the browser open?</summary>

No. Long tasks run on Classgrid's side. You can close the tab and get the result on WhatsApp.

</details>

<details>
<summary>Can a long task run for a week?</summary>

No. The limit is 48 hours per task. For a reminder that repeats over days or weeks, use [Schedules and reminders](/docs/schedules-and-reminders) instead.

</details>

<details>
<summary>Where do I find the work the agent did?</summary>

Every task runs in a chat. The "Task completed" message includes a link to it.

</details>
