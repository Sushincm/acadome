import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroData, aboutData, wwoHeaderData, wwoCards } from "../data";
import { setupSplitText, setupScrollReveal } from "../utils/animations";
import SEO from "../components/SEO";
import CoursesSection from "../components/CoursesSection";
import BenefitsSection from "../components/BenefitsSection";
import PlacementSection from "../components/PlacementSection";
import ReviewsSection from "../components/ReviewsSection";
import GallerySection from "../components/GallerySection";
import MarqueeSection from "../components/MarqueeSection";
import ContactSection from "../components/ContactSection";
import { highlightBrand } from "../utils/textUtils";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroContainerRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroDescRef = useRef(null);
  const heroCtaRef = useRef(null);

  const wwoSectionRef = useRef(null);
  const wwoContainerRef = useRef(null);
  const wwoBgRef = useRef(null);
  const wwoBgImgRef = useRef(null);
  const wwoTextRef = useRef(null);
  const wwoTagRef = useRef(null);
  const wwoTitleRef = useRef(null);
  const wwoCardsRef = useRef(null);

  const aboutTagRef = useRef(null);
  const aboutTitleRef = useRef(null);
  const aboutCtaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Reveals
      if (heroTitleRef.current) setupSplitText(heroTitleRef.current);
      if (heroDescRef.current) setupScrollReveal(heroDescRef.current, 0.4);
      if (heroCtaRef.current) setupScrollReveal(heroCtaRef.current, 0.5);

      // Hero Image Slider Loop
      const slides = gsap.utils.toArray('.hero-slide');
      if (slides.length > 0) {
        let current = 0;
        const cycleSlides = () => {
          const next = (current + 1) % slides.length;
          
          gsap.timeline()
            .to(slides[current], { opacity: 0, duration: 1.5, ease: "power2.inOut" })
            .fromTo(slides[next], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }, "-=1.2");

          current = next;
          gsap.delayedCall(5, cycleSlides);
        };
        gsap.delayedCall(5, cycleSlides);
      }

      // 2. About Section Reveals
      if (aboutTagRef.current) setupScrollReveal(aboutTagRef.current);
      if (aboutTitleRef.current) setupScrollReveal(aboutTitleRef.current, 0.2);
      if (aboutCtaRef.current) setupScrollReveal(aboutCtaRef.current, 0.3);

      // 3. What We Offer Expand Animation & Pinning
      if (wwoSectionRef.current && wwoContainerRef.current && wwoBgRef.current) {
        // Expand Animation
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

      }

      if (wwoTitleRef.current) setupSplitText(wwoTitleRef.current);
      if (wwoTagRef.current) setupScrollReveal(wwoTagRef.current);
      if (wwoCardsRef.current) setupScrollReveal(wwoCardsRef.current.children);
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section id="home" className="relative pt-6 md:pt-28 px-0 md:px-6 w-full mx-auto flex items-center justify-center">
        <div ref={heroContainerRef} className="relative w-full min-h-[80vh] h-auto rounded-3xl md:rounded-[48px] overflow-hidden flex flex-col justify-end p-6 py-20 md:p-14 lg:p-20 isolate bg-gray-900 shadow-2xl">
          <div className="absolute inset-0 z-0">
            {/* Background Image Slider */}
            {[
              "/images/hero-img.webp",
              "/images/hero-img-2.webp",
              "/images/hero-img-3.webp"
            ].map((src, index) => (
              <div 
                key={index}
                className={`hero-slide absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === 0 ? 'opacity-100' : 'opacity-0'}`}
              >
                <img 
                  src={src} 
                  alt={`Slide ${index + 1}`} 
                  className="w-full h-full object-cover origin-center" 
                  fetchpriority={index === 0 ? 'high' : 'low'}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between w-full mt-auto gap-8 pt-20 md:pt-[200px]">
            <div className="max-w-[750px]">
              <h1 ref={heroTitleRef} className="font-heading font-semibold text-[40px] md:text-[50px] lg:text-[55px] leading-[1.2] tracking-tight text-white m-0 whitespace-normal break-words max-w-[720px]">
                {highlightBrand(heroData.title)}
              </h1>
            </div>
            <div className="max-w-[420px] flex flex-col items-start text-left">
              <p ref={heroDescRef} className="text-[16px] md:text-[17px] text-white/90 mb-0 leading-relaxed">{highlightBrand(heroData.description)}</p>
              <a 
                ref={heroCtaRef}
                href="https://wa.me/919778914198?text=Hi%20ACADOME%2C%20I'd%20like%20to%20get%20more%20details%20about%20your%20courses." 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center px-8 py-3.5 bg-white text-primary-navy font-body font-bold text-[14px] rounded-lg hover:bg-accent-red hover:text-white transition-all duration-300 shadow-lg group"
              >
                Get course details on WhatsApp
                <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section
        id="about"
        className="py-16 md:py-20 lg:py-32 px-4 md:px-6 w-full mx-auto bg-white flex flex-col items-center justify-center relative"
      >
        <div className="container max-w-[1100px] flex flex-col items-center text-center">
          <div ref={aboutTagRef} className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg bg-gray-50 text-[13px] font-medium text-gray-500 mb-8 md:mb-10 uppercase tracking-widest shadow-sm">
            {highlightBrand(aboutData.tag)}
          </div>

          <h2 ref={aboutTitleRef} className="font-body text-[26px] md:text-[40px] lg:text-[48px] xl:text-[52px] leading-[1.6] md:leading-[1.5] text-[#333333] font-normal tracking-[-0.02em] max-w-[1050px]">
            {aboutData?.descriptionParts?.map((part, index) =>
              part.isImage ? (
                <span
                  key={index}
                  className="inline-block align-middle mx-3 md:mx-4 lg:mx-6 w-[70px] md:w-[110px] xl:w-[124px] h-[36px] md:h-[50px] xl:h-[58px] rounded-full overflow-hidden shadow-md -mt-1 md:-mt-2 relative"
                >
                  <img
                    src={part.imageSrc}
                    alt={part.alt}
                    loading="lazy"
                    className="absolute w-full h-full object-cover"
                  />
                </span>
              ) : (
                <span key={index}>{highlightBrand(part.text)}</span>
              ),
            )}
          </h2>

          <div ref={aboutCtaRef} className="mt-12 md:mt-16 w-full max-w-[1000px] flex justify-center">
            <Link
              to="/about-us"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-primary-navy text-white font-body text-[14px] font-medium hover:bg-accent-red transition-colors gap-3 cursor-pointer shadow-md hover:shadow-lg"
            >
              {aboutData.buttonText}
              <span className="text-lg leading-none">&rarr;</span>
            </Link>
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
              className="absolute w-full h-[120%] -top-[10%] left-0 object-cover origin-center"
              style={{ transform: "scaleX(1.111)" }}
            />
            <div className="absolute inset-0 bg-[#0A1628]/95"></div>
          </div>

          {/* Content Wrapper */}
          <div className="relative z-10 w-full max-w-[1240px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row gap-12 lg:gap-20 py-16 md:py-24 lg:py-32">
            {/* Left Col (Stretched track for sticky content) */}
            <div className="w-full md:w-[45%] relative">
              <div
                ref={wwoTextRef}
                className="text-left mb-12 md:mb-0 relative max-w-[90%] md:max-w-full md:sticky md:top-32 lg:top-40"
              >
                <div 
                  ref={wwoTagRef}
                  className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg border border-white/20 bg-white/10 text-[13px] font-medium text-white mb-6 uppercase tracking-widest shadow-sm"
                >
                  {wwoHeaderData.tag}
                </div>
                <h2
                  ref={wwoTitleRef}
                  className="text-white font-heading font-semibold text-[32px] md:text-[2rem] lg:text-[2.5rem] leading-[1.15] tracking-tight whitespace-normal break-words"
                >
                  {highlightBrand(wwoHeaderData.title)}
                </h2>
              </div>
            </div>

            {/* Right Col (Scrollable Cards) */}
            <div className="w-full md:w-[55%] flex flex-col gap-6 md:gap-8 mt-4 md:mt-16">
              <div ref={wwoCardsRef} className="flex flex-col gap-6 md:gap-8">
              {wwoCards && wwoCards.map((card) => (
                <div
                  key={card.id}
                  className="bg-white/15 rounded-2xl md:rounded-[24px] p-8 lg:p-10 border border-white/20 text-white transform hover:-translate-y-2 transition-transform duration-300"
                >
                  <h3 className="text-[22px] md:text-[26px] font-semibold font-heading mb-4 text-white">
                    {highlightBrand(card.title)}
                  </h3>
                  <p className="text-[15px] md:text-[16px] text-white/80 leading-relaxed mb-8">
                    {highlightBrand(card.description)}
                  </p>
                  <Link
                    to={card.buttonLink}
                    className="inline-flex items-center text-white/90 hover:text-white font-medium text-[15px] group transition-colors"
                  >
                    {card.buttonText}
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">
                      &rarr;
                    </span>
                  </Link>
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CoursesSection />
      <BenefitsSection />
      <MarqueeSection />
      <PlacementSection />
      <ReviewsSection />
      <GallerySection isHome={true} />
      <ContactSection showMap={false} />
    </>
  );
}

