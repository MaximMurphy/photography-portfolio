import { getLocationData } from "@/lib/locations";
import { Portfolio } from "@/components/Portfolio";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const location = (await params).location;

  try {
    const locationData = getLocationData(location);

    if (!locationData) {
      notFound();
    }

    return <Portfolio initialLocation={locationData} />;
  } catch (error) {
    console.error("Error loading location data:", error);
    notFound();
  }
}
