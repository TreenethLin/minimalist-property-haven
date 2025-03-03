import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { testimonials, Testimonial } from "@/lib/data";
import TestimonialCard from "./TestimonialCard";
import { Button } from "@/components/ui/button";
import { LeftOutlined, RightOutlined } from "@ant-design/icons-react";

// Mock fetch function to simulate API call
const fetchTestimonials = async (): Promise<Testimonial[]> => {
  // In a real application, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(testimonials), 500);
  });
};

const TestimonialCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const slideRef = useRef<HTMLDivElement>(null);

  // Fetch testimonials using TanStack Query
  const { data, isLoading, error } = useQuery({
    queryKey: ['testimonials'],
    queryFn: fetchTestimonials,
  });

  useEffect(() => {
    // Trigger animation after component mounts
    setLoaded(true);
  }, []);

  const handlePrev = () => {
    if (!data) return;
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? Math.ceil(data.length / 2) - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    if (!data) return;
    setActiveIndex((prevIndex) => 
      prevIndex === Math.ceil(data.length / 2) - 1 ? 0 : prevIndex + 1
    );
  };

  // Swipe handlers for mobile touch
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
    
    // Reset values
    setTouchStart(null);
    setTouchEnd(null);
  };

  if (isLoading) {
    return (
      <section id="testimonials" className="py-24 px-6 md:px-10">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary border border-border text-sm font-medium mb-4">
              <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
              Client Testimonials
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Clients Say</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Loading testimonials...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error("Failed to load testimonials:", error);
    return (
      <section id="testimonials" className="py-24 px-6 md:px-10">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Clients Say</h2>
            <p className="text-muted-foreground text-lg">
              Unable to load testimonials. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Group testimonials into pairs for the carousel
  const testimonialPairs = data ? Array.from({ length: Math.ceil(data.length / 2) }, (_, i) => 
    data.slice(i * 2, i * 2 + 2)
  ) : [];

  return (
    <section id="testimonials" className="py-24 px-6 md:px-10">
      <div className="container mx-auto">
        <div className={`text-center mb-12 transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary border border-border text-sm font-medium mb-4">
            <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
            Client Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Clients Say</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real stories from clients who found their perfect spaces through our personalized service.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div 
            ref={slideRef}
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-500 ease-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonialPairs.map((pair, pairIndex) => (
                <div key={pairIndex} className="min-w-full px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pair.map((testimonial) => (
                    <div key={testimonial.id}>
                      <TestimonialCard testimonial={testimonial} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {testimonialPairs.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index ? "w-8 bg-primary" : "w-2 bg-muted"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <Button
            size="icon"
            variant="outline"
            className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full opacity-70 hover:opacity-100"
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            <LeftOutlined className="h-5 w-5" />
          </Button>

          <Button
            size="icon"
            variant="outline"
            className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full opacity-70 hover:opacity-100"
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <RightOutlined className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
