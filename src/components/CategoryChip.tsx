import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface CategoryChipProps {
  icon: LucideIcon;
  label: string;
  count: string;
  index?: number;
}

export function CategoryChip({ icon: Icon, label, count, index = 0 }: CategoryChipProps) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className="glass-card rounded-2xl p-4 flex flex-col items-center gap-2 hover:shadow-lg hover:border-primary/30 transition-all duration-200 min-w-[100px]"
    >
      <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <span className="text-xs font-semibold">{label}</span>
      <span className="text-[10px] text-muted-foreground">{count}</span>
    </motion.button>
  );
}
