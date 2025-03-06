import { agent } from "@/lib/data";
import { Instagram, Linkedin, Twitter, Mail, Phone, ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-primary rounded-full p-2 mr-2">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <span className="font-display font-medium text-xl">WorkSpace</span>
            </div>
            <p className="text-muted-foreground">
              Curating exceptional office spaces that align with your business needs and aspirations. Personalized service from start to finish.
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
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/listings" className="text-muted-foreground hover:text-primary transition-colors">
                  Office Spaces
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                <a href={`mailto:${agent.email}`} className="text-muted-foreground hover:text-primary transition-colors break-words">
                  {agent.email}
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                <a href={`tel:${agent.phone}`} className="text-muted-foreground hover:text-primary transition-colors">
                  {agent.phone}
                </a>
              </li>
              <li className="flex items-start">
                <span className="text-muted-foreground">
                  1234 WorkSpace Avenue<br />
                  Business District, NY 10001
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} WorkSpace. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer;