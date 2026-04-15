import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Paperclip, Mic, Phone, MoreVertical, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const conversations = [
  { id: 1, name: "John Mwangi", lastMsg: "Sure, I'll fix the plumbing tomorrow", time: "2h ago", unread: 2, avatar: "JM" },
  { id: 2, name: "Grace Kamau", lastMsg: "Your lease renewal is ready", time: "1d ago", unread: 0, avatar: "GK" },
  { id: 3, name: "RentLink Support", lastMsg: "How can we help?", time: "3d ago", unread: 0, avatar: "RL" },
];

const messages = [
  { id: 1, sender: "them", text: "Hi Amina, regarding your maintenance request...", time: "10:30 AM" },
  { id: 2, sender: "me", text: "Yes, the kitchen sink is still leaking", time: "10:32 AM" },
  { id: 3, sender: "them", text: "I understand. I'll send a plumber tomorrow morning between 9-11 AM", time: "10:35 AM" },
  { id: 4, sender: "me", text: "That works, thank you!", time: "10:36 AM" },
  { id: 5, sender: "them", text: "Sure, I'll fix the plumbing tomorrow", time: "10:38 AM" },
];

export default function TenantMessages() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [msg, setMsg] = useState("");

  if (selectedChat !== null) {
    const convo = conversations.find(c => c.id === selectedChat);
    return (
      <div className="flex flex-col h-[calc(100vh-8rem)] max-w-3xl">
        {/* Chat Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-border/50">
          <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => setSelectedChat(null)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Avatar className="h-9 w-9">
            <AvatarFallback className="gradient-primary text-primary-foreground text-xs">{convo?.avatar}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-semibold">{convo?.name}</p>
            <p className="text-[10px] text-success">Online</p>
          </div>
          <Button variant="ghost" size="icon" className="rounded-xl"><Phone className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="rounded-xl"><MoreVertical className="h-4 w-4" /></Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                m.sender === "me"
                  ? "gradient-primary text-primary-foreground rounded-br-md"
                  : "glass-card rounded-bl-md"
              }`}>
                <p className="text-sm">{m.text}</p>
                <p className={`text-[10px] mt-1 ${m.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{m.time}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 pt-3 border-t border-border/50">
          <Button variant="ghost" size="icon" className="rounded-xl shrink-0"><Paperclip className="h-4 w-4" /></Button>
          <Input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Type a message..."
            className="rounded-xl"
          />
          <Button variant="ghost" size="icon" className="rounded-xl shrink-0"><Mic className="h-4 w-4" /></Button>
          <Button size="icon" className="rounded-xl gradient-primary text-primary-foreground border-0 shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-sm text-muted-foreground">Chat with landlords and support</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search conversations..." className="pl-10 rounded-xl" />
      </div>

      <div className="space-y-2">
        {conversations.map((c, i) => (
          <motion.button
            key={c.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSelectedChat(c.id)}
            className="w-full glass-card rounded-xl p-3 flex items-center gap-3 hover:bg-muted/30 transition-colors text-left"
          >
            <Avatar className="h-11 w-11">
              <AvatarFallback className="gradient-primary text-primary-foreground text-xs">{c.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{c.name}</p>
                <span className="text-[10px] text-muted-foreground">{c.time}</span>
              </div>
              <p className="text-xs text-muted-foreground truncate">{c.lastMsg}</p>
            </div>
            {c.unread > 0 && (
              <span className="h-5 w-5 rounded-full gradient-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                {c.unread}
              </span>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
