import { useEffect, useRef } from 'react';
import { certificationCards, certificationHeaderData } from '../data';
import { FaUniversity, FaAward, FaCertificate } from 'react-icons/fa';
import { setupSplitText, setupScrollReveal } from '../utils/animations';

const getIcon = (iconId) => {
  switch (iconId) {
    case 'government': return <FaUniversity className="text-white/70" size={28} />;
    case 'sap': return <FaAward className="text-white/70" size={28} />;
    default: return <FaCertificate className="text-white/70" size={28} />;
  }
};

const CertificationCard = ({ card }) => {
  return (
    <div className="relative p-8 rounded-[16px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] transition-all duration-300 hover:border-[rgba(255,255,255,0.2)] h-full overflow-hidden flex flex-col group certification-card">
      <div className="absolute top-6 right-6 px-3 py-1 bg-[rgba(148,180,209,0.15)] rounded-full text-[#94B4D1] text-[10px] font-medium uppercase tracking-[0.08em] leading-none">
        {card.badge}
      </div>
      <div className="mb-8 flex-shrink-0">
        {card.logo ? (
          <div className="w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center overflow-hidden p-1 shadow-sm">
            <img src={card.logo} alt={card.issuer} className="w-full h-full object-contain" loading="lazy" />
          </div>
        ) : (
          <div className="w-[60px] h-[60px] rounded-full bg-[rgba(255,255,255,0.08)] flex items-center justify-center border border-[rgba(255,255,255,0.1)]">
            {getIcon(card.icon)}
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col">
        <span className="block text-accent-red text-[11px] font-bold uppercase tracking-[0.14em] mb-2.5">{card.issuer}</span>
        <h3 className="text-white font-heading font-semibold text-[22px] md:text-[24px] leading-[1.3] mb-4">{card.title}</h3>
        <p className="text-white/60 font-body text-[15px] leading-relaxed">{card.description}</p>
      </div>
    </div>
  );
};

export default function CertificationSection() {
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
    <section className="bg-[#0A1628] py-20 md:py-32 px-4 md:px-6 w-full relative overflow-hidden isolate">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-navy/40 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 -z-10 opacity-50"></div>
      <div className="container max-w-[1240px] mx-auto">
        <div className="text-center mb-16 md:mb-20 max-w-[800px] px-2 mx-auto flex flex-col items-center">
          <span ref={tagRef} className="text-accent-red font-sora font-bold text-[13px] uppercase tracking-[0.25em] mb-4 block">
            {certificationHeaderData.tag}
          </span>
          <h2 ref={titleRef} className="text-white font-heading font-bold text-[36px] md:text-[44px] lg:text-[52px] leading-[1.15] mb-6 tracking-tight">
            {certificationHeaderData.title}
          </h2>
          <p ref={subtextRef} className="text-white/60 font-body text-base md:text-lg leading-relaxed max-w-[600px] mx-auto">
            {certificationHeaderData.subtext}
          </p>
        </div>
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {certificationCards.map((card) => (
            <CertificationCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

