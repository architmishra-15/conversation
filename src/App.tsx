import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { Heart, Calendar } from 'lucide-react';
import { Background } from './components/Background';
import FullscreenPrompt from './components/FullscreenPrompt';

const memories = [
  {
    date: 'First Meeting',
    english: 'The day our eyes met, time stood still',
    hindi: 'जब पहली बार नज़रें मिली, वक़्त थम सा गया',
    animation: {
      initial: { x: -100, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: 100, opacity: 0 },
    },
  },
  {
    date: 'First Conversation',
    english: 'Your words painted colors in my world',
    hindi: 'तेरी बातों ने मेरी दुनिया में रंग भर दिए',
    animation: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.8, opacity: 0 },
    },
  },
  {
    date: 'Realization',
    english: 'When I knew you were the one',
    hindi: 'जब मैंने जाना कि तुम ही हो वो खास',
    animation: {
      initial: { y: 100, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -100, opacity: 0 },
    },
  },
];

interface TimelineItemProps {
  memory: (typeof memories)[0];
  index: number;
  forwardedRef?: React.Ref<HTMLDivElement>;
}

function TimelineItem({ memory, index, forwardedRef }: TimelineItemProps) {
  const localRef = useRef<HTMLDivElement>(null);
  const setRefs = (node: HTMLDivElement) => {
    localRef.current = node;
    if (forwardedRef) {
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else {
        (
          forwardedRef as React.MutableRefObject<HTMLDivElement | null>
        ).current = node;
      }
    }
  };

  const isInView = useInView(localRef, { margin: '-40% 0px -40% 0px' });

  return (
    <div
      className="snap-center min-h-screen flex items-center justify-center p-6"
      ref={setRefs}
    >
      <motion.div
        className="relative max-w-md w-full ml-1" // original offset remains unchanged
        initial={memory.animation.initial}
        animate={isInView ? memory.animation.animate : memory.animation.initial}
        exit={memory.animation.exit}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
          mass: 1,
        }}
      >
        <div className="absolute -left-6 top-8">
          <motion.div
            className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: isInView ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          >
            <Calendar className="w-4 h-4 text-white" />
          </motion.div>
        </div>
        <motion.div
          className="ml-8 backdrop-blur-xl bg-white/10 p-6 rounded-lg border border-white/20 shadow-xl"
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{
            opacity: isInView ? 1 : 0,
            backdropFilter: isInView ? 'blur(16px)' : 'blur(0px)',
          }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-serif text-pink-400 mb-2">
            {memory.date}
          </h3>
          <p className="text-lg text-white mb-2">{memory.english}</p>
          <p className="text-md text-purple-300 italic">{memory.hindi}</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

function TimelineLine({ top, height }: { top: number; height: number }) {
  return (
    <div
      className="absolute bg-gradient-to-b from-pink-500 to-purple-500 pointer-events-none"
      style={{
        left: '1rem', // same as original offset
        top: top,
        height: height,
        width: '0.125rem', // approximately 2px
      }}
    />
  );
}

function App() {
  const [showProposal, setShowProposal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLDivElement>(null);
  const lastItemRef = useRef<HTMLDivElement>(null);
  const [lineDimensions, setLineDimensions] = useState<{
    top: number;
    height: number;
  }>({ top: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowProposal(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    if (firstItemRef.current && lastItemRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const firstRect = firstItemRef.current.getBoundingClientRect();
      const lastRect = lastItemRef.current.getBoundingClientRect();

      const top = firstRect.top - containerRect.top + firstRect.height / 2;
      const bottom = lastRect.top - containerRect.top + lastRect.height / 2;
      setLineDimensions({ top, height: bottom - top });
    }
  }, [containerRef, firstItemRef, lastItemRef, memories.length]);

  return (
    <div
      ref={containerRef}
      className="bg-transparent text-white h-screen snap-y snap-mandatory overflow-y-auto scroll-smooth relative"
      style={{ scrollbarGutter: 'stable' }}
    >
      {/* Ensure your Background component renders its canvas in a fixed, full-screen container with a negative z-index */}
      <FullscreenPrompt />
      <Background />

      {memories.length > 0 && (
        <TimelineLine
          top={lineDimensions.top + 10}
          height={lineDimensions.height}
        />
      )}

      {/* Opening Section */}
      <section className="snap-center h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          >
            <Heart className="w-20 h-20 text-pink-500 mx-auto mb-8" />
          </motion.div>
          <h1 className="text-5xl font-serif mb-6 text-white">
            My Dearest [Name]
          </h1>
          <p className="text-xl text-pink-300">
            Let me take you through our journey...
          </p>
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            <p className="text-sm text-gray-400">Scroll to begin our story</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Timeline */}
      {memories.map((memory, index) => {
        let refProp = {};
        if (index === 0) {
          refProp = { forwardedRef: firstItemRef };
        } else if (index === memories.length - 1) {
          refProp = { forwardedRef: lastItemRef };
        }
        return (
          <TimelineItem
            key={index}
            memory={memory}
            index={index}
            {...refProp}
          />
        );
      })}

      {/* Proposal Section with Ending Transition */}
      <section className="snap-center h-screen flex items-center justify-center p-6 relative">
        {showProposal && (
          <>
            {/* Shattering animation overlay */}
            <motion.div
              initial={{
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                opacity: 1,
              }}
              animate={{
                clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)',
                opacity: 0,
              }}
              transition={{ duration: 2, ease: 'easeInOut' }}
              className="absolute inset-0 z-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 pointer-events-none"
            />
          </>
        )}
      </section>
    </div>
  );
}

export default App;
