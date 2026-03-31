import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaWhatsapp, FaArrowUp } from "react-icons/fa";

export default function Layout({ children }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isNavFloating, setIsNavFloating] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const lenisRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // 1. Initialize Lenis only on Desktop (Mimicking Webflow/Wix behavior)
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    let lenis = null;
    let rafId = null;

    if (!isMobile) {
      lenis = new Lenis({
        lerp: 0.12, // Faster, more responsive feel
        wheelMultiplier: 1.1,
        smoothWheel: true,
      });
      lenisRef.current = lenis;
      window.__lenis_instance__ = lenis;

      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }

    // 2. Scroll to top on route change
    window.scrollTo(0, 0);
    if (lenis) lenis.scrollTo(0, { immediate: true });

    // 3. Simple scroll listener for Navbar and Top Button
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const navFloating = scrollY > 50;
      const scrollTopVisible = scrollY > 500;

      setIsNavFloating(navFloating);
      setShowScrollTop(scrollTopVisible);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) {
        lenis.destroy();
        lenisRef.current = null;
      }
    };
  }, [location.pathname]);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    if (!isNavOpen) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  };

  const closeNav = () => {
    setIsNavOpen(false);
    lenisRef.current?.start();
  };

  const scrollToTop = () => {
    lenisRef.current?.scrollTo(0, {
      duration: 1.5,
      // Custom ease: outQuart alternative for native scroll
    });
  };

  return (
    <div className="font-body text-[16px] leading-[1.6] text-dark-text bg-white">
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-center gap-3">
        <button
          onClick={scrollToTop}
          className={`flex items-center justify-center w-12 h-12 rounded-full bg-primary-navy text-white shadow-[0_4px_14px_rgba(15,39,71,0.25)] hover:bg-accent-red hover:shadow-[0_4px_14px_rgba(230,57,70,0.4)] hover:scale-110 hover:-translate-y-1 transition-all duration-300 ${showScrollTop ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-10 pointer-events-none"}`}
          aria-label="Scroll to top"
        >
          <FaArrowUp size={18} />
        </button>

        <a
          href="https://wa.me/919778914198?text=Hi, I'm interested in learning more about Acadome courses"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-[52px] h-[52px] rounded-full bg-primary-navy text-white shadow-[0_4px_14px_rgba(10,22,40,0.4)] hover:bg-accent-red hover:scale-110 transition-all duration-300 relative group animate-bounce-subtle"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp size={26} />
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 text-white text-[13px] font-medium rounded-lg opacity-0 translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap">
            Chat with us
            <span className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-l-[6px] border-l-gray-900"></span>
          </span>
        </a>
      </div>

      <Navbar 
        isNavOpen={isNavOpen} 
        setIsNavOpen={setIsNavOpen} 
        isNavFloating={isNavFloating} 
        toggleNav={toggleNav} 
        closeNav={closeNav} 
        lenisRef={lenisRef}
      />

      <main>
        {children}
      </main>

      <Footer />
    </div>
  );
}
