import { Location } from "@/types/portfolio";

const locations: Location[] = [
  {
    slug: "ireland",
    name: "Ireland",
    photos: [
      {
        src: "/images/ireland/galway_1.jpg",
        alt: "Galway",
        id: 1,
        location: "Galway",
      },
      {
        src: "/images/ireland/galway_2.jpg",
        alt: "Galway",
        id: 2,
        location: "Galway",
      },
      {
        src: "/images/ireland/galway_3.jpg",
        alt: "Galway",
        id: 3,
        location: "Galway",
      },
      {
        src: "/images/ireland/cliffsofmoher_1.jpg",
        alt: "Cliffs of Moher",
        id: 4,
        location: "Cliffs of Moher",
      },
      {
        src: "/images/ireland/cliffsofmoher_2.jpg",
        alt: "Cliffs of Moher",
        id: 5,
        location: "Cliffs of Moher",
      },
      {
        src: "/images/ireland/cliffsofmoher_3.jpg",
        alt: "Cliffs of Moher",
        id: 6,
        location: "Cliffs of Moher",
      },
      {
        src: "/images/ireland/cliffsofmoher_4.jpg",
        alt: "Cliffs of Moher",
        id: 7,
        location: "Cliffs of Moher",
      },
    ],
  },
  {
    slug: "mexico",
    name: "Mexico",
    photos: [
      {
        src: "/images/mexico/mexico_1.jpg",
        alt: "Mexico",
        id: 1,
        location: "Mexico",
      },
      {
        src: "/images/mexico/mexico_2.jpg",
        alt: "Mexico",
        id: 2,
        location: "Mexico",
      },
      {
        src: "/images/mexico/mexico_3.jpg",
        alt: "Mexico",
        id: 3,
        location: "Mexico",
      },
      {
        src: "/images/mexico/mexico_4.jpg",
        alt: "Mexico",
        id: 4,
        location: "Mexico",
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
