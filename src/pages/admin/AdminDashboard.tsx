import { motion } from "framer-motion";
import {
  Users, Building2, CreditCard, Scale, TrendingUp, AlertTriangle,
  ArrowUpRight, Activity, Shield, BarChart3
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

const stats = [
  { label: "Total Users", value: "2,847", icon: Users, color: "text-primary", bg: "bg-primary/10", change: "+124 this month" },
  { label: "Active Listings", value: "1,240", icon: Building2, color: "text-accent", bg: "bg-accent/10", change: "+45 new" },
  { label: "Total Revenue", value: "TZS 48.2M", icon: CreditCard, color: "text-success", bg: "bg-success/10", change: "+18% MoM" },
  { label: "Open Disputes", value: "7", icon: Scale, color: "text-destructive", bg: "bg-destructive/10", change: "3 critical" },
  { label: "Escrow Held", value: "TZS 125M", icon: Shield, color: "text-warning", bg: "bg-warning/10", change: "89 deposits" },
  { label: "Platform Health", value: "99.2%", icon: Activity, color: "text-primary", bg: "bg-primary/10", change: "Uptime" },
];

const recentUsers = [
  { name: "Sarah Kimaro", role: "Tenant", date: "Apr 14, 2026" },
  { name: "David Mwenda", role: "Landlord", date: "Apr 14, 2026" },
  { name: "Linda Macha", role: "Tenant", date: "Apr 13, 2026" },
  { name: "James Omondi", role: "Landlord", date: "Apr 13, 2026" },
];

const recentDisputes = [
  { id: "D-2026-041", tenant: "Fatma H.", landlord: "John M.", amount: "TZS 900K", status: "Open" },
  { id: "D-2026-039", tenant: "Peter K.", landlord: "Grace K.", amount: "TZS 2.4M", status: "Under Review" },
  { id: "D-2026-037", tenant: "Amina M.", landlord: "David M.", amount: "TZS 450K", status: "Resolved" },
];

const anim = (i: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay: i * 0.05 },
});

export default function AdminDashboard() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">Platform overview and management</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {stats.map((s, i) => (
          <motion.div key={s.label} {...anim(i)} className="glass-card rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className={`h-10 w-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
            </div>
            <div>
              <p className="text-xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-[10px] text-success mt-0.5">{s.change}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Revenue Chart */}
        <motion.div {...anim(6)} className="glass-card rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Platform Revenue</h3>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-end gap-1.5 h-32">
            {[35, 42, 38, 56, 48, 62, 58, 70, 65, 72, 78, 82].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="flex-1 rounded-t-md gradient-primary opacity-80"
              />
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>Jan</span><span>Jun</span><span>Dec</span>
          </div>
        </motion.div>

        {/* Recent Users */}
        <motion.div {...anim(7)} className="glass-card rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Recent Registrations</h3>
            <Link to="/admin/users"><Button variant="ghost" size="sm" className="text-primary text-xs">View all</Button></Link>
          </div>
          <div className="space-y-3">
            {recentUsers.map((u, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors">
                <div>
                  <p className="text-sm font-medium">{u.name}</p>
                  <p className="text-[10px] text-muted-foreground">{u.date}</p>
                </div>
                <Badge className={`rounded-lg border-0 text-[10px] ${u.role === "Landlord" ? "bg-accent/15 text-accent" : "bg-primary/15 text-primary"}`}>
                  {u.role}
                </Badge>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Disputes */}
      <motion.div {...anim(8)} className="glass-card rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Recent Disputes</h3>
          <Link to="/admin/disputes"><Button variant="ghost" size="sm" className="text-primary text-xs">View all</Button></Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground border-b border-border/50">
                <th className="text-left py-2 font-medium">ID</th>
                <th className="text-left py-2 font-medium">Tenant</th>
                <th className="text-left py-2 font-medium">Landlord</th>
                <th className="text-right py-2 font-medium">Amount</th>
                <th className="text-right py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentDisputes.map((d, i) => (
                <tr key={i} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                  <td className="py-3 font-mono text-xs">{d.id}</td>
                  <td className="py-3">{d.tenant}</td>
                  <td className="py-3">{d.landlord}</td>
                  <td className="py-3 text-right font-semibold">{d.amount}</td>
                  <td className="py-3 text-right">
                    <Badge className={`rounded-lg border-0 text-[10px] ${
                      d.status === "Resolved" ? "bg-success/15 text-success" :
                      d.status === "Open" ? "bg-destructive/15 text-destructive" : "bg-warning/15 text-warning"
                    }`}>{d.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
