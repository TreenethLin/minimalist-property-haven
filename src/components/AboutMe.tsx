
import { useState, useEffect } from "react";
import { agent } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Instagram, Twitter, Phone, Mail, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutMe = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section id="about" className="py-24 px-6 md:px-10 bg-[#F8F9FA]">
      <div className="container mx-auto">
        <div className={`text-center mb-12 transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary border border-border text-sm font-medium mb-4">
            <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
            About Me
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Workspace Solutions Partner</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Dedicated to finding the perfect office space solution for every business's unique requirements and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Agent Image - Reduced size and improved responsive layout */}
          <div className={`lg:col-span-5 transition-all duration-1000 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative rounded-lg overflow-hidden shadow-xl max-w-md mx-auto lg:ml-0">
              <img 
                src={agent.image} 
                alt={agent.name} 
                className="w-full h-auto object-cover aspect-[3/4]"
                onLoad={() => setLoaded(true)}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white text-2xl font-bold">{agent.name}</h3>
                <p className="text-white/80">{agent.title}</p>
              </div>
            </div>
          </div>

          {/* Agent Info - Improved layout */}
          <div className={`lg:col-span-7 space-y-6 transition-opacity duration-700 ease-in-out delay-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            <div>
              <h3 className="text-2xl font-bold mb-4">About {agent.name}</h3>
              <p className="text-muted-foreground">{agent.bio}</p>
            </div>

            {/* Credentials */}
            <div>
              <h4 className="text-lg font-semibold mb-3">Credentials</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {agent.credentials.map((credential, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{credential}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-12 gap-4">
              <Card className="col-span-5 bg-white hover:shadow-md transition-all duration-300">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="bg-primary/10 p-2 rounded-full flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{agent.phone}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-7 bg-white hover:shadow-md transition-all duration-300">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="bg-primary/10 p-2 rounded-full flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium truncate">{agent.email}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold mb-3">Connect With Me</h4>
              <div className="flex gap-3">
                {agent.social.linkedin && (
                  <Button variant="outline" size="icon" className="rounded-full" asChild>
                    <a href={agent.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </Button>
                )}
                {agent.social.instagram && (
                  <Button variant="outline" size="icon" className="rounded-full" asChild>
                    <a href={agent.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <Instagram className="h-5 w-5" />
                    </a>
                  </Button>
                )}
                {agent.social.twitter && (
                  <Button variant="outline" size="icon" className="rounded-full" asChild>
                    <a href={agent.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                      <Twitter className="h-5 w-5" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
