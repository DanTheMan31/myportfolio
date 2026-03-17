"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetchProjectsContent } from "@/lib/contentful";
import { ProjectFields } from "@/types/contentfulTypes";
import { useEffect, useState } from "react";

interface Project {
  title: string;
  techStack: string[];
  imageUrl: string;
  description: string[];
  link?: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const fetchedProjects = await fetchProjectsContent();
        
        const projectsData = fetchedProjects.map(entry => {
          const projectFields = entry.fields as ProjectFields;
          let imageUrl = (projectFields.image?.fields?.file?.url as string) || "";
          if (imageUrl.startsWith("//")) {
            imageUrl = "https:" + imageUrl;
          }
          

          let descriptions: string[] = [];
          if (typeof projectFields.description === "string") {

            descriptions = [projectFields.description];
          } else if (projectFields.description?.content) {

            descriptions = projectFields.description.content.map((block: any) => 
              block.content?.[0]?.value || ""
            ).filter(Boolean);
          }
          
          return {
            title: projectFields.title,
            techStack: projectFields.techStack.split(",").map(tech => tech.trim()),
            imageUrl: imageUrl,
            description: descriptions,
            link: projectFields.link,
          };
        });
        
        setProjects(projectsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <section id="projects" className="py-20 lg:py-24 bg-gradient-to-br from-[#E6EBE0] to-[#B1E5F2]">
      <div className="container max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-poppins font-extrabold text-slate-800 mb-6 tracking-tight">
            My Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-600 mx-auto rounded-full"></div>
        </div>

        {loading ? (
          <div className="text-center text-slate-600">Loading projects...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, idx) => (
              <div key={project.title}>
                <Card className="group bg-white/95 backdrop-blur-sm border-0 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-teal-500/30 hover:-translate-y-2 transition-all duration-500 h-auto flex flex-col">
                  <div className="relative w-full h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent z-10"></div>
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 z-20">
                      <Badge className="bg-teal-500/90 backdrop-blur-sm text-white border-0 font-medium px-3 py-1">
                        Project {idx + 1}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl md:text-2xl font-poppins font-bold text-slate-800 mb-3 group-hover:text-teal-700 transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech, techIdx) => (
                        <Badge 
                          key={techIdx}
                          variant="outline" 
                          className="text-xs bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 border-teal-200/50 hover:bg-gradient-to-r hover:from-teal-100 hover:to-cyan-100 font-medium transition-all duration-300"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="space-y-2 mb-6 flex-1">
                      {project.description.map((desc, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-slate-600 text-sm leading-relaxed font-inter">
                            {desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  {project.link ? (
                    <Link href={project.link} target="_blank" rel="noopener noreferrer" className="mt-auto">
                      <Button 
                        className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-3 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-teal-500/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 cursor-pointer active:scale-95 group/btn border-0 relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <span className="group-hover/btn:translate-x-1 transition-transform duration-300">Visit Website</span>
                          <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </span>
                      </Button>
                    </Link>
                  ) : (
                    <div className="mt-auto">
                      <div className="w-full bg-gradient-to-r from-slate-100 to-slate-50 text-slate-500 font-medium py-3 rounded-2xl text-center text-sm border border-slate-200/50">
                        {project.title.includes('Mobile') ? 'Mobile Application' : 'Desktop Application'}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}