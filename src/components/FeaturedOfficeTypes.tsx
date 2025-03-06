import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface OfficeType {
  title: string;
  propertyCount: number;
  image: string;
  slug: string;
  type: string;
}

const officeTypes: OfficeType[] = [
  {
    title: "Private Offices",
    propertyCount: 24,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2832&auto=format&fit=crop",
    slug: "private-offices",
    type: "Office"
  },
  {
    title: "Co-working Spaces",
    propertyCount: 18,
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop",
    slug: "co-working",
    type: "Co-Working"
  },
  {
    title: "Serviced Offices",
    propertyCount: 15,
    image: "https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?q=80&w=2072&auto=format&fit=crop",
    slug: "serviced-offices",
    type: "Serviced Office"
  },
  {
    title: "Virtual Offices",
    propertyCount: 20,
    image: "https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=2070&auto=format&fit=crop",
    slug: "virtual-offices",
    type: "Virtual Office"
  }
];

const FeaturedOfficeTypes = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {officeTypes.map((office, index) => (
            <Link
              key={office.title}
              to={`/listings?type=${office.type}`}
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