import { motion } from "framer-motion";
import { Users, Mail, Phone, Calendar, CheckCircle2, Clock, AlertCircle, Search, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const tenants = [
  { id: 1, name: "Amina Mwalimu", email: "amina@email.com", phone: "+255 712 345 678", property: "Mikocheni Apt #1", rent: "TZS 450K", status: "Active", paymentStatus: "Paid", avatar: "AM" },
  { id: 2, name: "Peter Kamau", email: "peter@email.com", phone: "+255 678 901 234", property: "Masaki Heights #3", rent: "TZS 1.2M", status: "Active", paymentStatus: "Paid", avatar: "PK" },
  { id: 3, name: "Fatma Hassan", email: "fatma@email.com", phone: "+255 756 789 012", property: "Masaki Heights #2", rent: "TZS 1.2M", status: "Active", paymentStatus: "Overdue", avatar: "FH" },
  { id: 4, name: "Joseph Rwiza", email: "joseph@email.com", phone: "+255 689 012 345", property: "Oyster Bay Villa", rent: "TZS 3.8M", status: "Active", paymentStatus: "Paid", avatar: "JR" },
  { id: 5, name: "Grace Mushi", email: "grace@email.com", phone: "+255 745 678 901", property: "Mbezi Beach #2", rent: "TZS 2.5M", status: "Pending", paymentStatus: "N/A", avatar: "GM" },
];

export default function LandlordTenants() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold">Tenants</h1>
        <p className="text-sm text-muted-foreground">Manage your tenants across all properties</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-4 text-center space-y-1">
          <p className="text-xl font-bold text-primary">12</p>
          <p className="text-xs text-muted-foreground">Active Tenants</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass-card rounded-2xl p-4 text-center space-y-1">
          <p className="text-xl font-bold text-warning">2</p>
          <p className="text-xs text-muted-foreground">Pending</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-2xl p-4 text-center space-y-1">
          <p className="text-xl font-bold text-destructive">1</p>
          <p className="text-xs text-muted-foreground">Overdue</p>
        </motion.div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search tenants..." className="pl-10 rounded-xl" />
      </div>

      <div className="space-y-3">
        {tenants.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-xl p-4 flex items-center gap-4"
          >
            <Avatar className="h-11 w-11 shrink-0">
              <AvatarFallback className="gradient-primary text-primary-foreground text-xs">{t.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-semibold">{t.name}</p>
                <Badge className={`rounded-lg border-0 text-[10px] ${t.status === "Active" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`}>
                  {t.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{t.property} • {t.rent}/mo</p>
              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {t.email}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <Badge className={`rounded-lg border-0 text-[10px] ${
                t.paymentStatus === "Paid" ? "bg-success/15 text-success" : 
                t.paymentStatus === "Overdue" ? "bg-destructive/15 text-destructive" : "bg-muted text-muted-foreground"
              }`}>
                {t.paymentStatus}
              </Badge>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
