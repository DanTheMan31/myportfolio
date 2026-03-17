"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { FloatingParticles } from "@/components/ui/floating-elements";
import Link from "next/link";
import { useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      emailjs.init('5n2vufOkPKnU4x7Zh');
      
      await emailjs.send(
        'service_vdhydcw', 
        'template_a4uiozp', 
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'omacdan7@gmail.com'
        }
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <section id="contact" className="py-20 lg:py-24 bg-gradient-to-br from-[#3D5467] to-[#94C5CC] relative overflow-hidden">
        <FloatingParticles />
        <div className="container max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-poppins font-extrabold text-white mb-6 tracking-tight">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-white/60 via-white to-white/60 mx-auto rounded-full"></div>
            <p className="text-lg md:text-xl text-white/90 mt-6 max-w-2xl mx-auto font-inter">
              Let's connect! Whether you have a project in mind, want to collaborate, or just say hello.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-poppins font-bold text-white mb-6">
                  Let's Start a Conversation
                </h3>
                <p className="text-lg text-white/80 leading-relaxed font-inter mb-8">
                  I'm always interested in new opportunities, collaborations, and connecting with fellow developers. Feel free to reach out!
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm font-medium">Email</p>
                    <Link href="mailto:omacdan7@gmail.com" className="text-white font-semibold hover:text-white/80 transition-colors">
                      omacdan7@gmail.com
                    </Link>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm font-medium">Location</p>
                    <p className="text-white font-semibold">Metro Manila, Philippines</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm font-medium">Response Time</p>
                    <p className="text-white font-semibold">Within 24 hours</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-white/70 text-sm mb-4">Current Status:</p>
                <Badge className="bg-green-500/20 text-green-100 border border-green-400/30 hover:bg-green-500/30 font-medium px-4 py-2">
                  Available for opportunities
                </Badge>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-white/90 font-medium mb-2 block">
                        Your Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                        disabled={isSubmitting}
                        suppressHydrationWarning
                        className="bg-white/10 border border-white/30 text-white placeholder:text-white/50 focus:border-white/60 focus:ring-white/20 rounded-xl disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white/90 font-medium mb-2 block">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        required
                        disabled={isSubmitting}
                        suppressHydrationWarning
                        className="bg-white/10 border border-white/30 text-white placeholder:text-white/50 focus:border-white/60 focus:ring-white/20 rounded-xl disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-white/90 font-medium mb-2 block">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Project Collaboration"
                      required
                      disabled={isSubmitting}
                      suppressHydrationWarning
                      className="bg-white/10 border border-white/30 text-white placeholder:text-white/50 focus:border-white/60 focus:ring-white/20 rounded-xl disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-white/90 font-medium mb-2 block">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project or just say hello..."
                      rows={6}
                      required
                      disabled={isSubmitting}
                      suppressHydrationWarning
                      className="bg-white/10 border border-white/30 text-white placeholder:text-white/50 focus:border-white/60 focus:ring-white/20 rounded-xl resize-none disabled:opacity-50"
                    />
                  </div>

                  {submitStatus === 'success' && (
                    <div className="bg-green-500/20 border border-green-400/30 text-green-100 px-4 py-3 rounded-xl">
                      Message sent successfully! I'll get back to you soon.
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="bg-red-500/20 border border-red-400/30 text-red-100 px-4 py-3 rounded-xl">
                       Failed to send message. Please try again or email me directly.
                    </div>
                  )}

                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-[#3D5467] hover:bg-white/90 font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl hover:shadow-white/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="relative z-10">
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#3D5467]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <span className="flex items-center justify-center gap-2">
                            Send Message
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            </svg>
                          </span>
                        </>
                      )}
                    </span>
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-poppins font-bold text-white mb-4">Dan Christian Omac</h3>
              <p className="text-slate-400 font-inter leading-relaxed">
                BSIT student specializing in Mobile & Web Applications. Building digital experiences with passion and precision.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-poppins font-semibold text-white mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="#home" className="block text-slate-400 hover:text-white transition-colors">Home</Link>
                <Link href="#about" className="block text-slate-400 hover:text-white transition-colors">About</Link>
                <Link href="#skills" className="block text-slate-400 hover:text-white transition-colors">Skills</Link>
                <Link href="#projects" className="block text-slate-400 hover:text-white transition-colors">Projects</Link>
                <Link href="#contact" className="block text-slate-400 hover:text-white transition-colors">Contact</Link>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-poppins font-semibold text-white mb-4">Connect</h4>
              <div className="space-y-2">
                <Link href="mailto:omacdan7@gmail.com" className="block text-slate-400 hover:text-white transition-colors">
                  omacdan7@gmail.com
                </Link>
                <p className="text-slate-400">Metro Manila, Philippines</p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm font-inter">
              © 2025 Dan Christian Omac. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}