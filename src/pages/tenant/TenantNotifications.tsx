import { motion } from "framer-motion";
import { Bell, CheckCircle2, AlertCircle, Clock, CreditCard, FileText, MessageCircle, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const notifications = [
  { id: 1, icon: AlertCircle, title: "Rent Due Soon", desc: "Your rent of TZS 450,000 is due in 5 days", time: "2h ago", type: "warning", read: false },
  { id: 2, icon: CreditCard, title: "Payment Confirmed", desc: "March rent payment was successful via M-Pesa", time: "1d ago", type: "success", read: false },
  { id: 3, icon: MessageCircle, title: "New Message", desc: "John Mwangi sent you a message about maintenance", time: "1d ago", type: "info", read: false },
  { id: 4, icon: FileText, title: "Lease Renewal", desc: "Your lease renewal document is ready for review", time: "3d ago", type: "info", read: true },
  { id: 5, icon: CheckCircle2, title: "Escrow Update", desc: "Your deposit of TZS 900,000 is securely held", time: "5d ago", type: "success", read: true },
  { id: 6, icon: Clock, title: "Maintenance Update", desc: "Plumber visit scheduled for tomorrow 9-11 AM", time: "1w ago", type: "info", read: true },
];

const typeColors: Record<string, string> = {
  warning: "bg-warning/15 text-warning",
  success: "bg-success/15 text-success",
  info: "bg-primary/15 text-primary",
  error: "bg-destructive/15 text-destructive",
};

export default function TenantNotifications() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-sm text-muted-foreground">Stay updated on your rentals</p>
        </div>
        <Button variant="ghost" size="sm" className="text-primary text-xs gap-1">
          <Check className="h-3.5 w-3.5" /> Mark all read
        </Button>
      </div>

      <div className="space-y-2">
        {notifications.map((n, i) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className={`glass-card rounded-xl p-4 flex items-start gap-3 transition-colors ${!n.read ? "border-primary/20 bg-primary/5" : ""}`}
          >
            <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${typeColors[n.type]}`}>
              <n.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">{n.title}</p>
                {!n.read && <span className="h-2 w-2 rounded-full bg-primary shrink-0" />}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg shrink-0 text-muted-foreground hover:text-destructive">
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
