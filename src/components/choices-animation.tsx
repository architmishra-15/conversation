import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

// REJECTED ANIMATION:
// When she presses "No", the current page squishes like a paper, the background switches to white,
// a dustbin icon appears (as if the page is being thrown away), and a message is shown.
export const RejectedAnimation = () => {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: 0.1, opacity: 0, transition: { duration: 1 } }}
      >
        {/* Dustbin icon that fades out */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: 50, transition: { delay: 0.8, duration: 0.5 } }}
        >
          <Trash2 size={64} />
        </motion.div>
        {/* Final message */}
        <motion.h1
          className="text-2xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 1.2, duration: 0.8 } }}
        >
          Thank You for your honesty
        </motion.h1>
      </motion.div>
    );
  };
  
  // ACCEPTED ANIMATION:
  // For the "Yes" case, here's one suggestion: a heart icon (and maybe some flying hearts or confetti)
  // appears as the screen brightens with a warm gradient, celebrating the moment.
  export const AcceptedAnimation = () => {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-purple-900 to-pink-500"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, transition: { duration: 1 } }}
      >
        {/* Main heart icon */}
        <motion.div
          className="mb-4"
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1, transition: { duration: 1 } }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21 4.318 12.682a4.5 4.5 0 010-6.364z"
            />
          </svg>
        </motion.div>
        <motion.h1
          className="text-3xl font-bold text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 1, duration: 1 } }}
        >
          You're the one!
        </motion.h1>
        {/* Confetti/Fireworks placeholder */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.5, duration: 2 } }}
        >
          <ConfettiEffect />
        </motion.div>
      </motion.div>
    );
  };
  
  // A very simple placeholder for confetti/fireworks effect.
  // Replace this with your preferred confetti library or custom effect if desired.
  const ConfettiEffect = () => {
    return (
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 2 } }}
      />
    );
  };