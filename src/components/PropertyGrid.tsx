
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { properties as allProperties } from "@/lib/data";
import PropertyCard from "./PropertyCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PropertyGrid = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [visibleProperties, setVisibleProperties] = useState(allProperties.slice(0, 3));
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setLoaded(true);
  }, []);

  useEffect(() => {
    // Filter properties based on the active tab
    const filtered = 
      activeTab === "all" 
        ? allProperties 
        : activeTab === "for-sale" 
          ? allProperties.filter(p => p.type === "For Sale") 
          : allProperties.filter(p => p.type === "For Rent");
    
    setVisibleProperties(filtered.slice(0, 3));
  }, [activeTab]);

  const loadMore = () => {
    const filtered = 
      activeTab === "all" 
        ? allProperties 
        : activeTab === "for-sale" 
          ? allProperties.filter(p => p.type === "For Sale") 
          : allProperties.filter(p => p.type === "For Rent");
    
    setVisibleProperties(filtered.slice(0, visibleProperties.length + 3));
  };

  const hasMore = () => {
    const filtered = 
      activeTab === "all" 
        ? allProperties 
        : activeTab === "for-sale" 
          ? allProperties.filter(p => p.type === "For Sale") 
          : allProperties.filter(p => p.type === "For Rent");
    
    return visibleProperties.length < filtered.length;
  };

  return (
    <section id="properties" className="py-24 px-6 md:px-10">
      <div className="container mx-auto">
        <div className={`text-center mb-12 transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary border border-border text-sm font-medium mb-4">
            <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
            Featured Properties
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Exceptional Spaces</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Curated properties that blend distinctive design with practical living, each one carefully selected to meet discerning standards.
          </p>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="all">All Properties</TabsTrigger>
              <TabsTrigger value="for-sale">For Sale</TabsTrigger>
              <TabsTrigger value="for-rent">For Rent</TabsTrigger>
            </TabsList>
          </div>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProperties.map((property, index) => (
            <Link
              key={property.id}
              to={`/property/${property.id}`}
              className={`block transform transition-all duration-700 ease-out hover:-translate-y-1 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <PropertyCard property={property} />
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-12 gap-4">
          {hasMore() && (
            <Button 
              variant="outline" 
              onClick={loadMore}
              className="min-w-[150px]"
            >
              Load More
            </Button>
          )}
          
          <Button asChild className="min-w-[150px]">
            <Link to="/listings">View All Properties</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PropertyGrid;
