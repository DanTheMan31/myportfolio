"use client"

import * as React from "react"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function MainNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setIsMobileMenuOpen(false) 
  }


  return (
    <div className="flex items-center justify-between w-full bg-white/90 backdrop-blur-lg border-b border-slate-200/60 px-6 md:px-8 lg:px-12 py-3 shadow-sm">
      <div className="flex items-center">
        <a 
          href="#home" 
          onClick={(e) => handleSmoothScroll(e, 'home')}
          className="text-2xl md:text-3xl font-poppins font-black bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 bg-clip-text text-transparent hover:from-teal-700 hover:via-cyan-700 hover:to-teal-800 transition-all duration-300 cursor-pointer transform hover:scale-105"
        >
          Dan
        </a>
      </div>

      <nav className="hidden md:flex items-center space-x-1 bg-slate-100/70 rounded-full px-2 py-1 backdrop-blur-sm border border-slate-200/60">
        <a 
          href="#home" 
          className="px-5 py-2.5 text-sm font-poppins font-semibold text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-teal-500 hover:to-cyan-500 rounded-full transition-all duration-300 cursor-pointer transform hover:scale-105"
          onClick={(e) => handleSmoothScroll(e, 'home')}
        >
          Home
        </a>
        <a 
          href="#skills" 
          className="px-5 py-2.5 text-sm font-poppins font-semibold text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-teal-500 hover:to-cyan-500 rounded-full transition-all duration-300 cursor-pointer transform hover:scale-105"
          onClick={(e) => handleSmoothScroll(e, 'skills')}
        >
          Skills
        </a>
        <a 
          href="#projects" 
          className="px-5 py-2.5 text-sm font-poppins font-semibold text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-teal-500 hover:to-cyan-500 rounded-full transition-all duration-300 cursor-pointer transform hover:scale-105"
          onClick={(e) => handleSmoothScroll(e, 'projects')}
        >
          Projects
        </a>
        <a 
          href="#about" 
          className="px-5 py-2.5 text-sm font-poppins font-semibold text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-teal-500 hover:to-cyan-500 rounded-full transition-all duration-300 cursor-pointer transform hover:scale-105"
          onClick={(e) => handleSmoothScroll(e, 'about')}
        >
          About
        </a>
        <a 
          href="#contact" 
          className="px-5 py-2.5 text-sm font-poppins font-semibold text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-teal-500 hover:to-cyan-500 rounded-full transition-all duration-300 cursor-pointer transform hover:scale-105"
          onClick={(e) => handleSmoothScroll(e, 'contact')}
        >
          Contact
        </a>
      </nav>
      
      <div className="md:hidden">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-3 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-slate-200/60 shadow-xl z-50">
          <nav className="flex flex-col p-4 space-y-2">
            <a 
              href="#home" 
              onClick={(e) => handleSmoothScroll(e, 'home')}
              className="px-4 py-3 text-lg font-poppins font-semibold text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-teal-500 hover:to-cyan-500 rounded-xl transition-all duration-300 cursor-pointer text-center"
            >
              Home
            </a>
            <a 
              href="#skills" 
              onClick={(e) => handleSmoothScroll(e, 'skills')}
              className="px-4 py-3 text-lg font-poppins font-semibold text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-teal-500 hover:to-cyan-500 rounded-xl transition-all duration-300 cursor-pointer text-center"
            >
              Skills
            </a>
            <a 
              href="#projects" 
              onClick={(e) => handleSmoothScroll(e, 'projects')}
              className="px-4 py-3 text-lg font-poppins font-semibold text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-teal-500 hover:to-cyan-500 rounded-xl transition-all duration-300 cursor-pointer text-center"
            >
              Projects
            </a>
            <a 
              href="#about" 
              onClick={(e) => handleSmoothScroll(e, 'about')}
              className="px-4 py-3 text-lg font-poppins font-semibold text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-teal-500 hover:to-cyan-500 rounded-xl transition-all duration-300 cursor-pointer text-center"
            >
              About
            </a>
            <a 
              href="#contact" 
              onClick={(e) => handleSmoothScroll(e, 'contact')}
              className="px-4 py-3 text-lg font-poppins font-semibold text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-teal-500 hover:to-cyan-500 rounded-xl transition-all duration-300 cursor-pointer text-center"
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </div>
  )
}

