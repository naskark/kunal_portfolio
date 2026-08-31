export type Profile = {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  summary: string;
  yearsOfExperience: string;
  taglines: string[];
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  start: string;
  end: string;
  context: string;
  highlights: string[];
  stack: string[];
};

export type AppLink = {
  id: string;
  name: string;
  subtitle: string;
  platform: "android" | "ios" | "both";
  accent: string;
  links: { label: string; url: string; platform: "android" | "ios" }[];
};

export type SkillGroup = {
  id: string;
  label: string;
  items: string[];
};

export type Education = {
  institute: string;
  location: string;
  degree: string;
  field: string;
};

export type Metric = {
  value: string;
  label: string;
  detail: string;
};

export type Award = {
  title: string;
  /** Issuing company or body. Omit when it isn't relevant. */
  organisation?: string;
};

export type PortfolioData = {
  profile: Profile;
  metrics: Metric[];
  experiences: Experience[];
  apps: AppLink[];
  skills: SkillGroup[];
  education: Education[];
  awards: Award[];
};

export const portfolio: PortfolioData = {
  profile: {
    name: "Kunal Naskar",
    title: "SWE III · Sr. Software Developer (App / Web)",
    location: "Pune, India",
    phone: "+91-91630-75767",
    email: "naskarprsnl@gmail.com",
    linkedin: "https://linkedin.com/in/kunal-naskar",
    summary:
      "Software engineer with 6+ years of professional experience as a full-stack developer. Skilled in building scalable and high-performance applications using modern JavaScript frameworks and TypeScript. Experienced in driving end-to-end ownership of engineering projects, from design and development to deployment and maintenance. Proven track record of delivering robust, reliable, and user-focused software solutions.",
    yearsOfExperience: "6+",
    taglines: [
      "Building high-performance apps",
      "React Native at scale",
      "AI-powered product features",
      "End-to-end ownership",
    ],
  },

  metrics: [
    { value: "6+", label: "Years of experience", detail: "Full-stack across web & mobile" },
    { value: "40%", label: "Faster launches", detail: "React Native investment app delivery" },
    { value: "99.4%", label: "Crash-free sessions", detail: "Android & iOS production apps" },
    { value: "98%+", label: "Payment success rate", detail: "Secure transaction workflows" },
  ],

  experiences: [
    {
      id: "incred",
      role: "Sr. App Developer",
      company: "InCred Money",
      location: "Pune, IN",
      period: "Sep 2023 — Present",
      start: "2023",
      end: "Present",
      context:
        "Promoted to lead critical platform enhancements and customer-facing product initiatives, driving both internal operational efficiency and user experience.",
      highlights: [
        "Led full React Native development of the investment app, accelerating product launches by ~40% and enabling revenue-critical releases on schedule.",
        "Integrated OpenAI and LLM-powered capabilities into platform features, including an intelligent chatbot, automating support workflows and improving response efficiency.",
        "Re-architected UI/UX and core flows, improving onboarding speed by 25%, activation rate by 18%, and reducing friction across high-value investment journeys.",
        "Implemented secure payment workflows with 98%+ success rate, improving transaction reliability and user trust.",
        "Optimized app performance — cut load time by 35%, reduced UI latency, and achieved 99.4% crash-free sessions across Android and iOS.",
        "Built deep linking, notifications, and analytics integrations, increasing returning user sessions by 22%.",
        "Coordinated with product and compliance teams (70% ownership), reducing requirement turnaround by 40%.",
      ],
      stack: ["React Native", "TypeScript", "OpenAI", "Expo", "Branch IO", "Bitrise"],
    },
    {
      id: "sarvagram",
      role: "Sr. Frontend Engineer (App / Web)",
      company: "Sarvagram Solution",
      location: "Pune, IN",
      period: "Jan 2022 — Sep 2023",
      start: "2022",
      end: "2023",
      context:
        "Led the complete design, development, and deployment of end-to-end web and mobile applications. Successfully transitioned outsourced projects into scalable in-house solutions.",
      highlights: [
        "Delivered mobile and web platforms for lending workflows, driving a 70% increase in sales operations within the first month.",
        "Built a full-cycle B2C lending app, improving digital customer onboarding efficiency by 45% and cutting manual ops by 30%.",
        "Led a 7-member team, increasing development throughput by 25% through better architecture and code practices.",
        "Improved platform performance by 20–30% through React / React Native optimization, caching, and API refinements.",
        "Migrated outsourced modules in-house, reducing feature delivery time by 35% and improving release predictability.",
      ],
      stack: ["React", "React Native", "Node.js", "Redux", "Sass"],
    },
    {
      id: "programming",
      role: "Software Engineer",
      company: "Programming.com (former Mobile Programming LLC)",
      location: "Gurugram, IN",
      period: "Aug 2020 — Dec 2021",
      start: "2020",
      end: "2021",
      context:
        "Collaborated with diverse client teams across time zones to deliver multiple high-impact products, with end-to-end ownership from concept through production.",
      highlights: [
        "Developed a telemedicine platform that reduced consultation turnaround time by 40% and improved system reliability.",
        "Built an ATS system improving recruiter efficiency by 50% and reducing manual workflows.",
        "Improved frontend load time by 25% and backend API latency by 15–20% through performance tuning.",
        "Delivered end-to-end features for global clients with 100% on-time releases across time zones.",
      ],
      stack: ["React", "JavaScript", "Node.js", "Firebase", "Socket.IO"],
    },
  ],

  apps: [
    {
      id: "incred-money",
      name: "InCred Money",
      subtitle: "Investment app for wealth, bonds and mutual funds.",
      platform: "both",
      accent: "#4F7CFF",
      links: [
        {
          label: "Play Store",
          url: "https://play.google.com/store/search?q=incred+money&c=apps&hl=en_IN",
          platform: "android",
        },
        {
          label: "App Store",
          url: "https://apps.apple.com/in/app/incred-money/id6449935824",
          platform: "ios",
        },
      ],
    },
    {
      id: "incred-unlisted",
      name: "InCred Unlisted",
      subtitle: "Access to unlisted shares and pre-IPO opportunities.",
      platform: "android",
      accent: "#22D3EE",
      links: [
        {
          label: "Play Store",
          url: "https://play.google.com/store/apps/details?id=com.incredmoney.unlisted&hl=en_IN",
          platform: "android",
        },
      ],
    },
    {
      id: "stocko",
      name: "InCred Stocko",
      subtitle: "Trading and broking experience built for speed.",
      platform: "android",
      accent: "#A78BFA",
      links: [
        {
          label: "Play Store",
          url: "https://play.google.com/store/apps/details?id=com.incred.stocko&hl=en_IN",
          platform: "android",
        },
      ],
    },
    {
      id: "incred-broking",
      name: "InCred Money Broking",
      subtitle: "Broking platform delivering real-time market access.",
      platform: "ios",
      accent: "#34D399",
      links: [
        {
          label: "App Store",
          url: "https://apps.apple.com/in/app/incred-money-broking/id6748982631",
          platform: "ios",
        },
      ],
    },
  ],

  skills: [
    {
      id: "languages",
      label: "Languages",
      items: ["TypeScript", "JavaScript", "HTML", "CSS"],
    },
    {
      id: "frameworks",
      label: "Frameworks & Libraries",
      items: [
        "React.js",
        "React Native",
        "Next.js",
        "Node.js",
        "Nest.js",
        "Expo",
        "Redux",
        "Tanstack Query",
        "Tailwind CSS",
        "Shadcn UI",
        "Material UI",
        "Sass",
        "Jest",
        "Firebase",
        "Socket.IO",
      ],
    },
    {
      id: "tools",
      label: "Tools",
      items: [
        "Git",
        "Jira",
        "VSCode",
        "Linux",
        "Figma",
        "IntelliJ",
        "Postman",
        "Branch IO",
        "Airship",
        "AppsFlyer",
        "Xcode",
        "Android Studio",
      ],
    },
    {
      id: "cloud",
      label: "Cloud & CI/CD",
      items: ["AWS", "Bitrise", "GitHub Actions", "Fastlane"],
    },
    {
      id: "others",
      label: "Beyond Code",
      items: [
        "Leadership",
        "Ownership",
        "Communication",
        "Planning",
        "System Modelling & Design",
        "Data Structures & Algorithms",
        "Agile",
        "Scrum",
      ],
    },
  ],

  education: [
    {
      institute: "Gandhi Institute of Technology and Management (GITAM)",
      location: "Visakhapatnam, India",
      degree: "Bachelor of Engineering",
      field: "Computer Science and Engineering",
    },
  ],

  awards: [
    { title: "Mobile Maverick", organisation: "InCred Money" },
    { title: "Winner of AI Hackathon", organisation: "InCred Money" },
    { title: "Certified Leadership Engagement Program" },
  ],
};
