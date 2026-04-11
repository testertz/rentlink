import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function TopNav() {
  return (
    <header className="sticky top-0 z-40 glass-card-strong border-b border-border/50">
      <div className="container flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl gradient-primary flex items-center justify-center">
            <span className="text-sm font-bold text-primary-foreground">R</span>
          </div>
          <span className="font-bold text-lg tracking-tight">
            Rent<span className="gradient-text">Link</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link to="/listings" className="hover:text-foreground transition-colors">Explore</Link>
          <Link to="/payments" className="hover:text-foreground transition-colors">Payments</Link>
          <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-xl relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-xl md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <Button size="sm" className="hidden md:flex rounded-xl gradient-primary text-primary-foreground border-0">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
}
