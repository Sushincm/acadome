import { useEffect, useRef } from 'react';
import { setupSplitText, setupScrollReveal } from '../utils/animations';
import { benefitsCards, benefitsHeaderData } from '../data';
import { FaWrench, FaBookOpen, FaUserCheck, FaCalendarAlt } from 'react-icons/fa';
import { highlightBrand } from '../utils/textUtils';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const getIcon = (iconId) => {
  switch (iconId) {
    case 'wrench': return <FaWrench size={18} />;
    case 'book': return <FaBookOpen size={18} />;
    case 'user': return <FaUserCheck size={18} />;
    case 'calendar': return <FaCalendarAlt size={18} />;
    default: return <FaWrench size={18} />;
  }
};

function BenefitCard({ card }) {
  return (
    <div className="group bg-white rounded-[24px] p-8 border border-[#E2E8F0] overflow-hidden relative transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 h-full select-none cursor-grab active:cursor-grabbing">
      {/* Icon Block */}
      <div className="mb-8 flex items-center justify-between">
        <div className="w-[48px] h-[48px] rounded-2xl bg-primary-navy text-white flex items-center justify-center transition-colors duration-300 group-hover:bg-accent-red">
          {getIcon(card.iconId)}
        </div>
        <h4 className="font-heading font-bold text-[18px] text-gray-200">
          {card.num}
        </h4>
      </div>

      {/* Text Block */}
      <div>
        <h3 className="font-heading font-semibold text-[22px] text-[#111827] leading-[1.3] mb-4 group-hover:text-primary-navy transition-colors">
          {highlightBrand(card.title)}
        </h3>
        <p className="font-body font-normal text-[15px] text-gray-500 leading-relaxed">
          {highlightBrand(card.description)}
        </p>
      </div>
    </div>
  );
}

export default function BenefitsSection() {
  const titleRef = useRef(null);
  const tagRef = useRef(null);
  const descRef = useRef(null);
  const swiperWrapperRef = useRef(null);

  useEffect(() => {
    const el = swiperWrapperRef.current;
    if (!el) return;
    const lenis = () => window.__lenis_instance__;
    const stopLenis = () => { if (lenis()) lenis().stop(); };
    const startLenis = () => { if (lenis()) lenis().start(); };
    el.addEventListener('touchstart', stopLenis, { passive: true });
    el.addEventListener('touchend', startLenis, { passive: true });
    el.addEventListener('touchcancel', startLenis, { passive: true });
    return () => {
      el.removeEventListener('touchstart', stopLenis);
      el.removeEventListener('touchend', startLenis);
      el.removeEventListener('touchcancel', startLenis);
      if (lenis()) lenis().start();
    };
  }, []);

  useEffect(() => {
    if (tagRef.current) setupScrollReveal(tagRef.current);
    if (titleRef.current) setupSplitText(titleRef.current);
    if (descRef.current) setupScrollReveal(descRef.current, 0.2);
    setupScrollReveal(".benefits-swiper", 0.3);
  }, []);

  return (
    <section className="py-20 md:py-32 px-4 md:px-6 w-full mx-auto relative overflow-hidden isolate">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/why-choose-us-bg.webp"
          alt="Why Choose Us Background"
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 md:bg-black/50"></div>
      </div>

      <div className="container max-w-[1240px] mx-auto relative z-10">
        {/* Header */}
        <div className="w-full flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-end justify-between mb-16 px-2 lg:px-0">
          <div className="flex-1 max-w-[650px]">
            <div ref={tagRef} className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg border border-white/20 bg-white/10 text-[13px] font-medium text-white mb-6 uppercase tracking-widest shadow-sm">
              {benefitsHeaderData.tag}
            </div>
            <h2 ref={titleRef} className="font-heading font-bold text-[36px] md:text-[44px] lg:text-[52px] leading-[1.1] text-white whitespace-normal break-words">
              {highlightBrand(benefitsHeaderData.title)}
            </h2>
          </div>
          <div className="flex-1 md:max-w-[480px]">
            <p ref={descRef} className="font-body text-[16px] md:text-[18px] text-white/80 leading-relaxed">
              {highlightBrand(benefitsHeaderData.description)}
            </p>
          </div>
        </div>

        {/* Carousel View (All Devices) */}
        <div
          ref={swiperWrapperRef}
          className="w-full"
          style={{ touchAction: 'pan-y' }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            loop={true}
            loopAdditionalSlides={benefitsCards.length}
            grabCursor={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={800}
            slidesPerView={1.2}
            spaceBetween={24}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="benefits-swiper !pb-12 !overflow-visible"
          >
            {[...benefitsCards, ...benefitsCards, ...benefitsCards].map((card, index) => (
              <SwiperSlide key={`${card.id}-${index}`} className="!h-auto">
                <BenefitCard card={card} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

    </section>
  );
}
