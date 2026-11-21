import { client } from "@/sanity/lib/client"
import { teamMembersQuery } from "@/sanity/lib/queries"
import TeamClient from "@/components/team/TeamClient"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Meet Our Team",
  description: "Meet the engineers, designers, and builders behind Classgrid AI.",
}

// Kept for an hour, and built again at once when something is published in Sanity (the webhook in
// app/api/sync-embeddings/route.ts). An hour, not the site's day, because team members are a type
// the webhook does not fire for. Until 2026-11-21 this said 1 minute.
export const revalidate = 3600;

export default async function TeamPage() {
  const teamMembers = await client.fetch(teamMembersQuery)

  // Group by department
  const leadership = teamMembers.filter((m: any) => m.department === 'leadership')
  const engineering = teamMembers.filter((m: any) => m.department === 'engineering')
  const sales = teamMembers.filter((m: any) => m.department === 'sales')
  const support = teamMembers.filter((m: any) => m.department === 'support')

  return (
    <TeamClient 
      leadership={leadership} 
      engineering={engineering} 
      sales={sales} 
      support={support} 
    />
  )
}
