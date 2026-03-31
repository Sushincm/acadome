import { useEffect, useRef } from "react";
import { heroData, aboutData, wwoHeaderData, wwoCards } from "../data";
import { setupSplitText, setupScrollReveal } from "../utils/animations";
import CoursesSection from "../components/CoursesSection";
import BenefitsSection from "../components/BenefitsSection";
import PlacementSection from "../components/PlacementSection";
import ReviewsSection from "../components/ReviewsSection";
import GallerySection from "../components/GallerySection";
import MarqueeSection from "../components/MarqueeSection";
import ContactSection from "../components/ContactSection";

export default function Home() {
  const heroContainerRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroDescRef = useRef(null);
  const heroCtaRef = useRef(null);

  const wwoSectionRef = useRef(null);
  const wwoTagRef = useRef(null);
  const wwoTitleRef = useRef(null);
  const wwoCardsRef = useRef(null);

  const aboutTagRef = useRef(null);
  const aboutTitleRef = useRef(null);
  const aboutCtaRef = useRef(null);

  useEffect(() => {
    // 1. Hero Reveals
    if (heroTitleRef.current) setupSplitText(heroTitleRef.current);
    if (heroDescRef.current) setupScrollReveal(heroDescRef.current, 0.4);
    if (heroCtaRef.current) setupScrollReveal(heroCtaRef.current, 0.5);

    // 2. About Section Reveals
    if (aboutTagRef.current) setupScrollReveal(aboutTagRef.current);
    if (aboutTitleRef.current) setupScrollReveal(aboutTitleRef.current, 0.2);
    if (aboutCtaRef.current) setupScrollReveal(aboutCtaRef.current, 0.3);

    // 3. What We Offer Reveals
    if (wwoTagRef.current) setupScrollReveal(wwoTagRef.current);
    if (wwoTitleRef.current) setupSplitText(wwoTitleRef.current);
    if (wwoCardsRef.current) setupScrollReveal(wwoCardsRef.current.children, 0.1);
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section id="home" className="relative pt-[115px] md:pt-[145px] px-4 md:px-6 w-full mx-auto min-h-screen flex items-center justify-center">
        <div ref={heroContainerRef} className="relative w-full h-[80vh] min-h-[500px] md:min-h-[600px] rounded-3xl md:rounded-[48px] overflow-hidden flex flex-col justify-end p-6 md:p-14 lg:p-20 isolate bg-gray-900 shadow-2xl">
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/hero-img.webp" 
              alt="Background" 
              className="w-full h-full object-cover origin-center" 
            />
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
              <a ref={heroCtaRef} href={heroData.buttonLink} className="inline-flex items-center justify-center px-6 py-3 font-body font-semibold text-[15px] bg-white text-gray-900 rounded-lg hover:bg-accent-red hover:text-white transition-colors shadow-sm">{heroData.buttonText}</a>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section
        id="about"
        className="py-24 md:py-32 lg:py-44 px-4 md:px-6 w-full mx-auto bg-white flex flex-col items-center justify-center relative"
      >
        <div className="container max-w-[1100px] flex flex-col items-center text-center">
          <div ref={aboutTagRef} className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg bg-gray-50 text-[13px] font-medium text-gray-500 mb-8 md:mb-10 uppercase tracking-widest shadow-sm">
            {aboutData.tag}
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
                <span key={index}>{part.text}</span>
              ),
            )}
          </h2>

          <div ref={aboutCtaRef} className="mt-12 md:mt-16 w-full max-w-[1000px] flex justify-center">
            <a
              href="/about-us"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-primary-navy text-white font-body text-[14px] font-medium hover:bg-accent-red transition-colors gap-3 cursor-pointer shadow-md hover:shadow-lg"
            >
              {aboutData.buttonText}
              <span className="text-lg leading-none">&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* What We Offer Section - Native sticky & reveal optimization */}
      <section
        id="wwo-section"
        ref={wwoSectionRef}
        className="w-full bg-white relative pt-12 md:pt-20"
      >
        <div className="relative mx-auto w-full">
          {/* Static Background for Performance on low-end */}
          <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
            <img
              src="/images/what-we-offer.webp"
              alt="What We Offer Header"
              loading="lazy"
              className="absolute w-full h-full object-cover opacity-100"
            />
            <div className="absolute inset-0 bg-[#0A1628]/95"></div>
          </div>

          {/* Content Wrapper */}
          <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row gap-12 lg:gap-20 py-16 md:py-24 lg:py-32">
            {/* Left Col (Native CSS Sticky) */}
            <div className="w-full md:w-[45%]">
              <div className="md:sticky md:top-32 text-left mb-12 md:mb-0 relative max-w-full">
                <div 
                  ref={wwoTagRef}
                  className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg border border-white/20 bg-white/10 text-[13px] font-medium text-white mb-6 uppercase tracking-widest shadow-sm"
                >
                  {wwoHeaderData.tag}
                </div>
                <h2
                  ref={wwoTitleRef}
                  className="text-white font-heading font-semibold text-[28px] md:text-[36px] lg:text-[42px] leading-[1.15] tracking-tight"
                >
                  {wwoHeaderData.title}
                </h2>
              </div>
            </div>

            {/* Right Col (Scrollable Cards) */}
            <div className="w-full md:w-[55%] flex flex-col gap-10 md:gap-14 mt-4">
              <div ref={wwoCardsRef} className="flex flex-col gap-10 md:gap-14">
              {wwoCards && wwoCards.map((card) => (
                <div
                  key={card.id}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl md:rounded-[40px] p-8 md:p-14 border border-white/20 text-white hover:bg-white/15 transition-all duration-300 shadow-xl"
                >
                  <h3 className="text-[22px] md:text-[28px] font-bold font-heading mb-4 text-white">
                    {card.title}
                  </h3>
                  <p className="text-[15px] md:text-[17px] text-white/80 leading-relaxed mb-8">
                    {card.description}
                  </p>
                  <a
                    href={card.buttonLink}
                    className="inline-flex items-center px-6 py-3.5 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white hover:text-primary-navy font-semibold text-[15px] group transition-all duration-300"
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

