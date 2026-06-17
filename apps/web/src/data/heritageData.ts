export type HeritageArtifact = {
  id: string;
  title: string;
  slug: string;
  region: string;
  district: string;
  community: string;
  year: string;
  coordinates: string;
  preservationStatus: "Preserved" | "At Risk" | "Needs Documentation" | "Restored";
  imageUrl: string;
  shortDescription: string;
  description: string;
  architecture: string;
  currentCondition: string;
  sources: string[];
};

export type TimelineEpoch = {
  id: string;
  era: string;
  title: string;
  site: string;
  detail: string;
};

export type OralHistory = {
  id: string;
  narrator: string;
  location: string;
  language: string;
  duration: string;
  transcript: string;
  summary: string;
};

export const communities = ["All", "Hindu", "Sikh", "Jain", "Christian", "Parsi", "Sufi"];

export const heritageArtifacts: HeritageArtifact[] = [
  {
    id: "1",
    title: "Sadhu Bela Temple",
    slug: "sadhu-bela-temple",
    region: "Sukkur",
    district: "Sukkur",
    community: "Hindu",
    year: "1823 AD",
    coordinates: "27.7124 N, 68.8584 E",
    preservationStatus: "Preserved",
    imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1400",
    shortDescription: "A historic Hindu temple complex on an island in the Indus River near Sukkur.",
    description:
      "Sadhu Bela is one of Sindh's most important Hindu pilgrimage sites. Located on an island in the Indus River, the complex is associated with Baba Bankhandi Maharaj and reflects the devotional, architectural, and riverine heritage of northern Sindh.",
    architecture:
      "The complex includes shrines, courtyards, rest houses, carved details, and devotional spaces arranged around river-facing circulation paths.",
    currentCondition:
      "The site remains active as a worship and pilgrimage space, with preservation dependent on continued documentation, community care, and river-island access management.",
    sources: ["Community oral accounts", "Local heritage documentation", "Sindh cultural heritage references"],
  },
  {
    id: "2",
    title: "Nagarparkar Jain Temples",
    slug: "nagarparkar-jain-temples",
    region: "Tharparkar",
    district: "Tharparkar",
    community: "Jain",
    year: "14th-15th century",
    coordinates: "24.3524 N, 70.7481 E",
    preservationStatus: "At Risk",
    imageUrl: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1400",
    shortDescription: "Ancient Jain stone temples near the Karoonjhar hills with carved architectural detail.",
    description:
      "The Jain temples of Nagarparkar represent a rare record of pre-partition Jain presence in Sindh. Their stone carving, temple forms, and setting near Karoonjhar create a powerful cultural landscape.",
    architecture:
      "The temples include carved pillars, mandapa-like spaces, stone domes, decorative bands, and geometric ornamentation influenced by western Indian temple traditions.",
    currentCondition:
      "Several structures need careful conservation, visitor guidance, and high-quality digital documentation to reduce future loss.",
    sources: ["Tharparkar heritage surveys", "Local community narratives", "Architectural field documentation"],
  },
  {
    id: "3",
    title: "Gurdwara Pehli Patshahi",
    slug: "gurdwara-pehli-patshahi",
    region: "Karachi",
    district: "Karachi",
    community: "Sikh",
    year: "20th century",
    coordinates: "24.8607 N, 67.0011 E",
    preservationStatus: "Needs Documentation",
    imageUrl: "https://images.unsplash.com/photo-1601058268499-e52658b8bb88?q=80&w=1400",
    shortDescription: "A Sikh community heritage site connected to worship, memory, and migration history.",
    description:
      "This gurdwara reflects Sikh religious life in Sindh and the layered histories of urban minority communities in Karachi. It is important for documenting community continuity and post-partition memory.",
    architecture:
      "The site combines worship hall planning, community gathering space, and religious symbols associated with Sikh devotional practice.",
    currentCondition:
      "The record should be expanded through verified photographs, community interviews, and archival references.",
    sources: ["Community interviews", "Urban heritage mapping", "Religious heritage records"],
  },
  {
    id: "4",
    title: "St. Patrick's Cathedral",
    slug: "st-patricks-cathedral",
    region: "Karachi",
    district: "Karachi",
    community: "Christian",
    year: "1881 AD",
    coordinates: "24.8615 N, 67.0321 E",
    preservationStatus: "Preserved",
    imageUrl: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1400",
    shortDescription: "A landmark Christian cathedral and colonial-era religious structure in Karachi.",
    description:
      "St. Patrick's Cathedral is a major Christian heritage landmark in Karachi. It reflects colonial-era architecture, minority religious identity, and the long presence of Christian institutions in Sindh.",
    architecture:
      "The building is associated with Gothic revival influence, pointed arches, vertical proportions, and a formal worship nave.",
    currentCondition:
      "The cathedral remains a visible and active heritage landmark, suitable for architectural documentation and public education.",
    sources: ["Karachi urban heritage records", "Christian community documentation", "Architectural references"],
  },
  {
    id: "5",
    title: "Parsi Colony Heritage",
    slug: "parsi-colony-heritage",
    region: "Karachi",
    district: "Karachi",
    community: "Parsi",
    year: "19th-20th century",
    coordinates: "24.8750 N, 67.0300 E",
    preservationStatus: "Needs Documentation",
    imageUrl: "https://images.unsplash.com/photo-1524230572899-a752b3835840?q=80&w=1400",
    shortDescription: "Urban memory of Karachi's Parsi community through institutions, homes, and philanthropy.",
    description:
      "Parsi heritage in Karachi is visible through institutions, housing, philanthropy, and civic contributions. Digitally documenting these spaces helps preserve a community history that is often underrepresented.",
    architecture:
      "Parsi urban heritage often includes colonial-era residences, institutional buildings, verandas, and climate-sensitive planning.",
    currentCondition:
      "Many records require verification, photographs, and interviews with community members and local historians.",
    sources: ["Karachi civic history", "Community memory", "Urban documentation"],
  },
  {
    id: "6",
    title: "Shrine of Lal Shahbaz Qalandar",
    slug: "lal-shahbaz-qalandar-shrine",
    region: "Sehwan",
    district: "Jamshoro",
    community: "Sufi",
    year: "1356 AD",
    coordinates: "26.4251 N, 67.8642 E",
    preservationStatus: "Restored",
    imageUrl: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=1400",
    shortDescription: "A major Sufi shrine known for shared devotion, music, and spiritual gathering.",
    description:
      "The shrine of Lal Shahbaz Qalandar is one of Sindh's most important Sufi spaces. It is connected to multi-community devotion, poetry, music, dhamaal, and the shared spiritual landscape of Sindh.",
    architecture:
      "The shrine combines domes, tilework, courtyards, ritual circulation, and decorative surfaces linked with Sufi shrine architecture.",
    currentCondition:
      "The shrine is active and widely visited, making crowd-sensitive preservation, storytelling, and oral history collection important.",
    sources: ["Sufi heritage references", "Oral histories", "Sindh cultural studies"],
  },
];

export const timelineEpochs: TimelineEpoch[] = [
  {
    id: "ep-1",
    era: "2500 BCE",
    title: "Indus Valley Civilization",
    site: "Mohenjo-daro",
    detail: "Urban planning, craft production, water systems, and trade networks shaped the earliest cultural foundations of Sindh.",
  },
  {
    id: "ep-2",
    era: "8th century",
    title: "Maritime and Religious Exchange",
    site: "Debal and lower Sindh",
    detail: "Ports and trade routes connected Sindh with wider religious, linguistic, and commercial worlds.",
  },
  {
    id: "ep-3",
    era: "14th-15th century",
    title: "Jain and Desert Heritage",
    site: "Nagarparkar",
    detail: "Stone temples and settlement memory show the diversity of communities in the Thar cultural landscape.",
  },
  {
    id: "ep-4",
    era: "18th-19th century",
    title: "Sufi and Shared Devotion",
    site: "Sehwan and Bhit Shah",
    detail: "Shrines, poetry, and music created spaces where different communities participated in shared cultural practices.",
  },
  {
    id: "ep-5",
    era: "1843-1947",
    title: "Colonial Urban Sindh",
    site: "Karachi, Hyderabad, Sukkur",
    detail: "Christian, Parsi, Hindu, and Sikh institutions became part of the civic and architectural identity of Sindh's cities.",
  },
  {
    id: "ep-6",
    era: "1947-present",
    title: "Memory and Preservation",
    site: "Across Sindh",
    detail: "Partition, migration, and urban change make digital documentation essential for protecting minority cultural heritage.",
  },
];

export const oralHistories: OralHistory[] = [
  {
    id: "oral-1",
    narrator: "Saeeduddin Shah",
    location: "Sukkur",
    language: "Urdu/Sindhi",
    duration: "4 min 12 sec",
    transcript:
      "Before partition, festivals near the Indus brought families from different communities together. Boats, food, prayer, and music all became part of the same memory.",
    summary:
      "A river-side memory of shared festivals, local craft, and inter-community harmony around Sukkur.",
  },
  {
    id: "oral-2",
    narrator: "Mai Dhai",
    location: "Tharparkar",
    language: "Sindhi",
    duration: "5 min 40 sec",
    transcript:
      "The songs of Thar carry stories of weddings, temples, journeys, and longing. Every generation adds its own voice but keeps the old rhythm alive.",
    summary:
      "A musical oral history about desert songs, community memory, and cultural continuity in Thar.",
  },
  {
    id: "oral-3",
    narrator: "Joseph Daniel",
    location: "Karachi",
    language: "English/Urdu",
    duration: "3 min 55 sec",
    transcript:
      "Church schools, hospitals, and community halls were not only religious spaces. They became part of the public life of Karachi.",
    summary:
      "A Christian community perspective on institutions, service, and urban heritage in Karachi.",
  },
];

export function getArtifactBySlug(slug: string) {
  return heritageArtifacts.find((artifact) => artifact.slug === slug);
}

export function getArtifactsByRegion(region: string) {
  return heritageArtifacts.filter((artifact) => artifact.region.toLowerCase() === region.toLowerCase());
}
