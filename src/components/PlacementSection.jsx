import { useEffect, useRef } from 'react';
import { placementFeatures, placementHeaderData, placementStats } from '../data';
import { FaFileAlt, FaHandshake, FaGlobeAmericas, FaArrowRight } from 'react-icons/fa';
import { setupSplitText, setupScrollReveal } from '../utils/animations';

const getIcon = (iconId) => {
  switch (iconId) {
    case 'document': return <FaFileAlt size={18} className="text-white" />;
    case 'handshake': return <FaHandshake size={20} className="text-white" />;
    case 'airplane': return <FaGlobeAmericas size={18} className="text-white" />;
    default: return <FaFileAlt size={18} className="text-white" />;
  }
};

export default function PlacementSection() {
  const titleRef = useRef(null);
  const tagRef = useRef(null);
  const subtextRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    if (tagRef.current) setupScrollReveal(tagRef.current);
    if (titleRef.current) setupSplitText(titleRef.current);
    if (subtextRef.current) setupScrollReveal(subtextRef.current, 0.2);
    if (statsRef.current) setupScrollReveal(".placement-stat", 0.3);
    if (featuresRef.current) setupScrollReveal(".placement-feature", 0.4);
    if (ctaRef.current) setupScrollReveal(ctaRef.current, 0.5);
  }, []);

  return (
    <section id="placements" className="py-20 md:py-32 px-4 md:px-6 bg-white w-full overflow-hidden">
      <div className="container max-w-[1240px] mx-auto flex flex-col items-center">
        
        {/* Header Block */}
        <div className="text-center mb-16 md:mb-20 max-w-[750px] flex flex-col items-center">
          <div ref={tagRef} className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg bg-gray-50 text-[13px] font-medium text-gray-500 mb-6 uppercase tracking-widest shadow-sm">
            {placementHeaderData.tag}
          </div>
          <h2 ref={titleRef} className="text-[#1B2A3B] font-heading font-bold text-[32px] md:text-[44px] lg:text-[48px] leading-[1.1] mb-6 tracking-tight">
            {placementHeaderData.title}
          </h2>
          <p ref={subtextRef} className="text-gray-500 font-body text-[16px] md:text-[18px] leading-relaxed max-w-[600px]">
            {placementHeaderData.subtext}
          </p>
        </div>

        {/* Stats Grid - Red Highlight Strip */}
        <div ref={statsRef} className="w-full bg-accent-red rounded-[24px] shadow-[0_20px_50px_rgba(230,57,70,0.15)] overflow-hidden mb-16 md:mb-24 relative isolate">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none -z-10">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-black rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2"></div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4">
            {placementStats.map((stat, index) => (
              <div 
                key={stat.id} 
                className={`p-8 md:p-12 flex flex-col items-center justify-center text-center placement-stat
                  border-white/10
                  ${index < 2 ? 'border-b lg:border-b-0' : ''}
                  ${index % 2 === 0 ? 'border-r' : ''}
                  ${index === 1 ? 'lg:border-r' : ''}
                  ${index === 2 ? 'lg:border-r' : ''}
                `}
              >
                {/* Number Part */}
                <div className="flex items-baseline mb-4">
                  <span className="font-sora font-bold text-[34px] md:text-[40px] lg:text-[44px] text-white leading-none tracking-tight">
                    {stat.number}
                  </span>
                  {stat.suffix && (
                    <span className="font-sora font-bold text-[24px] md:text-[30px] text-white/80 leading-none ml-1">
                      {stat.suffix}
                    </span>
                  )}
                </div>
                
                {/* Labels Part */}
                <div className="flex flex-col items-center">
                  <span className="font-heading font-bold text-[11px] md:text-[12.5px] text-white uppercase tracking-[0.16em] mb-2.5 leading-tight">
                    {stat.label}
                  </span>
                  <span className="text-[12px] text-white/70 font-body leading-relaxed max-w-[150px]">
                    {stat.subLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 md:mb-20 w-full">
          {placementFeatures.map((feature) => (
            <div key={feature.id} className="group bg-[#F7F8FA] rounded-[16px] p-8 border border-gray-100 flex flex-col h-full transform transition-all duration-300 hover:shadow-md hover:-translate-y-1 placement-feature">
              <div className="w-[40px] h-[40px] bg-[#1B2A3B] flex items-center justify-center rounded-[10px] mb-8 transition-colors duration-300 group-hover:bg-accent-red">
                {getIcon(feature.icon)}
              </div>
              <h3 className="text-[#1B2A3B] font-heading font-semibold text-[20px] mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-500 font-body text-[15px] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Centered CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6" ref={ctaRef}>
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center px-8 md:px-10 py-4 md:py-5 bg-[#1B2A3B] text-white font-body font-semibold text-[15px] rounded-[8px] transition-all duration-300 hover:bg-accent-red hover:shadow-lg hover:-translate-y-0.5 gap-3 w-full sm:w-auto"
          >
            Talk to Our Placement Team
            <FaArrowRight size={14} className="mt-0.5" />
          </a>
          <a 
            href="https://wa.me/919778914198?text=Hi%20ACADOME%20Placement%20Team%2C%20I'd%20like%20to%20know%20more%20about%20your%20placement%20support%20and%20career%20opportunities." 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center justify-center px-8 md:px-10 py-4 md:py-5 border-2 border-[#1B2A3B] text-[#1B2A3B] font-body font-semibold text-[15px] rounded-[8px] transition-all duration-300 hover:bg-[#1B2A3B] hover:text-white hover:shadow-lg hover:-translate-y-0.5 gap-3 w-full sm:w-auto"
          >
            WhatsApp Placement Team
          </a>
        </div>
      </div>
    </section>
  );
}
