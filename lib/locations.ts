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
  {
    slug: "maryland",
    name: "Maryland",
    photos: [
      {
        src: "/images/maryland/maryland_1.jpg",
        alt: "Maryland",
        id: 1,
        location: "Maryland",
      },
      {
        src: "/images/maryland/maryland_2.jpg",
        alt: "Maryland",
        id: 2,
        location: "Maryland",
      },
      {
        src: "/images/maryland/maryland_3.jpg",
        alt: "Maryland",
        id: 3,
        location: "Maryland",
      },
      {
        src: "/images/maryland/maryland_4.jpg",
        alt: "Maryland",
        id: 4,
        location: "Maryland",
      },
      {
        src: "/images/maryland/maryland_5.jpg",
        alt: "Maryland",
        id: 5,
        location: "Maryland",
      },
      {
        src: "/images/maryland/maryland_6.jpg",
        alt: "Maryland",
        id: 6,
        location: "Maryland",
      },
    ],
  },
  {
    slug: "california",
    name: "California",
    photos: [
      {
        src: "/images/california/california_1.jpg",
        alt: "California",
        id: 1,
        location: "California",
      },
      {
        src: "/images/california/california_2.jpg",
        alt: "California",
        id: 2,
        location: "California",
      },
      {
        src: "/images/california/california_3.jpg",
        alt: "California",
        id: 3,
        location: "California",
      },
      {
        src: "/images/california/california_4.jpg",
        alt: "California",
        id: 4,
        location: "California",
      },
      {
        src: "/images/california/california_5.jpg",
        alt: "California",
        id: 5,
        location: "California",
      },
      {
        src: "/images/california/california_6.jpg",
        alt: "California",
        id: 6,
        location: "California",
      },
      {
        src: "/images/california/california_7.jpg",
        alt: "California",
        id: 7,
        location: "California",
      },
      {
        src: "/images/california/california_8.jpg",
        alt: "California",
        id: 8,
        location: "California",
      },
      {
        src: "/images/california/california_9.jpg",
        alt: "California",
        id: 9,
        location: "California",
      },
      {
        src: "/images/california/california_10.jpg",
        alt: "California",
        id: 10,
        location: "California",
      },
      {
        src: "/images/california/california_11.jpg",
        alt: "California",
        id: 11,
        location: "California",
      },
      {
        src: "/images/california/california_12.jpg",
        alt: "California",
        id: 12,
        location: "California",
      },
      {
        src: "/images/california/california_13.jpg",
        alt: "California",
        id: 13,
        location: "California",
      },
      {
        src: "/images/california/california_14.jpg",
        alt: "California",
        id: 14,
        location: "California",
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
