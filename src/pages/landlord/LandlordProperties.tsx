import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2, Plus, MapPin, Edit, Trash2, Eye, MoreHorizontal,
  Bed, Bath, Users, CheckCircle2, XCircle, Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const initialProperties = [
  { id: 1, name: "Masaki Heights", location: "Masaki, Dar es Salaam", units: 4, occupied: 4, price: "TZS 1.2M/mo", type: "Apartment", status: "Active" },
  { id: 2, name: "Mikocheni Apartments", location: "Mikocheni, Dar es Salaam", units: 3, occupied: 3, price: "TZS 450K/mo", type: "Studio", status: "Active" },
  { id: 3, name: "Oyster Bay Villa", location: "Oyster Bay", units: 2, occupied: 1, price: "TZS 3.8M/mo", type: "Villa", status: "Active" },
  { id: 4, name: "Mbezi Beach House", location: "Mbezi Beach", units: 3, occupied: 3, price: "TZS 2.5M/mo", type: "House", status: "Active" },
];

export default function LandlordProperties() {
  const [properties, setProperties] = useState(initialProperties);
  const [addOpen, setAddOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = properties.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Properties</h1>
          <p className="text-sm text-muted-foreground">{properties.length} properties managed</p>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-xl gradient-primary text-primary-foreground border-0 gap-1 text-sm">
              <Plus className="h-4 w-4" /> Add Property
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-2xl max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Property</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Property Name</label>
                <Input placeholder="e.g. Masaki Heights" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input placeholder="e.g. Masaki, Dar es Salaam" className="rounded-xl" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Type</label>
                  <Select>
                    <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="room">Room</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Units</label>
                  <Input type="number" placeholder="1" className="rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Price per Month (TZS)</label>
                <Input type="number" placeholder="450000" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea placeholder="Describe the property..." className="rounded-xl min-h-[80px]" />
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setAddOpen(false)}>Cancel</Button>
                <Button className="flex-1 rounded-xl gradient-primary text-primary-foreground border-0" onClick={() => setAddOpen(false)}>
                  Add Property
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          placeholder="Search properties..." 
          className="pl-10 rounded-xl" 
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card rounded-2xl p-5 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> {p.location}
                </p>
              </div>
              <Badge className="rounded-lg bg-success/15 text-success border-0 text-xs">{p.status}</Badge>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Building2 className="h-3.5 w-3.5" /> {p.type}</span>
              <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {p.occupied}/{p.units} occupied</span>
            </div>

            <p className="text-lg font-bold text-primary">{p.price}</p>

            <div className="flex gap-2 pt-1">
              <Button size="sm" variant="outline" className="rounded-xl text-xs gap-1 flex-1">
                <Eye className="h-3.5 w-3.5" /> View
              </Button>
              <Button size="sm" variant="outline" className="rounded-xl text-xs gap-1 flex-1">
                <Edit className="h-3.5 w-3.5" /> Edit
              </Button>
              <Button size="sm" variant="outline" className="rounded-xl text-xs gap-1 text-destructive hover:text-destructive">
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
