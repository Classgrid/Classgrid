// The pricing page FAQ: shown on the page (PlansSection.tsx) and sent as FAQPage data for search (page.tsx)

export const PRICING_FAQS: { question: string; answer: string }[] = [
  {
    question: "What do I get for free?",
    answer:
      "Every account gets 40 messages every 5 hours (150 a week), 4 images a week, 20 voice replies a day, 30 minutes of WhatsApp AI calls a month and 3 projects. No card is needed.",
  },
  {
    question: "What happens when I reach a limit?",
    answer:
      "Message limits refill every 5 hours. Until then you can wait, buy a top-up pack or move to a bigger plan. Everyday chat moves to a smaller model instead of stopping, so you can keep going.",
  },
  {
    question: "Which plan has Claude?",
    answer:
      "Claude Sonnet and Opus come with Pro and Max. Pro also gets a few Claude Fable answers a week and Max about 20. Free uses fast everyday models.",
  },
  {
    question: "Is there a student price?",
    answer:
      "Yes. Pro is ₹299 a month and Max ₹1,499 a month for students. You show you're a student with your college email (.ac.in or .edu), a Grid made by a verified teacher, or your student ID.",
  },
  {
    question: "How does yearly billing work?",
    answer:
      "You pay once for 12 months: ₹3,999 for Pro (about ₹333 a month) or ₹14,999 for Max (about ₹1,250 a month). That's about a third less than paying monthly.",
  },
  {
    question: "What are top-up packs?",
    answer:
      "One-time packs from ₹49 that add extra use on top of any plan. A pack lasts 30 days and is used after your plan's limit is reached.",
  },
  {
    question: "Can I change or cancel my plan?",
    answer: "Yes. Move up, move down or cancel from your account. A cancelled plan stays active until the end of the period you paid for.",
  },
  {
    question: "Do the prices include GST?",
    answer: "Yes. Every price on this page includes GST.",
  },
  {
    question: "What is Enterprise?",
    answer:
      "A plan for schools, colleges and teams, coming soon: priced per seat, billed yearly, from 50 seats, with one shared pool, admin controls and a named contact. Contact us to plan a 45-day free pilot.",
  },
];
