import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { properties as allProperties } from "@/lib/data";
import PropertyCard from "./PropertyCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PropertyGrid = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [visibleProperties, setVisibleProperties] = useState(allProperties.slice(0, 3));
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setLoaded(true);
  }, []);

  // Helper function to filter properties based on active tab
  const getFilteredProperties = (tab) => {
    switch (tab) {
      case "all":
        return allProperties;
      case "office":
        return allProperties.filter(p => p.type === "Office");
      case "co-working":
        return allProperties.filter(p => p.type === "Co-Working");
      case "serviced-office":
        return allProperties.filter(p => p.type === "Serviced Office");
      case "virtual-office":
        return allProperties.filter(p => p.type === "Virtual Office");
      default:
        return allProperties;
    }
  };

  useEffect(() => {
    // Filter properties based on the active tab
    const filtered = getFilteredProperties(activeTab);
    setVisibleProperties(filtered.slice(0, 3));
  }, [activeTab]);

  const loadMore = () => {
    const filtered = getFilteredProperties(activeTab);
    setVisibleProperties(filtered.slice(0, visibleProperties.length + 3));
  };

  const hasMore = () => {
    const filtered = getFilteredProperties(activeTab);
    return visibleProperties.length < filtered.length;
  };

  return (
    <section id="properties" className="py-24 px-6 md:px-10">
      <div className="container mx-auto">
        <div className={`text-center mb-12 transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary border border-border text-sm font-medium mb-4">
            <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
            Featured Workspaces
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Premium Office Solutions</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Curated workspaces that blend distinctive design with practical business needs, each one carefully selected to meet professional standards.
          </p>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <div className="flex justify-center w-full overflow-x-auto pb-2">
            <TabsList className="flex-nowrap inline-flex gap-2 px-1">
              <TabsTrigger value="all" className="text-xs sm:text-sm px-3 whitespace-nowrap">All Spaces</TabsTrigger>
              <TabsTrigger value="office" className="text-xs sm:text-sm px-3 whitespace-nowrap">Office</TabsTrigger>
              <TabsTrigger value="co-working" className="text-xs sm:text-sm px-3 whitespace-nowrap">Co-Working</TabsTrigger>
              <TabsTrigger value="serviced-office" className="text-xs sm:text-sm px-3 whitespace-nowrap">Serviced Office</TabsTrigger>
              <TabsTrigger value="virtual-office" className="text-xs sm:text-sm px-3 whitespace-nowrap">Virtual Office</TabsTrigger>
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
            <Link to="/listings">View All Workspaces</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PropertyGrid;