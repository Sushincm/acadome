import { useEffect, useRef } from 'react';
import { setupSplitText, setupScrollReveal } from '../utils/animations';

export default function MarqueeSection() {
  const titleRef = useRef(null);
  const tagRef = useRef(null);
  const descRef = useRef(null);
  const trackRef = useRef(null);

  const logos = [
    "/images/marquee-logos/marquee-logo-1.png",
    "/images/marquee-logos/marquee-logo-2.png",
    "/images/marquee-logos/marquee-logo-3.png",
    "/images/marquee-logos/marquee-logo-4.png",
    "/images/marquee-logos/marquee-logo-5.jpeg",
    "/images/marquee-logos/marquee-logo-6.png",
  ];

  const trackLogos = [...logos, ...logos];

  useEffect(() => {
    if (tagRef.current) setupScrollReveal(tagRef.current);
    if (titleRef.current) setupSplitText(titleRef.current);
    if (descRef.current) setupScrollReveal(descRef.current, 0.2);
    if (trackRef.current) setupScrollReveal(trackRef.current, 0.3);
  }, []);

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-[#F7F8FA] w-full mx-auto flex flex-col items-center justify-center overflow-hidden border-y border-gray-100">
      <div className="container max-w-[1200px] flex flex-col items-center text-center px-4 md:px-6 mb-12 flex-shrink-0">
        <div
          ref={tagRef}
          className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg bg-white border border-gray-100 text-[13px] font-medium text-gray-500 mb-6 uppercase tracking-widest shadow-sm"
        >
          Our Technologies
        </div>
        <h2
          ref={titleRef}
          className="font-heading font-bold text-[32px] md:text-[40px] lg:text-[44px] leading-[1.15] text-[#111827] mb-6"
        >
          Cloud-based Accounting Softwares We Teach
        </h2>
        <p
          ref={descRef}
          className="font-body text-accent-red text-[16px] md:text-[18px] max-w-[800px] leading-relaxed font-bold bg-accent-red/5 px-6 py-3 rounded-2xl border border-accent-red/10 animate-pulse-subtle"
        >
          Step into Global Careers with Fully Free Internship Opportunities in Gulf Countries
        </p>
      </div>

      {/* Marquee Edge Fading Mask Component */}
      <div
        ref={trackRef}
        className="w-full max-w-[1600px] mx-auto relative overflow-hidden flex"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
        }}
      >
        {/* Continuous Track */}
        <div className="flex w-max animate-marquee hover:![animation-play-state:paused] cursor-default transition-transform ease-linear">
          {trackLogos.map((src, i) => (
            <div key={i} className="flex items-center">
              <div className="px-10 md:px-12 flex items-center justify-center">
                <img
                  src={src}
                  alt={`Software Partner ${i}`}
                  loading="lazy"
                  className="h-[60px] w-auto object-contain max-w-[170px] mix-blend-multiply"
                />
              </div>
              <div className="h-[24px] w-[1px] bg-gray-400 opacity-20"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
