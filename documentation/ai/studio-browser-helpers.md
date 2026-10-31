---
title: Helpers and the Scratchpad
slug: studio-browser-helpers
category: studio-mode
order: 6
description: For big jobs, the agent sends helpers that work at the same time, in the browser and in your files, and keeps a shared plan in a scratchpad.
---

For a short job, like checking one page, the agent does the work itself. For a long job, like filling in many forms or testing a whole website, it plans first and sends **helpers** to do parts of the work at the same time.

## How it works

1. The agent writes a plan in the chat's **scratchpad**.
2. It sends helpers, each with its own task.
3. The helpers work at the same time, in your live browser and your project.
4. The agent checks on them, sends them messages if something changes, and puts their results together in its answer.

## Helpers

| | |
|---|---|
| **How many** | Up to 5 helpers at once in a chat |
| **What they can use** | In Studio, every helper can use the live browser and the scratchpad |
| **Permissions** | Helpers follow your permission mode. Their cards show in the same chat, and you answer them the same way |
| **GitHub** | Helpers never push to GitHub. Only the main agent does, and only when allowed |
| **Credits** | Helpers use credits like the rest of the chat |

### Which model a helper uses

- If you name a model, the agent uses it. For example: *"Use Claude Sonnet 5.5 for the helpers."*
- Otherwise, for browser work, it uses **Claude Sonnet 5.5** for hard sites (forms, many steps) and **DeepSeek V4.1 Flash** for simple ones.
- If the main model can't see pictures, browser helpers use **DeepSeek V4.1 Flash**.
- **Claude Fable** isn't used for helpers.

If a helper's model is busy or fails, Classgrid tries another model so the job keeps going.

### What helpers won't do

Helpers follow the same safety rules as the agent: they never type a password, a card number or a one-time code, and never pay, buy, send, post or delete anything. When a step needs one of these, they tell the agent, and the agent asks you to do it in the browser. See [The live browser](/docs/studio-live-browser).

## The scratchpad

The scratchpad is the chat's shared notebook: the plan, the steps done so far and what was found. The agent and its helpers all read and write it, so everyone works from the same plan.

| | |
|---|---|
| **One per chat** | Each chat has its own scratchpad |
| **How long it's kept** | 7 days |
| **Size** | Up to 20,000 characters |
| **Who sees it** | The agent and its helpers. You see the results in the agent's answers |

## Get the most out of helpers

- Give the whole job in one message, for example: *"Check all 20 product pages on our site. For each one, note the price, whether 'Add to cart' works, and any broken images."*
- Say if you want a specific model: *"Use DeepSeek V4.1 Flash for the helpers."*
- Keep **Default** mode on if you want to approve websites and typing as the helpers go.

## FAQ

<details>
<summary>Can I see what each helper is doing?</summary>

Yes. You see their browser steps live in the Browser tab, their commands in the Terminal tab and their screenshots in the Screenshots tab.

</details>

<details>
<summary>Do helpers have their own browser?</summary>

No. They share your one live browser, so their steps run one after another.

</details>
