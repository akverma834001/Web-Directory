import type {
  PersonalProfile,
  Education,
  StatItem,
  Experience,
  Project,
  SkillGroup,
  Achievement,
  Certification,
  CommunityActivity
} from '../types';

export const personalProfile: PersonalProfile = {
  name: "Abhishek Kumar Verma",
  displayName: "ABHISHEK VERMA",
  roleTitle: "Computer Science Engineering Student & Software Developer",
  tagline: "Building practical software with code, data & AI.",
  bioHeadline: "Computer Science Engineering student focused on software development, AI/ML, backend systems and building useful products.",
  bioNarrative: "I'm a Computer Science Engineering student interested in building practical software systems across web development, backend engineering, data and AI. I enjoy taking an idea from a problem statement to a working product—from designing interfaces and APIs to connecting databases and intelligent features.",
  location: "Ranchi, India",
  email: "akverma834001@gmail.com",
  phone: "+91-797 9901 895",
  github: "https://github.com/akverma834001",
  githubHandle: "akverma834001",
  linkedin: "https://www.linkedin.com/in/abhishek-kumar-verma-834001as/",
  linkedinHandle: "in/abhishek-kumar-verma",
  availability: "Open to opportunities",
  currentlyBuilding: {
    title: "AI Interview Evaluation Engine & Vision Assistive Systems",
    description: "Developing automated evaluation pipelines with FastAPI and fine-tuning NLP scoring models.",
    tech: ["FastAPI", "React", "Python", "TF-IDF", "Vertex AI"]
  }
};

export const educationData: Education = {
  degree: "Bachelor of Technology - Computer Science Engineering",
  institution: "Sarala Birla University",
  location: "Ranchi, India",
  duration: "August 2023 - May 2027",
  gpa: "7.57",
  coursework: [
    {
      name: "Operating Systems",
      code: "CS-OS",
      concepts: ["Process Scheduling", "Threads & Concurrency", "Virtual Memory & Paging", "File Systems", "Synchronization"]
    },
    {
      name: "Data Structures",
      code: "CS-DSA",
      concepts: ["Binary Search Trees", "Graph Algorithms", "Heaps & Hash Tables", "Stack & Queue Design", "Amortized Analysis"]
    },
    {
      name: "Analysis of Algorithms",
      code: "CS-DAA",
      concepts: ["Asymptotic Notation", "Dynamic Programming", "Greedy Approaches", "Divide & Conquer", "Complexity Classes"]
    },
    {
      name: "Artificial Intelligence",
      code: "CS-AI",
      concepts: ["State-Space Search", "Heuristic Evaluation", "Knowledge Graphs", "Adversarial Search", "Probabilistic Reasoning"]
    },
    {
      name: "Machine Learning",
      code: "CS-ML",
      concepts: ["Feature Engineering", "TF-IDF Vectorization", "Cosine Similarity", "Supervised Classifiers", "Model Evaluation"]
    },
    {
      name: "Networking",
      code: "CS-NET",
      concepts: ["OSI & TCP/IP Stack", "Socket Programming", "HTTP / REST Protocols", "Routing Protocols", "Network Security"]
    },
    {
      name: "Databases",
      code: "CS-DBMS",
      concepts: ["Relational Schema Design", "SQL Query Optimization", "ACID Transactions", "B-Tree Indexing", "Normalization (1NF-3NF)"]
    }
  ]
};

export const statsData: StatItem[] = [
  {
    id: "stat-1",
    index: "01",
    title: "B.Tech CSE",
    subtitle: "Sarala Birla University",
    detail: "GPA 7.57 • Expected May 2027"
  },
  {
    id: "stat-2",
    index: "02",
    title: "3+ Internships",
    subtitle: "Industry Experience",
    detail: "Central Coalfield, CodeAlpha, Codestamp"
  },
  {
    id: "stat-3",
    index: "03",
    title: "SIH 2024 Finalist",
    subtitle: "National Recognition",
    detail: "Smart India Hackathon • Selected in Nov '24"
  },
  {
    id: "stat-4",
    index: "04",
    title: "Production Projects",
    subtitle: "Full Stack, AI & Cloud",
    detail: "AI Interviewer, KrishiX, Umang Meet"
  }
];

export const experienceData: Experience[] = [
  {
    id: "ccl",
    company: "Central Coalfield Limited",
    role: "IT Intern",
    location: "Ranchi, India",
    type: "Full-time",
    mode: "Onsite",
    duration: "June 2026 – July 2026",
    responsibilities: [
      {
        heading: "Enterprise Portal Development",
        text: "Built modular internal dashboards to streamline intra-departmental workflow reporting and asset tracking across mining divisions."
      },
      {
        heading: "Database & REST API Optimization",
        text: "Designed and integrated secure Restful endpoints with Oracle SQL/PostgreSQL databases to automate daily coal dispatch and inventory data synchronization."
      },
      {
        heading: "System Automation & Monitoring",
        text: "Implemented automated background scripts and scheduled services to reduce manual log compilation time and improve system uptime monitoring."
      }
    ],
    techTags: ["REST APIs", "Oracle SQL", "PostgreSQL", "Automation", "Dashboards"]
  },
  {
    id: "codealpha",
    company: "CodeAlpha",
    role: "Python Developer Intern",
    location: "Remote",
    type: "Part-time, Contractual",
    mode: "Remote",
    duration: "August 2026 – Present",
    responsibilities: [
      {
        heading: "Automated Data Processing Pipelines",
        text: "Developed end-to-end Python scripts leveraging Pandas and NumPy to parse, clean, and transform unstructured datasets for downstream analytics."
      },
      {
        heading: "Core Application Development",
        text: "Built interactive CLI and GUI-based utility tools, incorporating modular architecture, robust error-handling, and unit tests to ensure code reliability."
      },
      {
        heading: "Algorithm Optimization & Web Scraping",
        text: "Designed automated scrapers using BeautifulSoup and Requests to extract targeted web data."
      }
    ],
    techTags: ["Python", "Pandas", "NumPy", "BeautifulSoup", "Requests", "Testing"]
  },
  {
    id: "codestamp",
    company: "Codestamp Technology",
    role: "IT Intern",
    location: "Ranchi, India",
    type: "Full-time",
    mode: "Onsite",
    duration: "June 2025 – July 2025",
    responsibilities: [
      {
        heading: "Data Integrity & Document Verification",
        text: "Executed daily data entry and verified 1,000+ internal documents and records."
      },
      {
        heading: "Quality Control & Stakeholder Reporting",
        text: "Conducted systematic quality checks on operational logs, collaborating with key department stakeholders to generate and deliver weekly audit and performance reports."
      },
      {
        heading: "Compliance & Confidentiality Management",
        text: "Enforced strict organizational data security and compliance protocols, safeguarding sensitive stakeholder information and maintaining zero privacy breach incidents."
      }
    ],
    techTags: ["Data Verification", "Quality Control", "Reporting", "Data Management"]
  }
];

export const projectsData: Project[] = [
  {
    id: "interview-system",
    title: "AI-Based Interview Evaluation System",
    category: "AI / ML",
    date: "March 2026",
    subtitle: "Natural Language Processing, Machine Learning, Web Development",
    description: "An AI-powered platform for evaluating candidate resumes and interview responses with automated parsing and question generation.",
    problem: "Recruiters and hiring managers spend countless hours manually evaluating candidate resumes and interviewing responses, leading to subjective assessments, high turnaround times, and inconsistent scoring.",
    solution: "Engineered an intelligent evaluation pipeline using FastAPI and React that parses candidate resumes, computes TF-IDF and Cosine Similarity against job descriptions, and algorithmically generates tailored interview prompts and scores.",
    architecture: {
      overview: "Client-Server architecture with a decoupled React frontend and FastAPI computational pipeline utilizing NLP vectorizers.",
      diagramSteps: [
        { step: "1. Document Ingestion", detail: "Candidate PDF/Text resume submitted via React client and parsed via backend text extraction." },
        { step: "2. NLP Vectorization", detail: "TF-IDF matrix generation and keyword extraction across skills and domain requirements." },
        { step: "3. Similarity & Scorer", detail: "Cosine similarity calculation against benchmark criteria to establish match percentage." },
        { step: "4. Dynamic QA Engine", detail: "Rule & context-based question generation evaluating technical proficiencies." }
      ]
    },
    features: [
      "Automated resume parsing & metadata extraction",
      "Keyword & skill gap detection",
      "Dynamic question generation based on candidate profile",
      "Interview response evaluation scoring",
      "TF-IDF matrix calculation",
      "Cosine similarity benchmark matching"
    ],
    techStack: ["React", "FastAPI", "Python", "NLP", "Machine Learning", "TF-IDF", "Cosine Similarity"],
    githubUrl: undefined // Displays 'Repository coming soon'
  },
  {
    id: "krishix",
    title: "KrishiX – AI Precision Agriculture Platform",
    category: "AI / ML",
    date: "August 2026",
    subtitle: "Quad-Engine ML, Satellite NDVI, Computer Vision, Crop Diagnostics",
    description: "An AI-powered precision agriculture platform integrating Sentinel-2 satellite vegetation tracking, deep learning leaf disease diagnosis, multi-variable crop suitability models, and dynamic yield forecasting.",
    problem: "Smallholder farmers and agricultural managers struggle with delayed crop disease detection, unscientific fertilizer dosage, and unpredictable yield shifts caused by micro-climate variability, causing major crop losses and soil degradation.",
    solution: "Engineered a quad-engine agricultural intelligence platform combining XGBoost crop suitability matching, Sentinel-2 10m spatial NDVI/EVI raster pipelines, EfficientNet-B3 CNN with Grad-CAM heatmaps for real-time leaf pathology classification, and hybrid LSTM/Prophet seasonal yield forecasting with localized multilingual advisories.",
    architecture: {
      overview: "Quad-Engine AI ecosystem integrating satellite multi-spectral data, deep learning computer vision, tabular soil regression models, and time-series yield forecasting pipelines.",
      diagramSteps: [
        { step: "1. Soil & Geospatial Ingestion", detail: "Parses N-P-K chemical levels, soil pH, moisture, and GPS coordinates alongside Sentinel-2 10m multi-spectral raster data." },
        { step: "2. Quad-Engine ML Inference", detail: "Executes Model 01 (XGBoost Crop Suitability), Model 02 (NDVI/EVI/SAVI vegetation index), Model 03 (LSTM/Prophet dynamic yield forecast), and Model 04 (EfficientNet-B3 CNN disease scanner)." },
        { step: "3. Grad-CAM Pathology Diagnostics", detail: "Generates visual attention heatmaps on leaf photos to pinpoint rust, blight, or pest stress with remedial chemical and organic dosage plans." },
        { step: "4. Multilingual Advisory Dispatch", detail: "Delivers weather-risk calibrated agro-advisories and irrigation alerts in English and regional languages." }
      ]
    },
    features: [
      "Sentinel-2 10m satellite field vegetation tracking (NDVI, EVI, SAVI growth indices)",
      "Model 01: XGBoost & Random Forest multi-variable crop suitability matching",
      "Model 02: Satellite raster pipeline for moisture stress & canopy health",
      "Model 03: Hybrid LSTM + Prophet time-series seasonal yield forecasting",
      "Model 04: EfficientNet-B3 CNN leaf disease scanner with Grad-CAM heatmaps",
      "Interactive 'What-If' agronomic simulator for irrigation and fertilizer tuning",
      "Weather Risk Hub with precipitation alerts and evapotranspiration tracking",
      "Continuous MLOps telemetry & localized regional language support"
    ],
    techStack: [
      "Python",
      "FastAPI",
      "TensorFlow",
      "EfficientNet-B3",
      "XGBoost",
      "OpenCV",
      "Chart.js",
      "Sentinel-2 Data",
      "Tailwind CSS"
    ],
    githubUrl: undefined // Displays 'Repository coming soon'
  },
  {
    id: "umang-sports-meet",
    title: "Umang Sports Meet Web App",
    category: "Full Stack",
    date: "March 2025",
    subtitle: "Web Development, Database Management, Event Ops",
    description: "Sports-meet management platform for organizing events, results and house-wise competition with QR-based tracking.",
    problem: "Managing annual university athletic meets manually resulted in score calculation discrepancies, bottlenecks during athlete registration, and lack of live visibility into house point standings.",
    solution: "Created an all-in-one web platform with live house-wise leaderboards, automated schedule updates, instant student lookup, QR-based check-in attendance, and direct Excel export for officials.",
    architecture: {
      overview: "Single Page Application paired with cloud database state, QR verification service, and client-side XLSX generation.",
      diagramSteps: [
        { step: "1. Admin & Field UI", detail: "Mobile-responsive referee portal for immediate event score recording." },
        { step: "2. Real-Time Sync", detail: "Firebase database updating house totals and match brackets instantaneously." },
        { step: "3. QR Attendance", detail: "Camera-based QR verification validating athlete event eligibility." },
        { step: "4. Excel Export", detail: "Automated spreadsheet generation formatted for university sports archives." }
      ]
    },
    features: [
      "House-wise dynamic leaderboard & points aggregator",
      "Live event results and match schedule timeline",
      "Searchable student and athlete lookup directory",
      "QR-code based athlete check-in attendance",
      "Real-time event notifications",
      "One-click Excel data export for university records"
    ],
    techStack: ["HTML5", "CSS3", "JavaScript", "Firebase", "QR Code", "Excel Integration"],
    githubUrl: undefined // Displays 'Repository coming soon'
  }
];

export const skillsData: SkillGroup[] = [
  {
    category: "Languages",
    iconName: "Code2",
    skills: ["C", "C++", "Python", "JavaScript"]
  },
  {
    category: "Technical Skills",
    iconName: "Cpu",
    skills: [
      "React.js",
      "Node.js",
      "FastAPI",
      "Flask",
      "MySQL",
      "HTML5",
      "CSS3",
      "OpenCV",
      "TensorFlow",
      "Keras",
      "MS Excel",
      "Pandas",
      "NumPy"
    ]
  },
  {
    category: "Platforms & Cloud",
    iconName: "Cloud",
    skills: [
      "GitHub",
      "Firebase",
      "VS Code",
      "Google Cloud",
      "Vertex AI"
    ]
  },
  {
    category: "Soft Skills & Leadership",
    iconName: "Users",
    skills: [
      "Leadership",
      "Problem Solving",
      "Communication",
      "Team Collaboration",
      "Analytical Thinking",
      "Time Management",
      "Public Speaking",
      "Event Management"
    ]
  }
];

export const achievementsData: Achievement[] = [
  {
    id: "sih-2024",
    title: "National Finalist — SIH 2024",
    date: "November 2024",
    organization: "Smart India Hackathon, Govt. of India",
    description: "Recognized as a national finalist for developing an innovative technology-based solution at a premier national-level hackathon.",
    tag: "National Hackathon"
  },
  {
    id: "gdg-lead",
    title: "GDG on Campus Lead — Sarala Birla University",
    date: "October 2025 – May 2026",
    organization: "Google Developer Groups on Campus",
    description: "Led technical community initiatives, organizing developer-focused events, workshops and student engagement activities.",
    tag: "Leadership"
  },
  {
    id: "upen-exchange",
    title: "Selected — UPEN Student Exchange Program",
    date: "April 2026",
    organization: "UPEN International Exchange",
    description: "Selected for an international student exchange opportunity, demonstrating academic excellence and global exposure.",
    tag: "Academic Excellence"
  },
  {
    id: "chess-tournament",
    title: "Core Organizing Member — Under-7 Chess Tournament",
    date: "2025 & 2026 (March '25 & July '26)",
    organization: "Youth Chess Federation",
    description: "Played a key role in organizing and coordinating the Under-7 Chess Tournament for two consecutive years, managing event operations and participant coordination.",
    tag: "Event Operations"
  }
];

export const certificationsData: Certification[] = [
  {
    id: "cert-dsa",
    title: "Data Structures & Algorithms (DSA)",
    issuer: "Udemy",
    date: "June 2025"
  },
  {
    id: "cert-tcs",
    title: "Career Edge – AI Foundation",
    issuer: "TCS iON",
    date: "August 2026"
  },
  {
    id: "cert-databricks",
    title: "SQL Analytics & BI on Databricks",
    issuer: "Databricks (via Simplilearn SkillUp)",
    date: "August 2026"
  },
  {
    id: "cert-ibm",
    title: "AI Literacy & Foundations in Generative AI",
    issuer: "IBM SkillsBuild",
    date: "August 2026"
  },
  {
    id: "cert-deloitte",
    title: "Cyber Job Simulation",
    issuer: "Deloitte (via Forage)",
    date: "August 2026"
  }
];

export const communityData: CommunityActivity[] = [
  {
    id: "gdg-sbu",
    role: "Campus Lead",
    organization: "Google Developer Groups on Campus SBU",
    duration: "Oct 2025 – May 2026",
    location: "Ranchi, India",
    description: "Led the campus developer community, organizing workshops, hackathons & technical bootcamps."
  },
  {
    id: "nss-sbu",
    role: "Group Lead",
    organization: "National Service Scheme (NSS) SBU",
    duration: "Jul 2024 – Jun 2025",
    location: "Ranchi, India",
    description: "Directed student volunteer units in organizing social outreach, blood donation, and community drives."
  },
  {
    id: "vocal-for-local",
    role: "Event Volunteer",
    organization: "Vocal for Local NGO",
    duration: "Jul 2021 – Present",
    location: "Ranchi, India",
    description: "Managed event logistics and vendor outreach to support regional artisans."
  }
];
