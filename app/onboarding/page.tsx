import { redirect } from "next/navigation";

// Accounts are made on chat.classgrid.in, so the old profile setup page sends people there
export default function OnboardingPage() {
  redirect("https://chat.classgrid.in/login");
}
