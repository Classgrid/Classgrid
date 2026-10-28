---
title: Code and Data
slug: code-and-data
category: agent-mode
order: 5
description: Let the agent write and run Python, JavaScript or shell code to clean data, draw charts and make Word, PowerPoint, Excel and PDF files.
---

Classgrid AI has its own safe code sandbox. When a job needs real work, such as cleaning a spreadsheet, drawing a chart, doing maths or building a file, the agent writes code, runs it, checks the result and gives you the output. You do not need to know how to code.

## The code sandbox

The agent can write and run **Python**, **JavaScript** (Node 20) or **bash** (shell) code. Each run happens in a separate, safe sandbox, and you can watch the steps in the chat.

The sandbox comes ready with common tools, for example:

| Area | Tools included |
|---|---|
| **Data and maths** | pandas, numpy, scipy, sympy, scikit-learn, statsmodels |
| **Charts** | matplotlib, seaborn |
| **Documents** | python-docx (Word), python-pptx (PowerPoint), openpyxl (Excel), LibreOffice, pymupdf and pdfplumber (PDF) |
| **Images and video** | ImageMagick, OpenCV, ffmpeg, moviepy |
| **Text** | Tesseract (reading text from images), spaCy, NLTK |
| **Web** | Playwright and Chromium (a real browser), yt-dlp |
| **Finance** | yfinance |
| **Other** | qrcode, TypeScript |

## Data cleaning and analysis

Upload a CSV or Excel file (see [Files and documents](/docs/files-and-documents)) and ask in plain words:

- "Clean up messy spreadsheet data: fix the dates, remove duplicates and split the name column."
- "Show total sales by month and the top 5 products."
- "Find customers whose orders dropped by more than 10% since last quarter."
- "Group these survey answers into themes and count each one."
- "Pull the stock price history for this company and show the 50-day average."

The agent loads the data, does the work in code and shows you the result. Ask for the cleaned file back as Excel or CSV.

## Charts

There are two kinds of charts:

- **Chart cards** in the chat — bar, line, pie, doughnut and radar charts you can view right in the answer. See [Answer cards](/docs/answer-cards).
- **Chart images** made in the sandbox — useful when you need a picture to put in a report, slide or post.

Try: "Draw a chart from your data", "Make a line chart of monthly revenue and save it as an image", or "Plot this maths function and show the working."

## Making files

The agent can create real files and give you a download link:

| File | Try asking |
|---|---|
| **PDF** | "Create a PDF report in minutes from these notes." / "Make an invoice for this order as a PDF." |
| **Word** | "Write a project proposal as a Word document." |
| **PowerPoint** | "Make a 10-slide presentation on our quarterly results." |
| **Excel** | "Turn this list into an Excel sheet with totals and a summary tab." |
| **Images** | "Make a QR code for my website link." |
| **Audio or video** | "Trim this video to the first 30 seconds." / "Pull the audio out of this video as an MP3." |

Files you get from the agent are kept in your [Library](/docs/library). Once your WhatsApp is [verified](/docs/verify-whatsapp), you can also ask "Send the PDF to my WhatsApp", and it arrives as a real file. Or ask the agent to email it (see [Email the agent](/docs/email-the-agent)).

<callout type="info">

A good pattern is: upload data, ask for analysis, then say "Make this into a PDF report with the charts". You get the numbers, the visuals and a file you can share, in one chat.

</callout>

## Coding help

- "Write SQL queries from plain English."
- "Debug an error in your code." (paste the error and the code)
- "Write a Python script that renames these files by date, and test it."
- "Explain what this JavaScript function does, line by line."

The agent can run the code to check it works before giving it to you. For working on a full code project with GitHub, use [Project Mode](/docs/project-mode).

## Tips

- **Describe the result, not the code.** "A table of average sales by region" is enough.
- **Say the file type you want back.** "As Excel", "as a PDF", "as a PowerPoint".
- **Check the steps.** The chat shows what the agent ran, so you can see how it got the answer.
- **Ask it to explain.** "Explain what you did in simple words" is useful for learning.
- **Keep going.** "Now add a column for profit" or "make the chart blue" — it builds on what it already did.

## FAQ

<details>
<summary>Do I need to install Python or anything else?</summary>

No. Everything runs in Classgrid's sandbox in the cloud.

</details>

<details>
<summary>Can it build a website with code?</summary>

Yes. It can build a site and publish it at `yourname.sites.classgrid.in`. See [Publish a website](/docs/publish-a-website).

</details>

<details>
<summary>Is the code sandbox the same as Project Mode?</summary>

No. The sandbox is for one-off jobs inside a chat. [Project Mode](/docs/project-mode) is a full code editor linked to your GitHub, where changes are saved as pull requests.

</details>
