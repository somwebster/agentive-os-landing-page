"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { 
  Database, 
  MessagesSquare, 
  FileText, 
  Users, 
  ShoppingBag, 
  Zap,
  Mail,
  Camera,
  BarChart,
  Globe,
  Search,
  Video
} from "lucide-react";
import { cn } from "@/lib/utils";

const tools = [
  { icon: MessagesSquare, label: "Slack", color: "#4A154B" },
  { icon: FileText, label: "Docs", color: "#2b5797" },
  { icon: Users, label: "Meta", color: "#0668E1" },
  { icon: ShoppingBag, label: "Shopify", color: "#95BF47" },
  { icon: Mail, label: "Email", color: "#D44638" },
  { icon: Camera, label: "Insta", color: "#E1306C" },
  { icon: BarChart, label: "GA4", color: "#F9AB00" },
  { icon: Video, label: "TikTok", color: "#000000" },
  { icon: Globe, label: "Web", color: "#4285F4" },
  { icon: Search, label: "SEO", color: "#34A853" },
  { icon: Database, label: "MySQL", color: "#00758F" },
];

export default function CardAnimation01({ className }: { className?: string }) {
  const nodes = useMemo(() => tools.map((tool, i) => {
    const angle = (i * 360) / tools.length;
    const radius = 160 + (i % 2 === 0 ? 0 : 40); // Alternating radius for depth
    const rad = (angle * Math.PI) / 180;
    return {
      ...tool,
      x: Math.cos(rad) * radius,
      y: Math.sin(rad) * radius,
      angle,
      radius
    };
  }), []);

  return (
    <div className={cn("relative w-full h-full flex items-center justify-center overflow-hidden bg-[#050506]/30", className)}>
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Connection Layer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
          {nodes.map((node, i) => {
            // Calculate start point (edge of central hub)
            const hubRadius = 40;
            const rad = (node.angle * Math.PI) / 180;
            const startX = hubRadius * Math.cos(rad);
            const startY = hubRadius * Math.sin(rad);

            return (
              <g key={`edge-${i}`}>
                {/* Dotted Line */}
                <motion.line
                  x1={`calc(50% + ${startX}px)`}
                  y1={`calc(50% + ${startY}px)`}
                  x2={`calc(50% + ${node.x}px)`}
                  y2={`calc(50% + ${node.y}px)`}
                  stroke="rgba(150, 59, 247, 0.2)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              </g>
            );
          })}
        </svg>

        {/* Central Hub */}
        <motion.div
          className="relative z-20"
          animate={{ scale: [0.98, 1.02, 0.98] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-purple blur-[50px] opacity-20" />
          <div className="relative size-20 rounded-[1.5rem] bg-gradient-to-br from-purple to-purple-900 border border-purple-light/40 flex items-center justify-center shadow-2xl">
            <Database className="size-10 text-white" />
            <div className="absolute -top-1 -right-1 size-6 rounded-full bg-orange flex items-center justify-center border-2 border-[#050506]">
              <Zap className="size-3.5 text-white fill-current" />
            </div>
          </div>
        </motion.div>

        {/* Satellite Nodes */}
        {nodes.map((node, i) => {
          const distance = node.radius;
          const blur = Math.max(0, (distance - 160) / 20);
          const opacity = Math.max(0.4, 1 - distance / 400);

          return (
            <div
              key={i}
              className="absolute z-10"
              style={{ 
                left: `calc(50% + ${node.x}px)`, 
                top: `calc(50% + ${node.y}px)`,
                transform: "translate(-50%, -50%)",
                opacity,
                filter: `blur(${blur}px)`
              }}
            >
              <motion.div 
                className="group relative"
                animate={{
                  y: [0, Math.sin(i) * 10, 0],
                  x: [0, Math.cos(i) * 10, 0]
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div 
                  className="absolute inset-0 blur-xl opacity-20 group-hover:opacity-60 transition-opacity" 
                  style={{ backgroundColor: node.color }} 
                />
                <div className="relative size-12 rounded-xl bg-surface-raised/90 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-2xl group-hover:border-white/30 transition-all">
                  <node.icon className="size-6 text-white/60 group-hover:text-white transition-colors" />
                </div>
                <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-mono text-white/50 uppercase tracking-[0.2em]">{node.label}</span>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
