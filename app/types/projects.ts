export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  previewImageUrl: string;
  githubUrl: string;
  liveUrl: string;
  features: string[];
}