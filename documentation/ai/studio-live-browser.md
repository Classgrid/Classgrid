---
title: The Live Browser
slug: studio-live-browser
category: studio-mode
order: 3
description: A real browser in Studio Mode that you and the agent share. The agent opens sites, clicks, types and takes screenshots; you can use it too.
---

The **Browser** tab in Studio Mode is a real browser (Chrome) running for you in the cloud. The agent can use it like a person would, and you can watch every step. You can also click and type in it yourself, for example to sign in.

## What the agent can do

| Action | What happens |
|---|---|
| **Open a website** | Opens a link. A plain phrase opens a Google search |
| **Click** | Clicks a spot on the page (or double-clicks) |
| **Type** | Types where the cursor is, and can press Enter after |
| **Press a key** | Enter, Tab, Escape, the arrow keys, Backspace, Ctrl+A and so on |
| **Scroll** | Scrolls the page up or down |
| **Go back** | Goes back one page |
| **Wait** | Waits a few seconds for a page to load |
| **Take a screenshot** | Saves a picture of the page in the **Screenshots** tab |
| **Read the page** | Reads all the text and links on the page, scrolling through it first so nothing is missed |

The agent sees a screenshot after each step, so it knows what's on the screen. It can also show you a screenshot in its answer.

Try asking:

- *"Open our pricing page and check that every button works."*
- *"Compare the prices of these three laptops on their official sites."*
- *"Review the design of example.com and tell me what to improve."*

## Watch the agent work

While the agent uses the browser:

- A blue arrow shows its pointer, labelled with what it's doing: **Agent · Clicking**, **Typing**, **Scrolling down**, **Pressing Enter**, **Opening example.com** or **Taking a screenshot**.
- A blue ring flashes where it clicks.
- The page gets a blue border and the note *"The agent is using the browser"*.

While the agent is working, you can't click or use the address bar, so you don't get in each other's way. Control comes back to you a few seconds after the agent's answer ends.

## Use the browser yourself

When the agent isn't working, the browser is yours:

- **Click, scroll and type** right on the page.
- Use **Back**, **Forward** and **Reload**.
- Type a website or a search in the address bar (*"Search or enter a website"*) and press **Enter**.
- **Save a screenshot** downloads a picture of what you see.
- **Full page screenshot** saves the whole page, top to bottom, in the **Screenshots** tab.
- **Open in a new tab** opens the same page in your own browser.

The browser stays open after the agent is done, so you can keep using it.

## Sign-ins, passwords and payments

You and the agent share the same browser, so when a site needs you to sign in, **you** type your password in the Browser tab. Once you've signed in, the agent can carry on.

<callout type="warning">

**The agent is told never to type a password, a card number or a one-time code (OTP), and never to pay, buy, send, post or delete anything for you.** When a step needs one of these, it stops and asks you to do it in the browser. For extra safety, keep the permission mode on **Default** or **Request Review**, so the agent asks before it types anything or opens a site. See [Permissions](/docs/studio-permissions).

</callout>

If a page blocks the agent, for example with a captcha or a login wall, it stops and tells you instead of trying to get around it.

Your sign-ins are remembered in your browser, across all your Studio chats.

## Each chat has its own page

- A new chat starts with an empty browser.
- When you go back to an older chat, the browser opens the last page that chat was on.

## Open your app while you build it

The agent can test the app you're building:

1. Ask it to start your project's dev server, for example *"Start the dev server and open it in the browser."*
2. It runs the server in the background (you'll see it in the **Terminal** tab) and opens it at `localhost` in the live browser.
3. Now it can click through your app, check the design and fix what's broken.

Only your own Studio can reach your dev server. It needs a project open, and the server must be started in the same chat.

## When the browser closes

The browser keeps running while you use it. After about **30 minutes** with nobody using or watching it, it shuts down to save resources. Your sign-ins and each chat's last page are kept, so it opens where you left off next time.

## If something goes wrong

| You see | What to do |
|---|---|
| *"Starting your browser…"* | Wait a few seconds |
| *"No page open yet"* | Type a website in the address bar, or ask the agent to open one |
| *"The browser could not start"* | Click **Try again** |
| *"The sandbox server is busy right now. Try the browser again in a few minutes."* | Wait a few minutes and try again |
| *"Not connected. Refresh the page."* | Refresh chat.classgrid.in |

## FAQ

<details>
<summary>Is the browser running on my computer?</summary>

No. It runs in the cloud, just for you. You see it live in the Browser tab.

</details>

<details>
<summary>Can other people see my browser?</summary>

No. Each person has their own browser, and their own sign-ins.

</details>

<details>
<summary>Can I use the live browser in Agent mode or Project Mode?</summary>

No, the live browser is only in Studio Mode. If you ask for it in another mode, the agent will suggest switching to Studio.

</details>
