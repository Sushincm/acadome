import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { navLinks, heroData, aboutData, wwoHeaderData, wwoCards } from "./data";
import { setupSplitText, setupScrollReveal } from "./utils/animations";
import CoursesSection from "./components/CoursesSection";
import BenefitsSection from "./components/BenefitsSection";
import MentorsSection from "./components/MentorsSection";
import PlacementSection from "./components/PlacementSection";
import ReviewsSection from "./components/ReviewsSection";
import GallerySection from "./components/GallerySection";
import CertificationSection from "./components/CertificationSection";
import MarqueeSection from "./components/MarqueeSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import { FaWhatsapp, FaArrowUp } from "react-icons/fa";



export default function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isNavFloating, setIsNavFloating] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const lenisRef = useRef(null);

  const heroBgImgRef = useRef(null);
  const heroContainerRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroDescRef = useRef(null);
  const heroCtaRef = useRef(null);

  const wwoSectionRef = useRef(null);
  const wwoContainerRef = useRef(null);
  const wwoBgRef = useRef(null);
  const wwoBgImgRef = useRef(null);
  const wwoTitleRef = useRef(null);
  const wwoTagRef = useRef(null);
  const wwoTextRef = useRef(null);
  const wwoRightColRef = useRef(null);
  const wwoCardsRef = useRef(null);

  const aboutTagRef = useRef(null);
  const aboutTitleRef = useRef(null);
  const aboutCtaRef = useRef(null);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1.0,
      smoothWheel: true,
      syncTouch: true,
    });
    lenisRef.current = lenis;
    window.__lenis_instance__ = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    // Context for all GSAP animations
    let ctx = gsap.context(() => {

      // 3. Hero Animations
      if (heroTitleRef.current) {
        setupSplitText(heroTitleRef.current);
      }
      
      if (heroDescRef.current) setupScrollReveal(heroDescRef.current, 0.4);
      if (heroCtaRef.current) setupScrollReveal(heroCtaRef.current, 0.5);

      if (heroBgImgRef.current && heroContainerRef.current) {
        gsap.to(heroBgImgRef.current, {
          y: "15%",
          ease: "none",
          scrollTrigger: {
            trigger: heroContainerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Parallax for marked images
      const parallaxImages = document.querySelectorAll(".parallax-img");
      parallaxImages.forEach((img) => {
        gsap.to(img, {
          y: "15%",
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      // 4. What We Offer Expand Animation & Pinning
      if (wwoSectionRef.current && wwoContainerRef.current && wwoBgRef.current) {
        // Expand Animation (The "Header Strip" expand)
        let wwoTl = gsap.timeline({
          scrollTrigger: {
            trigger: wwoSectionRef.current,
            start: "top 95%",
            end: "top 15%", 
            scrub: 1,
          },
        });

        wwoTl.to(
          wwoBgRef.current,
          {
            scaleX: 1,
            borderRadius: "0px",
            ease: "power2.inOut",
            force3D: true, // GPU acceleration
          },
          0
        );

        if (wwoBgImgRef.current) {
          wwoTl.to(
            wwoBgImgRef.current,
            {
              scaleX: 1,
              ease: "power2.inOut",
              force3D: true,
            },
            0
          );
        }

        // --- Pinning Logic (Responsive) ---
        if (window.innerWidth > 768 && wwoTextRef.current) {
          ScrollTrigger.create({
            trigger: wwoContainerRef.current,
            start: "top 10%", 
            end: "bottom bottom",
            pin: wwoTextRef.current,
            pinSpacing: false,
            scrub: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (wwoTextRef.current) {
                const progress = self.progress;
                if (progress > 0.9) {
                  gsap.set(wwoTextRef.current, { opacity: Math.max(0, 1 - (progress - 0.9) * 10) });
                } else {
                  gsap.set(wwoTextRef.current, { opacity: 1 });
                }
              }
            }
          });
        }
      }

      if (wwoTitleRef.current) setupSplitText(wwoTitleRef.current);
      if (wwoTagRef.current) setupScrollReveal(wwoTagRef.current);
      if (wwoCardsRef.current) setupScrollReveal(wwoCardsRef.current.children);

      // About Section
      if (aboutTagRef.current) setupScrollReveal(aboutTagRef.current);
      if (aboutTitleRef.current) setupScrollReveal(aboutTitleRef.current, 0.2);
      if (aboutCtaRef.current) setupScrollReveal(aboutCtaRef.current, 0.3);
    });

    // Simple scroll listener for Navbar and Top Button (Throttled via state check)
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const navFloating = scrollY > 50;
      const scrollTopVisible = scrollY > 500;

      setIsNavFloating((prev) => (prev !== navFloating ? navFloating : prev));
      setShowScrollTop((prev) => (prev !== scrollTopVisible ? scrollTopVisible : prev));
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
      lenis.destroy();
    };
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    if (!isNavOpen) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  };

  const closeNav = () => {
    if (window.innerWidth <= 768 && isNavOpen) {
      setIsNavOpen(false);
      lenisRef.current?.start();
    }
  };

  const handleAnchorClick = (e, target) => {
    if (target && target.startsWith("#")) {
      e.preventDefault();
      closeNav();
      
      const targetElement = document.querySelector(target);
      if (targetElement) {
        lenisRef.current?.scrollTo(targetElement, { offset: -80 });
      }
    }
  };

  const scrollToTop = () => {
    lenisRef.current?.scrollTo(0, {
      duration: 1.5,
      ease: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
          href="https://wa.me/919778914198"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_4px_14px_rgba(37,211,102,0.4)] hover:bg-[#1ebd5a] hover:scale-110 transition-all duration-300 relative group"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp size={30} />
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 text-white text-[13px] font-medium rounded-lg opacity-0 translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap">
            Chat with us
            <span className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-y-4 border-y-transparent border-l-[6px] border-l-gray-900"></span>
          </span>
        </a>
      </div>

      {/* Navigation Menu */}
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 mx-auto w-full bg-white z-[60] flex items-center py-4 ${isNavFloating ? "nav-floating" : ""}`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center relative">
          <a href="#home" onClick={(e) => handleAnchorClick(e, "#home")} className="flex items-center flex-shrink-0 relative z-20">
            <img src="/images/ACADOME-LOGO.png" alt="Acadome Logo" className="h-7 md:h-8 w-auto object-contain" />
          </a>

          <div className="hidden md:flex items-center gap-8 relative z-20">
            <div className="flex items-center gap-8">
              {navLinks && navLinks.map((link) => (
                <a key={link.id} href={link.href} onClick={(e) => handleAnchorClick(e, link.href)} className="font-body text-[15px] font-medium text-gray-600 hover:text-primary-navy transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
            <a href="#apply" onClick={(e) => handleAnchorClick(e, "#apply")} className="inline-flex items-center justify-center px-5 py-2.5 font-body font-medium text-[14px] rounded-lg border border-primary-navy text-primary-navy hover:bg-accent-red hover:border-accent-red hover:text-white transition-all bg-white shadow-sm">
              Apply Now
            </a>
          </div>

          <button onClick={toggleNav} className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer relative z-50 w-[24px]" aria-label="Toggle navigation">
            <span className="w-full h-[2px] bg-gray-800 transition-all duration-300 origin-center" style={isNavOpen ? { transform: "translateY(7px) rotate(45deg)" } : {}}></span>
            <span className="w-full h-[2px] bg-gray-800 transition-all duration-300 origin-center" style={isNavOpen ? { opacity: "0" } : {}}></span>
            <span className="w-full h-[2px] bg-gray-800 transition-all duration-300 origin-center" style={isNavOpen ? { transform: "translateY(-7px) rotate(-45deg)" } : {}}></span>
          </button>
        </div>

        <div id="nav-links" className={`fixed top-0 left-0 w-full h-screen bg-white z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 ease-in-out md:hidden ${isNavOpen ? "mobile-menu-active" : "mobile-menu-inactive"}`}>
          {navLinks.map((link) => (
            <a key={link.id} href={link.href} onClick={(e) => handleAnchorClick(e, link.href)} className="font-body text-2xl font-medium text-gray-800">
              {link.label}
            </a>
          ))}
          <a href="#apply" onClick={(e) => handleAnchorClick(e, "#apply")} className="inline-flex items-center justify-center px-8 py-3 font-body font-medium text-lg rounded-lg border border-primary-navy bg-primary-navy text-white shadow-sm mt-4 hover:bg-accent-red hover:border-accent-red transition-colors">
            Apply Now
          </a>
        </div>
      </nav>

      <main>
        {/* HERO SECTION */}
        <section id="home" className="relative pt-[35px] md:pt-[100px] px-4 md:px-6 w-full mx-auto min-h-screen flex items-center justify-center">
          <div ref={heroContainerRef} className="relative w-full h-[80vh] min-h-[500px] md:min-h-[600px] rounded-3xl md:rounded-[32px] overflow-hidden flex flex-col justify-end p-6 md:p-12 lg:p-16 isolate">
            <div className="absolute w-[100%] h-[120%] top-[-10%] left-0 z-0">
              <img ref={heroBgImgRef} src="/images/hero-img.webp" alt="Background" className="w-full h-full object-cover origin-center" />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between w-full mt-auto gap-8 pt-[200px]">
              <div className="max-w-[750px]">
                <h1 ref={heroTitleRef} className="font-heading font-semibold text-[40px] md:text-[50px] lg:text-[55px] leading-[1.05] tracking-tight text-white m-0">
                  {heroData.title}
                </h1>
              </div>
              <div className="max-w-[420px] flex flex-col items-start text-left">
                <p ref={heroDescRef} className="text-[16px] md:text-[17px] text-white/90 mb-6 leading-relaxed">{heroData.description}</p>
                <a ref={heroCtaRef} href={heroData.buttonLink} onClick={(e) => handleAnchorClick(e, heroData.buttonLink)} className="inline-flex items-center justify-center px-6 py-3 font-body font-semibold text-[15px] bg-white text-gray-900 rounded-lg hover:bg-accent-red hover:text-white transition-colors shadow-sm">{heroData.buttonText}</a>
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section
          id="about"
          className="py-16 md:py-24 lg:py-32 px-4 md:px-6 w-full mx-auto bg-white flex flex-col items-center justify-center relative"
        >
          <div className="container max-w-[1100px] flex flex-col items-center text-center">
            {/* Small Strip Tag */}
            <div ref={aboutTagRef} className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg bg-gray-50 text-[13px] font-medium text-gray-500 mb-6 uppercase tracking-widest shadow-sm">
              {aboutData.tag}
            </div>

            {/* Main Text with Inline Images */}
            <h2 ref={aboutTitleRef} className="font-body text-[26px] md:text-[40px] lg:text-[48px] xl:text-[52px] leading-[1.45] md:leading-[1.4] text-[#333333] font-normal tracking-[-0.02em] max-w-[1000px]">
              {aboutData?.descriptionParts?.map((part, index) =>
                part.isImage ? (
                  <span
                    key={index}
                    className="inline-block align-middle mx-1 md:mx-2 w-[70px] md:w-[110px] xl:w-[124px] h-[36px] md:h-[50px] xl:h-[58px] rounded-full overflow-hidden shadow-sm mt-[-5px] relative"
                  >
                    <img
                      src={part.imageSrc}
                      alt={part.alt}
                      loading="lazy"
                      className="absolute w-full h-[120%] -top-[10%] left-0 object-cover parallax-img"
                    />
                  </span>
                ) : (
                  <span key={index}>{part.text}</span>
                ),
              )}
            </h2>

            {/* CTA Button */}
            <div ref={aboutCtaRef} className="mt-12 md:mt-16 w-full max-w-[1000px] flex justify-center">
              <a
                href={aboutData.buttonLink}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-primary-navy text-white font-body text-[14px] font-medium hover:bg-accent-red transition-colors gap-3 cursor-pointer shadow-md hover:shadow-lg"
              >
                {aboutData.buttonText}
                <span className="text-lg leading-none">&rarr;</span>
              </a>
            </div>
          </div>
        </section>

        {/* What We Offer Section */}
        <section
          id="wwo-section"
          ref={wwoSectionRef}
          className="w-full bg-white relative pt-12 md:pt-20"
        >
          <div
            id="wwo-container"
            ref={wwoContainerRef}
            className="relative mx-auto w-full min-h-[100vh]"
          >
            {/* Animated Background */}
            <div
              id="wwo-bg"
              ref={wwoBgRef}
              className="absolute top-0 left-0 w-full h-full z-0 rounded-[2rem] md:rounded-[40px] overflow-hidden origin-center"
              style={{ transform: "scaleX(0.9)" }}
            >
              <img
                ref={wwoBgImgRef}
                src="/images/what-we-offer.webp"
                alt="What We Offer Header"
                loading="lazy"
                className="absolute w-full h-[120%] -top-[10%] left-0 object-cover origin-center parallax-img"
                style={{ transform: "scaleX(1.111)" }}
              />
              <div className="absolute inset-0 bg-[#0A1628]/95"></div>
            </div>

            {/* Content Wrapper */}
            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row gap-12 lg:gap-20 py-16 md:py-24 lg:py-32">
              {/* Left Col (Text block pinned by GSAP) */}
              <div className="w-full md:w-[45%]">
                <div
                  ref={wwoTextRef}
                  className="text-left mb-12 md:mb-0 relative max-w-full"
                >
                  <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg border border-white/20 bg-white/10 text-[13px] font-medium text-white mb-6 uppercase tracking-widest shadow-sm" ref={wwoTagRef}>
                    {wwoHeaderData.tag}
                  </div>
                  <h2
                    ref={wwoTitleRef}
                    className="text-white font-heading font-semibold text-[32px] md:text-[2rem] lg:text-[2.5rem] leading-[1.15] tracking-tight"
                  >
                    {wwoHeaderData.title}
                  </h2>
                </div>
              </div>

              {/* Right Col (Scrollable Cards) */}
              <div
                ref={wwoRightColRef}
                className="w-full md:w-[55%] flex flex-col gap-6 md:gap-8 mt-4 md:mt-16"
              >
                <div ref={wwoCardsRef} className="flex flex-col gap-6 md:gap-8">
                {wwoCards && wwoCards.map((card) => (
                  <div
                    key={card.id}
                    className="bg-white/15 rounded-2xl md:rounded-[24px] p-8 lg:p-10 border border-white/20 text-white transform hover:-translate-y-2 transition-transform duration-300"
                  >
                    <h3 className="text-[22px] md:text-[26px] font-semibold font-heading mb-4 text-white">
                      {card.title}
                    </h3>
                    <p className="text-[15px] md:text-[16px] text-white/80 leading-relaxed mb-8">
                      {card.description}
                    </p>
                    <a
                      href={card.buttonLink}
                      onClick={(e) => handleAnchorClick(e, card.buttonLink)}
                      className="inline-flex items-center text-white/90 hover:text-white font-medium text-[15px] group transition-colors"
                    >
                      {card.buttonText}
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">
                        &rarr;
                      </span>
                    </a>
                  </div>
                ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MODULAR SECTIONS */}
        <CoursesSection />
        <CertificationSection />
        <BenefitsSection />
        <MarqueeSection />
        <MentorsSection />
        <PlacementSection />
        <ReviewsSection />
        <GallerySection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}
