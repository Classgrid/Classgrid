import { Metadata } from "next";
import { CommunityClient } from "./CommunityClient";

export const metadata: Metadata = {
  title: "Community Forum (Coming Soon)",
  description: "A space for Classgrid AI users to connect, share ideas and swap tips for getting more done.",
};

export default function CommunityPage() {
  return <CommunityClient />;
}
