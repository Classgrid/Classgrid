import { fetchReviewsData } from "./actions";
import ReviewsClient from "./ReviewsClient";
import { JsonLd } from "@/components/seo/JsonLd";

// Rebuilt from Sanity on every review publish (api/reviews/refresh); this is the backup if that call is missed
export const revalidate = 300;

export default async function ReviewsPage() {
  const initialReviews = await fetchReviewsData();

  const jsonLdData = {
    "@type": "CollectionPage",
    "@id": "https://classgrid.in/reviews/#webpage",
    "name": "Classgrid Reviews",
    "url": "https://classgrid.in/reviews",
    "about": { "@id": "https://classgrid.in/#software" }
  };

  return (
    <>
      <JsonLd data={jsonLdData} />
      <ReviewsClient initialReviews={initialReviews} />
    </>
  );
}
