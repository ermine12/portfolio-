// ─── Portfolio Data Store ───
// All real credentials for Ermias Simegne — zero placeholders.

// ─── Types ───

export interface Profile {
  name: string;
  title: string;
  statusBadge: string;
  timezone: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  githubUrl: string;
  linkedin: string;
  linkedinUrl: string;
  education: {
    degree: string;
    university: string;
    expectedGraduation: string;
    gpa: string;
  };
  avatarSrc: string;
  cvPath: string;
  roomBackgroundSrc: string;
}

export interface ArchitectureStep {
  id: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  techStack: string[];
  architectureFlow: ArchitectureStep[];
  problem: string;
  solution: string;
  impact: string;
  githubUrl: string;
}

export interface Experience {
  id: string;
  organization: string;
  role: string;
  period: string;
  description: string;
  impact: string;
}

export interface Hobby {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlight?: string;
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  experience: Experience[];
  hobbies: Hobby[];
}

// ─── Data ───

export const profile: Profile = {
  name: "Ermias Simegne",
  title: "Software Engineer — Backend, AI & Full-Stack",
  statusBadge: "Available for Remote Roles",
  timezone: "UTC+3 / EU & US Overlap",
  location: "Addis Ababa, Ethiopia",
  email: "erminemfs@gmail.com",
  phone: "(+251) 906-79-4763",
  github: "ermine12",
  githubUrl: "https://github.com/ermine12",
  linkedin: "ermiasfm",
  linkedinUrl: "https://linkedin.com/in/ermiasfm",
  education: {
    degree: "B.S. in Software Engineering",
    university: "Haramaya University",
    expectedGraduation: "Expected 2027",
    gpa: "3.5/4.00",
  },
  avatarSrc: "/ermias-avatar.png",
  cvPath: "/Ermias_Simegne_CV.docx",
  roomBackgroundSrc: "/workspace-clean.jpg",
};

export const projects: Project[] = [
  {
    id: "intrusion-detection",
    title: "Network Intrusion & Fraud Detection AI",
    subtitle: "Unsupervised Anomaly Detection Pipeline",
    techStack: ["Python", "Scikit-Learn", "Isolation Forest", "Pandas"],
    architectureFlow: [
      { id: "nid-1", label: "Raw Network Traffic" },
      { id: "nid-2", label: "Feature Engineering" },
      { id: "nid-3", label: "Isolation Forest Model" },
      { id: "nid-4", label: "Real-Time Anomaly Alert" },
    ],
    problem:
      "High-dimensional network datasets contain subtle fraudulent transactions and intrusion patterns that rule-based systems miss entirely.",
    solution:
      "Built an unsupervised anomaly detection pipeline using Isolation Forest to identify fraudulent transactions and network intrusions without labeled training data, leveraging advanced feature engineering on raw network traffic.",
    impact:
      "Achieved high precision anomaly detection across multiple attack vectors, significantly reducing false positives compared to traditional threshold-based approaches.",
    githubUrl: "https://github.com/ermine12",
  },
  {
    id: "muqecha-game-hub",
    title: "Centralized Game Hub Platform",
    subtitle: "Muqecha Studios",
    techStack: ["Next.js", "Node.js", "TypeScript", "REST APIs", "PostgreSQL"],
    architectureFlow: [
      { id: "mgh-1", label: "Next.js Client" },
      { id: "mgh-2", label: "TypeScript API Gateway" },
      { id: "mgh-3", label: "Node.js Microservices" },
      { id: "mgh-4", label: "State & DB Layer" },
    ],
    problem:
      "Gaming communities lacked a unified platform to discover, launch, and manage multiple browser-based games with persistent user state.",
    solution:
      "Architected a scalable community gaming hub with modular backend services, a responsive Next.js frontend, and a TypeScript API gateway routing to independent Node.js microservices backed by PostgreSQL.",
    impact:
      "Delivered a production-ready platform supporting multiple concurrent game modules with real-time state synchronization and sub-200ms API response times.",
    githubUrl: "https://github.com/ermine12",
  },
  {
    id: "ssgi-training-system",
    title: "Institutional Training Request System",
    subtitle: "SSGI — Space Science and Geospatial Institute",
    techStack: ["FastAPI", "Python", "Next.js", "TypeScript", "PostgreSQL"],
    architectureFlow: [
      { id: "ssgi-1", label: "Staff Portal (Next.js)" },
      { id: "ssgi-2", label: "FastAPI Backend" },
      { id: "ssgi-3", label: "Approval Engine" },
      { id: "ssgi-4", label: "Institutional DB" },
    ],
    problem:
      "Multi-department training requests at SSGI were managed through fragmented manual processes, causing delays and data inconsistency across the institute.",
    solution:
      "Built a full-stack workflow automation system with a Next.js staff portal, a FastAPI backend with a multi-level approval engine, and a normalized PostgreSQL database to streamline training requests and institutional data management.",
    impact:
      "Eliminated manual paperwork for 50+ staff members, reduced request processing time by 60%, and provided real-time visibility into training pipeline status for department heads.",
    githubUrl: "https://github.com/ermine12",
  },
  {
    id: "grant-fellowship-monitor",
    title: "Automated Grant & Fellowship Monitor",
    subtitle: "CI/CD Scraping Pipeline",
    techStack: ["Python", "GitHub Actions (CI/CD)", "BeautifulSoup", "Automation"],
    architectureFlow: [
      { id: "gfm-1", label: "Cron Trigger (GitHub Actions)" },
      { id: "gfm-2", label: "Headless Python Scraper" },
      { id: "gfm-3", label: "State Diff Engine" },
      { id: "gfm-4", label: "Notification" },
    ],
    problem:
      "Manually checking dozens of academic and fellowship portals for new opportunities was time-consuming and led to missed deadlines.",
    solution:
      "Developed an automated CI/CD scraping pipeline that uses GitHub Actions cron triggers to run a headless Python scraper on a schedule, compares state diffs against previous snapshots, and sends notifications on detected changes.",
    impact:
      "Monitors 15+ academic portals automatically, delivering real-time alerts on new grants and fellowships — eliminating hours of manual checking per week.",
    githubUrl: "https://github.com/ermine12",
  },
  {
    id: "payroll-rmi-chat",
    title: "Full-Stack Payroll Processing & Distributed RMI Chat",
    subtitle: "Java RMI & PHP Payroll System",
    techStack: ["Java (RMI)", "PHP", "MySQL", "HTML/CSS"],
    architectureFlow: [
      { id: "prc-1", label: "Client Node" },
      { id: "prc-2", label: "Java RMI Registry / MySQL Relational Engine" },
      { id: "prc-3", label: "Automated Ledger" },
    ],
    problem:
      "Small organizations needed an affordable, self-hosted payroll system with real-time multi-client communication for HR coordination.",
    solution:
      "Built a normalized payroll processing system with PHP and MySQL for automated ledger generation, alongside a low-latency multi-client chat architecture using Java Remote Method Invocation for distributed real-time communication.",
    impact:
      "Delivered a fully functional payroll system processing 100+ employee records with automated tax calculations, plus a distributed chat supporting 10+ simultaneous client connections with sub-100ms message latency.",
    githubUrl: "https://github.com/ermine12",
  },
];

export const experience: Experience[] = [
  {
    id: "ssgi-intern",
    organization: "Space Science and Geospatial Institute (SSGI)",
    role: "Software Engineering Intern",
    period: "2026",
    description:
      "Designed and implemented a full-stack institutional training request system using a FastAPI backend and Next.js frontend.",
    impact: "Automated multi-department training workflows for 50+ staff members",
  },
  {
    id: "muqecha-intern",
    organization: "Muqecha Studios",
    role: "Software Engineering Intern",
    period: "2026",
    description:
      "Architected a centralized Game Hub web platform with scalable Node.js and TypeScript backend services and Next.js.",
    impact: "Built production-ready gaming platform with modular microservices",
  },
  {
    id: "una-et",
    organization: "United Nations Association of Ethiopia (UNA-ET Haramaya)",
    role: "Web Lead & Secretary",
    period: "Current",
    description:
      "Built the official chapter platform, driving a 25% increase in online presence and streamlining communication for 200+ members.",
    impact: "25% increase in online presence, 200+ members connected",
  },
  {
    id: "freelance",
    organization: "Remote Freelance",
    role: "Full-Stack Developer",
    period: "Jan 2025 – Jun 2025",
    description:
      "Delivered custom web and software solutions asynchronously for clients end-to-end.",
    impact: "Multiple client projects delivered on time with full-stack ownership",
  },
];

export const hobbies: Hobby[] = [
  {
    id: "a2sv",
    title: "A2SV",
    subtitle: "Africa to Silicon Valley",
    description:
      "Software Engineering Trainee — Advanced Data Structures, Algorithms & Competitive Programming.",
    highlight: "A2SV Trainee",
  },
  {
    id: "kifiya-ai",
    title: "Kifiya AI Mastery",
    subtitle: "10 Academy & Mastercard Foundation",
    description:
      "Graduated with Distinction — ML Engineering, Data Engineering & Fintech.",
    highlight: "Graduated with Distinction",
  },
  {
    id: "chess",
    title: "Competitive Chess",
    subtitle: "National University Level",
    description:
      "National University Level Competitor & Tactical Strategist.",
  },
  {
    id: "leadership",
    title: "Leadership & Awards",
    subtitle: "MoE Top 15% & MUN Coordinator",
    description:
      "Top 15% Finalist in Ministry of Education Tech Business Competition (2023); UNA-ET MUN Coordinator; DeepLearning.AI Prompt Engineering & ALX Leadership.",
    highlight: "MoE Top 15%",
  },
];

// ─── Combined Export ───

export const portfolioData: PortfolioData = {
  profile,
  projects,
  experience,
  hobbies,
};

export default portfolioData;
