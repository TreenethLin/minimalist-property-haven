
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { properties as allProperties } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, SlidersHorizontal, X } from "lucide-react";

const Listings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState(allProperties);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    type: searchParams.get("type") || "all",
    minPrice: parseInt(searchParams.get("minPrice") || "0"),
    maxPrice: parseInt(searchParams.get("maxPrice") || "5000000"),
    bedrooms: parseInt(searchParams.get("bedrooms") || "0"),
    bathrooms: parseInt(searchParams.get("bathrooms") || "0"),
    features: [] as string[],
  });

  // Initialize features from URL params
  useEffect(() => {
    const featuresParam = searchParams.get("features");
    if (featuresParam) {
      setFilters(prev => ({
        ...prev,
        features: featuresParam.split(",")
      }));
    }
  }, [searchParams]);

  // Apply filters
  useEffect(() => {
    let filtered = [...allProperties];

    // Filter by search term
    if (filters.search) {
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          property.address.toLowerCase().includes(filters.search.toLowerCase()) ||
          property.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Filter by type
    if (filters.type !== "all") {
      filtered = filtered.filter(
        (property) => property.type === (filters.type === "for-sale" ? "For Sale" : "For Rent")
      );
    }

    // Filter by price
    filtered = filtered.filter(
      (property) => property.price >= filters.minPrice && property.price <= filters.maxPrice
    );

    // Filter by bedrooms
    if (filters.bedrooms > 0) {
      filtered = filtered.filter((property) => property.bedrooms >= filters.bedrooms);
    }

    // Filter by bathrooms
    if (filters.bathrooms > 0) {
      filtered = filtered.filter((property) => property.bathrooms >= filters.bathrooms);
    }

    // Filter by features
    if (filters.features.length > 0) {
      filtered = filtered.filter((property) =>
        filters.features.every((feature) => property.features.includes(feature))
      );
    }

    setProperties(filtered);
  }, [filters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearchParams();
  };

  const updateSearchParams = () => {
    const params = new URLSearchParams();
    
    if (filters.search) params.set("search", filters.search);
    if (filters.type !== "all") params.set("type", filters.type);
    if (filters.minPrice > 0) params.set("minPrice", filters.minPrice.toString());
    if (filters.maxPrice < 5000000) params.set("maxPrice", filters.maxPrice.toString());
    if (filters.bedrooms > 0) params.set("bedrooms", filters.bedrooms.toString());
    if (filters.bathrooms > 0) params.set("bathrooms", filters.bathrooms.toString());
    if (filters.features.length > 0) params.set("features", filters.features.join(","));
    
    setSearchParams(params);
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
      maxPrice: 5000000,
      bedrooms: 0,
      bathrooms: 0,
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
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Properties</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Browse our curated collection of exceptional properties
              </p>
            </div>

            <div className="bg-card rounded-lg shadow-md p-6 mb-8">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search properties..."
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
                    filters.maxPrice < 5000000 ||
                    filters.bedrooms > 0 ||
                    filters.bathrooms > 0 ||
                    filters.features.length > 0) && (
                    <Badge className="ml-2 px-2 py-0 h-5 text-xs">
                      {filters.minPrice > 0 +
                        (filters.maxPrice < 5000000 ? 1 : 0) +
                        (filters.bedrooms > 0 ? 1 : 0) +
                        (filters.bathrooms > 0 ? 1 : 0) +
                        filters.features.length}
                    </Badge>
                  )}
                </Button>
              </form>

              {showFilters && (
                <div className="mt-6 pt-6 border-t">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-medium">Filter Properties</h3>
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

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Property Type</h4>
                      <Tabs
                        value={filters.type}
                        onValueChange={(value) => setFilters({ ...filters, type: value })}
                        className="w-full"
                      >
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="all">All</TabsTrigger>
                          <TabsTrigger value="for-sale">For Sale</TabsTrigger>
                          <TabsTrigger value="for-rent">For Rent</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Price Range</h4>
                      <div className="px-3">
                        <Slider
                          defaultValue={[filters.minPrice, filters.maxPrice]}
                          max={5000000}
                          step={50000}
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
                      <h4 className="text-sm font-medium mb-2">Bedrooms</h4>
                      <div className="flex gap-2">
                        {[0, 1, 2, 3, 4, 5].map((num) => (
                          <Button
                            key={num}
                            type="button"
                            variant={filters.bedrooms === num ? "default" : "outline"}
                            size="sm"
                            onClick={() => setFilters({ ...filters, bedrooms: num })}
                            className="flex-1"
                          >
                            {num === 0 ? "Any" : num === 5 ? "5+" : num}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Bathrooms</h4>
                      <div className="flex gap-2">
                        {[0, 1, 2, 3, 4].map((num) => (
                          <Button
                            key={num}
                            type="button"
                            variant={filters.bathrooms === num ? "default" : "outline"}
                            size="sm"
                            onClick={() => setFilters({ ...filters, bathrooms: num })}
                            className="flex-1"
                          >
                            {num === 0 ? "Any" : num === 4 ? "4+" : num}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t">
                    <h4 className="text-sm font-medium mb-3">Features</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {allFeatures.map((feature) => (
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
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button onClick={updateSearchParams}>Apply Filters</Button>
                  </div>
                </div>
              )}
            </div>

            {properties.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold mb-2">No properties found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters to find more properties
                </p>
                <Button onClick={resetFilters}>Reset All Filters</Button>
              </div>
            ) : (
              <>
                <p className="mb-6 text-muted-foreground">
                  Showing {properties.length} properties
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {properties.map((property) => (
                    <a 
                      key={property.id} 
                      href={`/property/${property.id}`}
                      className="block transition-transform hover:-translate-y-1"
                    >
                      <PropertyCard property={property} />
                    </a>
                  ))}
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
