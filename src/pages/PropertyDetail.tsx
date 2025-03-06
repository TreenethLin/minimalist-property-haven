import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { properties } from "@/lib/data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleMap from "@/components/GoogleMap";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bed, Bath, Square, MapPin, Check, 
  ArrowLeft, Share2, Heart, Send, MapIcon,
  Users
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { agent } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const property = properties.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!property) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center pt-24">
          <div className="text-center p-8">
            <h1 className="text-3xl font-bold mb-4">Property Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The property you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate("/listings")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Listings
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const handleInquiryChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInquiryForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast.success("Your inquiry has been sent successfully!");
      setInquiryForm({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        {/* Property Images */}
        <section className="bg-muted">
          <div className="container mx-auto px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="aspect-[4/3] w-full overflow-hidden rounded-lg mb-4">
                  <img
                    src={property.images[activeImageIndex]}
                    alt={property.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {property.images.map((image, index) => (
                    <div 
                      key={index}
                      className={`aspect-[4/3] overflow-hidden rounded cursor-pointer border-2 ${
                        index === activeImageIndex 
                          ? "border-primary" 
                          : "border-transparent"
                      }`}
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <img
                        src={image}
                        alt={`${property.title} - Image ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <div className="badge bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                      {property.type}
                    </div>
                    <div className={`badge px-3 py-1 rounded-full text-xs font-medium text-white
                      ${property.status === "Available" 
                        ? "bg-green-500" 
                        : property.status === "Pending" 
                          ? "bg-amber-500" 
                          : "bg-red-500"}`
                    }>
                      {property.status}
                    </div>
                  </div>
                  
                  <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                  
                  <div className="flex items-center text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{property.address}</span>
                  </div>
                  
                  <div className="text-3xl font-bold text-primary mb-6">
                    {(property.type === "Office" || property.type === "Co-Working") 
                      ? `$${property.price.toLocaleString()}/mo` 
                      : `$${property.price.toLocaleString()}`}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                      {property.type === "Co-Working" ? (
                        <>
                          <Users className="h-5 w-5 mb-1 text-primary" />
                          <span className="text-sm text-muted-foreground">Capacity</span>
                          <span className="font-medium">{property.capacity} people</span>
                        </>
                      ) : (
                        <>
                          <Bed className="h-5 w-5 mb-1 text-primary" />
                          <span className="text-sm text-muted-foreground">Size</span>
                          <span className="font-medium">{property.size} sq ft</span>
                        </>
                      )}
                    </div>
                    <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                      <Bath className="h-5 w-5 mb-1 text-primary" />
                      <span className="text-sm text-muted-foreground">Bathrooms</span>
                      <span className="font-medium">{property.bathrooms}</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                      <Square className="h-5 w-5 mb-1 text-primary" />
                      <span className="text-sm text-muted-foreground">Area</span>
                      <span className="font-medium">{property.spaceSize.toLocaleString()} sq ft</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {property.amenities && property.amenities.map((amenity, index) => (
                      <Badge variant="outline" key={index} className="font-normal">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Heart className="h-4 w-4" />
                      Save
                    </Button>
                    <Button size="sm" className="gap-1" asChild>
                      <a href="#inquiry">
                        <Send className="h-4 w-4" />
                        Inquire
                      </a>
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg bg-muted/50">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      <img
                        src={agent.image}
                        alt={agent.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{agent.name}</p>
                      <p className="text-sm text-muted-foreground">{agent.title}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <a href={`tel:${agent.phone}`}>Call</a>
                    </Button>
                    <Button size="sm" className="flex-1" asChild>
                      <a href="#inquiry">Message</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Property Details */}
        <section className="py-12 px-6">
          <div className="container mx-auto">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="space-y-4">
                <p className="text-lg">{property.description}</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non mollis lacus. Sed et quam nec dui consectetur venenatis vel ut massa. Aliquam erat volutpat. Suspendisse potenti. Phasellus interdum risus vitae hendrerit bibendum. Proin rhoncus non nisi vel lobortis. Donec venenatis, nisl quis sollicitudin maximus, dolor erat euismod mauris, sed pretium neque orci at eros.</p>
                <p>Integer vitae dignissim metus, nec sollicitudin odio. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras dignissim turpis quis finibus pulvinar. Aenean maximus condimentum lacus, non sagittis enim tempus in. Ut elementum odio nibh, non convallis magna auctor id.</p>
              </TabsContent>
              
              <TabsContent value="details" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Property ID</span>
                    <span className="font-medium">{property.id}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Property Type</span>
                    <span className="font-medium">{property.type}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Property Status</span>
                    <span className="font-medium">{property.status}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Property Size</span>
                    <span className="font-medium">{property.spaceSize.toLocaleString()} sq ft</span>
                  </div>
                  {property.type === "Co-Working" ? (
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Capacity</span>
                      <span className="font-medium">{property.capacity} people</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-muted-foreground">Size</span>
                        <span className="font-medium">{property.size} sq ft</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Bathrooms</span>
                    <span className="font-medium">{property.bathrooms}</span>
                  </div>

                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Year Built</span>
                    <span className="font-medium">2018</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Garage</span>
                    <span className="font-medium">2 Cars</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Published</span>
                    <span className="font-medium">{formatDate(new Date())}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Last Updated</span>
                    <span className="font-medium">{formatDate(new Date())}</span>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="amenities" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Air Conditioning</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Heating System</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Private Backyard</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Internet Ready</span>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>Security System</span>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="location" className="space-y-6">
                <div className="flex items-center mb-4">
                  <MapIcon className="h-5 w-5 text-primary mr-2" />
                  <h3 className="text-xl font-semibold">Property Location</h3>
                </div>
                <p className="mb-4">
                  This property is located at {property.address}. The location offers convenient access to nearby amenities, including shopping centers, restaurants, public transportation, and more.
                </p>
                <GoogleMap address={property.address} />
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Inquiry Form */}
        <section id="inquiry" className="py-12 px-6 bg-muted/30">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Interested in this property?</h2>
              <p className="text-muted-foreground">
                Fill out the form below and our agent will get back to you shortly
              </p>
            </div>
            
            <div className="bg-card border rounded-lg shadow-sm p-6">
              <form onSubmit={handleInquirySubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={inquiryForm.name}
                      onChange={handleInquiryChange}
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
                      value={inquiryForm.email}
                      onChange={handleInquiryChange}
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
                    value={inquiryForm.phone}
                    onChange={handleInquiryChange}
                    placeholder="(555) 123-4567"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={inquiryForm.message}
                    onChange={handleInquiryChange}
                    placeholder="I'm interested in this property and would like to schedule a viewing..."
                    rows={5}
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending Inquiry..." : "Send Inquiry"}
                </Button>
                
                <p className="text-sm text-muted-foreground text-center">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </form>
            </div>
          </div>
        </section>
        
        {/* Similar Properties */}
        <section className="py-12 px-6">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-8">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties
                .filter(p => p.id !== property.id && p.type === property.type)
                .slice(0, 3)
                .map(similarProperty => (
                  <a 
                    key={similarProperty.id} 
                    href={`/property/${similarProperty.id}`}
                    className="block transition-transform hover:-translate-y-1"
                  >
                    <div className="group overflow-hidden rounded-lg border shadow-sm transition-all duration-300 hover:shadow-md">
                      <div className="relative aspect-[16/9] w-full overflow-hidden">
                        <img
                          src={similarProperty.images[0]}
                          alt={similarProperty.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-1">{similarProperty.title}</h3>
                        <div className="text-primary font-medium mb-2">
                          {(similarProperty.type === "Office" || similarProperty.type === "Co-Working") 
                            ? `$${similarProperty.price.toLocaleString()}/mo` 
                            : `$${similarProperty.price.toLocaleString()}`}
                        </div>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          <span className="truncate">{similarProperty.address}</span>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyDetail;
