import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone, ArrowRight, Receipt, CheckCircle2, Clock,
  AlertCircle, Download, Share2, ArrowLeft, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const providers = [
  { name: "M-Pesa", color: "bg-success/15 text-success", code: "Vodacom", prefix: "+255 7" },
  { name: "Tigo Pesa", color: "bg-primary/15 text-primary", code: "Tigo", prefix: "+255 6" },
  { name: "Airtel Money", color: "bg-destructive/15 text-destructive", code: "Airtel", prefix: "+255 7" },
];

const history = [
  { title: "Rent Payment", method: "M-Pesa", date: "Apr 1, 2026", amount: "TZS 450,000", status: "Completed" },
  { title: "Rent Payment", method: "M-Pesa", date: "Mar 1, 2026", amount: "TZS 450,000", status: "Completed" },
  { title: "Rent Payment", method: "Tigo Pesa", date: "Feb 1, 2026", amount: "TZS 450,000", status: "Completed" },
  { title: "Utility Payment", method: "M-Pesa", date: "Jan 28, 2026", amount: "TZS 85,000", status: "Completed" },
  { title: "Rent Payment", method: "M-Pesa", date: "Jan 1, 2026", amount: "TZS 450,000", status: "Completed" },
];

type Step = "select" | "confirm" | "processing" | "success";

export default function TenantPayments() {
  const [step, setStep] = useState<Step>("select");
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [receiptOpen, setReceiptOpen] = useState(false);

  const handleSelectProvider = (name: string) => {
    setSelectedProvider(name);
    setStep("confirm");
  };

  const handlePay = () => {
    setStep("processing");
    setTimeout(() => setStep("success"), 2500);
  };

  const handleReset = () => {
    setStep("select");
    setSelectedProvider(null);
    setPhone("");
  };

  return (
    <div className="space-y-6 max-w-2xl">
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
        <div className="flex items-center gap-2 text-xs">
          <Badge className="bg-primary-foreground/20 text-primary-foreground border-0 rounded-lg text-[10px]">
            <Clock className="h-3 w-3 mr-1" /> 25 days remaining
          </Badge>
        </div>
      </motion.div>

      {/* Payment Flow */}
      <AnimatePresence mode="wait">
        {step === "select" && (
          <motion.div key="select" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-3">
            <h3 className="font-semibold text-sm">Select Payment Method</h3>
            {providers.map((p, i) => (
              <motion.button
                key={p.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => handleSelectProvider(p.name)}
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
          </motion.div>
        )}

        {step === "confirm" && (
          <motion.div key="confirm" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <button onClick={handleReset} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <div className="glass-card rounded-2xl p-5 space-y-4">
              <h3 className="font-semibold">Confirm Payment</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Provider</span>
                  <span className="font-medium">{selectedProvider}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-bold text-primary">TZS 450,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Property</span>
                  <span className="font-medium">Studio - Mikocheni</span>
                </div>
                <div className="border-t border-border/50 pt-3">
                  <label className="text-sm font-medium mb-2 block">Phone Number</label>
                  <Input
                    placeholder="+255 7XX XXX XXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="rounded-xl"
                  />
                  <p className="text-[10px] text-muted-foreground mt-1">
                    You'll receive a USSD prompt on this number to confirm payment
                  </p>
                </div>
              </div>
              <Button
                onClick={handlePay}
                disabled={phone.length < 6}
                className="w-full h-12 rounded-xl gradient-primary text-primary-foreground border-0 font-semibold"
              >
                Pay TZS 450,000
              </Button>
            </div>
          </motion.div>
        )}

        {step === "processing" && (
          <motion.div key="processing" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="glass-card rounded-2xl p-8 text-center space-y-4">
            <Loader2 className="h-12 w-12 text-primary mx-auto animate-spin" />
            <div>
              <h3 className="font-semibold text-lg">Processing Payment</h3>
              <p className="text-sm text-muted-foreground mt-1">Check your phone for the {selectedProvider} prompt</p>
            </div>
            <div className="text-xs text-muted-foreground">
              <AlertCircle className="h-3.5 w-3.5 inline mr-1" />
              Do not close this page
            </div>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="glass-card rounded-2xl p-8 text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-success/15 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Payment Successful!</h3>
              <p className="text-sm text-muted-foreground mt-1">TZS 450,000 paid via {selectedProvider}</p>
            </div>
            <p className="text-xs text-muted-foreground">
              Ref: TXN-2026-{Math.random().toString(36).substring(2, 8).toUpperCase()}
            </p>
            <div className="flex gap-3 justify-center pt-2">
              <Button variant="outline" size="sm" className="rounded-xl text-xs gap-1" onClick={() => setReceiptOpen(true)}>
                <Receipt className="h-3.5 w-3.5" /> View Receipt
              </Button>
              <Button size="sm" className="rounded-xl gradient-primary text-primary-foreground border-0 text-xs" onClick={handleReset}>
                Done
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transaction History */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Transaction History</h3>
        {history.map((tx, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-xl p-3 flex items-center gap-3"
          >
            <div className="h-9 w-9 rounded-lg bg-success/15 flex items-center justify-center shrink-0">
              <CheckCircle2 className="h-4 w-4 text-success" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium">{tx.title}</p>
              <p className="text-[10px] text-muted-foreground">{tx.method} • {tx.date}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs font-semibold">{tx.amount}</p>
              <Button variant="ghost" size="sm" className="h-5 px-1 text-[10px] text-primary" onClick={() => setReceiptOpen(true)}>
                <Receipt className="h-3 w-3 mr-0.5" /> Receipt
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Receipt Dialog */}
      <Dialog open={receiptOpen} onOpenChange={setReceiptOpen}>
        <DialogContent className="rounded-2xl max-w-sm">
          <DialogHeader>
            <DialogTitle>Payment Receipt</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
              <p className="text-2xl font-bold">TZS 450,000</p>
              <p className="text-sm text-muted-foreground">Rent Payment</p>
            </div>
            <div className="border-t border-b border-border/50 py-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span>Apr 1, 2026</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Method</span><span>M-Pesa</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Reference</span><span>TXN-2026-AB3X9K</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Property</span><span>Studio - Mikocheni</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Status</span><Badge className="bg-success/15 text-success border-0 text-[10px]">Completed</Badge></div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 rounded-xl text-xs gap-1">
                <Download className="h-3.5 w-3.5" /> Download PDF
              </Button>
              <Button variant="outline" className="flex-1 rounded-xl text-xs gap-1">
                <Share2 className="h-3.5 w-3.5" /> Share
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
