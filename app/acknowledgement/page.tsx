import { client } from "@/sanity/lib/client"
import { acknowledgementsQuery } from "@/sanity/lib/queries"
import AcknowledgementClient from "@/components/acknowledgement/AcknowledgementClient"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Acknowledgements – With Gratitude",
  description: "Recognizing the mentors, contributors, and supporters who made Classgrid possible.",
}

// Kept for an hour, and built again at once when something is published in Sanity (the webhook in
// app/api/sync-embeddings/route.ts). An hour, not the site's day, because acknowledgements are a type
// the webhook does not fire for. Until 2026-11-21 this said 1 minute.
export const revalidate = 3600;

export default async function AcknowledgementPage() {
  const acknowledgements = await client.fetch(acknowledgementsQuery)

  // Separate the data by category
  const contributors = acknowledgements.filter((a: any) => a.category === 'contributor')
  const mentors = acknowledgements.filter((a: any) => a.category === 'mentor')
  const family = acknowledgements.filter((a: any) => a.category === 'family')

  return (
    <AcknowledgementClient 
      contributors={contributors} 
      mentors={mentors} 
      family={family} 
    />
  )
}
