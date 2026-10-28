import {
  AlarmClock,
  BarChart3,
  CalendarDays,
  FileText,
  GitPullRequest,
  Globe,
  Image,
  Inbox,
  Phone,
  Presentation,
  Rocket,
  Search,
  Send,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  AlarmClock,
  BarChart3,
  CalendarDays,
  FileText,
  GitPullRequest,
  Globe,
  Image,
  Inbox,
  Phone,
  Presentation,
  Rocket,
  Search,
  Send,
  Sparkles,
  Users,
};

export function UseCaseIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? Sparkles;
  return <Icon className={className} strokeWidth={1.5} aria-hidden />;
}
