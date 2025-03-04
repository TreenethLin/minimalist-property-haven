
import { useState, useEffect } from "react";
import { ArrowRight, House, Building2, Building, Landmark, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const [propertyType, setPropertyType] = useState('buy'); // 'buy', 'rent', or 'sold'
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
            Easy Way to Find a <br />
            <span className="text-gray-900">Perfect Property</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            From as low as $10 per day with limited time offer discounts
          </p>

          {/* Property Type Tabs */}
          <div className="bg-white rounded-lg shadow-sm inline-flex p-1 mt-6 max-w-md">
            <button
              className={`px-10 py-3 rounded-md font-medium text-sm transition-colors ${propertyType === 'buy' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setPropertyType('buy')}
            >
              Buy
            </button>
            <button
              className={`px-10 py-3 rounded-md font-medium text-sm transition-colors ${propertyType === 'rent' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setPropertyType('rent')}
            >
              Rent
            </button>
            <button
              className={`px-10 py-3 rounded-md font-medium text-sm transition-colors ${propertyType === 'sold' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setPropertyType('sold')}
            >
              Sold
            </button>
          </div>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="bg-white p-4 rounded-lg shadow-sm mt-4 flex flex-col space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input 
                className="pl-10 pr-4 py-6 text-base" 
                placeholder={`Search Properties for ${propertyType === 'buy' ? 'Buy' : propertyType === 'rent' ? 'Rent' : 'Sold'}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center">
              <Button 
                variant="outline" 
                className="text-muted-foreground border-muted-foreground/30"
                type="button"
              >
                Advanced
              </Button>
              <Button 
                className="rounded-full w-12 h-12 p-0 flex items-center justify-center" 
                type="submit"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </form>

          {/* Property Categories */}
          <div className="flex flex-wrap gap-3 mt-6">
            <Button variant="outline" className="rounded-full bg-white shadow-sm flex items-center gap-2">
              <div className="bg-primary/10 p-1 rounded-full">
                <House className="h-4 w-4 text-primary" />
              </div>
              Houses
            </Button>
            <Button variant="outline" className="rounded-full bg-white shadow-sm flex items-center gap-2">
              <div className="bg-primary/10 p-1 rounded-full">
                <Building2 className="h-4 w-4 text-primary" />
              </div>
              Apartments
            </Button>
            <Button variant="outline" className="rounded-full bg-white shadow-sm flex items-center gap-2">
              <div className="bg-primary/10 p-1 rounded-full">
                <Building className="h-4 w-4 text-primary" />
              </div>
              Office
            </Button>
            <Button variant="outline" className="rounded-full bg-white shadow-sm flex items-center gap-2">
              <div className="bg-primary/10 p-1 rounded-full">
                <Landmark className="h-4 w-4 text-primary" />
              </div>
              Villa
            </Button>
          </div>
        </div>

        {/* Right Content - Image with circular badge */}
        <div className={`relative transition-all duration-1000 ease-out flex items-center justify-center ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* The main property image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Beautiful property"
              className="rounded-lg shadow-xl object-cover h-[500px] w-full"
              onLoad={() => setLoaded(true)}
            />
            
            {/* The circular "Real Estate Agency" badge */}
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
                      Real Estate • Agency • 
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
