import { createClient, Entry } from "contentful";
import { ContentfulEntrySkeleton, SkillPageEntrySkeleton, ProjectEntrySkeleton, AboutPageEntrySkeleton } from "@/types/contentfulTypes";


const SPACE_ID = "ivaleyyv0pvr";
const ACCESS_TOKEN = "z0sDr7LxlFQXZipQlT9tRFZZ8Oe7EndVyyhJYsWpGpg";

const client = createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});


export const fetchHomePageContent = async (): Promise<Entry<ContentfulEntrySkeleton>> => {
  const entries = await client.getEntries<ContentfulEntrySkeleton>({
    content_type: "homePage", 
  });
  return entries.items[0]; 
};


export const fetchSkillsContent = async (): Promise<Entry<SkillPageEntrySkeleton>[]> => {
  const entries = await client.getEntries<SkillPageEntrySkeleton>({
    content_type: "skillPage",
    order: "fields.sortOrder" as any, 
  });
  return entries.items; 
};


export const fetchProjectsContent = async (): Promise<Entry<ProjectEntrySkeleton>[]> => {
  const entries = await client.getEntries<ProjectEntrySkeleton>({
    content_type: "projectPage", 
  });
  return entries.items; 
};

export const fetchAboutPageContent = async (): Promise<Entry<AboutPageEntrySkeleton>> => {
  const entries = await client.getEntries<AboutPageEntrySkeleton>({
    content_type: "aboutPage",
  });
  return entries.items[0]; 
};