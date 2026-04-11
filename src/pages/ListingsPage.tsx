import { motion } from "framer-motion";
import { SearchBar } from "@/components/SearchBar";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Map, LayoutGrid } from "lucide-react";
import listing1 from "@/assets/listing-1.jpg";
import listing2 from "@/assets/listing-2.jpg";
import listing3 from "@/assets/listing-3.jpg";

const filters = ["All", "1BR", "2BR", "3BR+", "< 500K", "500K-1M", "1M+"];

const allListings = [
  { image: listing1, title: "Luxury 2BR Apartment", location: "Masaki, Dar es Salaam", price: "TZS 1.2M/mo", beds: 2, baths: 2, tag: "Featured" },
  { image: listing2, title: "Cozy Studio", location: "Mikocheni, Dar es Salaam", price: "TZS 450K/mo", beds: 1, baths: 1 },
  { image: listing3, title: "Modern Family House", location: "Mbezi Beach", price: "TZS 2.5M/mo", beds: 4, baths: 3, tag: "New" },
  { image: listing1, title: "Penthouse Suite", location: "Oyster Bay", price: "TZS 3.8M/mo", beds: 3, baths: 2, tag: "Premium" },
  { image: listing2, title: "Budget Room", location: "Sinza, Dar es Salaam", price: "TZS 180K/mo", beds: 1, baths: 1 },
  { image: listing3, title: "Garden Villa", location: "Kigamboni", price: "TZS 1.8M/mo", beds: 3, baths: 2 },
];

export default function ListingsPage() {
  return (
    <div className="container py-6 pb-24 md:pb-6 space-y-5">
      <SearchBar />

      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {filters.map((f, i) => (
          <Button
            key={f}
            variant={i === 0 ? "default" : "outline"}
            size="sm"
            className={`rounded-xl text-xs whitespace-nowrap shrink-0 ${i === 0 ? "gradient-primary text-primary-foreground border-0" : ""}`}
          >
            {f}
          </Button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{allListings.length} properties found</p>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
            <Map className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allListings.map((listing, i) => (
          <PropertyCard key={`${listing.title}-${i}`} {...listing} index={i} />
        ))}
      </div>
    </div>
  );
}
