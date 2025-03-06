
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface OfficeType {
  title: string;
  propertyCount: number;
  image: string;
  slug: string;
}

const officeTypes: OfficeType[] = [
  {
    title: "Private Offices",
    propertyCount: 24,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2832&auto=format&fit=crop",
    slug: "private-offices"
  },
  {
    title: "Co-working Spaces",
    propertyCount: 18,
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop",
    slug: "co-working"
  },
  {
    title: "Meeting Rooms",
    propertyCount: 15,
    image: "https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?q=80&w=2072&auto=format&fit=crop",
    slug: "meeting-rooms"
  },
  {
    title: "Virtual Offices",
    propertyCount: 20,
    image: "https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=2070&auto=format&fit=crop",
    slug: "virtual-offices"
  }
];

const FeaturedOfficeTypes = () => {
  const [loaded, setLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? officeTypes.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === officeTypes.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 px-6 md:px-10 bg-muted/30">
      <div className="container mx-auto">
        <div className="flex flex-col items-center mb-10">
          <div className={`transition-opacity duration-700 ease-in-out text-center ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary border border-border text-sm font-medium mb-4">
              <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
              Workspace Solutions
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Office Types</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Discover the perfect workspace solution for your business needs
            </p>
          </div>

          <div className={`flex gap-2 mt-6 transition-opacity duration-700 delay-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            <button 
              onClick={handlePrevious}
              className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={handleNext}
              className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {officeTypes.map((office, index) => (
            <Link
              key={office.title}
              to={`/listings?type=${office.slug}`}
              className={`group relative overflow-hidden rounded-lg transition-all duration-700 ease-out hover:-translate-y-1 shadow-sm ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Office type image */}
              <div className="aspect-[4/5] w-full relative">
                <img
                  src={office.image}
                  alt={office.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              </div>
              
              {/* Office type details */}
              <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                <h3 className="text-xl font-semibold mb-1">{office.title}</h3>
                <p className="text-sm text-white/80">{office.propertyCount} Properties</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedOfficeTypes;
