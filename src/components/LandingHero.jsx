import { motion } from 'framer-motion';
import GlassButton from './GlassButton';

/**
 * Hero headline, supporting copy, and primary CTA. Pairs with `useLandingIntroAnimation`
 * (expects `.dd-hero-title`, `.dd-hero-sub`, `.dd-about-wrap`).
 */
export default function LandingHero({
  title,
  subtitle,
  ctaLabel = 'Get Started ❤️',
  onCtaClick,
}) {
  return (
    <>
      <div className="dd-hero-text">
        <motion.h1 className="dd-hero-title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p className="dd-hero-sub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            {subtitle}
          </motion.p>
        )}
      </div>

      <motion.div className="dd-about-wrap" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
        <GlassButton onClick={onCtaClick}>{ctaLabel}</GlassButton>
      </motion.div>
    </>
  );
}
