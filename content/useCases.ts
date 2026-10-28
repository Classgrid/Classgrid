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
  | "Teamwork"
  | "Learning"
  | "Audio & video"
  | "Writing"
  | "Connected apps";

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
  "Learning",
  "Audio & video",
  "Writing",
  "Connected apps",
];

export type UseCaseAudience = "Students" | "Faculty" | "Developers" | "Work" | "Everyday life";

export const USE_CASE_AUDIENCES: UseCaseAudience[] = ["Students", "Faculty", "Developers", "Work", "Everyday life"];

export type UseCase = {
  slug: string;
  title: string;
  summary: string;
  capabilities: UseCaseCapability[];
  audiences: UseCaseAudience[];
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
    audiences: ["Students", "Work"],
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
    audiences: ["Students", "Faculty", "Work"],
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
    audiences: ["Work", "Students"],
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
    audiences: ["Work", "Faculty", "Students"],
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
    audiences: ["Developers"],
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
    audiences: ["Developers"],
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
    audiences: ["Everyday life", "Work"],
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
    audiences: ["Everyday life", "Work"],
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
    audiences: ["Everyday life", "Work"],
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
    audiences: ["Work"],
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
    audiences: ["Work"],
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
    audiences: ["Work", "Faculty"],
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
    audiences: ["Everyday life", "Students"],
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
    audiences: ["Students", "Everyday life", "Work"],
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
  {
    slug: "code-anywhere-in-an-online-editor",
    title: "Code from anywhere in an online editor with AI",
    summary: "VS Code in your browser with an AI agent built in. Nothing to install.",
    capabilities: ["Coding", "Learning"],
    audiences: ["Students", "Developers"],
    icon: "Code2",
    challenge:
      "Setting up a code editor, tools and packages on every computer takes time, and a college lab PC or a borrowed laptop rarely has what you need. Your code ends up stuck on one machine.",
    solution:
      "Open Project Mode on chat.classgrid.in. It's VS Code running in your browser, with a built-in terminal and the Classgrid agent in its own panel. Packages install by themselves, and Python and Node are ready. Your code is kept on GitHub, not on the computer you're using.",
    result: "Code from any computer with a browser, with an AI that writes, explains and fixes code beside you, and no setup or local storage needed.",
    steps: [
      "Sign in at chat.classgrid.in and switch to Project Mode.",
      "Connect GitHub and open a repo, or start a new one.",
      "Open the Agent panel and ask it to build, explain or fix code.",
    ],
    tryPrompt: "Explain how this project works and add a contact form to the home page.",
    relatedSolution: { label: "Project Mode", href: "/solutions/project-mode" },
    order: 15,
  },
  {
    slug: "learn-to-code-with-ai",
    title: "Learn to code with an AI that runs your code",
    summary: "Ask why your code fails and see it fixed and run, step by step.",
    capabilities: ["Coding", "Learning"],
    audiences: ["Students", "Developers"],
    icon: "Code2",
    challenge:
      "When you're learning to code, one error message can block you for hours, and online answers often don't match your exact code.",
    solution:
      "Paste your code and the error into Agent mode. Classgrid AI explains what went wrong in plain words, then writes and runs Python or JavaScript in its own safe sandbox to show the fix working.",
    result: "You understand the mistake, see working code and learn the idea behind it, not just the answer.",
    steps: [
      "Paste your code and the error message.",
      "Ask it to explain the problem simply.",
      "Ask it to run the fixed code and show you the output.",
    ],
    tryPrompt: "My Python loop prints the wrong total. Explain why and run the fixed version.",
    relatedSolution: { label: "Agent mode", href: "/solutions/agent-mode" },
    order: 16,
  },
  {
    slug: "lecture-recordings-to-notes",
    title: "Turn lecture recordings into notes",
    summary: "Upload a recording or a video and get clean, short notes.",
    capabilities: ["Audio & video", "Learning"],
    audiences: ["Students", "Faculty"],
    icon: "AudioLines",
    challenge:
      "Writing notes during a fast lecture means missing what's being said, and replaying a long recording to find one point takes forever.",
    solution:
      "Upload the audio or video recording. Classgrid AI turns the speech into text, then writes clear notes, key points and a short summary from it.",
    result: "Readable notes of the whole lecture that you can search, revise from and ask questions about.",
    steps: [
      "Attach the recording (.mp3, .wav, .webm or a video file).",
      "Ask for notes, key points or a summary.",
      "Ask questions about anything that was said.",
    ],
    tryPrompt: "Make clear notes from this lecture recording with the key points at the top.",
    relatedSolution: { label: "Documents & files", href: "/solutions/documents-and-files" },
    order: 17,
  },
  {
    slug: "study-with-flashcards-and-quizzes",
    title: "Study with flashcards and quizzes",
    summary: "Turn your notes or a PDF into flashcards and a quiz you can take.",
    capabilities: ["Learning"],
    audiences: ["Students"],
    icon: "Layers",
    challenge:
      "Re-reading notes feels like studying but doesn't show what you really remember, and making flashcards by hand takes longer than revising.",
    solution:
      "Upload your notes or a chapter and ask. Classgrid AI makes flashcards that hide the answer until you reveal it, and quizzes with clickable choices and a score at the end.",
    result: "Active practice in minutes, and a clear view of what you still need to revise.",
    steps: [
      "Attach your notes, a PDF or paste the text.",
      "Ask for flashcards or a quiz.",
      "Practise, check your score and ask about the ones you got wrong.",
    ],
    tryPrompt: "Make 10 flashcards from this chapter, then quiz me on it.",
    relatedSolution: { label: "Agent mode", href: "/solutions/agent-mode" },
    order: 18,
  },
  {
    slug: "plan-your-exam-preparation",
    title: "Plan your exam preparation",
    summary: "Get a day-by-day study plan and reminders to keep going.",
    capabilities: ["Learning", "Automation"],
    audiences: ["Students"],
    icon: "ClipboardList",
    challenge:
      "With many subjects and little time, it's hard to decide what to study each day, and plans made on paper are easy to forget.",
    solution:
      "Tell Classgrid AI your exam dates and subjects. It makes a planner card with a day-by-day plan, ticks and days left. Tap Set reminders and it creates schedules for the plan.",
    result: "A clear plan for every day until the exam, with reminders by email and WhatsApp.",
    steps: [
      "Share your exam dates, subjects and how many hours you have.",
      "Check the day-by-day planner and ask for changes.",
      "Tap Set reminders to get reminders for your plan.",
    ],
    tryPrompt: "My exams start on 15 December. Make me a study plan for 5 subjects, 3 hours a day.",
    relatedSolution: { label: "Reminders & automation", href: "/solutions/reminders-and-automation" },
    order: 19,
  },
  {
    slug: "solve-maths-step-by-step",
    title: "Solve maths problems step by step",
    summary: "See every step of the working, with proper formulas.",
    capabilities: ["Learning"],
    audiences: ["Students"],
    icon: "Sigma",
    challenge:
      "Answer keys show the final answer but not how to get there, so you can't tell where your own working went wrong.",
    solution:
      "Type or upload a photo of the problem. Classgrid AI explains each step with proper maths formulas, and can run the numbers in its code sandbox to check the answer.",
    result: "A worked solution you can follow line by line, and a checked final answer.",
    steps: [
      "Type the problem or attach a clear photo of it.",
      "Ask for the steps, not just the answer.",
      "Ask about any step you don't follow.",
    ],
    tryPrompt: "Solve this integral step by step and check the answer.",
    relatedSolution: { label: "Agent mode", href: "/solutions/agent-mode" },
    order: 20,
  },
  {
    slug: "make-question-papers-from-notes",
    title: "Make quizzes and question papers from your notes",
    summary: "Turn your teaching notes into questions with answers.",
    capabilities: ["Learning", "Documents"],
    audiences: ["Faculty"],
    icon: "ListChecks",
    challenge:
      "Writing fresh questions for every class test takes hours, and mixing easy and hard questions across a whole chapter is tricky.",
    solution:
      "Upload your notes or a chapter and say what you need: multiple choice, short answers or a full paper. Classgrid AI writes the questions with answers, and can make a Word or PDF file ready to print.",
    result: "A question paper and answer key in minutes, which you can check and edit before using.",
    steps: [
      "Attach your notes or the chapter.",
      "Say the number and type of questions and the level.",
      "Ask for a Word or PDF file with an answer key.",
    ],
    tryPrompt: "Make 20 multiple-choice questions from these notes with an answer key, as a Word file.",
    relatedSolution: { label: "Documents & files", href: "/solutions/documents-and-files" },
    order: 21,
  },
  {
    slug: "turn-notes-into-lecture-slides",
    title: "Turn your notes into lecture slides",
    summary: "Get a PowerPoint deck from your notes, ready to present.",
    capabilities: ["Documents"],
    audiences: ["Faculty", "Students"],
    icon: "Presentation",
    challenge:
      "You have the content in notes, but turning it into clean slides with a clear flow takes an evening.",
    solution:
      "Upload or paste your notes and ask for slides. Classgrid AI plans the flow and builds a real PowerPoint file you can download and edit.",
    result: "A finished slide deck from your own notes, kept in your Library for next time.",
    steps: [
      "Attach your notes or paste the text.",
      "Say how many slides and who it's for.",
      "Download the PowerPoint and make any final edits.",
    ],
    tryPrompt: "Turn these notes into a 12-slide PowerPoint for a first-year class.",
    relatedSolution: { label: "Documents & files", href: "/solutions/documents-and-files" },
    order: 22,
  },
  {
    slug: "manage-google-classroom",
    title: "Manage Google Classroom from one chat",
    summary: "See coursework and submissions, and post assignments by asking.",
    capabilities: ["Connected apps", "Learning"],
    audiences: ["Faculty"],
    icon: "GraduationCap",
    challenge:
      "Checking coursework, submissions and announcements across several classes means many clicks in Google Classroom every day.",
    solution:
      "Connect Google Classroom in the AI Hub. Classgrid AI can list your courses, coursework, submissions and announcements, read course files, and create assignments and announcements for you.",
    result: "A quick view of every class, and new posts made without opening each course.",
    steps: [
      "Open the AI Hub and connect Google Classroom.",
      "Ask for your courses or this week's submissions.",
      "Ask it to post an announcement or a new assignment.",
    ],
    tryPrompt: "List my Google Classroom courses and show which assignments are due this week.",
    relatedSolution: { label: "Agent mode", href: "/solutions/agent-mode" },
    order: 23,
  },
  {
    slug: "transcribe-voice-notes-and-meetings",
    title: "Transcribe voice notes and meetings",
    summary: "Turn any recording into text, notes and a to-do list.",
    capabilities: ["Audio & video"],
    audiences: ["Work", "Everyday life"],
    icon: "Mic",
    challenge:
      "Long voice notes and meeting recordings are slow to listen to again, and the decisions and to-dos inside them get forgotten.",
    solution:
      "Upload the voice note or recording. Classgrid AI turns the speech into text and can write a summary, the decisions made and a list of to-dos.",
    result: "A written copy of every recording, with the important parts pulled out for you.",
    steps: [
      "Attach the voice note or recording.",
      "Ask for the full text, a summary or the to-dos.",
      "Ask it to set reminders for anything with a date.",
    ],
    tryPrompt: "Turn this meeting recording into text and list every to-do with who owns it.",
    relatedSolution: { label: "Documents & files", href: "/solutions/documents-and-files" },
    order: 24,
  },
  {
    slug: "summarise-a-youtube-video",
    title: "Summarise a YouTube video",
    summary: "Paste a link and get the key points without watching it all.",
    capabilities: ["Audio & video", "Research"],
    audiences: ["Students", "Everyday life"],
    icon: "Youtube",
    challenge:
      "A useful talk or tutorial is an hour long, and you only need the main ideas or one part of it.",
    solution:
      "Paste the YouTube link into Agent mode and ask for a summary. You can also upload a video file and Classgrid AI will turn what's said into text.",
    result: "The key points of the video, and answers to your questions about it.",
    steps: [
      "Paste the YouTube link.",
      "Ask for a summary or the key points.",
      "Ask follow-up questions about the video.",
    ],
    tryPrompt: "Summarise this video in 5 points: https://youtube.com/…",
    relatedSolution: { label: "Research & data", href: "/solutions/research" },
    order: 25,
  },
  {
    slug: "plan-a-trip",
    title: "Plan a trip with weather and maps",
    summary: "Get a day-by-day plan with live weather and routes.",
    capabilities: ["Research"],
    audiences: ["Everyday life"],
    icon: "Map",
    challenge:
      "Planning a trip means jumping between weather apps, maps and travel sites, then putting it all together yourself.",
    solution:
      "Tell Classgrid AI where and when you're going. It researches the places, shows a live weather card for the next 5 days and a map card with the route, and makes a day-by-day planner.",
    result: "One plan with the weather, the routes and what to do each day.",
    steps: [
      "Say where you're going, for how long and what you like.",
      "Check the weather and route cards.",
      "Ask for a day-by-day plan and set reminders for bookings.",
    ],
    tryPrompt: "Plan a 3-day trip from Pune to Lonavala this weekend. Show the weather and the route.",
    relatedSolution: { label: "Agent mode", href: "/solutions/agent-mode" },
    order: 26,
  },
  {
    slug: "receipts-to-expense-sheet",
    title: "Turn receipt photos into an expense sheet",
    summary: "Snap your bills and get a clean spreadsheet with totals.",
    capabilities: ["Data", "Documents"],
    audiences: ["Everyday life", "Work"],
    icon: "Receipt",
    challenge:
      "Typing every bill into a spreadsheet by hand is boring and easy to get wrong, so expenses pile up untracked.",
    solution:
      "Upload photos of your receipts, up to 6 at a time. Classgrid AI reads the text on each one and builds an Excel sheet with the date, shop, amount and category, then adds up the totals.",
    result: "A clean expense sheet with totals by category, ready to download.",
    steps: [
      "Take clear photos of your receipts and attach them.",
      "Ask for an Excel sheet with date, shop, amount and category.",
      "Ask for totals or a chart of where the money went.",
    ],
    tryPrompt: "Read these receipts and make an Excel sheet with totals by category.",
    relatedSolution: { label: "Research & data", href: "/solutions/research" },
    order: 27,
  },
  {
    slug: "write-emails-and-messages",
    title: "Write emails and messages in the right tone",
    summary: "Get a polite, clear message ready to copy in one click.",
    capabilities: ["Writing"],
    audiences: ["Everyday life", "Work", "Students"],
    icon: "PenLine",
    challenge:
      "Finding the right words for a tricky email, a leave request or a message to a group can take longer than the task itself.",
    solution:
      "Say who it's for and what you want to say. Classgrid AI writes it in the right tone and puts it in a block you can copy with one click.",
    result: "A clear, well-written message, ready to paste into email or WhatsApp.",
    steps: [
      "Say who the message is for and what it should say.",
      "Ask for a shorter, friendlier or more formal version if needed.",
      "Copy it with one click and send.",
    ],
    tryPrompt: "Write a polite email asking my professor for a 2-day extension on my assignment.",
    relatedSolution: { label: "Agent mode", href: "/solutions/agent-mode" },
    order: 28,
  },
];
