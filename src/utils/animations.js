/**
 * Universal Intersection Observer for Native CSS Reveals
 * High performance, zero overhead for mobile browsers.
 */
const revealObserver = typeof window !== 'undefined' ? new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal-visible');
      // Once revealed, we don't need to observe anymore
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  root: null,
  rootMargin: '0px 0px 0px 0px', // Trigger exactly when entering viewport to fix mobile scroll issues
  threshold: 0
}) : null;

/**
 * Splits text into staggered character spans and sets up native CSS transitions.
 */
export const setupSplitText = (element, delay = 0) => {
  if (!element || element.getAttribute("data-animated")) return;

  const text = element.innerText;
  element.setAttribute("data-animated", "true");
  
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    element.style.opacity = 1;
    return;
  }

  element.innerHTML = "";
  element.classList.add('reveal-content');
  if (delay) element.style.transitionDelay = `${delay}s`;

  const words = text.split(" ");
  words.forEach((word, wordIndex) => {
    const wordSpan = document.createElement("span");
    wordSpan.className = "reveal-word";
    
    const inner = document.createElement("span");
    inner.className = "reveal-word-inner";
    inner.textContent = word;
    
    // Stagger words
    inner.style.transitionDelay = `${(wordIndex * 0.03)}s`;
    
    wordSpan.appendChild(inner);
    element.appendChild(wordSpan);

    if (wordIndex < words.length - 1) {
      const space = document.createTextNode("\u00A0");
      element.appendChild(space);
    }
  });

  if (revealObserver) revealObserver.observe(element);
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

    if (revealObserver) revealObserver.observe(el);
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
      space.textContent = "\u00A0";
      element.appendChild(space);
    }
  });

  return allChars;
};
