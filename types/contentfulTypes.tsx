import { Asset, Entry } from "contentful";

// Shared Types
export interface ImageField {
  file: {
    url: string; // URL of the uploaded image from Contentful
  };
}

// Types for HomePage Content Type
export interface CTAButton {
  href: string;         // Link target (e.g., "#projects")
  label: string;        // Button label
  targetId: string;     
  styleClass: string;   
}

export interface BackgroundElement {
  elementType: string;  
  styles: string;      
}

export interface HomePageFields {
  headline: string;                     
  introText: string;                    
  badgeLabel: string;                  
  mainImage?: Asset;                    
  ctaButtons: CTAButton[];              
  backgroundElements?: BackgroundElement[]; 
}

// Extend Entry for HomePage
export type ContentfulEntrySkeleton = {
  fields: HomePageFields;
  contentTypeId: "homePage";
};

// Types for SkillPage Content Type
export interface SkillPageFields {
  name: string;         // Skill name (e.g., Java, React)
  category: string;     // Skill category (e.g., Languages, Frontend, Backend)
  url: string;          // URL for documentation or homepage
  icon: Asset;          // Media field for skill icon
  sortOrder: number;    // Sort order for controlling display
}

// Extend Entry for SkillPage
export type SkillPageEntrySkeleton = {
  fields: SkillPageFields;
  contentTypeId: "skillPage";
};

// Types for Project Content Type
export interface ProjectFields {
  title: string;               // Project title (e.g., Hotel Management System)
  techStack: string;           // Comma-separated technologies (e.g., Java, NetBeans)
  image: Asset;                // Project image (Media field)
  description: string | {      // Description - can be plain text or rich text
    content: any[];            
  };
  link?: string;               // Optional project link (e.g., Website, live demo)
}

// Extend Entry for Project
export type ProjectEntrySkeleton = {
  fields: ProjectFields;
  contentTypeId: "projectPage";
};

export interface AboutPageFields {
  name: string;                            
  age: number;                              
  program: string;                        
  school: string;                          
  shortDescription: string;                 
  extendedDescription?: string | {
    content: any[];                       
  };
  softSkills?: string[];                    
  favoriteQuote?: {
    quote?: string;                          
    author?: string;                         
    note?: string;                           
  };
  image?: Asset;                             
}

export type AboutPageEntrySkeleton = {
  fields: AboutPageFields;
  contentTypeId: "aboutPage";
};