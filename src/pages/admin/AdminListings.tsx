import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2, Search, Eye, Edit, Trash2, CheckCircle2, XCircle, Ban,
  MapPin, MoreHorizontal, Download, Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const initialListings = [
  { id: 1, name: "Luxury 2BR Apartment", location: "Masaki, Dar es Salaam", owner: "John Mwangi", price: "TZS 1.2M/mo", type: "Apartment", status: "Active", reported: false },
  { id: 2, name: "Cozy Studio", location: "Mikocheni", owner: "Grace Kamau", price: "TZS 450K/mo", type: "Studio", status: "Active", reported: false },
  { id: 3, name: "Modern Family House", location: "Mbezi Beach", owner: "David Mwenda", price: "TZS 2.5M/mo", type: "House", status: "Pending Review", reported: true },
  { id: 4, name: "Penthouse Suite", location: "Oyster Bay", owner: "John Mwangi", price: "TZS 3.8M/mo", type: "Apartment", status: "Active", reported: false },
  { id: 5, name: "Budget Room", location: "Sinza", owner: "Linda Macha", price: "TZS 180K/mo", type: "Room", status: "Suspended", reported: true },
  { id: 6, name: "Garden Villa", location: "Kigamboni", owner: "Grace Kamau", price: "TZS 1.8M/mo", type: "Villa", status: "Pending Review", reported: false },
];

export default function AdminListings() {
  const [listings, setListings] = useState(initialListings);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = listings.filter(l => {
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) || l.location.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || l.status.toLowerCase().includes(statusFilter);
    return matchSearch && matchStatus;
  });

  const handleApprove = (id: number) => setListings(prev => prev.map(l => l.id === id ? { ...l, status: "Active" } : l));
  const handleSuspend = (id: number) => setListings(prev => prev.map(l => l.id === id ? { ...l, status: "Suspended" } : l));
  const handleDelete = (id: number) => setListings(prev => prev.filter(l => l.id !== id));

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Listings Management</h1>
          <p className="text-sm text-muted-foreground">{listings.length} total listings</p>
        </div>
        <Button variant="outline" className="rounded-xl text-sm gap-1"><Download className="h-4 w-4" /> Export</Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Active", count: listings.filter(l => l.status === "Active").length, color: "text-success" },
          { label: "Pending", count: listings.filter(l => l.status === "Pending Review").length, color: "text-warning" },
          { label: "Suspended", count: listings.filter(l => l.status === "Suspended").length, color: "text-destructive" },
          { label: "Reported", count: listings.filter(l => l.reported).length, color: "text-destructive" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="glass-card rounded-2xl p-3 text-center space-y-1"
          >
            <p className={`text-xl font-bold ${s.color}`}>{s.count}</p>
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search listings..." className="pl-10 rounded-xl" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px] rounded-xl"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {filtered.map((l, i) => (
          <motion.div key={l.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="glass-card rounded-xl p-4 flex items-center gap-4 flex-wrap"
          >
            <div className="h-14 w-14 rounded-xl bg-muted shrink-0 overflow-hidden">
              <div className="w-full h-full gradient-primary opacity-30" />
            </div>
            <div className="flex-1 min-w-[200px]">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold">{l.name}</p>
                {l.reported && <Badge className="rounded-lg bg-destructive/15 text-destructive border-0 text-[10px]">Reported</Badge>}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> {l.location}</p>
              <p className="text-xs text-muted-foreground">Owner: {l.owner} • {l.type}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-bold text-primary">{l.price}</p>
              <Badge className={`rounded-lg border-0 text-[10px] ${
                l.status === "Active" ? "bg-success/15 text-success" :
                l.status === "Pending Review" ? "bg-warning/15 text-warning" : "bg-destructive/15 text-destructive"
              }`}>{l.status}</Badge>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg shrink-0"><MoreHorizontal className="h-4 w-4" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-xl">
                <DropdownMenuItem className="gap-2"><Eye className="h-3.5 w-3.5" /> View</DropdownMenuItem>
                <DropdownMenuItem className="gap-2"><Edit className="h-3.5 w-3.5" /> Edit</DropdownMenuItem>
                {l.status !== "Active" && <DropdownMenuItem onClick={() => handleApprove(l.id)} className="gap-2"><CheckCircle2 className="h-3.5 w-3.5" /> Approve</DropdownMenuItem>}
                {l.status === "Active" && <DropdownMenuItem onClick={() => handleSuspend(l.id)} className="gap-2"><Ban className="h-3.5 w-3.5" /> Suspend</DropdownMenuItem>}
                <DropdownMenuItem onClick={() => handleDelete(l.id)} className="gap-2 text-destructive"><Trash2 className="h-3.5 w-3.5" /> Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
