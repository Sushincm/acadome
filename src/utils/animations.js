import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Splits text into staggered character spans and sets up a ScrollTrigger animation.
 * Performance optimized for low-end devices with simple transforms.
 */
export const setupSplitText = (element) => {
  if (!element || element.getAttribute("data-animated")) return;

  const text = element.innerText;
  element.setAttribute("data-animated", "true");
  element.innerHTML = "";
  
  // Optimization: Pre-set base styles to avoid layout shifts
  element.style.willChange = "transform, opacity";

  const allChars = [];
  const words = text.split(" ");

  words.forEach((word, wordIndex) => {
    const wordSpan = document.createElement("span");
    wordSpan.style.cssText = "display:inline-block; white-space:nowrap; vertical-align:bottom;";
    
    word.split("").forEach((char) => {
      const outer = document.createElement("span");
      outer.style.cssText = "display:inline-block; overflow:hidden; vertical-align:bottom;";
      
      const inner = document.createElement("span");
      inner.style.cssText = "display:inline-block; will-change: transform, opacity;";
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

  if (allChars.length > 0) {
    gsap.fromTo(allChars, 
      { y: "105%", opacity: 0 },
      { 
        y: "0%", 
        opacity: 1, 
        duration: 0.8, 
        ease: "power3.out", 
        stagger: 0.012,
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
          toggleActions: "play none none reverse",
        }
      }
    );
  }
};

/**
 * General content reveal animation (Fade + Slide)
 * Robust and lightweight for low-end devices.
 */
export const setupScrollReveal = (selector, delay = 0) => {
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
    
    // Performance: will-change
    el.style.willChange = "transform, opacity";

    gsap.fromTo(el, 
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        delay: delay + (index * 0.1),
        ease: "power2.out",
        autoAlpha: 1, // Visibility toggle + opacity
        scrollTrigger: {
          trigger: el,
          start: "top 92%",
          toggleActions: "play none none reverse",
        }
      }
    );
  });
};

/**
 * Legacy support for simple splitting
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
