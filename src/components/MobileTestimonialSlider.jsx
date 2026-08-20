import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '../data/testimonials';
import TestimonialCard from './TestimonialCard';

export default function MobileTestimonialSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-4 lg:hidden px-2 py-2">
      {/* Slider Container */}
      <div className="w-full max-w-sm min-h-[260px] relative overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="w-full"
          >
            <TestimonialCard {...testimonials[activeIndex]} index={activeIndex} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center gap-2 mt-1">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === activeIndex
                ? 'w-6 bg-accent shadow-sm'
                : 'w-2.5 bg-primary/20 dark:bg-paper/20 hover:bg-accent/50'
            }`}
            aria-label={`Go to testimonial ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
