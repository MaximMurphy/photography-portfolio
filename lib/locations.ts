import { Location } from "@/types/portfolio";

const locations: Location[] = [
  {
    slug: "ireland",
    name: "Ireland",
    photos: [
      {
        src: "/images/ireland/galway_1.jpg",
        alt: "Street in Galway",
        id: 1,
        location: "Galway",
      },
      {
        src: "/images/ireland/galway_2.jpg",
        alt: "Galway Harbor",
        id: 2,
        location: "Galway",
      },
      {
        src: "/images/ireland/galway_3.jpg",
        alt: "Galway City Center",
        id: 3,
        location: "Galway",
      },
      {
        src: "/images/ireland/cliffsofmoher_1.jpg",
        alt: "Cliffs of Moher Panorama",
        id: 4,
        location: "Cliffs of Moher",
      },
      {
        src: "/images/ireland/cliffsofmoher_2.jpg",
        alt: "Cliffs of Moher Sunset",
        id: 5,
        location: "Cliffs of Moher",
      },
      {
        src: "/images/ireland/cliffsofmoher_3.jpg",
        alt: "Cliffs of Moher Waves",
        id: 6,
        location: "Cliffs of Moher",
      },
      {
        src: "/images/ireland/cliffsofmoher_4.jpg",
        alt: "Cliffs of Moher Visitor Center",
        id: 7,
        location: "Cliffs of Moher",
      },
    ],
  },
  // Add more countries as needed
];

export function getLocationData(slug: string): Location | undefined {
  return locations.find((location) => location.slug === slug);
}

export function getAllLocations(): Location[] {
  return locations;
}
