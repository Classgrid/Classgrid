---
title: Connect and Disconnect Apps
slug: connect-and-disconnect-apps
category: plugins
order: 2
description: Connect an app to Classgrid AI, use it in chat with @, and disconnect it whenever you like.
---

Connecting an app lets the agent work in it for you, such as reading your email, finding a file in Drive or posting to Slack. You stay in control: you choose which apps to connect, and you can disconnect any of them at any time.

## Connect an app

1. Sign in at [chat.classgrid.in](https://chat.classgrid.in).
2. In the message box, tap the sliders icon to open the **AI Hub**.
3. Open the **Plugins** tab (**Plugins & Integrations**).
4. Tap the app you want, for example **Gmail** or **Notion**.
5. Tap **Connect**.
6. Follow the steps on screen. For most apps you sign in to that app and allow Classgrid AI to use it.
7. When you come back, the app shows as connected and you can start asking.

<callout type="info">Some apps ask for extra details. The WhatsApp Business plugin needs your own Meta app details (Phone Number ID, Permanent Access Token and Webhook Verify Token). For GitHub, see the Connect GitHub page.</callout>

## Use a connected app in chat

You don't need special commands. Just say what you want:

- "Read my unread emails from today."
- "What's on my calendar for tomorrow?"
- "Search my Notion for recent strategy docs."

### Point the agent at one app with @

1. Type **@** in the message box.
2. The menu lists your tools and every plugin.
3. Pick the app, then type your request.

This is handy when you use two similar apps, like Gmail and Outlook, and want the agent to use a certain one.

### Try asking the AI

Each plugin in the AI Hub has a **Try asking the AI** list. Tap an example to try it. Some examples ask for things the plugin can't do yet, so see [Plugins](/docs/plugins) for what each app can really do.

## The agent works as you

When you connect an app, the agent uses **your** account in that app:

- An email sent with the Gmail plugin comes from your Gmail address.
- A Slack message is posted as you.
- A Drive upload goes into your Drive.

Because of this, treat the agent's actions like your own.

<callout type="warning">Before the agent sends an email, posts a message or publishes something for you, ask it to show you a draft first. For example: "Draft the email and show me before sending."</callout>

## Disconnect an app

You can disconnect any app at any time.

1. Open the **AI Hub** and go to **Plugins**.
2. Tap the connected app.
3. Tap **Disconnect**.

After you disconnect, the agent can no longer use that app. Things the agent already did in the app, such as emails it sent, stay in that app.

You can also remove Classgrid's access from the app's own settings page, for example your Google account's security settings.

## Privacy tips

- **Connect only what you need.** Fewer connected apps means less the agent can reach.
- **Be clear about what to do.** "Send this email to riya@example.com" is safer than "reply to everyone".
- **Ask for a draft first** before anything is sent or posted.
- **Disconnect when you're done.** If you connected an app for one job, disconnect it after.
- **Use Incognito for private questions.** [Incognito](/docs/incognito) chats are not saved to your history.
- **Check before you share.** If a chat shows details from your apps, don't share it with a public [share link](/docs/share-links).

## Common questions

<details><summary>Can I connect more than one app?</summary>Yes. Connect as many plugins as you like. The agent can use several in one request, for example finding a file in Drive and emailing it with Gmail.</details>

<details><summary>Does the work in my apps use credits?</summary>Yes. The work the agent does uses your AI credits, like any other chat. See Credits and top ups.</details>

<details><summary>Can the agent use my apps during a WhatsApp call?</summary>Yes. During a WhatsApp call the agent can use your connected apps, such as Gmail, Google Calendar, Google Drive, Notion, GitHub and Vercel.</details>

## Related pages

- [Plugins](/docs/plugins)
- [Connect GitHub](/docs/connect-github)
- [Privacy and your data](/docs/privacy-and-data)
- [Credits and top ups](/docs/credits-and-top-ups)
