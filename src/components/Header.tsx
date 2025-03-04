
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Home, Building, Building2, Key, User, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
              <Home className="h-5 w-5 text-white" />
            </div>
            <a href="/" className="font-display font-medium text-xl">
              homez
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
                Listing
              </Link>
            </div>
            <div className="relative group px-4 py-2">
              <Link to="/property/1" className="flex items-center text-sm font-medium hover:text-primary transition-colors">
                Property
              </Link>
            </div>
            <div className="relative group px-4 py-2">
              <Link to="/blog" className="flex items-center text-sm font-medium hover:text-primary transition-colors">
                Blog
              </Link>
            </div>
            <div className="relative group px-4 py-2">
              <span className="flex items-center text-sm font-medium hover:text-primary transition-colors">
                Pages
              </span>
            </div>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-sm font-medium">
              <User className="h-4 w-4 mr-1" /> Login / Register
            </Button>
            <Button size="sm" className="text-sm font-medium gap-1 rounded-full" asChild>
              <Link to="/listings">
                Add Property <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

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
        <Link to="/" className="text-xl font-medium" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/listings" className="text-xl font-medium" onClick={() => setIsOpen(false)}>Listing</Link>
        <Link to="/property/1" className="text-xl font-medium" onClick={() => setIsOpen(false)}>Property</Link>
        <Link to="/blog" className="text-xl font-medium" onClick={() => setIsOpen(false)}>Blog</Link>
        <span className="text-xl font-medium">Pages</span>
        <Button variant="outline" onClick={() => setIsOpen(false)}>
          <User className="h-4 w-4 mr-2" /> Login / Register
        </Button>
        <Button onClick={() => setIsOpen(false)} asChild>
          <Link to="/listings">Add Property</Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
