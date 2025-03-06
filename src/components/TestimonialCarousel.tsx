import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { testimonials, Testimonial } from "@/lib/data";
import TestimonialCard from "./TestimonialCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
  const [isDesktop, setIsDesktop] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);

  // Fetch testimonials using TanStack Query
  const { data, isLoading, error } = useQuery({
    queryKey: ['testimonials'],
    queryFn: fetchTestimonials,
  });

  useEffect(() => {
    // Trigger animation after component mounts
    setLoaded(true);
    
    // Check if we're on desktop initially
    setIsDesktop(window.innerWidth >= 768);
    
    // Add resize listener
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handlePrev = () => {
    if (!data) return;
    
    if (isDesktop) {
      // On desktop, move by 2 items
      setActiveIndex((prevIndex) => {
        const newIndex = prevIndex - 2;
        return newIndex < 0 ? Math.max(0, data.length - 2) : newIndex;
      });
    } else {
      // On mobile, move by 1 item
      setActiveIndex((prevIndex) => 
        prevIndex === 0 ? data.length - 1 : prevIndex - 1
      );
    }
  };

  const handleNext = () => {
    if (!data) return;
    
    if (isDesktop) {
      // On desktop, move by 2 items
      setActiveIndex((prevIndex) => {
        const newIndex = prevIndex + 2;
        return newIndex >= data.length ? 0 : newIndex;
      });
    } else {
      // On mobile, move by 1 item
      setActiveIndex((prevIndex) => 
        prevIndex === data.length - 1 ? 0 : prevIndex + 1
      );
    }
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

  // Function to get pagination dots based on screen size
  const getPaginationDots = () => {
    if (!data) return [];
    
    if (isDesktop) {
      // For desktop, create dots for pairs of testimonials
      const dotsCount = Math.ceil(data.length / 2);
      return Array.from({ length: dotsCount }, (_, i) => i * 2);
    } else {
      // For mobile, create a dot for each testimonial
      return Array.from({ length: data.length }, (_, i) => i);
    }
  };

  // Function to check if a dot is active
  const isDotActive = (dotIndex: number) => {
    if (isDesktop) {
      // For desktop, the dot is active if it represents the current pair
      return dotIndex === activeIndex;
    } else {
      // For mobile, direct comparison
      return dotIndex === activeIndex;
    }
  };

  if (isLoading) {
    return (
      <section id="testimonials" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-10">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary border border-border text-sm font-medium mb-3 sm:mb-4">
              <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
              Client Testimonials
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">What Clients Say</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
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
      <section id="testimonials" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-10">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">What Clients Say</h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Unable to load testimonials. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-10">
      <div className="container mx-auto">
        <div className={`text-center mb-8 sm:mb-12 transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary border border-border text-sm font-medium mb-3 sm:mb-4">
            <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
            Client Testimonials
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">What Clients Say</h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Real stories from clients who found their perfect spaces through our personalized service.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto px-1 sm:px-4">
          <div 
            ref={slideRef}
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-500 ease-out" 
              style={{ transform: `translateX(-${activeIndex * (isDesktop ? 50 : 100)}%)` }}
            >
              {data.map((testimonial, index) => (
                <div 
                  key={testimonial.id} 
                  className="min-w-full md:min-w-[50%] px-2 sm:px-4"
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-6 sm:mt-8 gap-2">
            {getPaginationDots().map((dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => setActiveIndex(dotIndex)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isDotActive(dotIndex) ? "w-6 sm:w-8 bg-primary" : "w-2 bg-muted"
                }`}
                aria-label={`Go to slide ${dotIndex + 1}`}
              />
            ))}
          </div>

          <div className="flex justify-between mt-4 sm:mt-0">
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full opacity-70 hover:opacity-100 sm:absolute sm:-left-4 md:-left-12 sm:top-1/2 sm:-translate-y-1/2"
              onClick={handlePrev}
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8 sm:h-10 sm:w-10 rounded-full opacity-70 hover:opacity-100 sm:absolute sm:-right-4 md:-right-12 sm:top-1/2 sm:-translate-y-1/2"
              onClick={handleNext}
              aria-label="Next testimonial"
            >
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;