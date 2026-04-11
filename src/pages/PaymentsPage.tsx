import { motion } from "framer-motion";
import { Smartphone, CheckCircle2, ArrowRight, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";

const providers = [
  { name: "M-Pesa", color: "bg-success/15 text-success", code: "Vodacom" },
  { name: "Tigo Pesa", color: "bg-primary/15 text-primary", code: "Tigo" },
  { name: "Airtel Money", color: "bg-destructive/15 text-destructive", code: "Airtel" },
];

export default function PaymentsPage() {
  return (
    <div className="container py-6 pb-24 md:pb-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Payments</h1>
        <p className="text-sm text-muted-foreground">Pay rent securely via mobile money</p>
      </div>

      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="gradient-primary rounded-2xl p-6 text-primary-foreground space-y-3"
      >
        <p className="text-xs opacity-80">Amount Due</p>
        <p className="text-3xl font-bold">TZS 450,000</p>
        <div className="flex items-center gap-2 text-xs opacity-80">
          <span>Due: April 30, 2026</span>
          <span className="h-1 w-1 rounded-full bg-primary-foreground/50" />
          <span>Studio - Mikocheni</span>
        </div>
      </motion.div>

      {/* Payment Methods */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Select Payment Method</h3>
        {providers.map((p, i) => (
          <motion.button
            key={p.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="w-full glass-card rounded-2xl p-4 flex items-center gap-4 hover:border-primary/40 transition-colors text-left"
          >
            <div className={`h-11 w-11 rounded-xl ${p.color} flex items-center justify-center`}>
              <Smartphone className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{p.name}</p>
              <p className="text-xs text-muted-foreground">{p.code}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </motion.button>
        ))}
      </div>

      {/* Recent */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Transaction History</h3>
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="glass-card rounded-xl p-3 flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-success/15 flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4 text-success" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium">Rent Payment</p>
              <p className="text-[10px] text-muted-foreground">M-Pesa • {`${3 - i} Apr 2026`}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold">TZS 450K</p>
              <Button variant="ghost" size="sm" className="h-5 px-1 text-[10px] text-primary">
                <Receipt className="h-3 w-3 mr-0.5" /> Receipt
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
