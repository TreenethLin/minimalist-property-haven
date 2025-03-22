import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { properties as allProperties } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Listings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const [visibleProperties, setVisibleProperties] = useState<typeof allProperties>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [itemsPerPage] = useState(6);
  const [loaded, setLoaded] = useState(false);
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    type: searchParams.get("type") || "all",
    minPrice: parseInt(searchParams.get("minPrice") || "0"),
    maxPrice: parseInt(searchParams.get("maxPrice") || "10000"),
    capacity: parseInt(searchParams.get("capacity") || "0"),
    spaceSize: parseInt(searchParams.get("spaceSize") || "0"),
    features: [] as string[],
  });
  const [showAllFeatures, setShowAllFeatures] = useState(false);


  // Initialize features from URL params and trigger animation after component mounts
  useEffect(() => {
    const featuresParam = searchParams.get("features");
    if (featuresParam) {
      setFilters(prev => ({
        ...prev,
        features: featuresParam.split(",")
      }));
    }
    
    // Trigger animation after component mounts
    setLoaded(true);
  }, [searchParams]);

  // Helper function to filter properties based on type
  const getFilteredPropertiesByType = (type: string) => {
    // Map URL parameter values to actual property type values
    const typeMapping: Record<string, string> = {
      "office": "Office",
      "co-working": "Co-Working",
      "serviced-office": "Serviced Office",
    };
    
    if (type === "all") return allProperties;
    
    const propertyType = typeMapping[type];
    return propertyType ? allProperties.filter(property => property.type === propertyType) : allProperties;
  };

  // Apply filters
  useEffect(() => {
    let filtered = getFilteredPropertiesByType(filters.type);

    // Filter by search term
    if (filters.search) {
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          property.address.toLowerCase().includes(filters.search.toLowerCase()) ||
          property.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Filter by price
    filtered = filtered.filter(
      (property) => property.price >= filters.minPrice && property.price <= filters.maxPrice
    );

    // Filter by capacity
    if (filters.capacity > 0) {
      filtered = filtered.filter((property) => property.capacity >= filters.capacity);
    }

    // Filter by space size
    if (filters.spaceSize > 0) {
      filtered = filtered.filter((property) => property.spaceSize >= filters.spaceSize);
    }

    // Filter by features
    if (filters.features.length > 0) {
      filtered = filtered.filter((property) =>
        filters.features.every((feature) => property.features.includes(feature))
      );
    }

    setFilteredProperties(filtered);
    // Initialize visible properties with first batch
    setVisibleProperties(filtered.slice(0, itemsPerPage));
  }, [filters, itemsPerPage]);

  const loadMore = () => {
    setVisibleProperties(prevVisible => [
      ...prevVisible,
      ...filteredProperties.slice(prevVisible.length, prevVisible.length + itemsPerPage)
    ]);
  };

  const hasMore = () => {
    return visibleProperties.length < filteredProperties.length;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearchParams();
  };

  const updateSearchParams = () => {
    const params = new URLSearchParams();
    
    if (filters.search) params.set("search", filters.search);
    if (filters.type !== "all") params.set("type", filters.type);
    if (filters.minPrice > 0) params.set("minPrice", filters.minPrice.toString());
    if (filters.maxPrice < 10000) params.set("maxPrice", filters.maxPrice.toString());
    if (filters.capacity > 0) params.set("capacity", filters.capacity.toString());
    if (filters.spaceSize > 0) params.set("spaceSize", filters.spaceSize.toString());
    if (filters.features.length > 0) params.set("features", filters.features.join(","));
    
    setSearchParams(params);
    // Close the filters panel after applying filters
    setShowFilters(false);
  };

  const toggleFeature = (feature: string) => {
    setFilters((prev) => {
      const features = prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature];
      return { ...prev, features };
    });
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      type: "all",
      minPrice: 0,
      maxPrice: 10000,
      capacity: 0,
      spaceSize: 0,
      features: [],
    });
    setSearchParams({});
  };

  const allFeatures = Array.from(
    new Set(allProperties.flatMap((property) => property.features))
  ).sort();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <section className="py-12 px-6 md:px-10 bg-muted/30">
          <div className="container mx-auto">
            <div className={`text-center mb-12 transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary border border-border text-sm font-medium mb-4">
                <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
                Our Spaces
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Ideal Workspace</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Browse our curated collection of exceptional office and coworking spaces
              </p>
            </div>

            <div className="bg-card rounded-lg shadow-md p-6 mb-8">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search spaces..."
                    className="pl-9"
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  />
                </div>
                <Button type="submit">Search</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {(filters.minPrice > 0 ||
                    filters.maxPrice < 10000 ||
                    filters.capacity > 0 ||
                    filters.spaceSize > 0 ||
                    filters.features.length > 0) && (
                    <Badge className="ml-2 px-2 py-0 h-5 text-xs">
                      {(filters.minPrice > 0 ? 1 : 0) +
                        (filters.maxPrice < 10000 ? 1 : 0) +
                        (filters.capacity > 0 ? 1 : 0) +
                        (filters.spaceSize > 0 ? 1 : 0) +
                        filters.features.length}
                    </Badge>
                  )}
                </Button>
              </form>

              {showFilters && (
                <div className="mt-6 pt-6 border-t">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-medium">Filter Spaces</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetFilters}
                      className="text-muted-foreground h-8 px-2"
                    >
                      <X className="h-3 w-3 mr-1" />
                      Reset All
                    </Button>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-3">Space Type</h4>
                    <Tabs 
                      value={filters.type} 
                      onValueChange={(value) => setFilters({ ...filters, type: value })}
                      className="mb-4"
                    >
                      <div className="flex justify-center md:justify-start w-full">
                        <TabsList className="bg-muted h-auto flex flex-wrap justify-center md:justify-start gap-2 p-2 rounded-md">
                          <TabsTrigger value="all" className="text-xs sm:text-sm px-3 data-[state=active]:bg-background">All Spaces</TabsTrigger>
                          <TabsTrigger value="office" className="text-xs sm:text-sm px-3 data-[state=active]:bg-background">Office</TabsTrigger>
                          <TabsTrigger value="co-working" className="text-xs sm:text-sm px-3 data-[state=active]:bg-background">Co-Working</TabsTrigger>
                          <TabsTrigger value="serviced-office" className="text-xs sm:text-sm px-3 data-[state=active]:bg-background">Serviced Office</TabsTrigger>
                        </TabsList>
                      </div>
                    </Tabs>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Price Range ($/month)</h4>
                      <div className="px-3">
                        <Slider
                          defaultValue={[filters.minPrice, filters.maxPrice]}
                          value={[filters.minPrice, filters.maxPrice]}
                          max={10000}
                          step={100}
                          onValueChange={(value) =>
                            setFilters({
                              ...filters,
                              minPrice: value[0],
                              maxPrice: value[1],
                            })
                          }
                          className="mb-2"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>${filters.minPrice.toLocaleString()}</span>
                          <span>${filters.maxPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Capacity (People)</h4>
                      <div className="flex flex-wrap gap-2">
                        {[0, 1, 5, 10, 20, 50].map((num) => (
                          <Button
                            key={num}
                            type="button"
                            variant={filters.capacity === num ? "default" : "outline"}
                            size="sm"
                            onClick={() => setFilters({ ...filters, capacity: num })}
                            className="flex-1 min-w-[40px]"
                          >
                            {num === 0 ? "Any" : num === 50 ? "50+" : num}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Space Size (sqft)</h4>
                      <div className="flex flex-wrap gap-2">
                        {[0, 100, 500, 1000, 2000].map((num) => (
                          <Button
                            key={num}
                            type="button"
                            variant={filters.spaceSize === num ? "default" : "outline"}
                            size="sm"
                            onClick={() => setFilters({ ...filters, spaceSize: num })}
                            className="flex-1 min-w-[50px]"
                          >
                            {num === 0 ? "Any" : num === 2000 ? "2000+" : num}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t">
                    <h4 className="text-sm font-medium mb-3">Amenities & Features</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {allFeatures.slice(0, showAllFeatures ? allFeatures.length : 6).map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <Checkbox
                            id={`feature-${feature}`}
                            checked={filters.features.includes(feature)}
                            onCheckedChange={() => toggleFeature(feature)}
                          />
                          <Label
                            htmlFor={`feature-${feature}`}
                            className="text-sm cursor-pointer"
                          >
                            {feature}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {allFeatures.length > 6 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setShowAllFeatures(!showAllFeatures)}
                        className="mt-3 text-xs font-medium text-primary"
                      >
                        {showAllFeatures ? "Show Less" : `Show All (${allFeatures.length})`}
                      </Button>
                    )}
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button onClick={updateSearchParams}>Apply Filters</Button>
                  </div>
                </div>
              )}
            </div>

            {filteredProperties.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold mb-2">No spaces found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters to find more office spaces
                </p>
                <Button onClick={resetFilters}>Reset All Filters</Button>
              </div>
            ) : (
              <>
                <p className="mb-6 text-muted-foreground">
                  Showing {visibleProperties.length} of {filteredProperties.length} spaces
                </p>
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

                <div className="flex justify-center mt-12">
                  {hasMore() && (
                    <Button 
                      variant="outline" 
                      onClick={loadMore}
                      className="min-w-[150px]"
                    >
                      Load More
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Listings;