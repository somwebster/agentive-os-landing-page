"use client";

import { motion } from "framer-motion";
import { 
  MessagesSquare, 
  Cpu, 
  Mail, 
  Database,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const workflow = [
  { icon: MessagesSquare, label: "Slack", color: "#4A154B" },
  { icon: Cpu, label: "Agent", color: "var(--purple)" },
  { icon: Database, label: "CRM", color: "var(--orange)" },
  { icon: Mail, label: "Email", color: "#D44638" },
];

export default function CardAnimation03({ className }: { className?: string }) {
  return (
    <div className={cn("w-full h-full flex items-center justify-center p-4", className)}>
      <div className="flex items-center gap-2">
        {workflow.map((step, i) => (
          <div key={i} className="flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              className="relative group"
            >
              <div 
                className="absolute inset-0 blur-xl opacity-20 transition-opacity group-hover:opacity-40" 
                style={{ backgroundColor: step.color }} 
              />
              <div className="relative size-12 rounded-xl bg-[#16161b] border border-white/10 flex flex-col items-center justify-center gap-1 shadow-2xl">
                <step.icon className="size-5 text-white/70" />
                <span className="text-[7px] font-mono text-white/30 uppercase tracking-tighter">{step.label}</span>
              </div>
              
              {/* Active Pulse */}
              <motion.div
                className="absolute -top-1 -right-1 size-3 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              >
                <div className="size-1 rounded-full bg-green-500" />
              </motion.div>
            </motion.div>

            {i < workflow.length - 1 && (
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{ 
                    x: [0, 10, 0],
                    opacity: [0.2, 0.8, 0.2]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                >
                  <ArrowRight className="size-4 text-white/20" />
                </motion.div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
