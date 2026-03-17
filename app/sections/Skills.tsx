"use client";

import { Card, CardContent } from "@/components/ui/card";
import { fetchSkillsContent } from "@/lib/contentful";
import { SkillPageFields } from "@/types/contentfulTypes";
import { useEffect, useState } from "react";

interface Skill {
  name: string;
  category: string;
  url: string;
  iconUrl: string;
  sortOrder: number;
}

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const fetchedSkills = await fetchSkillsContent();
        
        const skillsData = fetchedSkills.map(entry => {
          const skillFields = entry.fields as SkillPageFields;
          return {
            name: skillFields.name,
            category: skillFields.category,
            url: skillFields.url,
            iconUrl: (skillFields.icon?.fields?.file?.url as string) || "",
            sortOrder: skillFields.sortOrder,
          };
        });
        
        setSkills(skillsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching skills:", error);
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const groupedSkills = skills.reduce((groups, skill) => {
    const category = (skill.category || "Uncategorized").toLowerCase().trim();
    if (!groups[category]) groups[category] = [];
    groups[category].push(skill);
    return groups;
  }, {} as Record<string, Skill[]>);

  return (
    <section id="skills" className="py-20 lg:py-24 bg-gradient-to-br from-teal-900 via-cyan-800 to-teal-800">
      <div className="container max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-poppins font-extrabold text-white mb-6 tracking-tight">
            My Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500 mx-auto rounded-full"></div>
        </div>
        {loading ? (
          <div className="text-center text-white">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
            {Object.entries(groupedSkills).map(([category, items]) => (
              <Card key={category} className="bg-slate-800/90 backdrop-blur-lg border border-slate-600/40 rounded-3xl p-0 hover:bg-slate-700/90 hover:shadow-2xl hover:shadow-teal-500/20 hover:scale-105 hover:-translate-y-2 transition-all duration-500 group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-3xl"></div>
                <CardContent className="p-8 relative z-10">
                  <h3 className="text-2xl md:text-3xl font-inter font-bold text-white mb-8 text-center tracking-wide">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {items.map(skill => (
                      <a
                        key={skill.name}
                        href={skill.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-center hover:scale-110 transition-transform duration-300 cursor-pointer group/skill"
                      >
                        <img
                          src={skill.iconUrl}
                          alt={skill.name}
                          className="w-10 h-10 mx-auto mb-2 hover:drop-shadow-lg group-hover/skill:animate-pulse group-hover/skill:brightness-110"
                        />
                        <p className="text-white/90 text-sm font-roboto font-medium tracking-wide">{skill.name}</p>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}