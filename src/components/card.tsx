export default function Card({
  title,
  description,
  children,
  className,
}: {
  title: React.ReactNode;
  description: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`group relative w-full h-full rounded-[2.5rem] flex flex-col border-white/10 border bg-[#0e0e11] overflow-hidden transition-all duration-500 hover:shadow-[0_0_80px_-20px_rgba(150,59,247,0.15)] ${className || ''}`}>
      {/* Background Animation Area */}
      <div className="absolute inset-0 w-full h-full bg-[#050506] flex items-center justify-center">
        {children}
      </div>

      {/* Content Overlay */}
      <div className="relative h-full w-full p-8 flex flex-col justify-end pointer-events-none">
        {/* Gradient Mask for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-90" />
        
        <div className="relative z-10 flex flex-col gap-2">
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-tight">
            {title}
          </h2>
          <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-[90%]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
