/**
 * Acadome Script
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Lenis Smooth Scroll
  const lenis = new Lenis({
    lerp: 0.08, // The smaller the value, the smoother/slower it is (0 to 1). Awwwards sites generally use ~0.08
    wheelMultiplier: 1.0, // Scroll wheel sensitivity
    smoothWheel: true, // Enable scroll smoothing
    syncTouch: true, // Sync touch scrolling
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // 2. Mobile navigation toggle
  const mobileToggle = document.getElementById("mobile-toggle");
  const navLinks = document.getElementById("nav-links");
  const navbar = document.getElementById("navbar");

  if (mobileToggle && navLinks) {
    let isNavOpen = false;

    mobileToggle.addEventListener("click", () => {
      isNavOpen = !isNavOpen;

      const spans = mobileToggle.querySelectorAll("span");

      if (isNavOpen) {
        // Open menu
        navLinks.classList.remove("mobile-menu-inactive");
        navLinks.classList.add("mobile-menu-active");

        spans[0].style.transform = "translateY(7px) rotate(45deg)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "translateY(-7px) rotate(-45deg)";

        // Optional: Disable scroll when menu is open
        lenis.stop();
      } else {
        // Close menu
        navLinks.classList.remove("mobile-menu-active");
        navLinks.classList.add("mobile-menu-inactive");

        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";

        lenis.start();
      }
    });

    // Close mobile nav when clicking a link
    const navAnchorTags = navLinks.querySelectorAll("a");
    navAnchorTags.forEach((anchor) => {
      anchor.addEventListener("click", () => {
        if (window.innerWidth <= 768 && isNavOpen) {
          isNavOpen = false;
          navLinks.classList.remove("mobile-menu-active");
          navLinks.classList.add("mobile-menu-inactive");

          const spans = mobileToggle.querySelectorAll("span");
          spans[0].style.transform = "none";
          spans[1].style.opacity = "1";
          spans[2].style.transform = "none";

          lenis.start();
        }
      });
    });
  }

  // Scroll styling for navbar
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.padding = "10px 0";
      navbar.classList.add("shadow-sm");
    } else {
      navbar.style.padding = "16px 0";
      navbar.classList.remove("shadow-sm");
    }
  });

  // 3. GSAP Parallax for Hero image
  const heroBgImg = document.querySelector("#hero-bg img");
  const heroContainer = document.querySelector("#hero-container");

  if (heroBgImg && heroContainer) {
    gsap.to(heroBgImg, {
      y: "15%", // Adjust translation amount as needed
      ease: "none",
      scrollTrigger: {
        trigger: heroContainer,
        start: "top top", // start when top of container hits top of viewport
        end: "bottom top", // end when bottom of container hits top of viewport
        scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
      },
    });
  }
});
