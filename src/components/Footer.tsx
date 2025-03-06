import { agent } from "@/lib/data";
import { Instagram, Linkedin, Twitter, Mail, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="border-b border-border">
        <div className="container mx-auto py-6 px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="font-semibold text-lg">Official Partner With</h3>
            </div>
            <div className="flex items-center">
              <a 
                href="https://www.justcoglobal.com/" 
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
              >
                <img 
                  src="https://careher.net/wp-content/uploads/2020/02/JustCo-Logo-Square_Original-on-Transparent-Background.png" 
                  alt="JustCo - Official Partner" 
                  className="h-16 md:h-20"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-16 px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="font-display font-bold text-2xl">
              MODERN<span className="font-light">ESTATES</span>
            </div>
            <p className="text-muted-foreground">
              Curating exceptional properties that align with your lifestyle and aspirations. Personalized service from start to finish.
            </p>
            <div className="flex space-x-4 pt-2">
              {agent.social.instagram && (
                <a 
                  href={agent.social.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {agent.social.linkedin && (
                <a 
                  href={agent.social.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {agent.social.twitter && (
                <a 
                  href={agent.social.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#properties" className="text-muted-foreground hover:text-primary transition-colors">
                  Properties
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex">
                <Mail className="h-5 w-5 mr-3 text-primary" />
                <a href={`mailto:${agent.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                  {agent.email}
                </a>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 mr-3 text-primary" />
                <a href={`tel:${agent.phone}`} className="text-muted-foreground hover:text-primary transition-colors">
                  {agent.phone}
                </a>
              </li>
              <li className="flex">
                <span className="text-muted-foreground">
                  1234 Modern Avenue<br />
                  Design District, NY 10001
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to receive updates on new properties and market insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input placeholder="Your email" type="email" />
              <Button size="sm" className="whitespace-nowrap group">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Modern Estates. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
