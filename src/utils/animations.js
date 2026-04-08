/**
 * Universal Intersection Observer for Native CSS Reveals
 * Optimized for low-end devices: checks 'isConnected' to prevent memory leaks
 * and uses requestAnimationFrame to batch DOM layout passes.
 */
const revealObserver = typeof window !== 'undefined' ? new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    // Memory leak prevention: if component unmounted before revealing
    if (!entry.target.isConnected) {
      observer.unobserve(entry.target);
      return;
    }
    
    // Trigger on intersection
    if (entry.isIntersecting || entry.intersectionRatio > 0) {
      observer.unobserve(entry.target);
      
      requestAnimationFrame(() => {
        entry.target.classList.add('reveal-visible');
        
        // GPU Memory Cleanup: Strip will-change after animation completes (approx 1s)
        setTimeout(() => {
          if (entry.target && entry.target.isConnected) {
             entry.target.style.willChange = 'auto';
             // Clean up inner spans will-change for spelling animations
             const inners = entry.target.querySelectorAll('.reveal-word-inner');
             if (inners.length > 0) {
               inners.forEach(span => span.style.willChange = 'auto');
             }
          }
        }, 1200);
      });
    }
  });
}, {
  root: null,
  rootMargin: '10% 0px 40% 0px',
  threshold: 0
}) : null;

/**
 * Checks if the device is low-end to disable heavy GPU spelling animations.
 */
const isLowEndDevice = () => {
  if (typeof navigator === 'undefined' || typeof window === 'undefined') return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  
  // Safely check device capabilities (Mobile/Old CPU/Low RAM fallback)
  const isWeakCPU = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
  const isLowRAM = navigator.deviceMemory && navigator.deviceMemory < 4;
  return isWeakCPU || isLowRAM;
};

/**
 * Splits text into staggered character spans for "spelling" animation.
 * Automatically gracefully falls back to simple fade for low-end devices.
 */
export const setupSplitText = (element, delay = 0) => {
  if (!element || element.getAttribute("data-animated")) return;

  // Respect low-end devices: bypass heavy DOM modifications and use lightweight reveal
  if (isLowEndDevice()) {
    setupScrollReveal(element, delay);
    return;
  }

  const text = element.innerText;
  element.setAttribute("data-animated", "true");
  element.innerHTML = "";
  element.classList.add('reveal-content');
  if (delay) element.style.transitionDelay = `${delay}s`;

  let charCount = 0;
  const words = text.split(" ");
  
  words.forEach((word, wordIndex) => {
    const wordSpan = document.createElement("span");
    wordSpan.className = "reveal-word";
    
    // True "Spelling" Animation: Char by Char
    word.split("").forEach((char) => {
      const inner = document.createElement("span");
      inner.className = "reveal-word-inner";
      // To save GPU on init, will-change is applied only dynamically via CSS if needed, 
      // but explicitly tracked for removal later.
      inner.textContent = char;
      inner.style.transitionDelay = `${(charCount * 0.02)}s`;
      wordSpan.appendChild(inner);
      charCount++;
    });

    element.appendChild(wordSpan);

    if (wordIndex < words.length - 1) {
      const space = document.createTextNode(" ");
      element.appendChild(space);
    }
  });

  if (revealObserver) {
    revealObserver.observe(element);
    
    // Memory leak safe timeout
    setTimeout(() => {
      if (element && element.isConnected && !element.classList.contains("reveal-visible")) {
        element.classList.add("reveal-visible");
      }
    }, 3000);
  } else {
    element.classList.add("reveal-visible");
  }
};

/**
 * General content reveal animation (Fade + Slide)
 * Migrated to Native CSS for maximum performance.
 * Variants: 'fade', 'left', 'scale'
 */
export const setupScrollReveal = (selector, delay = 0, variant = "") => {
  if (typeof window === "undefined") return;

  let elements = [];
  if (typeof selector === "string") {
    elements = Array.from(document.querySelectorAll(selector));
  } else if (selector instanceof NodeList || selector instanceof HTMLCollection) {
    elements = Array.from(selector);
  } else if (Array.isArray(selector)) {
    elements = selector;
  } else {
    elements = [selector];
  }

  elements.forEach((el, index) => {
    if (!el || el.getAttribute("data-animated")) return;
    el.setAttribute("data-animated", "true");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = 1;
      el.style.visibility = "visible";
      el.style.transform = "none";
      return;
    }

    el.classList.add("reveal-content");
    if (variant) el.classList.add(`reveal-${variant}`);

    // Add staggered delay based on index in this batch
    const staggerDelay = delay + index * 0.05;
    if (staggerDelay > 0) {
      el.style.transitionDelay = `${staggerDelay}s`;
    }

    if (revealObserver) {
      revealObserver.observe(el);
      // Memory leak safe timeout
      setTimeout(() => {
        if (el && el.isConnected && !el.classList.contains("reveal-visible")) {
          el.classList.add("reveal-visible");
        }
      }, 3000);
    } else {
      el.classList.add("reveal-visible");
    }
  });
};

/**
 * Legacy support for simple splitting (Can be removed if no longer used)
 */
export const splitTextIntoSpans = (element) => {
  if (!element || element.getAttribute("data-split")) return [];

  const text = element.innerText;
  element.setAttribute("data-split", "true");
  element.innerHTML = "";

  const allChars = [];
  const words = text.split(" ");

  words.forEach((word, wordIndex) => {
    const wordSpan = document.createElement("span");
    wordSpan.style.cssText = "display:inline-block; white-space:nowrap; vertical-align:bottom;";
    
    word.split("").forEach((char) => {
      const outer = document.createElement("span");
      outer.style.cssText = "display:inline-block; overflow:hidden; vertical-align:bottom;";
      const inner = document.createElement("span");
      inner.style.cssText = "display:inline-block;";
      inner.textContent = char;
      outer.appendChild(inner);
      wordSpan.appendChild(outer);
      allChars.push(inner);
    });

    element.appendChild(wordSpan);
    if (wordIndex < words.length - 1) {
      const space = document.createElement("span");
      space.textContent = " ";
      element.appendChild(space);
    }
  });

  return allChars;
};
