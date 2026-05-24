export interface ProjectShowcaseItem {
  type: 'flat' | 'tablet' | 'desktop';
  src: string;
  bgColor?: string;
}

export interface ProjectData {
  slug: string;
  title: string;
  homeTitle: string;
  image: string;
  index: string;
  category: string;
  role: string;
  credits: string;
  locationYear: string;
  liveUrl: string;
  color: string;
  showcase: ProjectShowcaseItem[];
}

export const projectsData: ProjectData[] = [
  {
    slug: "sonder-goods",
    title: "Sonder Goods",
    homeTitle: "C2 Montreal",
    image: "c2montreal.png",
    index: "(01)",
    category: "Branding",
    role: "Design & Development",
    credits: "Branding: Ché Heijnen",
    locationYear: "United Kingdom © 2023",
    liveUrl: "https://c2montreal.com",
    color: "#1C1D20",
    showcase: [
      { type: "flat", src: "c2.jpg", bgColor: "#EFE8D3" },
      { type: "desktop", src: "decimal.jpg", bgColor: "#1C1D20" },
      { type: "tablet", src: "funny.jpg", bgColor: "#EFE8D3" }
    ]
  },
  {
    slug: "studio-office",
    title: "Studio Office",
    homeTitle: "Office Studio",
    image: "officestudio.png",
    index: "(02)",
    category: "Web Design",
    role: "Web Design & Development",
    credits: "Design: Studio O",
    locationYear: "Netherlands © 2024",
    liveUrl: "https://officestudio.nl",
    color: "#8C8C8C",
    showcase: [
      { type: "flat", src: "maven.jpg", bgColor: "#D4D2CD" },
      { type: "desktop", src: "powell.jpg", bgColor: "#141516" },
      { type: "tablet", src: "wix.jpg", bgColor: "#E5E5E5" }
    ]
  },
  {
    slug: "locomotive",
    title: "Locomotive",
    homeTitle: "Locomotive",
    image: "locomotive.png",
    index: "(03)",
    category: "Development",
    role: "Frontend Development",
    credits: "Branding & Design: Locomotive",
    locationYear: "Canada © 2024",
    liveUrl: "https://locomotive.ca",
    color: "#EFE8D3",
    showcase: [
      { type: "flat", src: "google.jpg", bgColor: "#F1F1F1" },
      { type: "desktop", src: "panda.jpg", bgColor: "#1A1A1D" },
      { type: "tablet", src: "1.jpg", bgColor: "#E1E1E1" }
    ]
  },
  {
    slug: "silencio",
    title: "Silencio",
    homeTitle: "Silencio",
    image: "silencio.png",
    index: "(04)",
    category: "UI/UX",
    role: "UI/UX & Art Direction",
    credits: "Design: Silencio Team",
    locationYear: "Germany © 2025",
    liveUrl: "https://silencio.app",
    color: "#706D63",
    showcase: [
      { type: "flat", src: "2.jpg", bgColor: "#F5F5F7" },
      { type: "desktop", src: "3.jpg", bgColor: "#0D0D0D" },
      { type: "tablet", src: "4.jpg", bgColor: "#EFEFEF" }
    ]
  },
  {
    slug: "personal-brand",
    title: "Personal Brand",
    homeTitle: "Personal Brand",
    image: "profile-footer.jpg",
    index: "(05)",
    category: "Art Direction",
    role: "Art Direction & Development",
    credits: "Photography: Alekseev Agency",
    locationYear: "Indonesia © 2026",
    liveUrl: "https://adityafajarsy.dev",
    color: "#1C1D20",
    showcase: [
      { type: "flat", src: "5.jpg", bgColor: "#E8E7E3" },
      { type: "desktop", src: "6.jpg", bgColor: "#111111" },
      { type: "tablet", src: "7.jpg", bgColor: "#F9F9F9" }
    ]
  }
];
