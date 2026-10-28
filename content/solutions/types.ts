// Shape of one Solutions page. The same shape is stored in Sanity (aiSolutionPage) and in
// content/solutions/<slug>.json, which is used until Sanity has the page.

export type ChatMock = {
  kind: "chat";
  title: string;
  fileChips?: string[];
  userMessage: string;
  workedFor?: string;
  steps?: string[];
  resultLines?: string[];
};

export type FilesCard = { kind: "files"; title: string; subtitle?: string; files: { name: string; size?: string }[] };
export type WhatsAppCard = { kind: "whatsapp"; sender: string; text: string; time?: string };
export type PullRequestCard = { kind: "pullRequest"; title: string; branch: string; status: string };
export type PollCard = { kind: "poll"; question: string; options: { label: string; votes: number }[] };
export type PeopleCard = { kind: "people"; title: string; people: string[]; note?: string };
export type FlashcardCard = { kind: "flashcard"; counter: string; question: string; answer: string };
export type PlannerCard = { kind: "planner"; title: string; items: { label: string; done: boolean }[]; chip?: string };
export type StatusCard = { kind: "status"; title: string; subtitle: string; tone?: "success" | "info" };
export type ChartCard = { kind: "chart"; title: string; bars: { label: string; value: number }[] };
export type ListCard = { kind: "list"; title: string; rows: { label: string; value?: string }[] };
export type ScheduleCard = { kind: "schedule"; title: string; badge?: string; rows: { label: string; value: string }[] };

export type MockCard =
  | FilesCard
  | WhatsAppCard
  | PullRequestCard
  | PollCard
  | PeopleCard
  | FlashcardCard
  | PlannerCard
  | StatusCard
  | ChartCard
  | ListCard
  | ScheduleCard;

export type PanelVisual = {
  main: ChatMock | MockCard;
  floating?: MockCard;
};

export type DemoTab = { label: string; visual: PanelVisual };

export type SolutionFeature = { title: string; text: string; visual: PanelVisual };

export type SolutionPageContent = {
  slug: string;
  order: number;
  menuGroup: "product" | "useCase";
  menuLabel: string;
  menuDescription: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCta: { label: string; href: string };
  demoHeading: string;
  demoTabs: DemoTab[];
  features: SolutionFeature[];
  pluginsHeading: string;
  plugins: { name: string; line: string }[];
  tasksHeading: string;
  exampleTasks: string[];
  faqs: { question: string; answer: string }[];
  plainEnglishHeading: string;
  plainEnglish: string[];
  seo: { title: string; description: string };
};
