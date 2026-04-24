import { useEffect, useRef } from 'react';
import { certificationCards, certificationHeaderData } from '../data/courses';
import { FaUniversity, FaAward, FaCertificate } from 'react-icons/fa';
import { setupSplitText, setupScrollReveal } from '../utils/animations';

const getIcon = (iconId, isLight = false) => {
  const colorClass = isLight ? "text-gray-400" : "text-white/70";
  switch (iconId) {
    case 'government': return <FaUniversity className={colorClass} size={28} />;
    case 'sap': return <FaAward className={colorClass} size={28} />;
    default: return <FaCertificate className={colorClass} size={28} />;
  }
};

const CertificationCard = ({ card, isLight = false }) => {
  return (
    <div className={`relative p-8 rounded-[16px] transition-all duration-300 h-full overflow-hidden flex flex-col group certification-card ${
      isLight 
      ? "bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-accent-red/20" 
      : "bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)]"
    }`}>
      <div className={`absolute top-6 right-6 px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-[0.08em] leading-none ${
        isLight ? "bg-gray-50 text-gray-400" : "bg-[rgba(148,180,209,0.15)] text-[#94B4D1]"
      }`}>
        {card.badge}
      </div>
      <div className="mb-8 flex-shrink-0">
        {card.logo ? (
          <div className="w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center overflow-hidden p-1 shadow-sm border border-gray-50">
            <img src={card.logo} alt={card.issuer} className="w-full h-full object-contain" loading="lazy" />
          </div>
        ) : (
          <div className={`w-[60px] h-[60px] rounded-full flex items-center justify-center border ${
            isLight ? "bg-gray-50 border-gray-100" : "bg-[rgba(255,255,255,0.08)] border-[rgba(255,255,255,0.1)]"
          }`}>
            {getIcon(card.icon, isLight)}
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col">
        <span className="block text-accent-red text-[11px] font-bold uppercase tracking-[0.14em] mb-2.5">{card.issuer}</span>
        <h3 className={`font-heading font-semibold text-[22px] md:text-[24px] leading-[1.3] mb-4 ${isLight ? "text-gray-900" : "text-white"}`}>{card.title}</h3>
        <p className={`font-body text-[15px] leading-relaxed ${isLight ? "text-gray-600" : "text-white/60"}`}>{card.description}</p>
      </div>
    </div>
  );
};

export default function CertificationSection({ className = "", noBg = false, isLight = false }) {
  const titleRef = useRef(null);
  const tagRef = useRef(null);
  const subtextRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    if (tagRef.current) setupScrollReveal(tagRef.current);
    if (titleRef.current) setupSplitText(titleRef.current);
    if (subtextRef.current) setupScrollReveal(subtextRef.current, 0.2);
    if (gridRef.current) setupScrollReveal(".certification-card");
  }, []);

  return (
    <section className={`${noBg ? "" : (isLight ? "bg-[#EBEBEB] py-20 md:py-32" : "bg-[#0A1628] py-20 md:py-32")} px-4 md:px-6 w-full relative overflow-hidden isolate ${className}`}>
      {!noBg && !isLight && <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-navy/40 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 -z-10 opacity-50"></div>}
      <div className={`${noBg ? "" : "container max-w-[1240px]"} mx-auto`}>
        <div className="text-left lg:text-center mb-12 md:mb-16 lg:mb-20 max-w-[800px] px-2 lg:mx-auto flex flex-col items-start lg:items-center">
          <span ref={tagRef} className="text-accent-red font-sora font-bold text-[13px] uppercase tracking-[0.25em] mb-4 block">
            {certificationHeaderData.tag}
          </span>
          <h2 ref={titleRef} className={`font-heading font-bold text-[28px] md:text-[36px] lg:text-[42px] leading-[1.15] mb-6 tracking-tight ${isLight ? "text-gray-900" : "text-white"}`}>
            {certificationHeaderData.title}
          </h2>
          <p ref={subtextRef} className={`font-body text-base md:text-lg leading-relaxed max-w-[600px] mx-0 lg:mx-auto ${isLight ? "text-gray-600" : "text-white/60"}`}>
            {certificationHeaderData.subtext}
          </p>
        </div>
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {certificationCards.map((card) => (
            <CertificationCard key={card.id} card={card} isLight={isLight} />
          ))}
        </div>
      </div>
    </section>
  );
}

