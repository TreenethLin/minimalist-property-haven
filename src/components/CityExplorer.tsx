
import { useState, useEffect } from "react";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface City {
  name: string;
  propertyCount: number;
  image: string;
  slug: string;
}

const cities: City[] = [
  {
    name: "New York",
    propertyCount: 18,
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop",
    slug: "new-york"
  },
  {
    name: "Singapore",
    propertyCount: 12,
    image: "https://images.unsplash.com/photo-1565967511849-76a60a516170?q=80&w=2071&auto=format&fit=crop",
    slug: "singapore"
  },
  {
    name: "Hong Kong",
    propertyCount: 15,
    image: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?q=80&w=2928&auto=format&fit=crop",
    slug: "hong-kong"
  },
  {
    name: "Tokyo",
    propertyCount: 10,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1988&auto=format&fit=crop",
    slug: "tokyo"
  },
  {
    name: "London",
    propertyCount: 14,
    image: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=2071&auto=format&fit=crop",
    slug: "london"
  },
  {
    name: "Sydney",
    propertyCount: 9,
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2070&auto=format&fit=crop",
    slug: "sydney"
  }
];

const CityExplorer = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="py-20 px-6 md:px-10 bg-background">
      <div className="container mx-auto">
        <div className={`text-center mb-10 transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary border border-border text-sm font-medium mb-4">
            <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
            Global Presence
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Cities</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find premium workspace solutions in major business hubs around the world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city, index) => (
            <Link 
              key={city.name}
              to={`/listings?city=${city.slug}`}
              className={`group relative overflow-hidden rounded-lg h-64 transition-all duration-700 ease-out hover:-translate-y-1 shadow-sm ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* City image with overlay */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={city.image}
                  alt={`${city.name} workspaces`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              
              {/* City details */}
              <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                <h3 className="text-xl font-semibold mb-1">{city.name}</h3>
                <p className="text-sm text-white/80">{city.propertyCount} Workspaces</p>
              </div>
              
              {/* "See all" button - only on the first card */}
              {index === 0 && (
                <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-sm rounded-full p-2 text-white text-xs font-medium flex items-center transition-all duration-300 group-hover:bg-white/20">
                  See All Cities <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CityExplorer;
