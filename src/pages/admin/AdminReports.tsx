import { motion } from "framer-motion";
import { AlertTriangle, Flag, Search, Download, Eye, CheckCircle2, Clock, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const reports = [
  { id: "R-001", type: "Listing", subject: "Misleading photos on 'Budget Room'", reporter: "Sarah K.", date: "Apr 14, 2026", status: "Open", severity: "Medium" },
  { id: "R-002", type: "User", subject: "Landlord harassment reports", reporter: "Amina M.", date: "Apr 12, 2026", status: "Under Review", severity: "High" },
  { id: "R-003", type: "Payment", subject: "Double charge on rent payment", reporter: "Peter K.", date: "Apr 10, 2026", status: "Resolved", severity: "High" },
  { id: "R-004", type: "Listing", subject: "Fake listing - property doesn't exist", reporter: "Joseph R.", date: "Apr 8, 2026", status: "Open", severity: "Critical" },
  { id: "R-005", type: "User", subject: "Spam messages from user", reporter: "Grace M.", date: "Apr 5, 2026", status: "Closed", severity: "Low" },
];

const statusColors: Record<string, string> = {
  "Open": "bg-destructive/15 text-destructive",
  "Under Review": "bg-warning/15 text-warning",
  "Resolved": "bg-success/15 text-success",
  "Closed": "bg-muted text-muted-foreground",
};

const severityColors: Record<string, string> = {
  "Critical": "bg-destructive/15 text-destructive",
  "High": "bg-warning/15 text-warning",
  "Medium": "bg-primary/15 text-primary",
  "Low": "bg-muted text-muted-foreground",
};

export default function AdminReports() {
  const [search, setSearch] = useState("");

  const filtered = reports.filter(r =>
    r.subject.toLowerCase().includes(search.toLowerCase()) ||
    r.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-sm text-muted-foreground">Review flagged content and issues</p>
        </div>
        <Button variant="outline" className="rounded-xl text-sm gap-1"><Download className="h-4 w-4" /> Export</Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Open", count: reports.filter(r => r.status === "Open").length, color: "text-destructive" },
          { label: "Under Review", count: reports.filter(r => r.status === "Under Review").length, color: "text-warning" },
          { label: "Resolved", count: reports.filter(r => r.status === "Resolved").length, color: "text-success" },
          { label: "Critical", count: reports.filter(r => r.severity === "Critical").length, color: "text-destructive" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="glass-card rounded-2xl p-3 text-center space-y-1"
          >
            <p className={`text-xl font-bold ${s.color}`}>{s.count}</p>
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search reports..." className="pl-10 rounded-xl" />
      </div>

      <div className="space-y-3">
        {filtered.map((r, i) => (
          <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="glass-card rounded-xl p-4 space-y-2"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground">{r.id}</span>
                  <Badge className={`rounded-lg border-0 text-[10px] ${severityColors[r.severity]}`}>{r.severity}</Badge>
                  <Badge variant="outline" className="rounded-lg text-[10px]">{r.type}</Badge>
                </div>
                <p className="text-sm font-semibold mt-1">{r.subject}</p>
              </div>
              <Badge className={`rounded-lg border-0 text-xs shrink-0 ${statusColors[r.status]}`}>{r.status}</Badge>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Reported by: {r.reporter}</span>
              <span>{r.date}</span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="rounded-xl text-xs flex-1 gap-1"><Eye className="h-3.5 w-3.5" /> Review</Button>
              {r.status === "Open" && (
                <Button size="sm" className="rounded-xl gradient-primary text-primary-foreground border-0 text-xs flex-1 gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Take Action
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
