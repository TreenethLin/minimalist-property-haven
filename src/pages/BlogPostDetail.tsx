
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { blogPosts } from "@/lib/data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User, Facebook, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const BlogPostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  const post = blogPosts.find(p => p.id === id);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    setLoaded(true);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center pt-24">
          <div className="text-center p-8">
            <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate("/blog")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Format date to more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <article>
          {/* Hero Section */}
          <div className="w-full bg-muted/30 pt-12 pb-16">
            <div className="container px-6 md:px-10 mx-auto">
              <div className={`max-w-3xl mx-auto transition-all duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex items-center space-x-2 mb-4">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigate("/blog")}
                    className="text-muted-foreground"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                  </Button>
                </div>
                
                <Badge className="mb-4 bg-primary text-primary-foreground">
                  {post.category}
                </Badge>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>By John Doe</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="container px-6 md:px-10 mx-auto -mt-8">
            <div className="max-w-4xl mx-auto">
              <div className={`aspect-[21/9] rounded-lg overflow-hidden shadow-lg mb-12 transition-all duration-700 ${loaded ? 'opacity-100 transform-none' : 'opacity-0 translate-y-8'}`}>
                <img 
                  src={post.coverImage} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="container px-6 md:px-10 mx-auto py-12">
            <div className="max-w-3xl mx-auto">
              <div className={`prose prose-lg max-w-none transition-all duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
                <p className="lead">{post.excerpt}</p>
                
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non mollis lacus. Sed et quam nec dui consectetur venenatis vel ut massa. Aliquam erat volutpat. Suspendisse potenti. Phasellus interdum risus vitae hendrerit bibendum.</p>
                
                <h2>Understanding the Market Trends</h2>
                
                <p>Proin rhoncus non nisi vel lobortis. Donec venenatis, nisl quis sollicitudin maximus, dolor erat euismod mauris, sed pretium neque orci at eros. Integer vitae dignissim metus, nec sollicitudin odio. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                
                <p>Cras dignissim turpis quis finibus pulvinar. Aenean maximus condimentum lacus, non sagittis enim tempus in. Ut elementum odio nibh, non convallis magna auctor id. Curabitur scelerisque tincidunt nisi, a faucibus eros fringilla nec.</p>
                
                <blockquote>
                  "Real estate cannot be lost or stolen, nor can it be carried away. Purchased with common sense, paid for in full, and managed with reasonable care, it is about the safest investment in the world."
                  <footer>— Franklin D. Roosevelt</footer>
                </blockquote>
                
                <h2>Investment Opportunities</h2>
                
                <p>Sed convallis, est vel tincidunt sollicitudin, nibh neque vulputate neque, at iaculis felis nisi ac ipsum. Nulla facilisi. Donec commodo orci eu neque fermentum aliquet. Morbi ornare risus magna, id laoreet erat dictum eleifend.</p>
                
                <p>Cras dignissim turpis quis finibus pulvinar. Aenean maximus condimentum lacus, non sagittis enim tempus in. Ut elementum odio nibh, non convallis magna auctor id. Curabitur scelerisque tincidunt nisi, a faucibus eros fringilla nec.</p>
                
                <h2>Conclusion</h2>
                
                <p>Nullam sit amet feugiat augue. Suspendisse vel sapien a nulla finibus molestie. Donec at libero pellentesque, lacinia nisl et, ultricies nibh. Quisque fringilla est non lorem tempus, at ornare dolor fermentum. Fusce ut posuere felis.</p>
              </div>
              
              {/* Share */}
              <div className="mt-12 pt-6 border-t">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <span className="font-medium">Share this article:</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Related Posts */}
              <div className="mt-16 pt-8 border-t">
                <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {blogPosts
                    .filter(p => p.id !== post.id && p.category === post.category)
                    .slice(0, 2)
                    .map(relatedPost => (
                      <div key={relatedPost.id} className="group cursor-pointer" onClick={() => navigate(`/blog/${relatedPost.id}`)}>
                        <div className="rounded-lg overflow-hidden mb-3">
                          <img 
                            src={relatedPost.coverImage} 
                            alt={relatedPost.title} 
                            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <h4 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{relatedPost.title}</h4>
                        <p className="text-sm text-muted-foreground">{formatDate(relatedPost.date)}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostDetail;
