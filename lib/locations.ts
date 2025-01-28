import { Location } from "@/types/portfolio";

const locations: Location[] = [
  {
    slug: "ireland",
    name: "Ireland",
    photoCount: 17,
  },
  {
    slug: "mexico",
    name: "Mexico",
    photoCount: 3,
  },
  {
    slug: "maryland",
    name: "Maryland",
    photoCount: 6,
  },
  {
    slug: "california",
    name: "California",
    photoCount: 14,
  },
  {
    slug: "ohio",
    name: "Ohio",
    photoCount: 16,
  },
  {
    slug: "uk",
    name: "United Kingdom",
    photoCount: 14,
  },
  {
    slug: "france",
    name: "France",
    photoCount: 3,
  },
  // Add more countries here
];

export async function getLocationData(
  slug: string
): Promise<Location | undefined> {
  const location = locations.find((location) => location.slug === slug);
  return location;
}

export function getAllLocations(): Location[] {
  return locations;
}
