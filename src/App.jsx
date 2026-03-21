import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { navLinks, heroData, aboutData, wwoHeaderData, wwoCards } from './data';
import CoursesSection from './components/CoursesSection';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isNavFloating, setIsNavFloating] = useState(false);
  const lenisRef = useRef(null);
  
  const heroBgImgRef = useRef(null);
  const heroContainerRef = useRef(null);
  
  const wwoSectionRef = useRef(null);
  const wwoContainerRef = useRef(null);
  const wwoBgRef = useRef(null);
  const wwoBgImgRef = useRef(null);
  
  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1.0,
      smoothWheel: true,
      syncTouch: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
    
    // Scroll styling for navbar
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsNavFloating(true);
      } else {
        setIsNavFloating(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // 3. GSAP Parallax for Hero image
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

    // Generic Parallax for all images flagged with .parallax-img
    const parallaxImages = document.querySelectorAll('.parallax-img');
    parallaxImages.forEach((img) => {
      gsap.to(img, {
        y: "15%", // Movement range
        ease: "none",
        scrollTrigger: {
          trigger: img.parentElement, // Triggered by their wrapper
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    // 4. What We Offer Section Expand Animation
    if (wwoSectionRef.current && wwoContainerRef.current && wwoBgRef.current) {
      let wwoTl = gsap.timeline({
        scrollTrigger: {
          trigger: wwoSectionRef.current,
          start: "top 85%",
          end: "top 20%",
          scrub: 1,
        },
      });

      wwoTl.to(
        wwoBgRef.current,
        {
          scaleX: 1,
          borderRadius: "0px",
          ease: "none",
        },
        0
      );

      if (wwoBgImgRef.current) {
        wwoTl.to(
          wwoBgImgRef.current,
          {
            scaleX: 1,
            ease: "none",
          },
          0
        );
      }
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      ScrollTrigger.getAll().forEach(t => t.kill());
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
    e.preventDefault();
    if (target && target !== '#') {
      lenisRef.current?.scrollTo(target, { offset: -80 });
      closeNav();
    }
  };

  return (
    <div className="font-body text-[16px] leading-[1.6] text-dark-text bg-white overflow-x-hidden">
      {/* Navigation Menu */}
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 mx-auto w-full bg-white z-50 transition-all duration-300 py-4 ${isNavFloating ? 'nav-floating' : ''}`}
        style={isNavFloating ? { padding: '' } : undefined}
      >
        <div className="container mx-auto px-6 flex justify-between items-center relative">
          {/* Logo */}
          <a href="#home" onClick={(e) => handleAnchorClick(e, '#home')} className="flex items-center flex-shrink-0 relative z-20">
            <img
              src="/images/ACADOME-LOGO.png"
              alt="Acadome Logo"
              className="h-7 md:h-8 w-auto object-contain"
            />
          </a>

          {/* Desktop Links & CTA (Right) */}
          <div className="hidden md:flex items-center gap-8 relative z-20">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="font-body text-[15px] font-medium text-gray-600 hover:text-primary-navy transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <a
              href="#apply"
              onClick={(e) => handleAnchorClick(e, '#apply')}
              className="inline-flex items-center justify-center px-5 py-2.5 font-body font-medium text-[14px] rounded-lg border border-primary-navy text-primary-navy hover:bg-accent-red hover:border-accent-red hover:text-white transition-all bg-white shadow-sm"
            >
              Apply Now
            </a>
          </div>

          {/* Mobile Toggle Button */}
          <button
            id="mobile-toggle"
            onClick={toggleNav}
            className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer relative z-50 w-[24px]"
            aria-label="Toggle navigation"
          >
            <span
              className="w-full h-[2px] bg-gray-800 transition-all duration-300 origin-center"
              style={isNavOpen ? { transform: 'translateY(7px) rotate(45deg)' } : {}}
            ></span>
            <span
              className="w-full h-[2px] bg-gray-800 transition-all duration-300 origin-center"
              style={isNavOpen ? { opacity: '0' } : {}}
            ></span>
            <span
              className="w-full h-[2px] bg-gray-800 transition-all duration-300 origin-center"
              style={isNavOpen ? { transform: 'translateY(-7px) rotate(-45deg)' } : {}}
            ></span>
          </button>
        </div>

        {/* Mobile Links */}
        <div
          id="nav-links"
          className={`fixed top-0 left-0 w-full h-screen bg-white z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 ease-in-out md:hidden ${isNavOpen ? 'mobile-menu-active' : 'mobile-menu-inactive'}`}
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => handleAnchorClick(e, link.href)}
              className="font-body text-2xl font-medium text-gray-800"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#apply"
            onClick={(e) => handleAnchorClick(e, '#apply')}
            className="inline-flex items-center justify-center px-8 py-3 font-body font-medium text-lg rounded-lg border border-primary-navy bg-primary-navy text-white shadow-sm mt-4 hover:bg-accent-red hover:border-accent-red transition-colors"
          >
            Apply Now
          </a>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section
          id="home"
          className="relative pt-[35px] md:pt-[100px] px-4 md:px-6 w-full mx-auto min-h-screen flex items-center justify-center"
        >
          <div
            id="hero-container"
            ref={heroContainerRef}
            className="relative w-full h-[80vh] min-h-[500px] md:min-h-[600px] rounded-3xl md:rounded-[32px] overflow-hidden flex flex-col justify-end p-6 md:p-12 lg:p-16 isolate"
          >
            {/* Parallax Background Image */}
            <div
              id="hero-bg"
              className="absolute w-[100%] h-[120%] top-[-10%] left-0 z-0"
            >
              <img
                ref={heroBgImgRef}
                src="/images/hero-img.webp"
                alt="Background"
                className="w-full h-full object-cover origin-center"
              />
              {/* Dark Overlay for Readability */}
              <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Hero Content */}
            <div
              className="relative z-10 flex flex-col md:flex-row md:items-end justify-between w-full mt-auto gap-8 pt-[200px]"
            >
              {/* Left Side Title */}
              <div className="max-w-[750px]">
                <h1
                  className="font-heading font-semibold text-[40px] md:text-[50px] lg:text-[55px] leading-[1.05] tracking-tight text-white m-0"
                >
                  {heroData.title}
                </h1>
              </div>

              {/* Right Side CTA */}
              <div
                className="max-w-[420px] flex flex-col items-start md:items-start text-left"
              >
                <p
                  className="text-[16px] md:text-[17px] text-white/90 mb-6 leading-relaxed"
                >
                  {heroData.description}
                </p>
                <a
                  href={heroData.buttonLink}
                  onClick={(e) => handleAnchorClick(e, heroData.buttonLink)}
                  className="inline-flex items-center justify-center px-6 py-3 font-body font-semibold text-[15px] bg-white text-gray-900 rounded-lg hover:bg-accent-red hover:text-white transition-colors shadow-sm"
                >
                  {heroData.buttonText}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section
          id="about"
          className="py-[80px] md:py-[5%] px-4 md:px-6 w-full mx-auto bg-white flex flex-col items-center justify-center relative"
        >
          <div
            className="container max-w-[1100px] flex flex-col items-center text-center"
          >
            {/* Small Strip Tag */}
            <div
              className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-gray-50 text-[13px] font-medium text-gray-500 mb-10 uppercase tracking-widest shadow-sm"
            >
              {aboutData.tag}
            </div>

            {/* Main Text with Inline Images */}
            <h2
              className="font-body text-[26px] md:text-[40px] lg:text-[48px] xl:text-[52px] leading-[1.45] md:leading-[1.4] text-[#333333] font-normal tracking-[-0.02em] max-w-[1000px]"
            >
              {aboutData.descriptionParts.map((part, index) => (
                part.isImage ? (
                  <span
                    key={index}
                    className="inline-block align-middle mx-1 md:mx-2 w-[70px] md:w-[110px] xl:w-[124px] h-[36px] md:h-[50px] xl:h-[58px] rounded-full overflow-hidden shadow-sm mt-[-5px] relative"
                  >
                    <img
                      src={part.imageSrc}
                      alt={part.alt}
                      className="absolute w-full h-[120%] -top-[10%] left-0 object-cover parallax-img"
                    />
                  </span>
                ) : (
                  <span key={index}>{part.text}</span>
                )
              ))}
            </h2>

            {/* CTA Button */}
            <div className="mt-12 md:mt-16 w-full max-w-[1000px] flex justify-center">
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
        <section id="wwo-section" ref={wwoSectionRef} className="w-full bg-white relative py-12 md:py-20">
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
              style={{ transform: 'scaleX(0.9)' }}
            >
              <img
                ref={wwoBgImgRef}
                src="/images/what-we-offer.webp"
                alt="What We Offer Header"
                className="absolute w-full h-[120%] -top-[10%] left-0 object-cover origin-center parallax-img"
                style={{ transform: 'scaleX(1.111)' }}
              />
              <div className="absolute inset-0 bg-[#0A1628]/95"></div>
            </div>

            {/* Content Wrapper */}
            <div
              className="relative z-10 w-full max-w-[1200px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row gap-12 lg:gap-20 pt-16 md:pt-24 lg:pt-32 pb-16 md:pb-32"
            >
              {/* Left Col (Sticky text) */}
              <div className="w-full md:w-[45%]">
                <div className="md:sticky md:top-36 text-left">
                  <div
                    className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-[13px] font-medium text-white mb-8 uppercase tracking-widest shadow-sm"
                  >
                    {wwoHeaderData.tag}
                  </div>
                  <h2
                    className="text-white font-heading font-semibold text-[32px] md:text-[2rem] lg:text-[2.5rem] leading-[1.15] tracking-tight"
                  >
                    {wwoHeaderData.title}
                  </h2>
                </div>
              </div>

              {/* Right Col (Scrollable Cards) */}
              <div
                className="w-full md:w-[55%] flex flex-col gap-6 md:gap-8 mt-4 md:mt-16"
              >
                {wwoCards.map((card) => (
                  <div
                    key={card.id}
                    className="bg-white/15 rounded-2xl md:rounded-[24px] p-8 lg:p-10 border border-white/20 text-white transform hover:-translate-y-2 transition-transform duration-300"
                  >
                    <h3
                      className="text-[22px] md:text-[26px] font-semibold font-heading mb-4 text-white"
                    >
                      {card.title}
                    </h3>
                    <p
                      className="text-[15px] md:text-[16px] text-white/80 leading-relaxed mb-8"
                    >
                      {card.description}
                    </p>
                    <a
                      href={card.buttonLink}
                      onClick={(e) => handleAnchorClick(e, card.buttonLink)}
                      className="inline-flex items-center text-white/90 hover:text-white font-medium text-[15px] group transition-colors"
                    >
                      {card.buttonText}
                      <span
                        className="ml-2 group-hover:translate-x-1 transition-transform"
                        >&rarr;</span
                      >
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <CoursesSection />
      </main>
    </div>
  );
}
