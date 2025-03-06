
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { MapPin, Phone, Mail, ArrowRight, CheckCircle, Facebook, Instagram, MessageCircle } from "lucide-react";
import { agent } from "@/lib/data";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Your message has been sent successfully!");
      console.log("Form submitted:", formData);
      
      // Reset form after a delay
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-10 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary border border-border text-sm font-medium mb-4">
            <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
            Contact Me
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Dream Home?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Reach out today and let's discuss how I can help you achieve your real estate goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
              <div className="flex items-center mb-6">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Office Location</h3>
                  <p className="text-muted-foreground">
                    1234 Modern Avenue<br />
                    Design District, NY 10001
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4 flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Call Directly</h3>
                    <a href={`tel:${agent.phone}`} className="text-muted-foreground hover:text-primary transition-colors">
                      {agent.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4 flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Email Me</h3>
                    <a href={`mailto:${agent.email}`} className="text-muted-foreground hover:text-primary transition-colors break-all">
                      {agent.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="font-bold mb-4">Social Channels</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="icon" asChild className="rounded-full h-11 w-11 bg-[#1877F2]/10 border-[#1877F2]/20 hover:bg-[#1877F2]/20">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <Facebook className="h-5 w-5 text-[#1877F2]" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild className="rounded-full h-11 w-11 bg-[#E4405F]/10 border-[#E4405F]/20 hover:bg-[#E4405F]/20">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <Instagram className="h-5 w-5 text-[#E4405F]" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild className="rounded-full h-11 w-11 bg-[#00B900]/10 border-[#00B900]/20 hover:bg-[#00B900]/20">
                    <a href="https://line.me" target="_blank" rel="noopener noreferrer" aria-label="Line">
                      <MessageCircle className="h-5 w-5 text-[#00B900]" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white p-8 rounded-lg border border-border shadow-sm">
              <h3 className="text-xl font-semibold mb-6">Send Me a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your real estate needs..."
                    rows={5}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full group"
                  disabled={isSubmitting || isSubmitted}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : isSubmitted ? (
                    <>
                      Message Sent <CheckCircle className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Send Message <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
