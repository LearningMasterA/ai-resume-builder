export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  linkedin?: string;
  website?: string;
  github?: string;
}

export interface SelfIntroduction {
  description: string;
}

export interface JobPrompt {
  jobDescription: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  duration: string;
  cgpa?: string;
  achievements?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  responsibilities: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface ResumeData {
  jobPrompt: JobPrompt;
  personal: PersonalInfo;
  selfIntroduction: SelfIntroduction;
  education: Education[];
  experience: Experience[];
  skills: SkillCategory[];
  projects: Project[];
}

export type ResumeTemplate = 'classic' | 'modern' | 'minimal';