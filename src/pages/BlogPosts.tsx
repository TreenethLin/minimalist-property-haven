import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { blogPosts } from "@/lib/data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPost from "@/components/BlogPost";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, X } from "lucide-react";

const BlogPosts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category") || null
  );
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = 
      searchTerm === "" || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === null || 
      post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (searchTerm) params.set("search", searchTerm);
    if (selectedCategory) params.set("category", selectedCategory);
    
    setSearchParams(params);
  }, [searchTerm, selectedCategory, setSearchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <section className="py-12 px-6 md:px-10 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary border border-border text-sm font-medium mb-4">
                <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
                Our Blog
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Insights & Trends</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Expert perspectives on real estate markets, design innovations, and investment opportunities.
              </p>
            </div>

            <div className="bg-card rounded-lg shadow-md p-6 mb-8">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                  Categories
                  {selectedCategory && (
                    <Badge className="ml-2 px-2 py-0 h-5 text-xs">1</Badge>
                  )}
                </Button>
              </form>

              {showFilters && (
                <div className="mt-6 pt-6 border-t">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-medium">Filter Articles</h3>
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

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    <Button
                      variant={selectedCategory === null ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => setSelectedCategory(null)}
                    >
                      All Categories
                      <Badge className="ml-auto">
                        {blogPosts.length}
                      </Badge>
                    </Button>
                    
                    {categories.map(category => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                        <Badge className="ml-auto">
                          {blogPosts.filter(post => post.category === category).length}
                        </Badge>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-16 bg-card rounded-lg border">
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or browse all categories
                </p>
                <Button onClick={resetFilters}>
                  View All Articles
                </Button>
              </div>
            ) : (
              <>
                <p className="mb-6 text-muted-foreground">
                  Showing {filteredPosts.length} articles
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {filteredPosts.map(post => (
                    <BlogPost key={post.id} post={post} />
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

export default BlogPosts;