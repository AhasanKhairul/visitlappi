import { Destination } from "@/lib/types/content";

export const destinations: Destination[] = [
  {
    slug: "rovaniemi",
    title: "Rovaniemi",
    region: "Lapland",
    coordinates: { lat: 66.5039, lng: 25.7294 },
    shortDescription:
      "The Arctic Circle capital — gateway to Lapland, home to Santa Claus Village and easy access to wilderness in every direction.",
    heroImage: "aurora",
    bestTimeToVisit: "December–March for snow and aurora; June–July for the midnight sun.",
    seasons: ["winter", "northern-lights", "midnight-sun"],
    activityCount: 42,
  },
  {
    slug: "levi",
    title: "Levi",
    region: "Kittilä",
    coordinates: { lat: 67.8042, lng: 24.8006 },
    shortDescription:
      "Finland's largest fell ski resort — downhill slopes, cross-country trails, and a lively village built for winter.",
    heroImage: "snow",
    bestTimeToVisit: "November–April for skiing; September for ruska (autumn colour).",
    seasons: ["winter", "ruska"],
    activityCount: 31,
  },
  {
    slug: "inari",
    title: "Inari",
    region: "Sápmi",
    coordinates: { lat: 68.9059, lng: 27.0276 },
    shortDescription:
      "Heart of Sámi culture, on the shores of Lake Inari — the place to understand Lapland beyond the tourist trail.",
    heroImage: "forest",
    bestTimeToVisit: "Late August–April for aurora viewing away from light pollution.",
    seasons: ["northern-lights", "winter"],
    activityCount: 18,
  },
  {
    slug: "yllas",
    title: "Ylläs",
    region: "Kolari",
    coordinates: { lat: 67.5602, lng: 24.2333 },
    shortDescription:
      "Seven fells and one of the largest connected ski areas in Finland, ringed by national park wilderness.",
    heroImage: "snow",
    bestTimeToVisit: "January–April for reliable snow; July for fell hiking.",
    seasons: ["winter", "summer"],
    activityCount: 24,
  },
  {
    slug: "saariselka",
    title: "Saariselkä",
    region: "Inari",
    coordinates: { lat: 68.4189, lng: 27.4131 },
    shortDescription:
      "A ski village on the edge of Urho Kekkonen National Park — one of Europe's best-connected wilderness areas.",
    heroImage: "aurora",
    bestTimeToVisit: "September–April for aurora; June–August for hiking the fells.",
    seasons: ["northern-lights", "winter", "summer"],
    activityCount: 22,
  },
  {
    slug: "pyha-luosto",
    title: "Pyhä-Luosto",
    region: "Sodankylä / Pelkosenniemi",
    coordinates: { lat: 67.0136, lng: 27.1467 },
    shortDescription:
      "Two fell villages either side of Finland's oldest national park, known for its dramatic gorges.",
    heroImage: "forest",
    bestTimeToVisit: "February–April for skiing and clear skies; September for ruska.",
    seasons: ["winter", "ruska"],
    activityCount: 15,
  },
];

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug);
}
