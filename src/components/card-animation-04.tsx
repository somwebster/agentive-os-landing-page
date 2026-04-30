"use client";

import { motion } from "framer-motion";
import { User, Bot, Zap, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const agents = [
  { icon: Bot, label: "Content", color: "var(--purple)" },
  { icon: User, label: "Reviewer", color: "var(--orange)" },
  { icon: Zap, label: "Integrator", color: "#F9AB00" },
  { icon: ShieldCheck, label: "Security", color: "#34A853" },
];

export default function CardAnimation04({ className }: { className?: string }) {
  return (
    <div className={cn("w-full h-full flex items-center justify-center p-4", className)}>
      <div className="relative w-full max-w-[280px] h-full flex items-center justify-center">
        {/* Radar Background */}
        <div className="absolute size-48 rounded-full border border-white/5 flex items-center justify-center">
          <div className="size-32 rounded-full border border-white/5 flex items-center justify-center">
            <div className="size-16 rounded-full border border-white/5" />
          </div>
          
          {/* Radar Sweep */}
          <motion.div 
            className="absolute inset-0 rounded-full border-t border-purple-light/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Distributed Agents */}
        {agents.map((agent, i) => {
          const angle = (i * 360) / agents.length;
          const radius = 70;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;

          return (
            <motion.div
              key={i}
              className="absolute group"
              style={{ x, y }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="relative size-10 rounded-lg bg-[#16161b] border border-white/10 flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                <agent.icon className="size-5 text-white/60 group-hover:text-white transition-colors" />
                
                {/* Activity Pulse */}
                <motion.div 
                  className="absolute -top-1 -right-1 size-2.5 rounded-full"
                  style={{ backgroundColor: agent.color }}
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                />
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[8px] font-mono text-white/30 uppercase tracking-tighter">{agent.label}</span>
              </div>
            </motion.div>
          );
        })}

        {/* Central Monitor */}
        <div className="relative size-14 rounded-full bg-[#16161b] border border-white/10 flex items-center justify-center z-10 shadow-[0_0_30px_rgba(150,59,247,0.1)]">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="size-8 rounded-full bg-purple/20 border border-purple/40 flex items-center justify-center"
          >
            <div className="size-2.5 rounded-full bg-purple-light shadow-[0_0_15px_var(--purple-light)]" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
