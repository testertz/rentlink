import { motion } from "framer-motion";
import { Settings, Globe, Shield, CreditCard, Bell, Database, ChevronRight, ToggleLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const sections = [
  {
    title: "Platform",
    items: [
      { icon: Globe, label: "General Settings", desc: "App name, URL, contact info" },
      { icon: CreditCard, label: "Payment Configuration", desc: "Mobile money providers, fees, limits" },
      { icon: Shield, label: "Security", desc: "Login policies, 2FA, session management" },
      { icon: Bell, label: "Notifications", desc: "Email templates, push notification settings" },
      { icon: Database, label: "Data & Backups", desc: "Database management and exports" },
    ],
  },
  {
    title: "Features",
    toggles: [
      { label: "Escrow System", desc: "Enable deposit protection for tenants", enabled: true },
      { label: "AI Chatbot", desc: "Smart assistant for property recommendations", enabled: true },
      { label: "KYC Verification", desc: "Require identity verification", enabled: true },
      { label: "Maintenance Mode", desc: "Temporarily disable the platform", enabled: false },
    ],
  },
];

export default function AdminSettings() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">Platform Settings</h1>
        <p className="text-sm text-muted-foreground">Configure RentLink platform</p>
      </div>

      {sections.map((section, si) => (
        <motion.div key={section.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: si * 0.1 }} className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground px-1">{section.title}</h3>
          
          {section.items && (
            <div className="glass-card rounded-2xl overflow-hidden divide-y divide-border/50">
              {section.items.map((item) => (
                <button key={item.label} className="w-full flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors text-left">
                  <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                </button>
              ))}
            </div>
          )}

          {section.toggles && (
            <div className="glass-card rounded-2xl overflow-hidden divide-y divide-border/50">
              {section.toggles.map((toggle) => (
                <div key={toggle.label} className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-sm font-medium">{toggle.label}</p>
                    <p className="text-xs text-muted-foreground">{toggle.desc}</p>
                  </div>
                  <Switch defaultChecked={toggle.enabled} />
                </div>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
