import { motion } from "framer-motion";
import {
  Home, CreditCard, Bell, FileText, TrendingUp, Users, Plus, BarChart3,
  ChevronRight, ArrowUpRight, ArrowDownRight, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tenantStats = [
  { label: "Active Rentals", value: "1", icon: Home, color: "text-primary" },
  { label: "Next Payment", value: "TZS 450K", icon: CreditCard, color: "text-warning" },
  { label: "Notifications", value: "3", icon: Bell, color: "text-destructive" },
];

const transactions = [
  { title: "Rent - Studio Mikocheni", amount: "-TZS 450,000", date: "Apr 1, 2026", status: "Completed", type: "out" },
  { title: "Deposit Refund", amount: "+TZS 200,000", date: "Mar 28, 2026", status: "Completed", type: "in" },
  { title: "Rent - Studio Mikocheni", amount: "-TZS 450,000", date: "Mar 1, 2026", status: "Completed", type: "out" },
];

const landlordStats = [
  { label: "Properties", value: "4", icon: Home, color: "text-primary" },
  { label: "Revenue", value: "TZS 5.2M", icon: TrendingUp, color: "text-success" },
  { label: "Tenants", value: "12", icon: Users, color: "text-accent" },
  { label: "Pending", value: "2", icon: Clock, color: "text-warning" },
];

const anim = (i: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay: i * 0.08 },
});

export default function DashboardPage() {
  return (
    <div className="container py-6 pb-24 md:pb-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back, Amina 👋</p>
      </div>

      <Tabs defaultValue="tenant" className="w-full">
        <TabsList className="glass-card rounded-xl w-full">
          <TabsTrigger value="tenant" className="flex-1 rounded-lg text-xs">Tenant</TabsTrigger>
          <TabsTrigger value="landlord" className="flex-1 rounded-lg text-xs">Landlord</TabsTrigger>
        </TabsList>

        {/* TENANT VIEW */}
        <TabsContent value="tenant" className="space-y-6 mt-4">
          <div className="grid grid-cols-3 gap-3">
            {tenantStats.map((s, i) => (
              <motion.div key={s.label} {...anim(i)} className="glass-card rounded-2xl p-4 text-center space-y-2">
                <s.icon className={`h-5 w-5 mx-auto ${s.color}`} />
                <p className="font-bold text-lg">{s.value}</p>
                <p className="text-[10px] text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Active Rental */}
          <motion.div {...anim(3)} className="glass-card rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm">Active Rental</h3>
              <Badge className="rounded-lg bg-success/15 text-success border-0 text-[10px]">Active</Badge>
            </div>
            <div className="flex gap-3">
              <div className="h-16 w-16 rounded-xl bg-muted shrink-0 overflow-hidden">
                <div className="w-full h-full gradient-primary opacity-30" />
              </div>
              <div className="space-y-1 min-w-0">
                <p className="text-sm font-medium truncate">Cozy Studio Apartment</p>
                <p className="text-xs text-muted-foreground">Mikocheni, Dar es Salaam</p>
                <p className="text-xs font-semibold text-primary">TZS 450,000/mo</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="flex-1 rounded-xl gradient-primary text-primary-foreground border-0 text-xs">
                Pay Rent
              </Button>
              <Button size="sm" variant="outline" className="flex-1 rounded-xl text-xs">
                <FileText className="h-3.5 w-3.5 mr-1" /> Lease
              </Button>
            </div>
          </motion.div>

          {/* Transactions */}
          <motion.div {...anim(4)} className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm">Recent Transactions</h3>
              <Button variant="ghost" size="sm" className="text-primary text-xs">View all</Button>
            </div>
            <div className="space-y-2">
              {transactions.map((tx, i) => (
                <div key={i} className="glass-card rounded-xl p-3 flex items-center gap-3">
                  <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${tx.type === "in" ? "bg-success/15" : "bg-muted"}`}>
                    {tx.type === "in" ? <ArrowDownRight className="h-4 w-4 text-success" /> : <ArrowUpRight className="h-4 w-4 text-muted-foreground" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{tx.title}</p>
                    <p className="text-[10px] text-muted-foreground">{tx.date}</p>
                  </div>
                  <p className={`text-xs font-semibold ${tx.type === "in" ? "text-success" : "text-foreground"}`}>{tx.amount}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        {/* LANDLORD VIEW */}
        <TabsContent value="landlord" className="space-y-6 mt-4">
          <div className="grid grid-cols-2 gap-3">
            {landlordStats.map((s, i) => (
              <motion.div key={s.label} {...anim(i)} className="glass-card rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="font-bold text-xl">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Revenue chart placeholder */}
          <motion.div {...anim(4)} className="glass-card rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm">Monthly Revenue</h3>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-end gap-1.5 h-28">
              {[40, 65, 55, 80, 70, 90, 85, 95, 75, 88, 92, 78].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="flex-1 rounded-t-md gradient-primary opacity-80"
                />
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>Jan</span><span>Jun</span><span>Dec</span>
            </div>
          </motion.div>

          <Button className="w-full rounded-xl gradient-primary text-primary-foreground border-0 gap-2">
            <Plus className="h-4 w-4" /> Add New Property
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
