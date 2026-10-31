---
title: The Studio browser isn't working
slug: studio-browser-not-working
category: studio-mode
order: 6
summary: What to do when the live browser won't start, stays locked, or can't open your app.
---

## "The browser could not start"

Click **Try again**. If it still fails, wait a moment and try again.

## "The sandbox server is busy right now"

Many people are using Studio. Wait a few minutes and try again.

## "Not connected. Refresh the page."

Refresh chat.classgrid.in.

## I can't click in the browser

The agent is using it. You'll see *"The agent is using the browser"*. Control comes back a few seconds after the agent's answer ends. To stop it sooner, stop the agent's answer.

## "No page open yet"

Type a website in the address bar and press **Enter**, or ask the agent to open one.

## The agent can't open my app at localhost

- A project must be open in this chat.
- Ask the agent to start the dev server in **this chat**, for example "Start the dev server and open it."
- The server must listen on `0.0.0.0`, not only `localhost`. The agent knows this, but you can remind it.

## The agent stopped at a login, captcha or payment

That's on purpose. The agent never types passwords, card numbers or one-time codes, never pays, and doesn't get around captchas. Do that step yourself in the Browser tab, then tell the agent to carry on.

## The page I was on is gone

After about 30 minutes with nobody using it, the browser shuts down. Open the chat again and the browser goes back to that chat's last page.

Still stuck? [Open a support ticket](/support/ticket).

Full details: [The live browser](/docs/studio-live-browser).
