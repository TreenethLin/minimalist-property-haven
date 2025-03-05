
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Building2, ChevronDown } from "lucide-react";
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
            <a href="/" className="font-display font-medium text-xl">
              WorkSpace
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <div className="relative group px-4 py-2">
              <Link to="/" className="flex items-center text-sm font-medium hover:text-primary transition-colors">
                Home
              </Link>
            </div>
            <div className="relative group px-4 py-2">
              <Link to="/listings" className="flex items-center text-sm font-medium hover:text-primary transition-colors">
                Office Spaces
              </Link>
            </div>
            <div className="relative group px-4 py-2">
              <Link to="/virtual-offices" className="flex items-center text-sm font-medium hover:text-primary transition-colors">
                Virtual Offices
              </Link>
            </div>
            <div className="relative group px-4 py-2">
              <Link to="/blog" className="flex items-center text-sm font-medium hover:text-primary transition-colors">
                Resources
              </Link>
            </div>
            <div className="relative group px-4 py-2">
              <span className="flex items-center text-sm font-medium hover:text-primary transition-colors cursor-pointer">
                Services
                <ChevronDown className="ml-1 h-4 w-4" />
              </span>
              <div className="absolute left-0 mt-2 w-48 origin-top-left rounded-md bg-white shadow-md p-2 invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100 z-50">
                <Link to="/office-solutions" className="block px-4 py-2 text-sm hover:bg-muted rounded-md">
                  Office Solutions
                </Link>
                <Link to="/meeting-rooms" className="block px-4 py-2 text-sm hover:bg-muted rounded-md">
                  Meeting Rooms
                </Link>
                <Link to="/business-services" className="block px-4 py-2 text-sm hover:bg-muted rounded-md">
                  Business Services
                </Link>
              </div>
            </div>
            <div className="ml-4">
              <Link to="/contact" className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                Book a Tour
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

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-background/95 backdrop-blur-md z-40 mobile-menu-container md:hidden transition-all duration-300 ease-in-out",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col h-full pt-20 px-6 pb-8 overflow-y-auto">
          <div className="flex-1 flex flex-col space-y-3">
            <Link 
              to="/" 
              className="py-3 px-4 rounded-md hover:bg-muted transition-colors text-lg font-medium" 
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/listings" 
              className="py-3 px-4 rounded-md hover:bg-muted transition-colors text-lg font-medium" 
              onClick={() => setIsOpen(false)}
            >
              Office Spaces
            </Link>
            <Link 
              to="/virtual-offices" 
              className="py-3 px-4 rounded-md hover:bg-muted transition-colors text-lg font-medium" 
              onClick={() => setIsOpen(false)}
            >
              Virtual Offices
            </Link>
            <Link 
              to="/blog" 
              className="py-3 px-4 rounded-md hover:bg-muted transition-colors text-lg font-medium" 
              onClick={() => setIsOpen(false)}
            >
              Resources
            </Link>
            
            <div className="py-2 px-4 text-lg font-medium">Services</div>
            <div className="pl-4 space-y-2">
              <Link 
                to="/office-solutions" 
                className="py-2 px-4 rounded-md hover:bg-muted transition-colors block text-base" 
                onClick={() => setIsOpen(false)}
              >
                Office Solutions
              </Link>
              <Link 
                to="/meeting-rooms" 
                className="py-2 px-4 rounded-md hover:bg-muted transition-colors block text-base" 
                onClick={() => setIsOpen(false)}
              >
                Meeting Rooms
              </Link>
              <Link 
                to="/business-services" 
                className="py-2 px-4 rounded-md hover:bg-muted transition-colors block text-base" 
                onClick={() => setIsOpen(false)}
              >
                Business Services
              </Link>
            </div>
          </div>
          
          <div className="mt-6">
            <Link 
              to="/contact" 
              className="w-full flex justify-center py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Book a Tour
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
