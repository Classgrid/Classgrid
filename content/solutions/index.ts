import agentMode from "./agent-mode.json";
import projectMode from "./project-mode.json";
import grids from "./grids.json";
import whatsappCalls from "./whatsapp-calls.json";
import emailAndCalendar from "./email-and-calendar.json";
import documentsAndFiles from "./documents-and-files.json";
import contentAndSocial from "./content-and-social.json";
import remindersAndAutomation from "./reminders-and-automation.json";
import research from "./research.json";
import type { SolutionPageContent } from "./types";

// Local copy of every Solutions page; used until (or wherever) Sanity has no content
export const LOCAL_SOLUTIONS: SolutionPageContent[] = (
  [
    agentMode,
    projectMode,
    grids,
    whatsappCalls,
    emailAndCalendar,
    documentsAndFiles,
    contentAndSocial,
    remindersAndAutomation,
    research,
  ] as SolutionPageContent[]
).sort((a, b) => a.order - b.order);

export const SOLUTIONS_MENU_SECTIONS = [
  { heading: "Products", group: "product" as const },
  { heading: "Everyday work", group: "useCase" as const },
].map(({ heading, group }) => ({
  heading,
  links: LOCAL_SOLUTIONS.filter((page) => page.menuGroup === group).map((page) => ({
    label: page.menuLabel,
    href: `/solutions/${page.slug}`,
    description: page.menuDescription,
  })),
}));
