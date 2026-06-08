export interface BrandingSettings {
  primary: string;
  accent: string;
  accentMid: string;
  lightGreen: string;
  surface: string;
  teal: string;
  white: string;
  dark: string;
}

export interface SectionData {
  sectionId: string;
  visible: boolean;
  heading?: string;
  subheading?: string;
  body?: string;
  ctaLabel?: string;
  ctaLink?: string;
  images?: string[];
  items?: any[];
  ceoQuote?: string;
}

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  location: string;
  client: string;
  status: string;
  description: string;
  images: string[];
  visible: boolean;
}

export interface TeamMemberData {
  id?: string;
  name: string;
  title: string;
  bio: string;
  photo: string;
  visible: boolean;
}

export interface TestimonialData {
  id?: string;
  quote: string;
  clientName: string;
  clientTitle: string;
  company: string;
  visible: boolean;
}

export interface ClientData {
  id?: string;
  name: string;
  logoUrl?: string;
  visible: boolean;
}
