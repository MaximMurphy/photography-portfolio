import { Suspense } from "react";
import { getLocationData } from "@/lib/locations";
import { Portfolio } from "@/components/Portfolio";
import { notFound } from "next/navigation";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface PageProps {
  params: {
    location: string;
  };
}

export default async function LocationPortfolioPage(props: PageProps) {
  const params = await props.params;
  const location = params.location;

  try {
    const locationData = getLocationData(location);

    if (!locationData) {
      notFound();
    }

    return (
      <Suspense fallback={<LoadingSpinner />}>
        <Portfolio initialLocation={locationData} />
      </Suspense>
    );
  } catch (error) {
    console.error("Error loading location data:", error);
    notFound();
  }
}
