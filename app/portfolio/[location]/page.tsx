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
    // Add more locations as needed
  ];
}

export default async function LocationPortfolioPage({ params }: PageProps) {
  try {
    const locationData = await Promise.resolve(
      getLocationData(params.location)
    );

    if (!locationData) {
      notFound();
    }

    return <Portfolio initialLocation={locationData} />;
  } catch (error) {
    console.error("Error loading location data:", error);
    notFound();
  }
}
