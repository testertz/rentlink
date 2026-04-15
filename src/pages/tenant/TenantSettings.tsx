import { motion } from "framer-motion";
import { User, Lock, Bell, Globe, Palette, LogOut, ChevronRight, Shield, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeLangToggle } from "@/components/ThemeLangToggle";

const settingSections = [
  {
    title: "Account",
    items: [
      { icon: User, label: "Edit Profile", desc: "Update your personal information" },
      { icon: Lock, label: "Change Password", desc: "Update your security credentials" },
      { icon: Smartphone, label: "Two-Factor Auth", desc: "Add extra security to your account" },
      { icon: Shield, label: "KYC Verification", desc: "Complete identity verification" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: Bell, label: "Notifications", desc: "Manage push and email notifications" },
      { icon: Globe, label: "Language", desc: "English / Swahili" },
      { icon: Palette, label: "Appearance", desc: "Light / Dark mode" },
    ],
  },
];

export default function TenantSettings() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account preferences</p>
      </div>

      {/* Profile Card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-5 flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarFallback className="gradient-primary text-primary-foreground text-lg font-bold">AM</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold">Amina Mwalimu</h3>
          <p className="text-sm text-muted-foreground">amina@rentlink.co.tz</p>
          <p className="text-xs text-muted-foreground">+255 712 345 678</p>
        </div>
        <Button variant="outline" size="sm" className="rounded-xl text-xs">Edit</Button>
      </motion.div>

      {settingSections.map((section, si) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: si * 0.1 }}
          className="space-y-2"
        >
          <h3 className="text-sm font-semibold text-muted-foreground px-1">{section.title}</h3>
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
        </motion.div>
      ))}

      <Button variant="outline" className="w-full rounded-xl text-destructive hover:text-destructive gap-2">
        <LogOut className="h-4 w-4" /> Sign Out
      </Button>
    </div>
  );
}
