import { useState, useEffect } from "react";
import { Building, Key, Clock } from "lucide-react";

interface ServiceInfo {
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
}

const services: ServiceInfo[] = [
  {
    title: "Flexible Office Space",
    description: "Find the perfect workspace tailored to your business needs with flexible terms.",
    icon: <Building className="h-12 w-12 text-primary" />,
    details: [
      "Multiple office sizes available",
      "Month-to-month or long-term options",
      "Fully furnished and move-in ready",
      "Access to shared amenities"
    ]
  },
  {
    title: "Meeting Room Booking",
    description: "Professional meeting spaces available by the hour for your important discussions.",
    icon: <Clock className="h-12 w-12 text-primary" />,
    details: [
      "Various room sizes for 2-20 people",
      "High-speed internet and AV equipment",
      "Catering options available",
      "Hourly, half-day, or full-day bookings"
    ]
  },
  {
    title: "24/7 Secure Access",
    description: "Round-the-clock access to your workspace with enterprise-grade security systems.",
    icon: <Key className="h-12 w-12 text-primary" />,
    details: [
      "Keycard entry system for all members",
      "Biometric security options available",
      "24/7 surveillance and monitoring",
      "Secure private network and Wi-Fi"
    ]
  }
];

const WorkspaceServices = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10 bg-background">
      <div className="container mx-auto">
        <div className={`mb-10 sm:mb-12 transition-opacity duration-700 ease-in-out max-w-2xl mx-auto text-center ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary border border-border text-sm font-medium mb-4">
            <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
            Our Services
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Workspace Solutions</h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            A workspace options designed to support businesses of all sizes
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className={`bg-card rounded-lg p-6 sm:p-8 flex flex-col shadow-sm transition-all duration-700 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-5 p-3 bg-secondary rounded-full w-fit">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground mb-4">{service.description}</p>
              <div className="mt-2">
                <h4 className="text-sm font-medium mb-2">Features:</h4>
                <ul className="space-y-2">
                  {service.details.map((detail, i) => (
                    <li key={i} className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></span>
                      <span className="text-sm">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkspaceServices;