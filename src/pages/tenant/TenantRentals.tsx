import { motion } from "framer-motion";
import { Building2, MapPin, Calendar, FileText, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

const rentals = [
  {
    id: 1, title: "Cozy Studio Apartment", location: "Mikocheni, Dar es Salaam",
    price: "TZS 450,000/mo", status: "Active", start: "Jan 2026", end: "Dec 2026",
    progress: 33, monthsDone: 4, totalMonths: 12,
  },
  {
    id: 2, title: "2BR Garden Apartment", location: "Masaki, Dar es Salaam",
    price: "TZS 1,200,000/mo", status: "Expired", start: "Jan 2025", end: "Dec 2025",
    progress: 100, monthsDone: 12, totalMonths: 12,
  },
];

export default function TenantRentals() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold">My Rentals</h1>
        <p className="text-sm text-muted-foreground">Manage your rental agreements</p>
      </div>

      <div className="space-y-4">
        {rentals.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-2xl p-5 space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex gap-4">
                <div className="h-16 w-16 rounded-xl bg-muted shrink-0 overflow-hidden">
                  <div className="w-full h-full gradient-primary opacity-30" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">{r.title}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> {r.location}
                  </p>
                  <p className="text-sm font-semibold text-primary">{r.price}</p>
                </div>
              </div>
              <Badge className={`rounded-lg border-0 text-xs ${r.status === "Active" ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>
                {r.status}
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {r.start} - {r.end}</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Lease Progress</span>
                <span className="font-medium">{r.monthsDone}/{r.totalMonths} months</span>
              </div>
              <Progress value={r.progress} className="h-2 rounded-full" />
            </div>

            <div className="flex gap-2 flex-wrap">
              {r.status === "Active" && (
                <Link to="/tenant/payments">
                  <Button size="sm" className="rounded-xl gradient-primary text-primary-foreground border-0 text-xs gap-1">
                    <CreditCard className="h-3.5 w-3.5" /> Pay Rent
                  </Button>
                </Link>
              )}
              <Button size="sm" variant="outline" className="rounded-xl text-xs gap-1">
                <FileText className="h-3.5 w-3.5" /> View Lease
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
