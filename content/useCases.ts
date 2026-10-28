// Use cases shown at /use-cases. The same content lives in Sanity (aiUseCase); this copy is used when Sanity has none.

export type UseCaseCapability =
  | "Research"
  | "Documents"
  | "Data"
  | "Coding"
  | "Websites"
  | "Images"
  | "WhatsApp"
  | "Automation"
  | "Email & calendar"
  | "Teamwork";

export const USE_CASE_CAPABILITIES: UseCaseCapability[] = [
  "Research",
  "Documents",
  "Data",
  "Coding",
  "Websites",
  "Images",
  "WhatsApp",
  "Automation",
  "Email & calendar",
  "Teamwork",
];

export type UseCase = {
  slug: string;
  title: string;
  summary: string;
  capabilities: UseCaseCapability[];
  icon: string;
  challenge: string;
  solution: string;
  result: string;
  steps: string[];
  tryPrompt: string;
  relatedSolution?: { label: string; href: string };
  order: number;
};

export const LOCAL_USE_CASES: UseCase[] = [
  {
    slug: "research-with-sources",
    title: "Research a topic with real sources",
    summary: "Get one clear answer from the web, with a source for every claim.",
    capabilities: ["Research"],
    icon: "Search",
    challenge:
      "You open ten tabs, skim each page and still aren't sure which facts are current or where they came from. Copying notes from every site takes longer than the reading.",
    solution:
      "Ask Classgrid AI in Agent mode. It searches the web by itself, opens the most useful pages and writes one answer with numbered citations. Paste a link and it reads that page too, even a long one.",
    result: "One answer where every claim links back to the page it came from, so you can check it in a click.",
    steps: [
      "Open chat.classgrid.in and ask your question in plain words.",
      "Paste any links you want it to read as well.",
      "Click a citation like [1] to open the source page.",
    ],
    tryPrompt: "What changed in India's income tax rules this year? Give me sources.",
    relatedSolution: { label: "Research & data", href: "/solutions/research" },
    order: 1,
  },
  {
    slug: "summarise-long-documents",
    title: "Summarise long PDFs and documents",
    summary: "Turn a long report, contract or slide deck into short notes.",
    capabilities: ["Documents"],
    icon: "FileText",
    challenge:
      "A 60-page report or contract lands right before a meeting. Reading it properly takes hours, and the dates, numbers and to-dos you need are buried inside.",
    solution:
      "Upload the file and say what you need. Classgrid AI reads PDFs, Word files, PowerPoint slides with their speaker notes, spreadsheets, photos and voice notes, up to 6 files in one message.",
    result: "Short notes with the key points, dates and follow-ups, and answers to your questions taken from what's inside the file.",
    steps: [
      "Attach the file with the paperclip in the message box.",
      "Ask for a summary, the key dates or a list of to-dos.",
      "Ask follow-up questions, like \"When does this contract end?\"",
    ],
    tryPrompt: "Summarise this report in one page and list every deadline in it.",
    relatedSolution: { label: "Documents & files", href: "/solutions/documents-and-files" },
    order: 2,
  },
  {
    slug: "spreadsheet-to-charts",
    title: "Turn a spreadsheet into charts and a report",
    summary: "Clean messy data, find the trends and get charts you can share.",
    capabilities: ["Data", "Documents"],
    icon: "BarChart3",
    challenge:
      "Exports come with blank rows, mixed date formats and duplicate entries. Cleaning them and building charts by hand eats a whole afternoon.",
    solution:
      "Upload the Excel or CSV file and ask. Classgrid AI writes and runs Python in its own safe sandbox to clean the data, do the maths and draw the charts, then checks the result before it answers.",
    result: "A cleaned file, clear charts and a short report you can download. Files it makes are kept in your Library.",
    steps: [
      "Attach your .xlsx or .csv file.",
      "Say what you want to know, like monthly totals or the top products.",
      "Ask for a chart, a cleaned file or a PDF report.",
    ],
    tryPrompt: "Clean up this sales sheet and show monthly sales as a line chart.",
    relatedSolution: { label: "Research & data", href: "/solutions/research" },
    order: 3,
  },
  {
    slug: "make-office-files",
    title: "Make Word, PowerPoint and Excel files",
    summary: "Describe the file you need and get a finished one back.",
    capabilities: ["Documents"],
    icon: "Presentation",
    challenge:
      "Starting from a blank page is slow, and formatting a document, a deck or a sheet often takes longer than writing what goes in it.",
    solution:
      "Tell Classgrid AI what you need: a proposal, a slide deck or a tracker sheet. It writes the content and builds a real Word, PowerPoint, Excel or PDF file for you.",
    result: "A finished file you can download and edit. It's also saved in your Library so you can find it later.",
    steps: [
      "Describe the file, who it's for and what it should include.",
      "Add any notes or files it should use.",
      "Download the file, or ask for changes and get a new version.",
    ],
    tryPrompt: "Make a 6-slide PowerPoint introducing our bakery's new menu.",
    relatedSolution: { label: "Documents & files", href: "/solutions/documents-and-files" },
    order: 4,
  },
  {
    slug: "fix-a-bug-with-a-pull-request",
    title: "Fix a bug and open a pull request",
    summary: "Let the agent find and fix the problem, then review it as a pull request.",
    capabilities: ["Coding"],
    icon: "GitPullRequest",
    challenge:
      "A build is failing or a bug report is waiting, and the code is unfamiliar. Tracking down the cause means reading many files and running the project again and again.",
    solution:
      "Open your GitHub repo in Project Mode, a code editor in your browser with the agent beside you. It reads the code, edits files and runs commands and builds. You review every change, and pushing opens a pull request on its own classgrid/ branch, never on main.",
    result: "A pull request with the fix that you review and merge on GitHub. Your code stays on GitHub.",
    steps: [
      "Switch to Project Mode and connect GitHub.",
      "Open the repo and describe the bug or paste the error.",
      "Review the changes, then ask the agent to push to GitHub.",
    ],
    tryPrompt: "The build fails with this error. Find the cause and fix it.",
    relatedSolution: { label: "Project Mode", href: "/solutions/project-mode" },
    order: 5,
  },
  {
    slug: "build-and-deploy-on-vercel",
    title: "Build an app and put it live on Vercel",
    summary: "Go from an idea to a live preview on your own Vercel account.",
    capabilities: ["Coding", "Websites"],
    icon: "Rocket",
    challenge:
      "Setting up a new project, writing the first version and getting it online takes many tools and many steps before anyone can see it.",
    solution:
      "Start in Project Mode and ask the agent to build what you have in mind. Push your work to GitHub, connect the Vercel plugin, and ask the agent to create the Vercel project and deploy it.",
    result: "A live preview on your own Vercel account that you can open and share.",
    steps: [
      "Describe the app in Project Mode and let the agent build it.",
      "Push your work to GitHub.",
      "Connect Vercel in the AI Hub and ask the agent to deploy.",
    ],
    tryPrompt: "Build a simple booking page for my salon with a contact form.",
    relatedSolution: { label: "Project Mode", href: "/solutions/project-mode" },
    order: 6,
  },
  {
    slug: "publish-a-website",
    title: "Publish a website from one chat",
    summary: "Describe a site, pick a name and get a live link.",
    capabilities: ["Websites"],
    icon: "Globe",
    challenge:
      "You need a simple site for a portfolio, an event or a small shop, but hosting, domains and code feel like too much for something small.",
    solution:
      "Describe the site in Agent mode. Classgrid AI writes the pages, styles and images, then publishes it at a name you choose on sites.classgrid.in.",
    result: "A live website at yourname.sites.classgrid.in that you can share with anyone.",
    steps: [
      "Describe the site and what it should show.",
      "Tell the agent the name you want.",
      "Open the link it sends back and share it.",
    ],
    tryPrompt: "Build me a one-page portfolio site and publish it as priya-designs.",
    relatedSolution: { label: "Agent mode", href: "/solutions/agent-mode" },
    order: 7,
  },
  {
    slug: "create-images",
    title: "Create images for posts and flyers",
    summary: "Turn a short description into an image you can use.",
    capabilities: ["Images"],
    icon: "Image",
    challenge:
      "You need a picture for a post, a thumbnail or a flyer today, and searching stock sites or waiting on a designer takes too long.",
    solution:
      "Describe the image in Agent mode, or type @ and pick Create image. Classgrid AI makes it and shows it in the chat.",
    result: "A new image right in the chat. Every image you create is kept in the AI Hub under Images.",
    steps: [
      "Describe what you want to see, the style and the colours.",
      "Ask for changes until it looks right.",
      "Download it or find it later in the AI Hub.",
    ],
    tryPrompt: "Make a YouTube thumbnail background for a video about budget travel in Goa.",
    relatedSolution: { label: "Agent mode", href: "/solutions/agent-mode" },
    order: 8,
  },
  {
    slug: "hand-off-a-task-by-whatsapp-call",
    title: "Hand off a task with a WhatsApp call",
    summary: "Call your AI agent, say what you need and get the result on WhatsApp.",
    capabilities: ["WhatsApp", "Automation"],
    icon: "Phone",
    challenge:
      "Work comes up when you're away from your laptop: on the road, between meetings or out of the office. By the time you're back at a desk, it has waited hours.",
    solution:
      "Verify your WhatsApp number once, then call Classgrid AI on WhatsApp at +91 81492 77038. Say what you need in English. Quick questions get answered on the call, and bigger jobs keep running after you hang up.",
    result: "The work gets done while you're away, and the result arrives on your WhatsApp.",
    steps: [
      "Verify your WhatsApp number on chat.classgrid.in.",
      "Save +91 81492 77038 as Classgrid AI and make a WhatsApp voice call.",
      "Say the task, hang up, and wait for the result on WhatsApp.",
    ],
    tryPrompt: "Find three good hotels near Pune station under my budget and send me the list.",
    relatedSolution: { label: "WhatsApp calls", href: "/solutions/whatsapp-calls" },
    order: 9,
  },
  {
    slug: "email-a-task-to-the-agent",
    title: "Email a task to the agent",
    summary: "Send an email to agent@classgrid.in and the work starts by itself.",
    capabilities: ["Automation", "Email & calendar"],
    icon: "Send",
    challenge:
      "You're already in your inbox with the file someone sent, and switching apps to start a new job breaks your flow.",
    solution:
      "Forward or write the request to agent@classgrid.in from the email on your account, with any files attached. The agent picks it up within a minute and works on it in the background.",
    result: "The agent does the work in the background and sends you a message with a link to the chat when it's done.",
    steps: [
      "Write to agent@classgrid.in from your Classgrid email address.",
      "Say what you want and attach the files it needs.",
      "Get the result when the task is done.",
    ],
    tryPrompt: "Turn the attached PDF into a one-page summary with the key points.",
    relatedSolution: { label: "Reminders & automation", href: "/solutions/reminders-and-automation" },
    order: 10,
  },
  {
    slug: "catch-up-on-your-inbox",
    title: "Catch up on your inbox",
    summary: "Find out what needs a reply without reading every email.",
    capabilities: ["Email & calendar"],
    icon: "Inbox",
    challenge:
      "After a busy day the inbox is full, and the few emails that really need you are mixed in with newsletters and updates.",
    solution:
      "Connect Gmail in the AI Hub. Classgrid AI works as you inside it: it searches and reads your emails and their attachments, and sends a reply only when you ask it to.",
    result: "A short list of what matters and what needs a reply, with replies sent when you approve them.",
    steps: [
      "Open the AI Hub and connect Gmail.",
      "Ask it to read today's unread emails.",
      "Ask for a reply to any email and send it when it looks right.",
    ],
    tryPrompt: "Read my unread emails from today and tell me which ones need a reply.",
    relatedSolution: { label: "Email & calendar", href: "/solutions/email-and-calendar" },
    order: 11,
  },
  {
    slug: "plan-your-day-from-your-calendar",
    title: "Plan your day from your calendar",
    summary: "See your day at a glance and add meetings by asking.",
    capabilities: ["Email & calendar"],
    icon: "CalendarDays",
    challenge:
      "Your day is spread across invites and notes, and booking a new meeting means opening the calendar and filling in every field.",
    solution:
      "Connect Google Calendar in the AI Hub. Ask what's on your day, and ask it to add events, with a Google Meet link if you want one.",
    result: "A clear view of your day and new meetings added without leaving the chat.",
    steps: [
      "Open the AI Hub and connect Google Calendar.",
      "Ask what's on your calendar for today or tomorrow.",
      "Ask it to add an event, with a Meet link if you need one.",
    ],
    tryPrompt: "What's on my calendar tomorrow? Add a 30-minute call with Rahul at 4 pm with a Meet link.",
    relatedSolution: { label: "Email & calendar", href: "/solutions/email-and-calendar" },
    order: 12,
  },
  {
    slug: "never-miss-a-deadline",
    title: "Never miss a deadline with reminders",
    summary: "Set reminders by asking, and get them by email and WhatsApp.",
    capabilities: ["Automation"],
    icon: "AlarmClock",
    challenge:
      "Bills, renewals and weekly reports are easy to forget, and setting up repeating reminders across apps is a chore.",
    solution:
      "Tell Classgrid AI what to remind you about and when, once or on repeat. It writes the reminder and creates a schedule, and you can see it on the Scheduled page.",
    result: "The reminder arrives by email at the right time, and on WhatsApp too if your number is verified.",
    steps: [
      "Ask in Agent mode, like \"Remind me every Friday at 6 pm\".",
      "Check the schedule on the Scheduled page.",
      "Get the reminder by email and WhatsApp.",
    ],
    tryPrompt: "Remind me to send the weekly sales report at 6 pm every Friday.",
    relatedSolution: { label: "Reminders & automation", href: "/solutions/reminders-and-automation" },
    order: 13,
  },
  {
    slug: "plan-and-decide-together",
    title: "Plan and decide together in a group",
    summary: "Chat, vote and ask the AI together in one place.",
    capabilities: ["Teamwork"],
    icon: "Users",
    challenge:
      "Group plans get lost in long chats. Nobody knows what was decided, and choosing a date or a place takes days of back and forth.",
    solution:
      "Use Grids, the messaging part of Classgrid AI. Create a group, run a poll with up to 10 options, and ask the AI to sum up what was said. With Share Grid, up to 4 people can ask the AI together in one chat.",
    result: "Quicker decisions, a clear record of what was agreed and an AI that everyone can ask.",
    steps: [
      "Open Grids and create a group.",
      "Start a poll, or ask the AI to make one for you.",
      "Share an AI chat with Share Grid so everyone can ask together.",
    ],
    tryPrompt: "Make a poll for our team lunch: Friday, Saturday or Sunday.",
    relatedSolution: { label: "Grids", href: "/solutions/grids" },
    order: 14,
  },
];
