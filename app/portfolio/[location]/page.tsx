import { getLocationData } from "@/lib/locations";
import { Portfolio } from "@/components/Portfolio";
import { notFound } from "next/navigation";
import type { PageProps } from "@/types/portfolio";

export default async function LocationPortfolioPage(props: PageProps) {
  const params = await props.params;
  const location = params.location;

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
