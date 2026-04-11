import { Home, Search, MessageCircle, User, Wallet } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useI18n } from "@/lib/i18n";

export function BottomNav() {
  const { t } = useI18n();

  const navItems = [
    { icon: Home, label: t("nav.home"), to: "/" },
    { icon: Search, label: t("nav.explore"), to: "/listings" },
    { icon: Wallet, label: t("nav.payments"), to: "/payments" },
    { icon: MessageCircle, label: t("nav.chat"), to: "/chat" },
    { icon: User, label: t("nav.profile"), to: "/dashboard" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card-strong border-t border-border/50 safe-bottom md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 ${
                isActive ? "text-primary scale-105" : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            <item.icon className="h-5 w-5" strokeWidth={1.8} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
