import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
    // Split text helper
    const splitTextIntoSpans = (element) => {
      const text = element.innerText;
      element.innerHTML = "";
      return text.split("").map((char) => {
        const outer = document.createElement("span");
        outer.style.cssText = "display:inline-block; overflow:hidden; vertical-align:bottom;";
        const inner = document.createElement("span");
        inner.style.cssText = "display:inline-block;";
        inner.textContent = char === " " ? "\u00A0" : char;
        outer.appendChild(inner);
        element.appendChild(outer);
        return inner;
      });
    };

    // Tag pill fade in
    if (tagRef.current) {
      gsap.fromTo(
        tagRef.current,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: { trigger: tagRef.current, start: "top 88%" },
        }
      );
    }

    // Split-text title animation
    if (titleRef.current) {
      const chars = splitTextIntoSpans(titleRef.current);
      gsap.fromTo(
        chars,
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.6,
          ease: "power4.out",
          stagger: 0.015,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Description fade in
    if (descRef.current) {
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: descRef.current, start: "top 88%" },
        }
      );
    }

    // Marquee track fade in
    if (trackRef.current) {
      gsap.fromTo(
        trackRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: trackRef.current, start: "top 90%" },
        }
      );
    }
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
          className="font-body text-gray-500 text-[15px] md:text-[16px] max-w-[600px] leading-relaxed"
        >
          Hands-on training with industry-standard tools used by companies in India and GCC.
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
