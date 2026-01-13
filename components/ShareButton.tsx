
import React, { useState } from 'react';

export const ShareButton: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'AlgoVisual',
      text: 'Check out this awesome Data Structures and Algorithms visualizer!',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled or failed', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`relative px-4 py-2.5 rounded-xl text-sm font-bold border transition-all flex items-center justify-center gap-2 ${
        copied 
          ? 'bg-emerald-50 border-emerald-100 text-emerald-600' 
          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
      }`}
    >
      <i className={`fa-solid ${copied ? 'fa-check' : 'fa-share-nodes'}`}></i>
      <span>{copied ? 'Copied!' : 'Share'}</span>
    </button>
  );
};