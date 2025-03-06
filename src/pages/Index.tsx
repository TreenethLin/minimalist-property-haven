
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PropertyGrid from "@/components/PropertyGrid";
import CityExplorer from "@/components/CityExplorer";
import FeaturedOfficeTypes from "@/components/FeaturedOfficeTypes";
import AboutMe from "@/components/AboutMe";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import BlogSection from "@/components/BlogSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  // Smooth scroll functionality for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isAnchor = target.tagName === 'A' && target.getAttribute('href')?.startsWith('#');
      
      if (isAnchor) {
        e.preventDefault();
        const id = target.getAttribute('href')?.substring(1);
        const element = document.getElementById(id as string);
        
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="overflow-hidden">
        <Hero />
        <CityExplorer />
        <FeaturedOfficeTypes />
        <PropertyGrid />
        <AboutMe />
        <TestimonialCarousel />
        <BlogSection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
