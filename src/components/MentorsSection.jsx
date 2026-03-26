import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { mentorsData, mentorsHeaderData } from '../data';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const MentorCard = ({ mentor }) => {
  return (
    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer w-full h-full shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
      {/* Background Photo */}
      <img
        src={mentor.image}
        alt={mentor.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />

      {/* Default State: Bottom Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/95 via-[#0A1628]/40 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-350 ease-in-out flex flex-col justify-end p-6">
        <h3 className="text-white font-sora font-semibold text-xl leading-tight">
          {mentor.name}
        </h3>
        <span className="text-white/70 font-sora text-[12px] font-medium uppercase tracking-wider mt-1">
          {mentor.role}
        </span>
      </div>

      {/* Hover State: Full Navy Overlay */}
      <div className="absolute inset-0 bg-[#0A1628]/95 overflow-hidden translate-y-full group-hover:translate-y-0 transition-transform duration-350 ease-in-out z-10 p-8 flex flex-col justify-center items-center text-center">
        {/* Subtle Background Photo peek */}
        <div className="absolute inset-0 opacity-15">
          <img src={mentor.image} alt="" loading="lazy" className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="relative z-20">
          <h3 className="text-white font-sora font-bold text-2xl mb-2">
            {mentor.name}
          </h3>
          <p className="text-accent-red font-sora font-bold text-[13px] mb-4 uppercase tracking-wide">
            {mentor.credentials}
          </p>
          <div className="inline-block px-3 py-1 bg-white/10 rounded-full border border-white/20">
            <span className="text-white font-sora text-[11px] font-semibold uppercase tracking-widest leading-none">
              {mentor.role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function MentorsSection() {
  const swiperWrapperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

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

  return (
    <section 
      id="mentors"
      className="bg-[#0A1628] py-20 md:py-32 px-4 md:px-6 w-full overflow-hidden"
    >
      <div className="container max-w-[1240px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 px-4 gap-8">
          <div className="flex flex-col text-left max-w-2xl">
            <span className="text-accent-red font-sora font-bold text-[13px] uppercase tracking-[0.25em] mb-4">
              {mentorsHeaderData.tag}
            </span>
            <h2 className="text-white font-heading font-bold text-[32px] md:text-[44px] lg:text-[52px] leading-[1.1] mb-6 tracking-tight">
              {mentorsHeaderData.title}
            </h2>
            <p className="text-white/60 font-body text-base md:text-lg leading-relaxed">
              {mentorsHeaderData.subtext}
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button 
              ref={prevRef}
              className="w-[44px] h-[44px] rounded-full border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:bg-white hover:text-primary-navy cursor-pointer"
            >
              <FaChevronLeft size={16} />
            </button>
            <button 
              ref={nextRef}
              className="w-[44px] h-[44px] rounded-full border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:bg-accent-red hover:border-accent-red cursor-pointer"
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
            pagination={{
              el: '.mentor-pagination',
              clickable: true,
              renderBullet: (index, className) => {
                if (index < mentorsData.length) {
                  return `<span class="${className} mentor-dot"></span>`;
                }
                return "";
              },
            }}
            spaceBetween={24}
            slidesPerView={1.2}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="mentors-swiper !pb-12 !overflow-visible"
          >
            {[...mentorsData, ...mentorsData, ...mentorsData].map((mentor, index) => (
              <SwiperSlide key={`${mentor.id}-${index}`} className="!h-auto">
                <MentorCard mentor={mentor} />
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Pagination dots for mobile */}
          <div className="mentor-pagination flex md:hidden justify-center gap-2 mt-4"></div>
        </div>
      </div>

    </section>
  );
}
