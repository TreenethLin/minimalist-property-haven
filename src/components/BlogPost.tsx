
import { BlogPost as BlogPostType } from "@/lib/data";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface BlogPostProps {
  post: BlogPostType;
}

const BlogPost = ({ post }: BlogPostProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Format date to more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Card className="group overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-md">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <div className={`absolute inset-0 bg-muted ${imageLoaded ? 'hidden' : 'image-loading'}`} />
        <img
          src={post.coverImage}
          alt={post.title}
          className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-primary text-primary-foreground">
            {post.category}
          </Badge>
        </div>
      </div>
      <CardContent className="p-6 flex-grow">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            <span>{formatDate(post.date)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{post.readTime}</span>
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="text-muted-foreground line-clamp-3">
          {post.excerpt}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link 
          to={`/blog/${post.id}`} 
          className="w-full inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
          onClick={(e) => e.stopPropagation()}
        >
          Read More
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogPost;
