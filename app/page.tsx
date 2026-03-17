"use client";

import { MainNavigation } from "@/components/navigation";
import Home from "@/app/sections/Home";
import Skills from "@/app/sections/Skills";
import Projects from "@/app/sections/Projects";
import About from "@/app/sections/About";
import Contact from "@/app/sections/Contact";

export default function Page() {
  return (
    <div className="min-h-screen">

      <header className="fixed top-0 z-50 w-full">
        <MainNavigation />
      </header>

      <div className="pt-20">
        <Home />
      </div>
      <Skills />
      <Projects />
      <About />
      <Contact />
    </div>
  );
}

