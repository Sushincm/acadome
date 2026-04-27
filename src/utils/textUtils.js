import React from 'react';

/**
 * Wraps 'ACADOME' text in a styled span with brand color.
 * @param {string} text - The text to process.
 * @returns {Array|string} - React elements with highlighted brand name.
 */
export const highlightBrand = (text) => {
  if (!text || typeof text !== 'string') return text;
  
  const parts = text.split(/(ACADOME)/i);
  return parts.map((part, i) => 
    part.toLowerCase() === 'acadome' 
      ? React.createElement('span', { 
          key: i, 
          className: "text-accent-red",
          style: { color: '#da2a3f' } // Forced color to ensure it overrides parent styles
        }, part)
      : part
  );
};
