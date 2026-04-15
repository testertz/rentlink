import { useState } from "react";
import { motion } from "framer-motion";
import {
  Scale, Search, Eye, CheckCircle2, Clock, AlertTriangle, XCircle,
  MessageCircle, Users, DollarSign, ChevronRight, Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const initialDisputes = [
  { id: "D-2026-041", tenant: "Fatma Hassan", landlord: "John Mwangi", property: "Masaki Heights #2", amount: "TZS 900,000", reason: "Deposit not returned after move-out", status: "Open", date: "Apr 12, 2026", priority: "High" },
  { id: "D-2026-039", tenant: "Peter Kamau", landlord: "Grace Kamau", property: "Mikocheni Apt #3", amount: "TZS 2,400,000", reason: "Property condition doesn't match listing", status: "Under Review", date: "Apr 10, 2026", priority: "Medium" },
  { id: "D-2026-037", tenant: "Amina Mwalimu", landlord: "David Mwenda", property: "Oyster Bay Villa", amount: "TZS 450,000", reason: "Overcharged for utilities", status: "Resolved", date: "Apr 5, 2026", priority: "Low" },
  { id: "D-2026-035", tenant: "Joseph Rwiza", landlord: "John Mwangi", property: "Masaki Heights #1", amount: "TZS 1,200,000", reason: "Unauthorized entry by landlord", status: "Open", date: "Apr 3, 2026", priority: "High" },
  { id: "D-2026-033", tenant: "Grace Mushi", landlord: "Linda Macha", property: "Sinza Room #4", amount: "TZS 180,000", reason: "No hot water for 2 weeks", status: "Closed", date: "Mar 28, 2026", priority: "Low" },
];

const statusColors: Record<string, string> = {
  "Open": "bg-destructive/15 text-destructive",
  "Under Review": "bg-warning/15 text-warning",
  "Resolved": "bg-success/15 text-success",
  "Closed": "bg-muted text-muted-foreground",
};

const priorityColors: Record<string, string> = {
  "High": "bg-destructive/15 text-destructive",
  "Medium": "bg-warning/15 text-warning",
  "Low": "bg-primary/15 text-primary",
};

export default function AdminDisputes() {
  const [disputes, setDisputes] = useState(initialDisputes);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDispute, setSelectedDispute] = useState<(typeof initialDisputes)[0] | null>(null);
  const [resolution, setResolution] = useState("");

  const filtered = disputes.filter(d => {
    const matchSearch = d.tenant.toLowerCase().includes(search.toLowerCase()) || d.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || d.status.toLowerCase().includes(statusFilter);
    return matchSearch && matchStatus;
  });

  const handleResolve = (id: string) => {
    setDisputes(prev => prev.map(d => d.id === id ? { ...d, status: "Resolved" } : d));
    setSelectedDispute(null);
    setResolution("");
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Dispute Management</h1>
          <p className="text-sm text-muted-foreground">Handle tenant-landlord disputes</p>
        </div>
        <Button variant="outline" className="rounded-xl text-sm gap-1"><Download className="h-4 w-4" /> Export</Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Open", count: disputes.filter(d => d.status === "Open").length, icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10" },
          { label: "Under Review", count: disputes.filter(d => d.status === "Under Review").length, icon: Clock, color: "text-warning", bg: "bg-warning/10" },
          { label: "Resolved", count: disputes.filter(d => d.status === "Resolved").length, icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
          { label: "Closed", count: disputes.filter(d => d.status === "Closed").length, icon: XCircle, color: "text-muted-foreground", bg: "bg-muted" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="glass-card rounded-2xl p-4 space-y-2"
          >
            <div className={`h-8 w-8 rounded-lg ${s.bg} flex items-center justify-center`}>
              <s.icon className={`h-4 w-4 ${s.color}`} />
            </div>
            <p className="text-xl font-bold">{s.count}</p>
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search disputes..." className="pl-10 rounded-xl" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px] rounded-xl"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="under">Under Review</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {filtered.map((d, i) => (
          <motion.div key={d.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="glass-card rounded-xl p-4 space-y-3 cursor-pointer hover:border-primary/30 transition-colors"
            onClick={() => setSelectedDispute(d)}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground">{d.id}</span>
                  <Badge className={`rounded-lg border-0 text-[10px] ${priorityColors[d.priority]}`}>{d.priority}</Badge>
                </div>
                <p className="text-sm font-semibold mt-1">{d.reason}</p>
              </div>
              <Badge className={`rounded-lg border-0 text-xs shrink-0 ${statusColors[d.status]}`}>{d.status}</Badge>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {d.tenant} vs {d.landlord}</span>
              <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" /> {d.amount}</span>
              <span>{d.date}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedDispute} onOpenChange={() => setSelectedDispute(null)}>
        <DialogContent className="rounded-2xl max-w-lg">
          <DialogHeader><DialogTitle>Dispute Details</DialogTitle></DialogHeader>
          {selectedDispute && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm">{selectedDispute.id}</span>
                <Badge className={`rounded-lg border-0 text-xs ${statusColors[selectedDispute.status]}`}>{selectedDispute.status}</Badge>
              </div>
              <div className="space-y-2 text-sm border-t border-b border-border/50 py-3">
                <div className="flex justify-between"><span className="text-muted-foreground">Tenant</span><span className="font-medium">{selectedDispute.tenant}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Landlord</span><span className="font-medium">{selectedDispute.landlord}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Property</span><span>{selectedDispute.property}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Amount</span><span className="font-bold text-primary">{selectedDispute.amount}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Filed</span><span>{selectedDispute.date}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Priority</span><Badge className={`rounded-lg border-0 text-[10px] ${priorityColors[selectedDispute.priority]}`}>{selectedDispute.priority}</Badge></div>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Reason</p>
                <p className="text-sm text-muted-foreground">{selectedDispute.reason}</p>
              </div>
              {selectedDispute.status !== "Resolved" && selectedDispute.status !== "Closed" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Resolution Notes</label>
                  <Textarea value={resolution} onChange={(e) => setResolution(e.target.value)} placeholder="Enter resolution details..." className="rounded-xl" />
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 rounded-xl text-sm" onClick={() => {
                      setDisputes(prev => prev.map(d => d.id === selectedDispute.id ? { ...d, status: "Under Review" } : d));
                      setSelectedDispute(null);
                    }}>Mark Under Review</Button>
                    <Button className="flex-1 rounded-xl gradient-primary text-primary-foreground border-0 text-sm" onClick={() => handleResolve(selectedDispute.id)}>
                      Resolve Dispute
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
