import { Heart, MapPin, Bed, Bath } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  image: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  tag?: string;
  index?: number;
}

export function PropertyCard({ image, title, location, price, beds, baths, tag, index = 0 }: PropertyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group glass-card rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <button className="absolute top-3 right-3 h-8 w-8 rounded-full bg-card/70 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors">
          <Heart className="h-4 w-4 text-foreground" />
        </button>
        {tag && (
          <Badge className="absolute top-3 left-3 rounded-lg bg-accent text-accent-foreground border-0 text-xs">
            {tag}
          </Badge>
        )}
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm line-clamp-1">{title}</h3>
          <p className="font-bold text-primary text-sm whitespace-nowrap">{price}</p>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="text-xs line-clamp-1">{location}</span>
        </div>
        <div className="flex items-center gap-3 pt-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Bed className="h-3.5 w-3.5" />{beds} Bed</span>
          <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5" />{baths} Bath</span>
        </div>
      </div>
    </motion.div>
  );
}
