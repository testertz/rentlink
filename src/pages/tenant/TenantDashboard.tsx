import { motion } from "framer-motion";
import {
  Home, CreditCard, Bell, TrendingUp, ArrowUpRight, ArrowDownRight,
  Calendar, CheckCircle2, Clock, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

const stats = [
  { label: "Active Rentals", value: "1", icon: Home, color: "text-primary", bg: "bg-primary/10" },
  { label: "Next Payment", value: "TZS 450K", icon: CreditCard, color: "text-warning", bg: "bg-warning/10" },
  { label: "Notifications", value: "3", icon: Bell, color: "text-destructive", bg: "bg-destructive/10" },
  { label: "Escrow Balance", value: "TZS 900K", icon: TrendingUp, color: "text-accent", bg: "bg-accent/10" },
];

const transactions = [
  { title: "Rent - Studio Mikocheni", amount: "-TZS 450,000", date: "Apr 1, 2026", status: "Completed", type: "out" },
  { title: "Deposit Refund", amount: "+TZS 200,000", date: "Mar 28, 2026", status: "Completed", type: "in" },
  { title: "Rent - Studio Mikocheni", amount: "-TZS 450,000", date: "Mar 1, 2026", status: "Completed", type: "out" },
  { title: "Utility Payment", amount: "-TZS 85,000", date: "Feb 28, 2026", status: "Completed", type: "out" },
];

const notifications = [
  { icon: AlertCircle, text: "Rent due in 5 days", time: "2h ago", color: "text-warning" },
  { icon: CheckCircle2, text: "Payment confirmed for March", time: "1d ago", color: "text-success" },
  { icon: Clock, text: "Lease renewal reminder", time: "3d ago", color: "text-primary" },
];

const anim = (i: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay: i * 0.06 },
});

export default function TenantDashboard() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold">Welcome back, Amina 👋</h1>
        <p className="text-sm text-muted-foreground">Here's your rental overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <motion.div key={s.label} {...anim(i)} className="glass-card rounded-2xl p-4 space-y-3">
            <div className={`h-10 w-10 rounded-xl ${s.bg} flex items-center justify-center`}>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <div>
              <p className="text-xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Active Rental */}
        <motion.div {...anim(4)} className="lg:col-span-2 glass-card rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Active Rental</h3>
            <Badge className="rounded-lg bg-success/15 text-success border-0 text-xs">Active</Badge>
          </div>
          <div className="flex gap-4">
            <div className="h-20 w-20 rounded-xl bg-muted shrink-0 overflow-hidden">
              <div className="w-full h-full gradient-primary opacity-30" />
            </div>
            <div className="space-y-1 min-w-0">
              <p className="font-medium truncate">Cozy Studio Apartment</p>
              <p className="text-sm text-muted-foreground">Mikocheni, Dar es Salaam</p>
              <p className="text-sm font-semibold text-primary">TZS 450,000/mo</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" /> Lease: Jan 2026 - Dec 2026
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Lease Progress</span>
              <span className="font-medium">4/12 months</span>
            </div>
            <Progress value={33} className="h-2 rounded-full" />
          </div>
          <div className="flex gap-2">
            <Link to="/tenant/payments" className="flex-1">
              <Button className="w-full rounded-xl gradient-primary text-primary-foreground border-0 text-sm">
                Pay Rent
              </Button>
            </Link>
            <Button variant="outline" className="rounded-xl text-sm">View Lease</Button>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div {...anim(5)} className="glass-card rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Notifications</h3>
            <Link to="/tenant/notifications">
              <Button variant="ghost" size="sm" className="text-primary text-xs">View all</Button>
            </Link>
          </div>
          <div className="space-y-3">
            {notifications.map((n, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <n.icon className={`h-4 w-4 ${n.color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium">{n.text}</p>
                  <p className="text-[10px] text-muted-foreground">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Transactions */}
      <motion.div {...anim(6)} className="glass-card rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Recent Transactions</h3>
          <Link to="/tenant/payments">
            <Button variant="ghost" size="sm" className="text-primary text-xs">View all</Button>
          </Link>
        </div>
        <div className="space-y-2">
          {transactions.map((tx, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/30 transition-colors">
              <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${tx.type === "in" ? "bg-success/15" : "bg-muted"}`}>
                {tx.type === "in" ? <ArrowDownRight className="h-4 w-4 text-success" /> : <ArrowUpRight className="h-4 w-4 text-muted-foreground" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{tx.title}</p>
                <p className="text-xs text-muted-foreground">{tx.date}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-semibold ${tx.type === "in" ? "text-success" : "text-foreground"}`}>{tx.amount}</p>
                <p className="text-[10px] text-muted-foreground">{tx.status}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
