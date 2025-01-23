import { getLocationData } from "@/lib/locations";
import { Portfolio } from "@/components/Portfolio";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { location: string };
}) {
  try {
    const locationData = await getLocationData((await params).location);

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
  params: { location: string };
}) {
  const locationData = await getLocationData((await params).location);

  return {
    title: `${locationData?.name || "Location"} Portfolio`,
    description: `Photography portfolio of ${locationData?.name || "location"}`,
  };
}
