// TestPage.tsx
import React, { useState } from 'react';
import { AcceptedAnimation, RejectedAnimation } from '../components/choices-animation';

const TestPage = () => {
  const [choice, setChoice] = useState<"yes" | "no" | null>(null);

  if (choice === "yes") return <AcceptedAnimation />;
  if (choice === "no") return <RejectedAnimation />;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <button
        onClick={() => setChoice("yes")}
        className="bg-green-500 px-6 py-3 m-4 text-white rounded"
      >
        Yes
      </button>
      <button
        onClick={() => setChoice("no")}
        className="bg-red-500 px-6 py-3 m-4 text-white rounded"
      >
        No
      </button>
    </div>
  );
};

export default TestPage;
