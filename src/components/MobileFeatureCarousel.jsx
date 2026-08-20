import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { whyChooseUs } from '../data/whyChooseUs';

export default function MobileFeatureCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % whyChooseUs.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const currentFeature = whyChooseUs[activeIndex];
  const Icon = currentFeature.icon;

  return (
    <div className="w-full flex flex-col items-center gap-4 lg:hidden px-2 py-4">
      {/* Active Symbol Icon Container */}
      <motion.div
        key={`icon-${activeIndex}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-accent/15 border-2 border-accent/40 flex items-center justify-center text-accent shadow-lg shadow-accent/20"
      >
        <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-accent" />
      </motion.div>

      {/* Description Box */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`card-${activeIndex}`}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -15, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-sm rounded-2xl bg-white/90 dark:bg-[#18181b]/90 border border-secondary/20 dark:border-white/10 p-6 text-center shadow-xl backdrop-blur-md"
        >
          <h3 className="font-display text-lg sm:text-xl font-bold text-primary dark:text-paper mb-2">
            {currentFeature.title}
          </h3>
          <p className="text-sm text-primary/75 dark:text-paper/75 leading-relaxed">
            {currentFeature.description}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* 8-Second Progress Indicator Dots */}
      <div className="flex items-center gap-2 mt-2">
        {whyChooseUs.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === activeIndex
                ? 'w-7 bg-accent shadow-sm'
                : 'w-2.5 bg-primary/20 dark:bg-paper/20 hover:bg-accent/50'
            }`}
            aria-label={`Go to feature ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
