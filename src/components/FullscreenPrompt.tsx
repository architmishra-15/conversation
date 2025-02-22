import React, { useState } from 'react';

const FullscreenPrompt: React.FC = () => {
  const [visible, setVisible] = useState(true);

  const handleEnterFullscreen = () => {
    if (document.fullscreenEnabled) {
      document.documentElement
        .requestFullscreen()
        .then(() => setVisible(false))
        .catch((err) => {
          console.warn('Fullscreen request failed:', err);
          setVisible(false);
        });
    } else {
      setVisible(false);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-gray-900 rounded-lg shadow-lg p-6 max-w-xs mx-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Go Fullscreen?</h2>
        <p className="text-gray-300 mb-6">
          For a more immersive experience, please allow fullscreen mode.
        </p>
        <div className="flex flex-col space-y-3">
          <button
            onClick={handleEnterFullscreen}
            className="py-2 px-4 bg-pink-500 hover:bg-pink-600 text-white rounded-md transition-colors"
          >
            Yes, Fullscreen
          </button>
          <button
            onClick={handleCancel}
            className="py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullscreenPrompt;
