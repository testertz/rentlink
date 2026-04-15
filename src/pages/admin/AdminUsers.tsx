import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, Search, Edit, Trash2, Eye, Ban, CheckCircle2, Shield,
  Plus, MoreHorizontal, Mail, Phone, Calendar, Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const initialUsers = [
  { id: 1, name: "Amina Mwalimu", email: "amina@email.com", phone: "+255 712 345 678", role: "Tenant", status: "Active", kyc: "Verified", joined: "Jan 2026", avatar: "AM" },
  { id: 2, name: "John Mwangi", email: "john@email.com", phone: "+255 678 901 234", role: "Landlord", status: "Active", kyc: "Verified", joined: "Nov 2025", avatar: "JM" },
  { id: 3, name: "Fatma Hassan", email: "fatma@email.com", phone: "+255 756 789 012", role: "Tenant", status: "Active", kyc: "Pending", joined: "Mar 2026", avatar: "FH" },
  { id: 4, name: "Peter Kamau", email: "peter@email.com", phone: "+255 689 012 345", role: "Tenant", status: "Suspended", kyc: "Verified", joined: "Dec 2025", avatar: "PK" },
  { id: 5, name: "Grace Kamau", email: "grace@email.com", phone: "+255 745 678 901", role: "Landlord", status: "Active", kyc: "Verified", joined: "Feb 2026", avatar: "GK" },
  { id: 6, name: "David Mwenda", email: "david@email.com", phone: "+255 723 456 789", role: "Landlord", status: "Active", kyc: "Rejected", joined: "Apr 2026", avatar: "DM" },
];

export default function AdminUsers() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [addOpen, setAddOpen] = useState(false);
  const [viewUser, setViewUser] = useState<(typeof initialUsers)[0] | null>(null);

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role.toLowerCase() === roleFilter;
    return matchSearch && matchRole;
  });

  const handleDelete = (id: number) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const handleToggleStatus = (id: number) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" } : u));
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-sm text-muted-foreground">{users.length} total users</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl text-sm gap-1"><Download className="h-4 w-4" /> Export</Button>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl gradient-primary text-primary-foreground border-0 gap-1 text-sm">
                <Plus className="h-4 w-4" /> Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl max-w-lg">
              <DialogHeader><DialogTitle>Add New User</DialogTitle></DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-2"><label className="text-sm font-medium">Full Name</label><Input className="rounded-xl" /></div>
                <div className="space-y-2"><label className="text-sm font-medium">Email</label><Input type="email" className="rounded-xl" /></div>
                <div className="space-y-2"><label className="text-sm font-medium">Phone</label><Input className="rounded-xl" /></div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Role</label>
                  <Select>
                    <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select role" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tenant">Tenant</SelectItem>
                      <SelectItem value="landlord">Landlord</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setAddOpen(false)}>Cancel</Button>
                  <Button className="flex-1 rounded-xl gradient-primary text-primary-foreground border-0" onClick={() => setAddOpen(false)}>Create User</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..." className="pl-10 rounded-xl" />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[140px] rounded-xl"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="tenant">Tenants</SelectItem>
            <SelectItem value="landlord">Landlords</SelectItem>
            <SelectItem value="admin">Admins</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* User Table/Cards */}
      <div className="hidden md:block glass-card rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-muted-foreground border-b border-border/50 bg-muted/30">
              <th className="text-left py-3 px-4 font-medium">User</th>
              <th className="text-left py-3 px-4 font-medium">Contact</th>
              <th className="text-center py-3 px-4 font-medium">Role</th>
              <th className="text-center py-3 px-4 font-medium">KYC</th>
              <th className="text-center py-3 px-4 font-medium">Status</th>
              <th className="text-right py-3 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9"><AvatarFallback className="gradient-primary text-primary-foreground text-xs">{u.avatar}</AvatarFallback></Avatar>
                    <div>
                      <p className="font-medium">{u.name}</p>
                      <p className="text-[10px] text-muted-foreground">Joined {u.joined}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-xs text-muted-foreground">
                  <p>{u.email}</p>
                  <p>{u.phone}</p>
                </td>
                <td className="py-3 px-4 text-center">
                  <Badge className={`rounded-lg border-0 text-[10px] ${u.role === "Landlord" ? "bg-accent/15 text-accent" : u.role === "Admin" ? "bg-destructive/15 text-destructive" : "bg-primary/15 text-primary"}`}>
                    {u.role}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-center">
                  <Badge className={`rounded-lg border-0 text-[10px] ${
                    u.kyc === "Verified" ? "bg-success/15 text-success" :
                    u.kyc === "Pending" ? "bg-warning/15 text-warning" : "bg-destructive/15 text-destructive"
                  }`}>{u.kyc}</Badge>
                </td>
                <td className="py-3 px-4 text-center">
                  <Badge className={`rounded-lg border-0 text-[10px] ${u.status === "Active" ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>
                    {u.status}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><MoreHorizontal className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl">
                      <DropdownMenuItem onClick={() => setViewUser(u)} className="gap-2"><Eye className="h-3.5 w-3.5" /> View</DropdownMenuItem>
                      <DropdownMenuItem className="gap-2"><Edit className="h-3.5 w-3.5" /> Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleStatus(u.id)} className="gap-2">
                        {u.status === "Active" ? <><Ban className="h-3.5 w-3.5" /> Suspend</> : <><CheckCircle2 className="h-3.5 w-3.5" /> Activate</>}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(u.id)} className="gap-2 text-destructive"><Trash2 className="h-3.5 w-3.5" /> Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((u, i) => (
          <motion.div key={u.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="glass-card rounded-xl p-4 space-y-3"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-11 w-11"><AvatarFallback className="gradient-primary text-primary-foreground text-xs">{u.avatar}</AvatarFallback></Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold">{u.name}</p>
                <p className="text-xs text-muted-foreground">{u.email}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><MoreHorizontal className="h-4 w-4" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-xl">
                  <DropdownMenuItem onClick={() => setViewUser(u)} className="gap-2"><Eye className="h-3.5 w-3.5" /> View</DropdownMenuItem>
                  <DropdownMenuItem className="gap-2"><Edit className="h-3.5 w-3.5" /> Edit</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleToggleStatus(u.id)} className="gap-2">
                    {u.status === "Active" ? <><Ban className="h-3.5 w-3.5" /> Suspend</> : <><CheckCircle2 className="h-3.5 w-3.5" /> Activate</>}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(u.id)} className="gap-2 text-destructive"><Trash2 className="h-3.5 w-3.5" /> Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Badge className={`rounded-lg border-0 text-[10px] ${u.role === "Landlord" ? "bg-accent/15 text-accent" : "bg-primary/15 text-primary"}`}>{u.role}</Badge>
              <Badge className={`rounded-lg border-0 text-[10px] ${u.status === "Active" ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>{u.status}</Badge>
              <Badge className={`rounded-lg border-0 text-[10px] ${u.kyc === "Verified" ? "bg-success/15 text-success" : u.kyc === "Pending" ? "bg-warning/15 text-warning" : "bg-destructive/15 text-destructive"}`}>KYC: {u.kyc}</Badge>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View User Dialog */}
      <Dialog open={!!viewUser} onOpenChange={() => setViewUser(null)}>
        <DialogContent className="rounded-2xl max-w-md">
          <DialogHeader><DialogTitle>User Details</DialogTitle></DialogHeader>
          {viewUser && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16"><AvatarFallback className="gradient-primary text-primary-foreground text-lg font-bold">{viewUser.avatar}</AvatarFallback></Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{viewUser.name}</h3>
                  <Badge className={`rounded-lg border-0 text-xs ${viewUser.role === "Landlord" ? "bg-accent/15 text-accent" : "bg-primary/15 text-primary"}`}>{viewUser.role}</Badge>
                </div>
              </div>
              <div className="space-y-2 text-sm border-t border-border/50 pt-3">
                <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span>{viewUser.email}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Phone</span><span>{viewUser.phone}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">KYC Status</span><span>{viewUser.kyc}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Account Status</span><span>{viewUser.status}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Joined</span><span>{viewUser.joined}</span></div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1 rounded-xl text-xs gap-1"><Edit className="h-3.5 w-3.5" /> Edit</Button>
                <Button variant="outline" className="flex-1 rounded-xl text-xs gap-1 text-destructive hover:text-destructive" onClick={() => { handleToggleStatus(viewUser.id); setViewUser(null); }}>
                  {viewUser.status === "Active" ? <><Ban className="h-3.5 w-3.5" /> Suspend</> : <><CheckCircle2 className="h-3.5 w-3.5" /> Activate</>}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
