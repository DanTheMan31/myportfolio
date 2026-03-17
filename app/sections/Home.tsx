"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { FloatingParticles } from "@/components/ui/floating-elements";
import React, { useEffect, useState } from "react";
import { fetchHomePageContent } from "@/lib/contentful"; 
import { HomePageFields } from "@/types/contentfulTypes"; 

export default function Home() {
  const [content, setContent] = useState<HomePageFields | null>(null);

  useEffect(() => {
    const getContent = async () => {
      try {
        const entry = await fetchHomePageContent();
        console.log("Contentful entry:", entry);
        const fields = entry.fields; 
        console.log("Contentful fields:", fields);
        setContent(fields as HomePageFields); 
      } catch (error) {
        console.error("Error fetching Contentful data:", error);
      }
    };

    getContent();
  }, []);

  if (!content) {
    return <p>Loading...</p>; 
  }

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center bg-gradient-to-br from-teal-50 via-cyan-50 to-slate-50 relative overflow-hidden"
    >
      <FloatingParticles />
      <div className="absolute inset-0 overflow-hidden">
        {content.backgroundElements && Array.isArray(content.backgroundElements) &&
          content.backgroundElements.map((element, index) => (
            <div key={index} className={element.styles}></div>
          ))}
      </div>
      <div className="container max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-16 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          <div className="space-y-12">
            <div className="space-y-10">
              <div className="inline-block">
                <Badge
                  variant="outline"
                  className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 text-slate-700 px-6 py-3 text-sm font-poppins font-semibold uppercase tracking-widest border border-teal-200/60 hover:border-teal-300/80 hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-500 rounded-full backdrop-blur-sm"
                >
                  <span className="w-2.5 h-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full animate-pulse mr-3"></span>
                  {content.badgeLabel}
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-poppins font-black text-slate-800 leading-tight">
                {content.headline}
              </h1>

              {content.introText && (
                <TextGenerateEffect
                  words={content.introText}
                  className="text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed font-inter"
                  duration={0.8}
                  filter={true}
                />
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              {content.ctaButtons && Array.isArray(content.ctaButtons) && content.ctaButtons.length > 0 ? (
                content.ctaButtons.map((button, index) => (
                  <a
                    key={index}
                    href={button.href || "#"}
                    onClick={(e) => handleSmoothScroll(e, button.targetId || "")}
                    className="inline-block"
                  >
                    <Button 
                      size="lg" 
                      className={`bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${button.styleClass || ""}`}
                    >
                      {button.label || "Button"}
                    </Button>
                  </a>
                ))
              ) : (
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  View My Work
                </Button>
              )}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative group">
              <div className="relative">
                <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-white shadow-2xl ring-4 ring-teal-200/40 group-hover:ring-teal-300/60 transition-all duration-500">
                <img
                 src={content?.mainImage?.fields?.file?.url ? `https:${content.mainImage.fields.file.url}` : ""} 
                 alt="Profile Image"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 group-hover:brightness-110"
                />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}