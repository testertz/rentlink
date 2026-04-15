import { ReactNode, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, CreditCard, Shield, Bell, FileText, Settings, Users,
  Building2, BarChart3, AlertTriangle, ChevronLeft, ChevronRight,
  Menu, X, LogOut, Wallet, MessageCircle, Scale
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Role = "tenant" | "landlord" | "admin";

interface NavItem {
  icon: React.ElementType;
  label: string;
  to: string;
}

const tenantNav: NavItem[] = [
  { icon: Home, label: "Dashboard", to: "/tenant" },
  { icon: Building2, label: "My Rentals", to: "/tenant/rentals" },
  { icon: Wallet, label: "Payments", to: "/tenant/payments" },
  { icon: Shield, label: "Escrow", to: "/tenant/escrow" },
  { icon: MessageCircle, label: "Messages", to: "/tenant/messages" },
  { icon: Bell, label: "Notifications", to: "/tenant/notifications" },
  { icon: Settings, label: "Settings", to: "/tenant/settings" },
];

const landlordNav: NavItem[] = [
  { icon: Home, label: "Dashboard", to: "/landlord" },
  { icon: Building2, label: "Properties", to: "/landlord/properties" },
  { icon: Users, label: "Tenants", to: "/landlord/tenants" },
  { icon: BarChart3, label: "Earnings", to: "/landlord/earnings" },
  { icon: Wallet, label: "Payments", to: "/landlord/payments" },
  { icon: Shield, label: "Escrow", to: "/landlord/escrow" },
  { icon: MessageCircle, label: "Messages", to: "/landlord/messages" },
  { icon: Settings, label: "Settings", to: "/landlord/settings" },
];

const adminNav: NavItem[] = [
  { icon: Home, label: "Dashboard", to: "/admin" },
  { icon: Users, label: "Users", to: "/admin/users" },
  { icon: Building2, label: "Listings", to: "/admin/listings" },
  { icon: CreditCard, label: "Payments", to: "/admin/payments" },
  { icon: Scale, label: "Disputes", to: "/admin/disputes" },
  { icon: Shield, label: "Escrow", to: "/admin/escrow" },
  { icon: AlertTriangle, label: "Reports", to: "/admin/reports" },
  { icon: Settings, label: "Settings", to: "/admin/settings" },
];

const navMap: Record<Role, NavItem[]> = { tenant: tenantNav, landlord: landlordNav, admin: adminNav };
const roleLabels: Record<Role, string> = { tenant: "Tenant", landlord: "Landlord", admin: "Admin" };
const roleColors: Record<Role, string> = {
  tenant: "bg-primary/15 text-primary",
  landlord: "bg-accent/15 text-accent",
  admin: "bg-destructive/15 text-destructive",
};

export function DashboardLayout({ role, children }: { role: Role; children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const items = navMap[role];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-5 border-b border-border/50">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl gradient-primary flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-primary-foreground">R</span>
          </div>
          {!collapsed && (
            <span className="font-bold text-lg tracking-tight">
              Rent<span className="gradient-text">Link</span>
            </span>
          )}
        </Link>
      </div>

      {/* Role Badge */}
      <div className="px-4 py-3">
        {!collapsed ? (
          <div className={`rounded-xl px-3 py-2 text-xs font-semibold ${roleColors[role]}`}>
            {roleLabels[role]} Panel
          </div>
        ) : (
          <div className={`h-8 w-8 rounded-lg mx-auto flex items-center justify-center text-[10px] font-bold ${roleColors[role]}`}>
            {role.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {items.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "gradient-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <item.icon className="h-4.5 w-4.5 shrink-0" style={{ width: 18, height: 18 }} />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t border-border/50 p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 shrink-0">
            <AvatarFallback className="gradient-primary text-primary-foreground text-xs font-semibold">AM</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Amina M.</p>
              <p className="text-[10px] text-muted-foreground truncate">amina@rentlink.co.tz</p>
            </div>
          )}
          {!collapsed && (
            <Link to="/login">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg shrink-0">
                <LogOut className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r border-border/50 bg-card/50 backdrop-blur-xl transition-all duration-300 shrink-0",
          collapsed ? "w-[68px]" : "w-[240px]"
        )}
      >
        <SidebarContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-20 -right-3 h-6 w-6 rounded-full border border-border bg-card flex items-center justify-center hover:bg-muted transition-colors z-10 hidden md:flex"
          style={{ left: collapsed ? 55 : 227 }}
        >
          {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </button>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-[260px] z-50 bg-card border-r border-border/50 md:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Mobile Header */}
        <div className="flex items-center gap-3 p-4 border-b border-border/50 md:hidden">
          <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => setMobileOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <h2 className="font-semibold text-sm">{roleLabels[role]} Dashboard</h2>
        </div>

        <main className="flex-1 p-4 md:p-6 pb-24 md:pb-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
