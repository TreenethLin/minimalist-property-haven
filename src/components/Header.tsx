
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-10",
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <a href="/" className="font-display font-bold text-2xl">
            MODERN<span className="font-light">ESTATES</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#properties" className="text-sm font-medium hover:text-primary/80 transition-colors">
              Properties
            </a>
            <a href="#testimonials" className="text-sm font-medium hover:text-primary/80 transition-colors">
              Testimonials
            </a>
            <a href="#blog" className="text-sm font-medium hover:text-primary/80 transition-colors">
              Blog
            </a>
            <a href="#about" className="text-sm font-medium hover:text-primary/80 transition-colors">
              About
            </a>
            <Button asChild>
              <a href="#contact">Contact</a>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col justify-center items-center space-y-8 transition-all duration-300 ease-in-out",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <a 
          href="#properties" 
          className="text-xl font-medium"
          onClick={() => setIsOpen(false)}
        >
          Properties
        </a>
        <a 
          href="#testimonials" 
          className="text-xl font-medium"
          onClick={() => setIsOpen(false)}
        >
          Testimonials
        </a>
        <a 
          href="#blog" 
          className="text-xl font-medium"
          onClick={() => setIsOpen(false)}
        >
          Blog
        </a>
        <a 
          href="#about" 
          className="text-xl font-medium"
          onClick={() => setIsOpen(false)}
        >
          About
        </a>
        <Button 
          asChild
          onClick={() => setIsOpen(false)}
        >
          <a href="#contact">Contact</a>
        </Button>
      </div>
    </header>
  );
};

export default Header;
