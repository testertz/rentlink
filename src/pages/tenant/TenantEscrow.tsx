import { motion } from "framer-motion";
import { Shield, Clock, CheckCircle2, AlertTriangle, ArrowRight, Info, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const escrowDeposits = [
  {
    id: 1, property: "Cozy Studio Apartment", location: "Mikocheni", amount: "TZS 900,000",
    status: "held" as const, depositDate: "Jan 5, 2026", releaseDate: "Dec 31, 2026",
    progress: 33, stages: [
      { label: "Deposit Paid", done: true, date: "Jan 5, 2026" },
      { label: "Move-In Verified", done: true, date: "Jan 10, 2026" },
      { label: "Midterm Check", done: false, date: "Jul 2026" },
      { label: "Move-Out Inspection", done: false, date: "Dec 2026" },
      { label: "Deposit Released", done: false, date: "After inspection" },
    ],
  },
  {
    id: 2, property: "2BR Garden Apartment", location: "Masaki", amount: "TZS 2,400,000",
    status: "released" as const, depositDate: "Jan 2, 2025", releaseDate: "Jan 5, 2026",
    progress: 100, stages: [
      { label: "Deposit Paid", done: true, date: "Jan 2, 2025" },
      { label: "Move-In Verified", done: true, date: "Jan 5, 2025" },
      { label: "Midterm Check", done: true, date: "Jul 2025" },
      { label: "Move-Out Inspection", done: true, date: "Dec 30, 2025" },
      { label: "Deposit Released", done: true, date: "Jan 5, 2026" },
    ],
  },
];

const statusConfig = {
  held: { label: "Held in Escrow", color: "bg-warning/15 text-warning", icon: Lock },
  released: { label: "Released", color: "bg-success/15 text-success", icon: CheckCircle2 },
  disputed: { label: "Disputed", color: "bg-destructive/15 text-destructive", icon: AlertTriangle },
};

export default function TenantEscrow() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">Escrow Deposits</h1>
        <p className="text-sm text-muted-foreground">Track your security deposits</p>
      </div>

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-4 flex items-start gap-3"
      >
        <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium">How Escrow Works</p>
          <p className="text-xs text-muted-foreground mt-1">
            Your deposit is securely held by RentLink until your lease ends. After a successful move-out inspection, 
            the full deposit is released back to you within 7 business days.
          </p>
        </div>
      </motion.div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-4 text-center space-y-1">
          <Shield className="h-5 w-5 text-primary mx-auto" />
          <p className="text-lg font-bold">TZS 900K</p>
          <p className="text-[10px] text-muted-foreground">Currently Held</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass-card rounded-2xl p-4 text-center space-y-1">
          <CheckCircle2 className="h-5 w-5 text-success mx-auto" />
          <p className="text-lg font-bold">TZS 2.4M</p>
          <p className="text-[10px] text-muted-foreground">Total Released</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-2xl p-4 text-center space-y-1 col-span-2 sm:col-span-1">
          <Clock className="h-5 w-5 text-warning mx-auto" />
          <p className="text-lg font-bold">0</p>
          <p className="text-[10px] text-muted-foreground">Disputes</p>
        </motion.div>
      </div>

      {/* Deposit Cards */}
      {escrowDeposits.map((d, idx) => {
        const cfg = statusConfig[d.status];
        return (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card rounded-2xl p-5 space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold">{d.property}</h3>
                <p className="text-sm text-muted-foreground">{d.location}</p>
              </div>
              <Badge className={`rounded-lg border-0 text-xs ${cfg.color}`}>
                <cfg.icon className="h-3 w-3 mr-1" /> {cfg.label}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground text-xs">Deposit Amount</p>
                <p className="font-bold text-primary">{d.amount}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Expected Release</p>
                <p className="font-medium">{d.releaseDate}</p>
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Release Progress</span>
                <span className="font-medium">{d.progress}%</span>
              </div>
              <Progress value={d.progress} className="h-2 rounded-full" />
            </div>

            {/* Timeline */}
            <div className="space-y-0">
              {d.stages.map((s, i) => (
                <div key={i} className="flex items-start gap-3 relative">
                  <div className="flex flex-col items-center">
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 ${s.done ? "bg-success/15" : "bg-muted"}`}>
                      {s.done ? <CheckCircle2 className="h-3.5 w-3.5 text-success" /> : <Clock className="h-3.5 w-3.5 text-muted-foreground" />}
                    </div>
                    {i < d.stages.length - 1 && (
                      <div className={`w-0.5 h-6 ${s.done ? "bg-success/30" : "bg-border"}`} />
                    )}
                  </div>
                  <div className="pb-4">
                    <p className={`text-xs font-medium ${s.done ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</p>
                    <p className="text-[10px] text-muted-foreground">{s.date}</p>
                  </div>
                </div>
              ))}
            </div>

            {d.status === "held" && (
              <Button variant="outline" className="rounded-xl text-xs gap-1 text-destructive hover:text-destructive">
                <AlertTriangle className="h-3.5 w-3.5" /> Raise Dispute
              </Button>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
