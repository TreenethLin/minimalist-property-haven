
import { agent } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setLoaded(true);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center">
      <div 
        className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-background/95"
        aria-hidden="true"
      />
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 md:px-10">
        <div className={`space-y-6 max-w-xl transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary border border-border text-sm font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
            Premium Real Estate
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight">
            Discover Your <br />
            <span className="text-primary">Perfect Space</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Curating exceptional properties that align with your lifestyle and aspirations. Personalized service from start to finish.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" className="group">
              View Properties
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#contact">Contact Me</a>
            </Button>
          </div>
          <div className="flex items-center gap-4 pt-6">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-background overflow-hidden">
                  <img 
                    src={`https://source.unsplash.com/random/100x100?face&${i}`} 
                    alt="Client" 
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="text-sm">
              <span className="font-semibold">50+ clients</span>
              <span className="text-muted-foreground"> found their dream properties</span>
            </div>
          </div>
        </div>
        <div className={`relative transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden rounded-md bg-muted">
              <img
                src={agent.image}
                alt={agent.name}
                className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                onLoad={() => setLoaded(true)}
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-card shadow-lg rounded-md p-6 max-w-xs">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-sm font-semibold">{agent.name}</span>
                <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
                <span className="text-sm text-muted-foreground">{agent.title}</span>
              </div>
              <p className="text-sm leading-relaxed">
                "{agent.bio.split('.')[0]}."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
