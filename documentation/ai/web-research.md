---
title: Web Research
slug: web-research
category: agent-mode
order: 2
description: Search the web for current information, get answers with numbered [n] citations, and have the agent read any link.
---

Classgrid AI can search the web for current news and facts and read any page you point it to. Answers from the web show numbered **[n]** citations, so you can check every claim against its source.

## How web search works

Web search is always available in Agent mode. You do not need to switch anything on: if your question needs fresh information, the agent searches by itself.

1. You ask a question, for example "What changed in India's income tax rules this year?"
2. The agent searches the web and opens the most useful pages.
3. It writes an answer with numbered citations like **[1]**, **[2]**.
4. Click a citation to open the source page.

You can also type `@` and pick **Web search** ("Find real-time news and info") to make it clear you want a web answer.

## Reading a link

Paste any web address into your message and ask about it:

- "Summarise this article: https://…"
- "Read this page and list the key dates."
- "Compare the pricing on these two pages." (paste both links)

The agent opens the page and reads it, even long pages, which it reads in parts. The page then becomes a source it can cite in its answer.

<callout type="info">

For YouTube videos, ask "Summarise this YouTube video" and paste the link. The agent can fetch the video's audio in its [code sandbox](/docs/code-and-data), turn it into text and summarise it.

</callout>

## What you can do with it

| Goal | Try asking |
|---|---|
| Catch up on news | "Give me today's top 5 tech news stories with sources." |
| Research a topic | "Research a topic with real sources: the effect of screen time on sleep." |
| Background reading | "Find the main articles on solar microgrids and summarise each one, with sources." |
| Compare products | "Compare the top 3 budget laptops under a set price, with a score for each." |
| Fact-check | "Is this claim true? Show me sources." |
| Follow a market | "What is the current price of gold and how has it moved this month?" |

Research answers can come as [answer cards](/docs/answer-cards), for example score bars, star ratings and key points, with **[n]** citation chips.

## Tips for better research

- **Be specific.** "Latest RBI repo rate decision and what it means for home loans" works better than "RBI news".
- **Say how fresh you need it.** Add "from the last week" or "as of today".
- **Ask for the format you want.** "Give me a table", "5 bullet points", or "a one-page brief I can download as a PDF".
- **Ask it to read more.** "Open the top 5 results and compare them" makes it go deeper than a single search.
- **Give it the source.** If you already trust a page, paste the link and ask it to use that.
- **Check the citations.** Click the **[n]** links for anything important before you rely on it.
- **Turn it into a file.** "Make this into a PDF report" or "Email this brief to me". See [Code and data](/docs/code-and-data) and [Email the agent](/docs/email-the-agent).

<callout type="warning">

The web can be wrong or out of date. Citations show you where each fact came from so you can check it, especially for health, legal or money decisions.

</callout>

## Research in the background

For bigger research jobs, ask the agent to take its time. It can keep working as a [long task](/docs/long-tasks) and send you the finished result on WhatsApp or email.

## FAQ

<details>
<summary>Do I need to turn web search on?</summary>

No. It is always available. The agent searches whenever your question needs current information.

</details>

<details>
<summary>Can it read pages behind a login?</summary>

It reads pages that are open on the web. For your own apps, such as Gmail, Google Drive or Notion, connect them as [plugins](/docs/plugins) instead.

</details>

<details>
<summary>Can I get a fresh news summary every morning?</summary>

Not with a schedule. [Schedules](/docs/schedules-and-reminders) send a message written when you create them; the AI does not search again at that time. Ask for a fresh summary in chat whenever you want one.

</details>
