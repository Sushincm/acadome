/**
 * Acadome Script
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Lenis Smooth Scroll
  const lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 1.0, 
    smoothWheel: true, 
    syncTouch: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // Smooth scroll for all anchor links using Lenis
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = this.getAttribute("href");
      if (target && target !== "#") {
        lenis.scrollTo(target, { offset: -80 });
      }
    });
  });

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
      navbar.classList.add("nav-floating");
      navbar.style.padding = "";
    } else {
      navbar.classList.remove("nav-floating");
      navbar.style.padding = "";
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

  // 4. What We Offer Section Expand Animation
  const wwoSection = document.querySelector("#wwo-section");
  const wwoContainer = document.querySelector("#wwo-container");
  const wwoBg = document.querySelector("#wwo-bg");

  if (wwoSection && wwoContainer && wwoBg) {
    let wwoTl = gsap.timeline({
      scrollTrigger: {
        trigger: wwoSection,
        start: "top 85%", // Starts expanding when top of section hits 85% of viewport
        end: "top 20%", // Finishes expanding when top hit 20%
        scrub: 1,
      },
    });

    wwoTl.to(
      wwoContainer,
      {
        width: "100%",
        maxWidth: "100%",
        ease: "none",
      },
      0,
    );

    wwoTl.to(
      wwoBg,
      {
        borderRadius: "0px",
        ease: "none",
      },
      0,
    );
  }
});
