import { Search, Mic, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SearchBar() {
  return (
    <div className="glass-card-strong rounded-2xl p-1.5 flex items-center gap-2">
      <div className="flex-1 flex items-center gap-2 pl-3">
        <Search className="h-4 w-4 text-muted-foreground shrink-0" />
        <input
          type="text"
          placeholder="Search Dar es Salaam, Arusha..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
      <Button variant="ghost" size="icon" className="rounded-xl h-9 w-9 shrink-0">
        <Mic className="h-4 w-4" />
      </Button>
      <Button size="icon" className="rounded-xl h-9 w-9 gradient-primary text-primary-foreground border-0 shrink-0">
        <SlidersHorizontal className="h-4 w-4" />
      </Button>
    </div>
  );
}
