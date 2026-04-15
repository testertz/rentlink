import { motion } from "framer-motion";
import {
  Home, TrendingUp, Users, Building2, Plus, BarChart3,
  ChevronRight, Clock, ArrowUpRight, DollarSign, AlertCircle, CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

const stats = [
  { label: "Properties", value: "4", icon: Building2, color: "text-primary", bg: "bg-primary/10", change: "+1 this month" },
  { label: "Monthly Revenue", value: "TZS 5.2M", icon: TrendingUp, color: "text-success", bg: "bg-success/10", change: "+12%" },
  { label: "Tenants", value: "12", icon: Users, color: "text-accent", bg: "bg-accent/10", change: "2 pending" },
  { label: "Occupancy", value: "92%", icon: Home, color: "text-warning", bg: "bg-warning/10", change: "11/12 units" },
];

const properties = [
  { name: "Masaki Heights", units: 4, occupied: 4, revenue: "TZS 2.8M", status: "Full" },
  { name: "Mikocheni Apartments", units: 3, occupied: 3, revenue: "TZS 1.35M", status: "Full" },
  { name: "Oyster Bay Villa", units: 2, occupied: 1, revenue: "TZS 800K", status: "1 Vacant" },
  { name: "Mbezi Beach House", units: 3, occupied: 3, revenue: "TZS 750K", status: "Full" },
];

const recentActivity = [
  { icon: CheckCircle2, text: "Rent received from Amina M. (TZS 450K)", time: "2h ago", color: "text-success" },
  { icon: AlertCircle, text: "Maintenance request at Mikocheni Apt #2", time: "5h ago", color: "text-warning" },
  { icon: DollarSign, text: "Rent received from Peter K. (TZS 1.2M)", time: "1d ago", color: "text-success" },
  { icon: Clock, text: "Lease expiring: Joseph R. - Dec 2026", time: "2d ago", color: "text-primary" },
];

const anim = (i: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay: i * 0.06 },
});

export default function LandlordDashboard() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Landlord Dashboard</h1>
          <p className="text-sm text-muted-foreground">Manage your properties and tenants</p>
        </div>
        <Link to="/landlord/properties">
          <Button className="rounded-xl gradient-primary text-primary-foreground border-0 gap-1 text-sm">
            <Plus className="h-4 w-4" /> Add Property
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <motion.div key={s.label} {...anim(i)} className="glass-card rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className={`h-10 w-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-[10px] text-success mt-0.5">{s.change}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <motion.div {...anim(4)} className="lg:col-span-2 glass-card rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Monthly Revenue</h3>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-end gap-1.5 h-36">
            {[40, 65, 55, 80, 70, 90, 85, 95, 75, 88, 92, 78].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex-1 rounded-t-md gradient-primary opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
              />
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground">
            {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map(m => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </motion.div>

        {/* Activity */}
        <motion.div {...anim(5)} className="glass-card rounded-2xl p-5 space-y-4">
          <h3 className="font-semibold">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <a.icon className={`h-4 w-4 ${a.color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium leading-relaxed">{a.text}</p>
                  <p className="text-[10px] text-muted-foreground">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Properties Table */}
      <motion.div {...anim(6)} className="glass-card rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Properties Overview</h3>
          <Link to="/landlord/properties">
            <Button variant="ghost" size="sm" className="text-primary text-xs">View all</Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground border-b border-border/50">
                <th className="text-left py-2 font-medium">Property</th>
                <th className="text-center py-2 font-medium">Units</th>
                <th className="text-center py-2 font-medium">Occupied</th>
                <th className="text-right py-2 font-medium">Revenue</th>
                <th className="text-right py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p, i) => (
                <tr key={i} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                  <td className="py-3 font-medium">{p.name}</td>
                  <td className="py-3 text-center text-muted-foreground">{p.units}</td>
                  <td className="py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span>{p.occupied}/{p.units}</span>
                      <Progress value={(p.occupied / p.units) * 100} className="h-1.5 w-12 rounded-full" />
                    </div>
                  </td>
                  <td className="py-3 text-right font-semibold text-primary">{p.revenue}</td>
                  <td className="py-3 text-right">
                    <Badge className={`rounded-lg border-0 text-[10px] ${p.status === "Full" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`}>
                      {p.status}
                    </Badge>
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
