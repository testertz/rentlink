import { motion } from "framer-motion";
import { Building2, Home as HomeIcon, DoorOpen, Warehouse, ArrowRight, Shield, Smartphone, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/SearchBar";
import { PropertyCard } from "@/components/PropertyCard";
import { CategoryChip } from "@/components/CategoryChip";
import heroBg from "@/assets/hero-bg.jpg";
import listing1 from "@/assets/listing-1.jpg";
import listing2 from "@/assets/listing-2.jpg";
import listing3 from "@/assets/listing-3.jpg";

const categories = [
  { icon: Building2, label: "Apartments", count: "1,240+" },
  { icon: DoorOpen, label: "Rooms", count: "890+" },
  { icon: HomeIcon, label: "Houses", count: "560+" },
  { icon: Warehouse, label: "Commercial", count: "320+" },
];

const featuredListings = [
  { image: listing1, title: "Luxury 2BR Apartment", location: "Masaki, Dar es Salaam", price: "TZS 1.2M/mo", beds: 2, baths: 2, tag: "Featured" },
  { image: listing2, title: "Cozy Studio", location: "Mikocheni, Dar es Salaam", price: "TZS 450K/mo", beds: 1, baths: 1, tag: "New" },
  { image: listing3, title: "Modern Family House", location: "Mbezi Beach", price: "TZS 2.5M/mo", beds: 4, baths: 3 },
];

const features = [
  { icon: Smartphone, title: "Mobile Money", desc: "Pay rent via M-Pesa, Tigo Pesa, or Airtel Money" },
  { icon: Shield, title: "Escrow Protection", desc: "Deposits secured until you move in safely" },
  { icon: Zap, title: "Instant Matching", desc: "AI finds your perfect home in seconds" },
];

export default function HomePage() {
  return (
    <div className="pb-20 md:pb-0">
      {/* Hero */}
      <section className="relative h-[420px] md:h-[500px] overflow-hidden">
        <img src={heroBg} alt="Dar es Salaam skyline" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
        <div className="relative container h-full flex flex-col justify-end pb-8 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-lg">
              Find Your <span className="gradient-text">Perfect Home</span> in Tanzania
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-md">
              Rent securely with mobile money payments and escrow protection
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-lg"
          >
            <SearchBar />
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mt-8">
        <h2 className="text-lg font-semibold mb-4">Browse Categories</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat, i) => (
            <CategoryChip key={cat.label} {...cat} index={i} />
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Featured Listings</h2>
          <Button variant="ghost" size="sm" className="text-primary text-xs gap-1">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredListings.map((listing, i) => (
            <PropertyCard key={listing.title} {...listing} index={i} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mt-12 mb-8">
        <h2 className="text-lg font-semibold mb-4">Why RentLink?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-5 space-y-3"
            >
              <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-sm">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
