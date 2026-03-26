/**
 * Splits text within a provided DOM element into individual <span> characters
 * for staggered GSAP animations, ensuring no redundant splitting occurs.
 * 
 * @param {HTMLElement} element - The React Ref's current element.
 * @returns {HTMLElement[]} - Array of newly created span elements.
 */
export const splitTextIntoSpans = (element) => {
  if (!element || element.getAttribute("data-split")) return [];

  const text = element.innerText;
  element.setAttribute("data-split", "true");
  element.innerHTML = "";

  const allChars = [];
  const words = text.split(" ");

  words.forEach((word, wordIndex) => {
    // Wrap each word in a nowrap container to prevent mid-word wrapping
    const wordSpan = document.createElement("span");
    wordSpan.style.cssText = "display:inline-block; white-space:nowrap; vertical-align:bottom;";
    
    const chars = word.split("");
    chars.forEach((char) => {
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

    // Add space after word if it's not the last one
    if (wordIndex < words.length - 1) {
      const space = document.createElement("span");
      space.textContent = "\u00A0"; // Non-breaking space
      element.appendChild(space);
    }
  });

  return allChars;
};
