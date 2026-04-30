"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AiSendMessageIcon } from "@/components/ui/icons";

export default function CardAnimation02({ className }: { className?: string }) {
  return (
    <div className={cn("w-full h-full flex items-center justify-center p-4", className)}>
      <div className="relative w-full max-w-[280px]">
        {/* Stacked Cards Background */}
        <div className="absolute -top-4 -left-4 w-full h-full bg-[#16161b]/40 rounded-3xl border border-white/5" />
        <div className="absolute -top-2 -left-2 w-full h-full bg-[#16161b]/60 rounded-3xl border border-white/5" />
        
        {/* Main Card */}
        <motion.div 
          className="relative w-full bg-[#16161b] rounded-3xl border border-white/10 p-6 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="size-12 rounded-full bg-purple flex items-center justify-center shadow-lg shadow-purple/20">
              <AiSendMessageIcon className="size-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">AI Summary</h3>
          </div>

          <div className="space-y-4 bg-black/20 rounded-2xl p-4 border border-white/5">
            {[
              "Customer asks about refund",
              "Order #4548",
              "Waiting for confirmation"
            ].map((text, i) => (
              <motion.div 
                key={i} 
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <div className="size-2 rounded-full bg-purple flex-shrink-0" />
                <span className="text-sm text-white/60 font-medium">{text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
