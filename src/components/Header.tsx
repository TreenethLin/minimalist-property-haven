
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && !(e.target as Element).closest('.mobile-menu-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-10",
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-background/80 backdrop-blur-sm"
      )}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-primary rounded-full p-2 mr-2">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <Link to="/" className="font-display font-medium text-xl">
              WorkSpace
            </Link>
          </div>

          {/* Desktop Navigation - Simplified */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/listings" className="text-sm font-medium hover:text-primary transition-colors">
              Office Spaces
            </Link>
            <Link to="/blog" className="text-sm font-medium hover:text-primary transition-colors">
              Resources
            </Link>
            <div className="ml-4">
              <Link to="/contact" className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                Get a Quote
              </Link>
            </div>
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

      {/* Mobile Menu - Solid White Background */}
      {isOpen && (
        <div className="fixed inset-0 bg-white z-40 md:hidden mobile-menu-container">
          <div className="relative h-full flex flex-col p-6">
            {/* Close button */}
            <button 
              className="absolute top-4 right-6 p-2 focus:outline-none"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
            
            {/* Logo */}
            <div className="flex items-center mt-4 mb-10">
              <div className="bg-primary rounded-full p-2 mr-2">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <Link to="/" className="font-display font-medium text-xl" onClick={() => setIsOpen(false)}>
                WorkSpace
              </Link>
            </div>
            
            {/* Menu items */}
            <nav className="flex-1 flex flex-col space-y-6">
              <Link 
                to="/" 
                className="text-xl font-medium hover:text-primary transition-colors" 
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/listings" 
                className="text-xl font-medium hover:text-primary transition-colors" 
                onClick={() => setIsOpen(false)}
              >
                Office Spaces
              </Link>
              <Link 
                to="/blog" 
                className="text-xl font-medium hover:text-primary transition-colors" 
                onClick={() => setIsOpen(false)}
              >
                Resources
              </Link>
            </nav>
            
            {/* Get a Quote button */}
            <div className="mt-6">
              <Link 
                to="/contact" 
                className="block w-full py-3 bg-primary text-primary-foreground rounded-md text-center font-medium hover:bg-primary/90 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Get a Quote
              </Link>
            </div>
            
            {/* Partner logo in mobile menu */}
            <div className="border-t border-border mt-8 pt-8 flex flex-col items-center">
              <p className="text-sm text-muted-foreground mb-4">Official Partner With</p>
              <a 
                href="https://www.justcoglobal.com/" 
                target="_blank"
                rel="noopener noreferrer"
              >
                <img 
                  src="https://careher.net/wp-content/uploads/2020/02/JustCo-Logo-Square_Original-on-Transparent-Background.png" 
                  alt="JustCo - Official Partner" 
                  className="h-14"
                />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
