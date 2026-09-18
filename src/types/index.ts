export type ProjectCategory = 'All' | 'AI / ML' | 'Full Stack' | 'Cloud & Systems';

export interface Project {
  id: string;
  title: string;
  category: 'AI / ML' | 'Full Stack' | 'Cloud & Systems';
  date: string;
  subtitle: string;
  description: string;
  problem: string;
  solution: string;
  architecture: {
    overview: string;
    diagramSteps: { step: string; detail: string }[];
  };
  features: string[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  type: string;
  mode: string;
  duration: string;
  responsibilities: {
    heading: string;
    text: string;
  }[];
  techTags: string[];
}

export interface CourseworkTopic {
  name: string;
  code: string;
  concepts: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  duration: string;
  gpa: string;
  coursework: CourseworkTopic[];
}

export interface StatItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  detail: string;
}

export interface SkillGroup {
  category: string;
  iconName: string;
  skills: string[];
}

export interface Achievement {
  id: string;
  title: string;
  date: string;
  organization: string;
  description: string;
  tag: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}

export interface CommunityActivity {
  id: string;
  role: string;
  organization: string;
  duration: string;
  location: string;
  description: string;
}

export interface PersonalProfile {
  name: string;
  displayName: string;
  roleTitle: string;
  tagline: string;
  bioHeadline: string;
  bioNarrative: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  githubHandle: string;
  linkedin: string;
  linkedinHandle: string;
  availability: string;
  currentlyBuilding: {
    title: string;
    description: string;
    tech: string[];
  };
}

export interface Endorsement {
  id: string;
  name: string;
  role: string;
  organization: string;
  relationship: string;
  comment: string;
  rating: number;
  verifiedEmail: string;
  verifiedPhone: string;
  verifiedDate: string;
  avatarInitial: string;
}
