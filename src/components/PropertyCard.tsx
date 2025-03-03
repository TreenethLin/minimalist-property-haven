
import { Property } from "@/lib/data";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Bed, Bath, Square, MapPin } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const formatPrice = (price: number) => {
    return property.type === "For Rent" 
      ? `$${price.toLocaleString()}/mo`
      : `$${price.toLocaleString()}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-500";
      case "Pending":
        return "bg-amber-500";
      case "Sold":
        return "bg-red-500";
      default:
        return "bg-slate-500";
    }
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <div className={`absolute inset-0 bg-muted ${imageLoaded ? 'hidden' : 'image-loading'}`} />
        <img
          src={property.images[0]}
          alt={property.title}
          className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
            {property.type}
          </Badge>
          <Badge variant="secondary" className={`${getStatusColor(property.status)} text-white`}>
            {property.status}
          </Badge>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex items-center text-muted-foreground text-sm mb-2">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span className="truncate">{property.address}</span>
        </div>
        <h3 className="text-xl font-semibold mb-2 line-clamp-1">{property.title}</h3>
        <p className="font-medium text-lg text-primary mb-4">
          {formatPrice(property.price)}
        </p>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {property.description}
        </p>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{property.sqft.toLocaleString()} Sq Ft</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {property.features.slice(0, 2).map((feature, index) => (
            <Badge variant="outline" key={index} className="font-normal">
              {feature}
            </Badge>
          ))}
          {property.features.length > 2 && (
            <Badge variant="outline" className="font-normal">
              +{property.features.length - 2} more
            </Badge>
          )}
        </div>
        <Link 
          to={`/property/${property.id}`} 
          className="text-sm font-medium text-primary hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
