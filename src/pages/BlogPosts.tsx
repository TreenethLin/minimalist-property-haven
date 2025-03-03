
import { useState } from "react";
import { blogPosts } from "@/lib/data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPost from "@/components/BlogPost";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const BlogPosts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
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

            <div className="flex flex-col md:flex-row gap-8 mb-12">
              <div className="md:w-2/3">
                <form onSubmit={handleSearch} className="relative mb-8">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </form>

                {filteredPosts.length === 0 ? (
                  <div className="text-center py-16 bg-card rounded-lg border">
                    <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your search or browse all categories
                    </p>
                    <Button 
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategory(null);
                      }}
                    >
                      View All Articles
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredPosts.map(post => (
                      <BlogPost key={post.id} post={post} />
                    ))}
                  </div>
                )}
              </div>

              <div className="md:w-1/3">
                <div className="bg-card rounded-lg border p-6 sticky top-24">
                  <h3 className="font-semibold mb-4">Categories</h3>
                  <div className="space-y-2">
                    <Button
                      variant={selectedCategory === null ? "default" : "outline"}
                      className="w-full justify-start"
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
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                        <Badge className="ml-auto">
                          {blogPosts.filter(post => post.category === category).length}
                        </Badge>
                      </Button>
                    ))}
                  </div>

                  <div className="border-t mt-6 pt-6">
                    <h3 className="font-semibold mb-4">Recent Posts</h3>
                    <div className="space-y-4">
                      {blogPosts.slice(0, 3).map(post => (
                        <div key={post.id} className="flex gap-3">
                          <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={post.coverImage} 
                              alt={post.title} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors">
                              {post.title}
                            </h4>
                            <p className="text-xs text-muted-foreground">{post.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPosts;
