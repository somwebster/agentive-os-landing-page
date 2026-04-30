import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Layers, Building2, CreditCard, ArrowRight } from 'lucide-react';
import { Dock, DockIcon } from './ui/dock';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { NAV_LINKS, type NavMenu, type NavColumn } from './header/nav-data';
import { cn } from '@/lib/utils';

const MenuContent = ({ menu }: { menu: NavMenu }) => {
  const [activeColumn, setActiveColumn] = useState<NavColumn | null>(null);

  // On desktop, we show all columns. On mobile, we use a drill-down.
  return (
    <div className="relative overflow-hidden min-h-[300px] md:min-h-0">
      <AnimatePresence mode="wait">
        {!activeColumn ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col md:flex-row gap-4 md:gap-8 p-4 w-full"
          >
            {menu.columns.map((column: NavColumn, idx: number) => (
              <div key={idx} className="flex flex-col min-w-full md:min-w-[200px]">
                {/* Mobile: Clickable heading to drill down */}
                <button 
                  onClick={() => setActiveColumn(column)}
                  className="flex items-center justify-between w-full md:hidden py-3 border-b border-white/5 group outline-none"
                >
                  <span className="text-sm font-bold uppercase tracking-widest text-text-primary group-hover:text-purple-light transition-colors">
                    {column.heading}
                  </span>
                  <ArrowRight className="size-4 text-white/30" />
                </button>

                {/* Desktop: Static heading */}
                <h3 className="hidden md:block mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
                  {column.heading}
                </h3>
                
                {/* Desktop: Items always visible */}
                <ul className="hidden md:flex flex-col space-y-5">
                  {column.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <a href={item.href || "#"} className="block group">
                        <span className="block text-[14px] font-semibold text-text-primary group-hover:text-purple-light transition-colors">
                          {item.label}
                        </span>
                        {item.description && (
                          <span className="mt-1 block text-[12px] leading-relaxed text-text-secondary">
                            {item.description}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col p-4 w-full md:hidden"
          >
            <button 
              onClick={() => setActiveColumn(null)}
              className="flex items-center gap-2 mb-6 text-text-secondary hover:text-text-primary transition-colors group outline-none"
            >
              <div className="size-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10">
                <ArrowRight className="size-3 rotate-180" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest">Back</span>
            </button>

            <h3 className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
              {activeColumn.heading}
            </h3>

            <ul className="space-y-6">
              {activeColumn.items.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <a href={item.href || "#"} className="block group">
                    <span className="block text-[16px] font-semibold text-text-primary group-hover:text-purple-light transition-colors">
                      {item.label}
                    </span>
                    {item.description && (
                      <span className="mt-1.5 block text-[13px] leading-relaxed text-text-secondary">
                        {item.description}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const NavigationDock = () => {
  const [openPopover, setOpenPopover] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const threshold = 10;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show at the top of the page
      if (currentScrollY < threshold) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      const diff = currentScrollY - lastScrollY;
      
      if (diff > threshold) {
        // Scrolling down
        setIsVisible(false);
      } else if (diff < -threshold) {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const productMenu = NAV_LINKS.find(link => link.label === "Product")?.menu;
  const companyMenu = NAV_LINKS.find(link => link.label === "Company")?.menu;
  const pricingLink = NAV_LINKS.find(link => link.label === "Pricing")?.href || "#";

  const handleMouseEnter = (menu: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenPopover(menu);
  };

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setOpenPopover(null);
    }, 300); // 300ms buffer
  };

  const DockItem = ({ 
    icon: Icon, 
    label, 
    href, 
    className, 
    isCTA = false 
  }: { 
    icon: any, 
    label: string, 
    href?: string, 
    className?: string, 
    isCTA?: boolean 
  }) => (
    <DockIcon className={cn(
      "flex flex-col items-center justify-center gap-1",
      isCTA ? "bg-orange/20 border-orange/30 hover:bg-orange/30" : "bg-white/5 border-white/10 hover:bg-white/10",
      "transition-all duration-300",
      className
    )}>
      <a 
        href={href || "#"} 
        className="flex flex-col items-center justify-center w-full h-full"
        aria-label={label}
      >
        <Icon className={cn("size-6 mb-0.5", isCTA ? "text-orange" : "text-white/70")} />
        <span className={cn(
          "text-[10px] font-bold uppercase tracking-widest transition-opacity duration-300",
          isCTA ? "text-orange/80" : "text-white/40"
        )}>
          {label}
        </span>
      </a>
    </DockIcon>
  );

  const DockItemContent = ({ icon: Icon, label, isCTA = false }: { icon: any, label: string, isCTA?: boolean }) => (
    <div className="flex items-center md:gap-3 px-1 md:px-3">
      <span className={cn(
        "hidden md:block text-[11px] font-bold uppercase tracking-widest transition-colors duration-300",
        isCTA ? "text-orange/80" : "text-white/40 group-hover:text-white/70"
      )}>
        {label}
      </span>
      <Icon className={cn(
        "size-6 shrink-0 transition-colors duration-300", 
        isCTA ? "text-orange" : "text-white/40 group-hover:text-white/70"
      )} />
    </div>
  );

  return (
    <motion.div 
      className="fixed bottom-4 md:bottom-8 left-1/2 z-50"
      initial={{ y: 0, x: "-50%", opacity: 1 }}
      animate={{ 
        y: isVisible ? 0 : 100, 
        x: "-50%",
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ 
        duration: 0.4, 
        ease: [0.22, 1, 0.36, 1] 
      }}
    >
      <Dock direction="middle" className="px-3 py-2 md:px-6 md:py-4">
        {/* Home */}
        <DockIcon className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors group px-2 md:px-4">
          <a href="#" className="flex items-center h-full">
            <DockItemContent icon={Home} label="Home" />
          </a>
        </DockIcon>

        {/* Product (Popover) */}
        {productMenu && (
          <DockIcon className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors group px-2 md:px-4">
            <Popover open={openPopover === 'product'} onOpenChange={(open) => !open && setOpenPopover(null)}>
              <PopoverTrigger asChild>
                <div 
                  className="flex cursor-pointer items-center h-full"
                  onMouseEnter={() => handleMouseEnter('product')}
                  onMouseLeave={handleMouseLeave}
                >
                  <DockItemContent icon={Layers} label="Product" />
                </div>
              </PopoverTrigger>
              <PopoverContent 
                side="top" 
                align="center" 
                sideOffset={24} 
                collisionPadding={16}
                className="w-[calc(100vw-32px)] md:w-auto max-h-[70vh] md:max-h-none overflow-y-auto md:overflow-hidden bg-bg/95 border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-0"
                onMouseEnter={() => handleMouseEnter('product')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="p-2">
                  <MenuContent menu={productMenu} />
                </div>
              </PopoverContent>
            </Popover>
          </DockIcon>
        )}

        {/* Company (Popover) */}
        {companyMenu && (
          <DockIcon className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors group px-2 md:px-4">
            <Popover open={openPopover === 'company'} onOpenChange={(open) => !open && setOpenPopover(null)}>
              <PopoverTrigger asChild>
                <div 
                  className="flex cursor-pointer items-center h-full"
                  onMouseEnter={() => handleMouseEnter('company')}
                  onMouseLeave={handleMouseLeave}
                >
                  <DockItemContent icon={Building2} label="Company" />
                </div>
              </PopoverTrigger>
              <PopoverContent 
                side="top" 
                align="center" 
                sideOffset={24} 
                collisionPadding={16}
                className="w-[calc(100vw-32px)] md:w-auto max-h-[70vh] md:max-h-none overflow-y-auto md:overflow-hidden bg-bg/95 border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-0"
                onMouseEnter={() => handleMouseEnter('company')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="p-2">
                  <MenuContent menu={companyMenu} />
                </div>
              </PopoverContent>
            </Popover>
          </DockIcon>
        )}

        {/* Pricing */}
        <DockIcon className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors group px-2 md:px-4">
          <a href={pricingLink} className="flex items-center h-full">
            <DockItemContent icon={CreditCard} label="Pricing" />
          </a>
        </DockIcon>

        {/* Divider */}
        <div className="w-[1px] h-8 md:h-10 bg-white/10 mx-1 md:mx-2 self-center" />

        {/* Waitlist / CTA */}
        <DockIcon className="bg-orange/15 border-orange/20 hover:bg-orange/25 transition-all duration-300 group px-2 md:px-4">
          <a href="#cta" className="flex items-center h-full">
            <DockItemContent icon={ArrowRight} label="Early Access" isCTA />
          </a>
        </DockIcon>
      </Dock>
    </motion.div>
  );
};
