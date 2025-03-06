
import { useState, useEffect } from "react";
import { Building, Key, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ServiceCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  linkText: string;
  linkUrl: string;
}

const services: ServiceCard[] = [
  {
    title: "Flexible Office Space",
    description: "Find the perfect workspace tailored to your business needs with flexible terms.",
    icon: <Building className="h-12 w-12 text-primary" />,
    linkText: "View Spaces",
    linkUrl: "/listings?type=flexible"
  },
  {
    title: "Virtual Office Solutions",
    description: "Professional business address and mail handling without physical presence.",
    icon: <Key className="h-12 w-12 text-primary" />,
    linkText: "Get Started",
    linkUrl: "/listings?type=virtual-offices"
  },
  {
    title: "Meeting Room Booking",
    description: "Book professional meeting spaces by the hour for your important discussions.",
    icon: <Clock className="h-12 w-12 text-primary" />,
    linkText: "Book Now",
    linkUrl: "/listings?type=meeting-rooms"
  }
];

const WorkspaceServices = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="py-20 px-6 md:px-10 bg-background">
      <div className="container mx-auto">
        <div className={`text-center mb-12 transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary border border-border text-sm font-medium mb-4">
            <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
            Business Solutions
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See How We Can Help</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive workspace solutions to support your business growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className={`bg-card rounded-lg p-8 flex flex-col items-center text-center shadow-sm transition-all duration-700 hover:shadow-md ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-6 p-4 bg-secondary rounded-full">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              <Button asChild variant="outline" className="mt-auto group">
                <Link to={service.linkUrl}>
                  {service.linkText} <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkspaceServices;
