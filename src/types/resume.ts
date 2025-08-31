export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  linkedin?: string;
  website?: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  duration: string;
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

export interface ResumeData {
  personal: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: string[];
  projects: Project[];
}

export type ResumeTemplate = 'classic' | 'modern' | 'minimal';