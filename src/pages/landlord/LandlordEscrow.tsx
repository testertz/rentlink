import { motion } from "framer-motion";
import { Shield, Lock, CheckCircle2, AlertTriangle, Clock, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const escrows = [
  {
    id: 1, tenant: "Amina M.", property: "Mikocheni Apt #1", amount: "TZS 900,000",
    status: "held" as const, date: "Jan 5, 2026", progress: 33,
  },
  {
    id: 2, tenant: "Peter K.", property: "Masaki Heights #3", amount: "TZS 2,400,000",
    status: "held" as const, date: "Feb 1, 2026", progress: 20,
  },
  {
    id: 3, tenant: "Joseph R.", property: "Oyster Bay Villa", amount: "TZS 7,600,000",
    status: "held" as const, date: "Mar 1, 2026", progress: 10,
  },
  {
    id: 4, tenant: "Grace M.", property: "2BR Garden Apt", amount: "TZS 2,400,000",
    status: "released" as const, date: "Jan 5, 2026", progress: 100,
  },
];

const statusCfg = {
  held: { label: "Held", color: "bg-warning/15 text-warning", icon: Lock },
  released: { label: "Released", color: "bg-success/15 text-success", icon: CheckCircle2 },
  disputed: { label: "Disputed", color: "bg-destructive/15 text-destructive", icon: AlertTriangle },
};

export default function LandlordEscrow() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold">Escrow Management</h1>
        <p className="text-sm text-muted-foreground">Track deposits held for your properties</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-4 text-center space-y-1">
          <Lock className="h-5 w-5 text-warning mx-auto" />
          <p className="text-lg font-bold">TZS 10.9M</p>
          <p className="text-[10px] text-muted-foreground">Total Held</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass-card rounded-2xl p-4 text-center space-y-1">
          <CheckCircle2 className="h-5 w-5 text-success mx-auto" />
          <p className="text-lg font-bold">TZS 2.4M</p>
          <p className="text-[10px] text-muted-foreground">Released</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-2xl p-4 text-center space-y-1 col-span-2 sm:col-span-1">
          <Users className="h-5 w-5 text-primary mx-auto" />
          <p className="text-lg font-bold">4</p>
          <p className="text-[10px] text-muted-foreground">Active Deposits</p>
        </motion.div>
      </div>

      <div className="space-y-3">
        {escrows.map((e, i) => {
          const cfg = statusCfg[e.status];
          return (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="glass-card rounded-2xl p-4 space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">{e.tenant}</p>
                  <p className="text-xs text-muted-foreground">{e.property}</p>
                </div>
                <Badge className={`rounded-lg border-0 text-xs ${cfg.color}`}>
                  <cfg.icon className="h-3 w-3 mr-1" /> {cfg.label}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-primary">{e.amount}</p>
                <p className="text-xs text-muted-foreground">Since {e.date}</p>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Release Progress</span>
                  <span className="font-medium">{e.progress}%</span>
                </div>
                <Progress value={e.progress} className="h-2 rounded-full" />
              </div>
              {e.status === "held" && (
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="rounded-xl text-xs flex-1">View Details</Button>
                  <Button size="sm" className="rounded-xl gradient-primary text-primary-foreground border-0 text-xs flex-1">
                    Release Deposit
                  </Button>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
