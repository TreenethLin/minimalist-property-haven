
import { Testimonial } from "@/lib/data";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import StarFilled from "@ant-design/icons-react/lib/icons/StarFilled";
import StarOutlined from "@ant-design/icons-react/lib/icons/StarOutlined";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <Card className="h-full flex flex-col bg-card/50 backdrop-blur-sm">
      <CardContent className="pt-6 pb-0 flex-grow">
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            i < testimonial.rating 
              ? <StarFilled key={i} className="text-amber-400 h-5 w-5" /> 
              : <StarOutlined key={i} className="text-muted-foreground h-5 w-5" />
          ))}
        </div>
        <blockquote className="text-lg">
          "{testimonial.content}"
        </blockquote>
      </CardContent>
      <CardFooter className="pt-6 pb-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full overflow-hidden">
            <img 
              src={testimonial.image} 
              alt={testimonial.name} 
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium">{testimonial.name}</p>
            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TestimonialCard;
