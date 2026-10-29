# Solution page: For Research and Data

- **URL:** `/solutions/for-research` (new)
- **Replaces:** nothing (new page)
- **Who it's for:** students writing papers, researchers, analysts, and anyone stuck with long PDFs or messy spreadsheets
- **Goal:** sign up and ask a research question, or upload a spreadsheet
- **Sanity:** `solutionPage` slug `for-research`, `category: role`, label "For research and data"

---

## Hero

- **Eyebrow:** For research and data
- **Headline:** Real sources. Real numbers.
- **One line:** Search the web with citations, read long PDFs, clean messy spreadsheets, and get charts and PDF reports.
- **Buttons:** "Use Agent" → `https://chat.classgrid.in` · "Book a demo" → `/demo`

---

## Interactive demo (custom design)

Grey panel, `AgentRealWorkSection` layout. Three chips: **Cited answer** · **Clean my data** · **Live market**.

**Chip 1: Cited answer** (plays first)
- Card title: "Screen time and sleep"
- User: "What does recent research say about screen time and sleep in teenagers? Give me sources."
- "Worked for 1m 20s ›"
- Steps: "Searched the web" → "Opened 6 pages" → "Wrote the answer"
- Result: `CitedAnswerMock`: the app's `review` header ("Screen time and teen sleep") + 3 `points` rows, each ending in citation chips [1] [2] [3]. **Hover a chip** to show the source title and site.
- Floating card "Sources": 6 rows (site name + page title, made-up but realistic, e.g. "example-journal.org · Screen use and sleep in 13–18 year olds").

**Chip 2: Clean my data**
- File chip `survey-responses.csv`. User (home line): "Clean up messy spreadsheet data." + "Then chart the results."
- "Worked for 2m 31s ›"
- Steps (sandbox trail): "Ran Python" → "Fixed 214 dates, removed 37 duplicate rows" → "Drew 2 charts" → "Built report.pdf"
- Result: `ChartMock` (doughnut "How often do you study online?")
- Floating `CreatedFilesCard`: `cleaned.xlsx`, `charts/answers.png`, `report.pdf`

**Chip 3: Live market**
- User: "How did Infosys shares do this month? Show a chart."
- Result: `LiveCardsMock` market card (share price, % change, small line chart). The market card covers stock and forex prices. Don't show an index. Use made-up numbers, and say so in the alt text.
- Floating card: a `chart` drawn from Python (monthly line), with the caption "Not financial advice."

---

## Feature blocks

### 1. Answers with sources you can check
- **Text:** The agent searches the web, opens the pages and reads them, then answers with numbered sources you can click. Long pages are read in parts, so nothing important gets skipped.
- **Facts:** `search_web` with numbered [n] citations; `open_url` reads long pages in parts and adds them as sources; `review`, `scores`, `points` blocks. There is **no separate "Deep research" mode**. The agent does the searching itself.
- **Mock:** text left, grey panel. `CitedAnswerMock` + floating Sources card.

### 2. Read any file
- **Text:** PDFs, Word files, slides, Excel sheets, CSVs, images and audio. Ask questions about them, compare them, or pull out tables and quotes.
- **Facts:** `parse_document` (PDF, .docx, .pptx with speaker notes, .xlsx/.xls, CSV, text), `analyze_image`, `transcribe_audio`; up to 6 files per message; Library keeps your uploaded and AI-made files ("Manage your uploaded and AI-generated files").
- **Mock:** text right, teal panel. User bubble with 3 chips (`paper-1.pdf`, `paper-2.pdf`, `data.xlsx`) "Compare the methods in these two papers". Result: a 3-row comparison. Floating Library card with search + 4 files.

### 3. Real Python for real data
- **Text:** The agent writes and runs Python for you: cleaning, statistics, charts and models. You get the files back: Excel, charts and a PDF report.
- **Facts:** `run_code` in a sandbox with pandas, numpy, matplotlib, seaborn, scipy, statsmodels, scikit-learn, openpyxl and more; `chart` block (bar, line, pie, doughnut, radar); `mermaid` diagrams; `generate_pdf`.
- **Mock:** text left, grey panel. Chat card with the step trail and a code peek (`df.drop_duplicates()`), floating `CreatedFilesCard`.

### 4. Live cards in the answer
- **Text:** Ask about a stock, the weather, a place or a deadline and get a live card: price charts, a 5-day forecast, a map pin or a countdown.
- **Facts:** `market` (stock/forex price + chart), `weather` (live + 5 days), `map` (place pin or route), `countdown`, `clock`.
- **Mock:** text right, teal panel. `LiveCardsMock`: market, weather and map cards in a row (stacked on phone).

(No Grids block on this page. Optional small line under block 3: "Share your findings with a read-only link or in a Grids group" → `/solutions/grids`.)

---

## Plugins strip

| Plugin | One line |
|---|---|
| Google Drive | Find and read your files, save results |
| Google Forms | Read survey responses, create a new form |
| Notion | Search your notes, save findings to a page |
| Supabase | Run SQL on your project's database |
| Gmail | Read emails and attachments |

Link: "See all plugins" → `/plugins`.

---

## Example tasks grid

Exact wording from the app (home lines):
- "Research a topic with real sources."
- "Search the web with sources."
- "Outline a literature review."
- "Analyse a file in seconds."
- "Clean up messy spreadsheet data."
- "Draw a chart from your data."
- "Create a PDF report in minutes."
- "Write SQL queries from plain English."

---

## FAQ

1. **Are the sources real?** Yes. Every [n] links to a page the agent opened. Always click through and check what matters.
2. **Is there a "deep research" mode?** No separate mode is needed. Ask your question, and the agent searches, opens pages and reads them itself.
3. **Which files can it read?** PDF, Word, PowerPoint, Excel, CSV and text files, plus images and audio. Up to 6 files in one message.
4. **Does it really run code?** Yes. It writes Python and runs it in a safe sandbox, then gives you the files it made.
5. **Can it read my survey results?** Yes. Upload the CSV or Excel export, or connect Google Forms and it can read the responses.
6. **Can I keep a chat private?** Use Incognito. Incognito chats aren't saved to your history.

---

## Images to capture (real app, light + dark)

1. **A cited web answer** with `review` / `scores` / `points` blocks and [n] chips.
2. **A chart answer** from a made-up spreadsheet, with the sandbox step trail open.
3. **Live cards**: market, weather, map (one screenshot each or one chat with all three).
4. **Library page** with search and a few made-up files.
5. **A mermaid diagram** answer (e.g. a research process flow).
- Blur: any real email or file names from a real account.

## Custom design needed (coded mocks)

- `CitedAnswerMock` (hoverable [n] chips), Sources card, `ChartMock` (doughnut + line), sandbox step trail with code peek, `CreatedFilesCard`, `LiveCardsMock` (market/weather/map), Library card.

## SEO

- **Title:** AI research and data analysis agent | Classgrid AI
- **Description:** Search the web with real citations, read long PDFs, clean messy spreadsheets and turn data into charts and PDF reports. Free to start.

## Do not claim (this page)

- A "Deep research" mode or engine (the `@` item only adds text).
- Access to paid journal databases, plagiarism checks, or citations that are always right.
- Editing Google Sheets in place (Drive can read and save files; there's no Sheets plugin).
- Financial advice or trading. The market card shows data only.
- Any upload size or row limit. Any price number.
- Schedules that "monitor" a topic or send fresh updates.
