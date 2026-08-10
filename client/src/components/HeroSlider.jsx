import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const SLIDE_DURATION = 3000; // ms each image stays up
const TRANSITION_DURATION = 1.1; // seconds for the slide/crossfade

const slideVariants = {
  enter: { opacity: 0, x: 60 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -60 },
};

/**
 * <HeroSlider images={[url1, url2, url3]} />
 * Renders full-bleed behind whatever you absolutely-position on top of it.
 */
export default function HeroSlider({ images, altTexts = [] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (paused || images.length <= 1) return undefined;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timerRef.current);
  }, [paused, images.length]);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: TRANSITION_DURATION, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {/* Separate element for the slow zoom so it doesn't fight the
              slide/crossfade transition above — restarts every slide
              because `key={index}` remounts it. */}
          <div
            key={`kenburns-${index}`}
            role="img"
            aria-label={altTexts[index] || ''}
            className="h-full w-full bg-cover bg-center motion-safe:animate-heroZoom"
            style={{ backgroundImage: `url(${images[index]})` }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Slide indicators — also give keyboard/AT users manual control */}
      {images.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Show slide ${i + 1} of ${images.length}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all ${
                i === index ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
