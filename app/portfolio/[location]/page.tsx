import { getLocationData } from "@/lib/locations";
import { Portfolio } from "@/components/Portfolio";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  try {
    const location = (await params).location;

    const locationData = await getLocationData(location);

    if (!locationData) {
      notFound();
    }

    return <Portfolio initialLocation={locationData} />;
  } catch (error) {
    console.error("Error loading location data:", error);
    notFound();
  }
}

// Add metadata generation
export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const location = (await params).location;

  const locationData = await getLocationData(location);

  return {
    title: `${locationData?.name || "Location"} Portfolio`,
    description: `Photography portfolio of ${locationData?.name || "location"}`,
  };
}
