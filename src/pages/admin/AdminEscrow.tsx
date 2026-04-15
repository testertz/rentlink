import { motion } from "framer-motion";
import { Shield, Lock, CheckCircle2, AlertTriangle, Search, Download, DollarSign, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const escrows = [
  { id: "ESC-001", tenant: "Amina M.", landlord: "Grace K.", property: "Mikocheni Apt #1", amount: "TZS 900,000", status: "Held", progress: 33, date: "Jan 5, 2026" },
  { id: "ESC-002", tenant: "Peter K.", landlord: "John M.", property: "Masaki Heights #3", amount: "TZS 2,400,000", status: "Held", progress: 20, date: "Feb 1, 2026" },
  { id: "ESC-003", tenant: "Joseph R.", landlord: "John M.", property: "Oyster Bay Villa", amount: "TZS 7,600,000", status: "Held", progress: 10, date: "Mar 1, 2026" },
  { id: "ESC-004", tenant: "Grace M.", landlord: "David M.", property: "2BR Garden Apt", amount: "TZS 2,400,000", status: "Released", progress: 100, date: "Jan 5, 2026" },
  { id: "ESC-005", tenant: "Fatma H.", landlord: "John M.", property: "Masaki Heights #2", amount: "TZS 900,000", status: "Disputed", progress: 50, date: "Feb 15, 2026" },
];

const statusColors: Record<string, string> = {
  "Held": "bg-warning/15 text-warning",
  "Released": "bg-success/15 text-success",
  "Disputed": "bg-destructive/15 text-destructive",
};

export default function AdminEscrow() {
  const [search, setSearch] = useState("");

  const filtered = escrows.filter(e =>
    e.tenant.toLowerCase().includes(search.toLowerCase()) ||
    e.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Escrow Management</h1>
          <p className="text-sm text-muted-foreground">Monitor all security deposits</p>
        </div>
        <Button variant="outline" className="rounded-xl text-sm gap-1"><Download className="h-4 w-4" /> Export</Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Held", value: "TZS 14.2M", icon: Lock, color: "text-warning", bg: "bg-warning/10" },
          { label: "Active", value: "3", icon: Shield, color: "text-primary", bg: "bg-primary/10" },
          { label: "Released", value: "1", icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
          { label: "Disputed", value: "1", icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="glass-card rounded-2xl p-4 space-y-2"
          >
            <div className={`h-8 w-8 rounded-lg ${s.bg} flex items-center justify-center`}>
              <s.icon className={`h-4 w-4 ${s.color}`} />
            </div>
            <p className="text-xl font-bold">{s.value}</p>
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search escrow records..." className="pl-10 rounded-xl" />
      </div>

      <div className="space-y-3">
        {filtered.map((e, i) => (
          <motion.div key={e.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="glass-card rounded-xl p-4 space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground">{e.id}</span>
                  <Badge className={`rounded-lg border-0 text-[10px] ${statusColors[e.status]}`}>{e.status}</Badge>
                </div>
                <p className="text-sm font-semibold mt-1">{e.property}</p>
              </div>
              <p className="text-lg font-bold text-primary shrink-0">{e.amount}</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>Tenant: {e.tenant}</span>
              <span>Landlord: {e.landlord}</span>
              <span>Since: {e.date}</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{e.progress}%</span>
              </div>
              <Progress value={e.progress} className="h-2 rounded-full" />
            </div>
            {e.status === "Held" && (
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="rounded-xl text-xs flex-1">View Details</Button>
                <Button size="sm" className="rounded-xl gradient-primary text-primary-foreground border-0 text-xs flex-1">Force Release</Button>
              </div>
            )}
            {e.status === "Disputed" && (
              <Button size="sm" variant="outline" className="rounded-xl text-xs text-destructive hover:text-destructive w-full">
                <AlertTriangle className="h-3.5 w-3.5 mr-1" /> Review Dispute
              </Button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
