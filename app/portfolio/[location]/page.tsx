import { getLocationData } from "@/lib/locations";
import { Portfolio } from "@/components/Portfolio";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    location: string;
  };
}

export async function generateStaticParams() {
  return [
    { location: "ireland" },
    { location: "mexico" },
    { location: "maryand" },
    { location: "california" },
    { location: "ohio" },
    { location: "uk" },
    { location: "france" },

    // Add more locations as needed
  ];
}

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
