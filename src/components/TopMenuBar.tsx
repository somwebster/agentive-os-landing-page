import React from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "./ui/menubar";
import { NAV_LINKS } from "./header/nav-data";
import { cn } from "@/lib/utils";

export const TopMenuBar = () => {
  return (
    <div className="absolute top-6 left-0 right-0 z-[100] flex items-center h-10 bg-transparent px-8 select-none">
      <div className="flex items-center w-full">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="size-6 bg-white/10 rounded-full flex items-center justify-center">
            <div className="size-2.5 bg-white rounded-full animate-pulse shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
          </div>
          <span className="font-mono text-[20px] font-bold tracking-tight text-white">
            Agentive OS
          </span>
        </div>

        {/* System Tray Style (Right Side) */}
        <div className="ml-auto flex items-center gap-6 text-[11px] font-medium tracking-wide">
          <div className="flex items-center gap-3 text-white/90">
            <span>APR 30, 2026</span>
            <span className="font-bold">11:59 AM</span>
          </div>
        </div>
      </div>
    </div>
  );
};
