"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import React, { useEffect, useState } from "react";
import { fetchAboutPageContent } from "@/lib/contentful";
import { AboutPageFields } from "@/types/contentfulTypes";

export default function About() {
  const [content, setContent] = useState<AboutPageFields | null>(null);

  useEffect(() => {
    const getContent = async () => {
      try {
        const entry = await fetchAboutPageContent();
        const fields = entry.fields;
  
        console.log("Fetched About Page Content:", fields);
        console.log("School Field Data:", fields.school);
        console.log("SoftSkills Field Data:", fields.softSkills);

        setContent(fields as AboutPageFields);
      } catch (error) {
        console.error("Error fetching About page content:", error);
      }
    };

    getContent();
  }, []);

  if (!content) {
    return <p>Loading...</p>;
  }

  return (
    <section
      id="about"
      className="py-20 lg:py-24 bg-gradient-to-br from-teal-50 via-cyan-50 to-slate-50 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-cyan-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-teal-400/10 to-cyan-400/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
      <div className="container max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-poppins font-extrabold text-slate-800 mb-6 tracking-tight">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-600 mx-auto rounded-full"></div>
          <p className="text-lg md:text-xl text-slate-600 mt-6 max-w-2xl mx-auto font-inter">
            Get to know more about my background, skills, and passion for development.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
          <div className="space-y-8">
            <div className="relative w-full max-w-md mx-auto">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-teal-100 to-cyan-100 shadow-2xl">
                <img
                  src={
                    content.image?.fields?.file?.url
                      ? `https:${content.image.fields.file.url}`
                      : "/images/default-image.jpg"
                  }
                  alt={content.name || "Profile Picture"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent"></div>
              </div>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="font-poppins font-bold text-xl text-slate-800 mb-2">
                    Quick Info
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600 font-medium">Name:</span>
                      <span className="text-slate-800 font-semibold">
                        {content.name || "Unavailable"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 font-medium">Age:</span>
                      <span className="text-slate-800 font-semibold">
                        {content.age ? `${content.age} years old` : "Unavailable"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 font-medium">Program:</span>
                      <span className="text-slate-800 font-semibold">
                        {content.program || "Unavailable"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 font-medium">School:</span>
                      <span className="text-slate-800 font-semibold text-right">
                        {content.school || "Unavailable"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-poppins font-bold text-slate-800 mb-4">
                Hello there! 👋
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed font-inter mb-6">
                {content.shortDescription || "No description available."}
              </p>
              <p className="text-base text-slate-600 leading-relaxed font-inter">
                {typeof content.extendedDescription === "string"
                  ? content.extendedDescription
                  : content.extendedDescription?.content?.[0]?.content?.[0]?.value || "No additional description available."}
              </p>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <h4 className="text-xl font-poppins font-bold text-slate-800 mb-4">
                  Soft Skills
                </h4>
                <div className="flex flex-wrap gap-3">
                  {content.softSkills && content.softSkills.length > 0 ? (
                    content.softSkills.map((skill, index) => (
                      <Badge
                        key={index}
                        className="bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 border border-teal-200/50 hover:bg-gradient-to-r hover:from-teal-100 hover:to-cyan-100 font-medium px-4 py-2 transition-all duration-300"
                      >
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <span>No soft skills available</span>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200/50 rounded-2xl shadow-lg">
              <CardContent className="p-6">
                <div className="text-center">
                  <svg
                    className="w-8 h-8 text-teal-500 mx-auto mb-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"></path>
                  </svg>
                  <blockquote className="text-lg font-medium text-slate-700 mb-3 italic">
                    "{content.favoriteQuote?.quote || "No quote available."}"
                  </blockquote>
                  <p className="text-sm text-slate-600 font-semibold mb-3">
                    — {content.favoriteQuote?.author || "Unknown"}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {content.favoriteQuote?.note || ""}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}