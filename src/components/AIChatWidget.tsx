import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function AIChatWidget() {
  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
      className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 h-12 w-12 rounded-full gradient-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
      aria-label="AI Assistant"
    >
      <MessageCircle className="h-5 w-5" />
    </motion.button>
  );
}
