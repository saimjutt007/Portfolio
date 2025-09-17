export interface Project {
  title: string;
  summary: string | string[];
  image?: string;
  links?: {
    demo?: string;
    video?: string;
  };
}

export interface Skill {
  name: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  details?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  responsibilities: string[];
}

export interface PortfolioData {
  name: string;
  title: string;
  email: string;
  socials: {
    github: string;
    linkedin: string;
    twitter?: string;
  };
  hero: {
    taglines: {
      technical: string;
      narrative: string;
    }
  };
  about: {
    leads: {
      technical: string;
      narrative: string;
    },
    bullets: string[];
  };
  workStyle: string;
  highlightedProjects: Project[];
  personalProjects: Project[];
  experience: ExperienceItem[];
  skills: SkillCategory[];
  education: EducationItem[];
  contact: {
    availability: string;
  };
}