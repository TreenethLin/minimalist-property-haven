
import { useState, useEffect } from "react";
import { blogPosts } from "@/lib/data";
import BlogPost from "./BlogPost";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const BlogSection = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setLoaded(true);
  }, []);

  return (
    <section id="blog" className="py-24 px-6 md:px-10 bg-muted/30">
      <div className="container mx-auto">
        <div className={`flex flex-col md:flex-row justify-between items-center mb-12 transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary border border-border text-sm font-medium mb-4">
              <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
              Latest Articles
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Insights & Trends</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Expert perspectives on real estate markets, design innovations, and investment opportunities.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <Button variant="outline" className="group">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div 
              key={post.id}
              className={`transform transition-all duration-700 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <BlogPost post={post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
