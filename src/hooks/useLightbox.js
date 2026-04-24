import { useEffect, useRef } from 'react';
import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.min.css';

/**
 * Custom hook to centralize GLightbox initialization and cleanup.
 * @param {Object} options - Configuration options for GLightbox.
 * @param {Array} dependencies - React dependencies that should trigger a re-initialization (e.g., when filtering gallery images).
 * @returns {React.MutableRefObject} - A ref containing the GLightbox instance.
 */
export default function useLightbox(options, dependencies = []) {
  const lightboxRef = useRef(null);

  useEffect(() => {
    // A small delay ensures the DOM elements are fully rendered (especially helpful with Swiper or filtering logic)
    const timeoutId = setTimeout(() => {
      if (lightboxRef.current) {
        lightboxRef.current.destroy();
      }
      lightboxRef.current = GLightbox(options);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (lightboxRef.current) {
        lightboxRef.current.destroy();
        lightboxRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return lightboxRef;
}
