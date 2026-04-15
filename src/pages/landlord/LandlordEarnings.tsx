import { motion } from "framer-motion";
import { TrendingUp, ArrowUpRight, ArrowDownRight, BarChart3, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const monthlyData = [
  { month: "Oct 2025", revenue: "TZS 4.1M", change: "+5%" },
  { month: "Nov 2025", revenue: "TZS 4.5M", change: "+10%" },
  { month: "Dec 2025", revenue: "TZS 4.8M", change: "+7%" },
  { month: "Jan 2026", revenue: "TZS 4.6M", change: "-4%" },
  { month: "Feb 2026", revenue: "TZS 5.0M", change: "+9%" },
  { month: "Mar 2026", revenue: "TZS 5.2M", change: "+4%" },
];

const propertyEarnings = [
  { name: "Masaki Heights", revenue: "TZS 2.8M", share: 54 },
  { name: "Mikocheni Apts", revenue: "TZS 1.35M", share: 26 },
  { name: "Oyster Bay Villa", revenue: "TZS 800K", share: 15 },
  { name: "Mbezi Beach", revenue: "TZS 250K", share: 5 },
];

export default function LandlordEarnings() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Earnings</h1>
          <p className="text-sm text-muted-foreground">Track your rental income</p>
        </div>
        <Button variant="outline" className="rounded-xl text-sm gap-1">
          <Download className="h-4 w-4" /> Export Report
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "This Month", value: "TZS 5.2M", change: "+4%", positive: true },
          { label: "Last Month", value: "TZS 5.0M", change: "+9%", positive: true },
          { label: "YTD Revenue", value: "TZS 14.8M", change: "+12%", positive: true },
          { label: "Pending", value: "TZS 450K", change: "1 payment", positive: false },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="glass-card rounded-2xl p-4 space-y-2">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-xl font-bold">{s.value}</p>
            <p className={`text-[10px] flex items-center gap-0.5 ${s.positive ? "text-success" : "text-warning"}`}>
              {s.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {s.change}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Revenue Trend</h3>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex items-end gap-2 h-40">
          {[41, 45, 48, 46, 50, 52].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${(h / 55) * 100}%` }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex-1 rounded-t-lg gradient-primary opacity-80 hover:opacity-100 transition-opacity cursor-pointer relative group"
            >
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 hidden group-hover:block text-[10px] font-medium bg-card px-2 py-0.5 rounded-md shadow">
                {monthlyData[i].revenue}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground">
          {monthlyData.map(m => <span key={m.month}>{m.month.split(" ")[0]}</span>)}
        </div>
      </motion.div>

      {/* By Property */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card rounded-2xl p-5 space-y-4">
        <h3 className="font-semibold">Earnings by Property</h3>
        <div className="space-y-3">
          {propertyEarnings.map((p, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{p.name}</span>
                <span className="text-primary font-semibold">{p.revenue}</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${p.share}%` }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="h-full rounded-full gradient-primary"
                />
              </div>
              <p className="text-[10px] text-muted-foreground text-right">{p.share}% of total</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Monthly Breakdown */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card rounded-2xl p-5 space-y-4">
        <h3 className="font-semibold">Monthly Breakdown</h3>
        <div className="space-y-2">
          {monthlyData.slice().reverse().map((m, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium">{m.month}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold">{m.revenue}</span>
                <Badge className={`rounded-lg border-0 text-[10px] ${m.change.startsWith("+") ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>
                  {m.change}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
