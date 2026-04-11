import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Heart, Share2, MapPin, Bed, Bath, Maximize, Shield,
  Wifi, Car, Zap, Droplets, Star, ChevronLeft, ChevronRight, MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useI18n } from "@/lib/i18n";
import listing1 from "@/assets/listing-1.jpg";
import listing2 from "@/assets/listing-2.jpg";
import listing3 from "@/assets/listing-3.jpg";

const images = [listing1, listing2, listing3, listing1];

const amenities = [
  { icon: Wifi, label: "WiFi" },
  { icon: Car, label: "Parking" },
  { icon: Zap, label: "Generator" },
  { icon: Droplets, label: "Water Tank" },
  { icon: Shield, label: "Security" },
  { icon: Maximize, label: "Balcony" },
];

const reviews = [
  { name: "Grace M.", rating: 5, text: "Beautiful apartment, landlord is very responsive.", date: "Mar 2026" },
  { name: "Joseph K.", rating: 4, text: "Great location, close to everything. Minor water issues.", date: "Feb 2026" },
  { name: "Fatma H.", rating: 5, text: "Loved the view and the modern finishes!", date: "Jan 2026" },
];

export default function PropertyDetailsPage() {
  const { t } = useI18n();
  const [imgIndex, setImgIndex] = useState(0);
  const navigate = useNavigate();

  const prev = () => setImgIndex((i) => (i > 0 ? i - 1 : images.length - 1));
  const next = () => setImgIndex((i) => (i < images.length - 1 ? i + 1 : 0));

  return (
    <div className="pb-28 md:pb-6">
      {/* Image Gallery */}
      <div className="relative aspect-[4/3] md:aspect-[16/7] overflow-hidden bg-muted">
        <motion.img
          key={imgIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          src={images[imgIndex]}
          alt="Property"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <Button size="icon" variant="ghost" onClick={() => navigate(-1)} className="h-9 w-9 rounded-full bg-card/70 backdrop-blur-sm">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full bg-card/70 backdrop-blur-sm">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full bg-card/70 backdrop-blur-sm">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-card/70 backdrop-blur-sm flex items-center justify-center">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-card/70 backdrop-blur-sm flex items-center justify-center">
          <ChevronRight className="h-4 w-4" />
        </button>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setImgIndex(i)}
              className={`h-1.5 rounded-full transition-all ${i === imgIndex ? "w-6 bg-primary-foreground" : "w-1.5 bg-primary-foreground/50"}`}
            />
          ))}
        </div>
      </div>

      <div className="container space-y-6 mt-5">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold">Luxury 2BR Apartment</h1>
              <div className="flex items-center gap-1 text-muted-foreground mt-1">
                <MapPin className="h-3.5 w-3.5" />
                <span className="text-xs">Masaki, Dar es Salaam</span>
              </div>
            </div>
            <Badge className="rounded-lg bg-accent text-accent-foreground border-0 text-xs shrink-0">Featured</Badge>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-primary">TZS 1.2M</span>
            <span className="text-sm text-muted-foreground">{t("prop.perMonth")}</span>
          </div>
          <div className="flex gap-4 pt-1">
            <span className="flex items-center gap-1 text-sm text-muted-foreground"><Bed className="h-4 w-4" /> 2 Beds</span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground"><Bath className="h-4 w-4" /> 2 Baths</span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground"><Maximize className="h-4 w-4" /> 85 m²</span>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-2">
          <h2 className="font-semibold">{t("prop.description")}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Beautiful, fully furnished apartment in the heart of Masaki. Enjoy modern finishes, ocean breezes, and proximity to restaurants, shops, and the waterfront. Perfect for professionals and small families.
          </p>
        </motion.div>

        {/* Amenities */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="space-y-3">
          <h2 className="font-semibold">{t("prop.amenities")}</h2>
          <div className="grid grid-cols-3 gap-3">
            {amenities.map((a) => (
              <div key={a.label} className="glass-card rounded-xl p-3 flex flex-col items-center gap-1.5 text-center">
                <a.icon className="h-5 w-5 text-primary" />
                <span className="text-[11px] text-muted-foreground">{a.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Landlord */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-2xl p-4">
          <h2 className="font-semibold mb-3">{t("prop.landlord")}</h2>
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="gradient-primary text-primary-foreground font-semibold">JM</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium text-sm">John Mwangi</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="h-3 w-3 fill-warning text-warning" />
                <span>4.8</span>
                <span>• 12 properties</span>
              </div>
            </div>
            <Button size="sm" variant="outline" className="rounded-xl text-xs gap-1">
              <MessageCircle className="h-3.5 w-3.5" /> {t("prop.contact")}
            </Button>
          </div>
        </motion.div>

        {/* Reviews */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">{t("prop.reviews")}</h2>
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-warning text-warning" />
              <span className="font-semibold">4.8</span>
              <span className="text-muted-foreground text-xs">(24)</span>
            </div>
          </div>
          <div className="space-y-3">
            {reviews.map((r, i) => (
              <div key={i} className="glass-card rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="text-[10px] bg-muted">{r.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium">{r.name}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{r.date}</span>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className={`h-3 w-3 ${j < r.rating ? "fill-warning text-warning" : "text-muted"}`} />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{r.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 glass-card-strong border-t border-border/50 p-4 safe-bottom md:relative md:border-0 md:mt-6 md:bg-transparent md:backdrop-blur-none md:shadow-none">
        <div className="container flex gap-3">
          <Button variant="outline" className="flex-1 h-12 rounded-xl text-sm font-semibold">
            {t("prop.apply")}
          </Button>
          <Button className="flex-1 h-12 rounded-xl gradient-primary text-primary-foreground border-0 text-sm font-semibold">
            {t("prop.payRent")}
          </Button>
        </div>
      </div>
    </div>
  );
}
