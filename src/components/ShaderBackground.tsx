import { DotCanvas } from "./DotCanvas";

interface ShaderBackgroundProps {
  isDark?: boolean;
}

export function ShaderBackground({ isDark = false }: ShaderBackgroundProps) {
  return (
    <div style={{
      position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none',
      // Brand-tinted base: light = warm off-white with purple tint, dark = deep near-black with purple tint
      background: isDark ? '#0d0b09' : '#fafafa',
    }}>
      {/* Brand purple dot grid */}
      <DotCanvas isDark={isDark} />

      {/* Radial glow from top-center — brand purple accent */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: isDark
          ? 'radial-gradient(ellipse 60% 40% at 55% 0%, rgba(247,98,30,0.12) 0%, transparent 70%)'
          : 'radial-gradient(ellipse 60% 40% at 55% 0%, rgba(247,98,30,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Soft bottom fade into page bg */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: isDark
          ? 'linear-gradient(to bottom, transparent 60%, rgba(13,11,9,0.7) 85%, #0d0b09 100%)'
          : 'linear-gradient(to bottom, transparent 60%, rgba(250,250,250,0.7) 85%, #fafafa 100%)',
        pointerEvents: 'none',
      }} />
    </div>
  );
}
