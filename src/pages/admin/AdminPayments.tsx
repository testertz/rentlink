import { motion } from "framer-motion";
import { CreditCard, Search, Download, CheckCircle2, Clock, XCircle, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const payments = [
  { id: "TXN-2026-AB3X", tenant: "Amina M.", landlord: "Grace K.", amount: "TZS 450,000", method: "M-Pesa", date: "Apr 14, 2026", status: "Completed" },
  { id: "TXN-2026-CD5Y", tenant: "Peter K.", landlord: "John M.", amount: "TZS 1,200,000", method: "M-Pesa", date: "Apr 14, 2026", status: "Completed" },
  { id: "TXN-2026-EF7Z", tenant: "Fatma H.", landlord: "John M.", amount: "TZS 1,200,000", method: "Tigo Pesa", date: "Apr 13, 2026", status: "Pending" },
  { id: "TXN-2026-GH9A", tenant: "Joseph R.", landlord: "John M.", amount: "TZS 3,800,000", method: "Airtel Money", date: "Apr 12, 2026", status: "Completed" },
  { id: "TXN-2026-IJ1B", tenant: "Grace M.", landlord: "David M.", amount: "TZS 2,500,000", method: "M-Pesa", date: "Apr 10, 2026", status: "Failed" },
  { id: "TXN-2026-KL3C", tenant: "Sarah K.", landlord: "Linda M.", amount: "TZS 180,000", method: "M-Pesa", date: "Apr 8, 2026", status: "Completed" },
];

const statusColors: Record<string, string> = {
  "Completed": "bg-success/15 text-success",
  "Pending": "bg-warning/15 text-warning",
  "Failed": "bg-destructive/15 text-destructive",
};

export default function AdminPayments() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = payments.filter(p => {
    const matchSearch = p.tenant.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || p.status.toLowerCase() === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalCompleted = payments.filter(p => p.status === "Completed").reduce((acc) => acc + 1, 0);

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Payment Management</h1>
          <p className="text-sm text-muted-foreground">Monitor all platform transactions</p>
        </div>
        <Button variant="outline" className="rounded-xl text-sm gap-1"><Download className="h-4 w-4" /> Export</Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Volume", value: "TZS 9.3M", icon: CreditCard, color: "text-primary", bg: "bg-primary/10" },
          { label: "Completed", value: totalCompleted.toString(), icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
          { label: "Pending", value: payments.filter(p => p.status === "Pending").length.toString(), icon: Clock, color: "text-warning", bg: "bg-warning/10" },
          { label: "Failed", value: payments.filter(p => p.status === "Failed").length.toString(), icon: XCircle, color: "text-destructive", bg: "bg-destructive/10" },
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

      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search payments..." className="pl-10 rounded-xl" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px] rounded-xl"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block glass-card rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-muted-foreground border-b border-border/50 bg-muted/30">
              <th className="text-left py-3 px-4 font-medium">Transaction ID</th>
              <th className="text-left py-3 px-4 font-medium">Tenant</th>
              <th className="text-left py-3 px-4 font-medium">Landlord</th>
              <th className="text-right py-3 px-4 font-medium">Amount</th>
              <th className="text-center py-3 px-4 font-medium">Method</th>
              <th className="text-center py-3 px-4 font-medium">Date</th>
              <th className="text-center py-3 px-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                <td className="py-3 px-4 font-mono text-xs">{p.id}</td>
                <td className="py-3 px-4">{p.tenant}</td>
                <td className="py-3 px-4">{p.landlord}</td>
                <td className="py-3 px-4 text-right font-semibold">{p.amount}</td>
                <td className="py-3 px-4 text-center text-muted-foreground">{p.method}</td>
                <td className="py-3 px-4 text-center text-muted-foreground">{p.date}</td>
                <td className="py-3 px-4 text-center">
                  <Badge className={`rounded-lg border-0 text-[10px] ${statusColors[p.status]}`}>{p.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="glass-card rounded-xl p-4 space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-muted-foreground">{p.id}</span>
              <Badge className={`rounded-lg border-0 text-[10px] ${statusColors[p.status]}`}>{p.status}</Badge>
            </div>
            <p className="text-lg font-bold text-primary">{p.amount}</p>
            <div className="text-xs text-muted-foreground space-y-0.5">
              <p>{p.tenant} → {p.landlord}</p>
              <p>{p.method} • {p.date}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
