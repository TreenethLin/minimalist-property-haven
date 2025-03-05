
import { useState, useEffect } from "react";
import { ArrowRight, Building, Building2, Briefcase, Laptop, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const [propertyType, setPropertyType] = useState('office'); // 'office', 'coworking', or 'virtual'
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger animation after component mounts
    setLoaded(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/listings?query=${searchQuery}&type=${propertyType}`);
  };

  // Handler for category chip clicks
  const handleCategoryClick = (category: string) => {
    navigate(`/listings?category=${category}`);
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center pt-20">
      {/* Background */}
      <div 
        className="absolute inset-0 -z-10 bg-[#E8EEF1]"
        aria-hidden="true"
      />
      
      <div className="container mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 py-16">
        {/* Left Content */}
        <div className={`space-y-6 max-w-xl transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'} flex flex-col justify-center`}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-gray-900">
            Find Your Perfect <br />
            <span className="text-gray-900">Workspace Solution</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            From private offices to co-working spaces and virtual solutions, find the perfect workspace for your business needs.
          </p>

          {/* Property Type Tabs */}
          <div className="bg-white rounded-lg shadow-sm inline-flex p-1 mt-6 max-w-md">
            <button
              className={`px-10 py-3 rounded-md font-medium text-sm transition-colors ${propertyType === 'office' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setPropertyType('office')}
            >
              Office
            </button>
            <button
              className={`px-10 py-3 rounded-md font-medium text-sm transition-colors ${propertyType === 'coworking' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setPropertyType('coworking')}
            >
              Co-working
            </button>
            <button
              className={`px-10 py-3 rounded-md font-medium text-sm transition-colors ${propertyType === 'virtual' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setPropertyType('virtual')}
            >
              Virtual
            </button>
          </div>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="bg-white p-4 rounded-lg shadow-sm mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input 
                className="pl-10 pr-4 py-6 text-base" 
                placeholder={`Search ${propertyType === 'office' ? 'Office Spaces' : propertyType === 'coworking' ? 'Co-working Spaces' : 'Virtual Office Solutions'}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* Property Categories - Now clickable */}
          <div className="flex flex-wrap gap-3 mt-6">
            <Button 
              variant="outline" 
              className="rounded-full bg-white shadow-sm flex items-center gap-2 hover:bg-primary/10"
              onClick={() => handleCategoryClick('executive')}
            >
              <div className="bg-primary/10 p-1 rounded-full">
                <Building className="h-4 w-4 text-primary" />
              </div>
              Executive Suites
            </Button>
            <Button 
              variant="outline" 
              className="rounded-full bg-white shadow-sm flex items-center gap-2 hover:bg-primary/10"
              onClick={() => handleCategoryClick('open')}
            >
              <div className="bg-primary/10 p-1 rounded-full">
                <Building2 className="h-4 w-4 text-primary" />
              </div>
              Open Workspaces
            </Button>
            <Button 
              variant="outline" 
              className="rounded-full bg-white shadow-sm flex items-center gap-2 hover:bg-primary/10"
              onClick={() => handleCategoryClick('meeting')}
            >
              <div className="bg-primary/10 p-1 rounded-full">
                <Briefcase className="h-4 w-4 text-primary" />
              </div>
              Meeting Rooms
            </Button>
            <Button 
              variant="outline" 
              className="rounded-full bg-white shadow-sm flex items-center gap-2 hover:bg-primary/10"
              onClick={() => handleCategoryClick('virtual')}
            >
              <div className="bg-primary/10 p-1 rounded-full">
                <Laptop className="h-4 w-4 text-primary" />
              </div>
              Virtual Offices
            </Button>
          </div>
        </div>

        {/* Right Content - Image with circular badge */}
        <div className={`relative transition-all duration-1000 ease-out flex items-center justify-center ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* The main property image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
              alt="Modern office space"
              className="rounded-lg shadow-xl object-cover h-[500px] w-full"
              onLoad={() => setLoaded(true)}
            />
            
            {/* The circular "Workspace Solutions" badge */}
            <div className="absolute -top-4 -right-4 w-32 h-32 rounded-full flex items-center justify-center">
              <div className="relative h-full w-full">
                <svg viewBox="0 0 100 100" className="animate-spin-slow">
                  <path 
                    id="circle"
                    d="M 50 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                    fill="none"
                    stroke="none"
                  />
                  <text>
                    <textPath href="#circle" className="text-xs tracking-widest uppercase font-medium">
                      Workspace • Solutions • 
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <ArrowRight className="h-6 w-6 text-gray-800" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
