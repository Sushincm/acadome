import { useEffect, useRef } from 'react';
import { mentorsData, mentorsHeaderData } from '../data';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { setupSplitText, setupScrollReveal } from '../utils/animations';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const MentorCard = ({ mentor }) => {
  return (
    <div className="relative aspect-[3/4] rounded-2xl md:rounded-[24px] overflow-hidden group cursor-pointer w-full h-full shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_44px_rgba(0,0,0,0.15)] transition-shadow duration-500 mentor-card">
      {/* Background Photo */}
      <img
        src={mentor.image}
        alt={mentor.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out md:group-hover:scale-110"
      />

      {/* Modern Static Bottom Gradient (Always Visible) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500 md:group-hover:opacity-40"></div>

      {/* Footer Content Area */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end translate-y-0 md:translate-y-8 md:group-hover:translate-y-0 transition-transform duration-500 ease-out z-10">
        
        {/* Credentials - Visible always on mobile, Hover-reveal on Desktop */}
        <div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 -translate-y-0 md:-translate-y-2 md:group-hover:translate-y-0 transition-all duration-500 delay-75 mb-3">
          <span className="inline-block px-3 py-1 bg-accent-red text-white font-sora text-[10px] md:text-[11px] font-bold uppercase tracking-widest rounded-full shadow-lg">
            {mentor.credentials}
          </span>
        </div>

        <h3 className="text-white font-sora font-semibold text-xl leading-tight transition-all duration-300">
          {mentor.name}
        </h3>
        
        {/* Role - Visible always on mobile, Hover-reveal on Desktop */}
        <div className="flex items-center gap-2 mt-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 delay-100">
          <span className="w-6 md:w-4 md:group-hover:w-10 h-px bg-accent-red transition-all duration-500"></span>
          <span className="text-white/80 font-sora text-[12px] font-medium uppercase tracking-wider">
            {mentor.role}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function MentorsSection({ isFullGrid = false, noBg = false, className = "", isLight = false }) {
  const swiperWrapperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const titleRef = useRef(null);
  const tagRef = useRef(null);
  const subRef = useRef(null);

  useEffect(() => {
    if (tagRef.current) setupScrollReveal(tagRef.current);
    if (titleRef.current) setupSplitText(titleRef.current);
    if (subRef.current) setupScrollReveal(subRef.current, 0.2);
    setupScrollReveal(".mentor-card", 0.3);

    if (!isFullGrid) {
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
    }
  }, [isFullGrid]);

  if (isFullGrid) {
    return (
      <section 
        id="mentors"
        className={`${noBg ? "" : (isLight ? "bg-[#EBEBEB] py-20 md:py-32" : "bg-[#0A1628] py-20 md:py-32")} px-4 md:px-6 w-full ${className}`}
      >
        <div className={`${noBg ? "" : "container max-w-[1240px]"} mx-auto`}>
          <div className="text-left lg:text-center mb-12 md:mb-16 lg:mb-20 max-w-3xl lg:mx-auto flex flex-col items-start lg:items-center">
            <span ref={tagRef} className="text-accent-red font-sora font-bold text-[13px] uppercase tracking-[0.25em] mb-4 block">
              {mentorsHeaderData.tag}
            </span>
            <h2 ref={titleRef} className={`font-heading font-bold text-[28px] md:text-[36px] lg:text-[42px] leading-[1.1] mb-6 tracking-tight ${isLight ? "text-gray-900" : "text-white"}`}>
              Our Expert Faculty
            </h2>
            <p ref={subRef} className={`font-body text-base md:text-lg leading-relaxed ${isLight ? "text-gray-600" : "text-white/60"}`}>
              Meet the industry veterans who guide our students towards professional excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentorsData.map((mentor) => (
              <div key={mentor.id} className="mentor-card-wrapper h-[450px]">
                <MentorCard mentor={mentor} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="mentors"
      className={`${noBg ? "" : (isLight ? "bg-[#EBEBEB] py-20 md:py-32" : "bg-[#0A1628] py-20 md:py-32")} px-4 md:px-6 w-full overflow-hidden ${className}`}
    >
      <div className={`${noBg ? "" : "container max-w-[1240px]"} mx-auto`}>
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 px-4 gap-8">
          <div className="flex flex-col text-left max-w-2xl">
            <span ref={tagRef} className="text-accent-red font-sora font-bold text-[13px] uppercase tracking-[0.25em] mb-4">
              {mentorsHeaderData.tag}
            </span>
            <h2 ref={titleRef} className={`font-heading font-bold text-[28px] md:text-[36px] lg:text-[42px] leading-[1.1] mb-6 tracking-tight ${isLight ? "text-gray-900" : "text-white"}`}>
              {mentorsHeaderData.title}
            </h2>
            <p ref={subRef} className={`font-body text-base md:text-lg leading-relaxed ${isLight ? "text-gray-600" : "text-white/60"}`}>
              {mentorsHeaderData.subtext}
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button 
              ref={prevRef}
              className={`w-[44px] h-[44px] rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                isLight ? "border-gray-200 text-gray-500 hover:bg-gray-900 hover:text-white" : "border-white/10 text-white hover:bg-white hover:text-primary-navy"
              }`}
            >
              <FaChevronLeft size={16} />
            </button>
            <button 
              ref={nextRef}
              className={`w-[44px] h-[44px] rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                isLight ? "border-gray-200 text-gray-500 hover:bg-accent-red hover:text-white hover:border-accent-red" : "border-white/10 text-white hover:bg-accent-red hover:border-accent-red"
              }`}
            >
              <FaChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Swiper View (All Devices) */}
        <div ref={swiperWrapperRef} style={{ touchAction: 'pan-y' }}>
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            loop={true}
            loopAdditionalSlides={mentorsData.length}
            grabCursor={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={800}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            spaceBetween={32}
            slidesPerView={1.2}
            centeredSlides={false}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 32,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
            className="mentors-swiper !pb-4 !overflow-visible"
          >
            {mentorsData.map((mentor, index) => (
              <SwiperSlide key={`${mentor.id}-${index}`} className="!h-auto px-2">
                <MentorCard mentor={mentor} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

    </section>
  );
}
