---
title: Why is a plugin not working?
slug: a-plugin-is-not-working
category: troubleshooting
order: 4
summary: Check the app is connected, the request is something the plugin can do, and reconnect if needed.
---

If the agent can't do something in one of your apps, work through these checks.

## 1. Is the app connected?

1. Click the sliders icon (**AI Hub**) in the message box.
2. Open **Plugins**.
3. Check the app shows as connected. If not, tap it and tap **Connect**.

## 2. Is it something the plugin can do?

Each plugin does a set list of things. Some examples of what they **can't** do:

- **Google Calendar** can list and create events, but can't move, cancel or edit them.
- **Zoom** and **Google Meet** can set up meetings, but can't get recordings or summaries.
- **Vercel** can deploy, but can't roll back or show build logs.
- **Outlook** can't delete or move emails.
- **Canva** can create, export and resize designs, but can't edit what's inside a design.
- **Instagram Business** needs an image to post. Reels, stories and scheduled posts aren't supported.
- **Spotify** playback needs Spotify Premium and the Spotify app open on one of your devices.

Some **Try asking the AI** examples ask for things a plugin can't do yet. Check the full list in [Plugins](/docs/plugins).

## 3. Did you point the agent at the right app?

If you use two similar apps, like Gmail and Outlook, type `@` in the message box and pick the app you mean. The `@` menu lists every plugin.

## 4. Reconnect the app

1. In **AI Hub** → **Plugins**, tap the app and tap **Disconnect**.
2. Tap **Connect** again and sign in.
3. Allow all the access the app asks for.
4. Try your request again.

## 5. WhatsApp Business plugin

This plugin needs your own Meta app details: Phone Number ID, Permanent Access Token (System User) and Webhook Verify Token. Check they're correct. It sends from **your** business number, not the Classgrid number.

## 6. Are you out of credits?

Work in your apps uses credits. See [Out of credits](/help-center/article/out-of-credits).

## Still not working?

Contact us from the [support page](/support). Tell us which app and what you asked.

Related: [Connect an app](/help-center/article/connect-an-app) · Full details: [Connect and disconnect apps](/docs/connect-and-disconnect-apps).
