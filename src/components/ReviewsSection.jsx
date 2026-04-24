import { useEffect, useRef } from 'react';
import { reviewsData, reviewsHeaderData } from '../data';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';
import { setupSplitText, setupScrollReveal } from '../utils/animations';
import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.min.css';
import 'swiper/css';
import 'swiper/css/navigation';

const ReviewCard = ({ review }) => {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Handle potential autoplay block
      });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div 
      className="bg-white rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col h-full relative transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 review-card overflow-hidden aspect-[3/4]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      
      {review.videoUrl ? (
        /* VIDEO TESTIMONIAL LAYOUT */
        <div className="relative w-full h-full group/video">
          {/* Video Preview - Optimized for performance */}
          <video 
            ref={videoRef}
            src={review.videoUrl} 
            className="w-full h-full object-cover"
            muted
            playsInline
            loop
            preload="none" /* Crucial: Don't load video data until hover */
          />
          <div className="absolute inset-0 bg-black/20 group-hover/video:bg-black/30 transition-colors" />
          
          <a 
            href={review.videoUrl} 
            className="video-testimonial-item absolute inset-0 flex items-center justify-center z-20 group/play cursor-pointer"
          >
            <div className="w-16 h-16 bg-accent-red text-white rounded-full flex items-center justify-center shadow-2xl scale-90 group-hover/play:scale-110 transition-all duration-300">
               <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4.516 2.104a.5.5 0 01.484.014l11 7a.5.5 0 010 .864l-11 7A.5.5 0 014 16.5v-13a.5.5 0 01.516-.396z"/>
               </svg>
            </div>
          </a>
        </div>
      ) : (
        /* TEXT TESTIMONIAL LAYOUT */
        <div className="p-8 md:p-10 flex flex-col h-full justify-center">
          {/* Top row: Quote icon */}
          <div className="text-accent-red opacity-20 mb-6">
            <FaQuoteLeft size={32} />
          </div>

          {/* Testimonial Text */}
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <p className="text-primary-navy/80 font-body text-[15px] md:text-[16px] lg:text-[18px] leading-[1.7] italic">
              "{review.quote}"
            </p>
          </div>

          {/* Stars at bottom for text cards */}
          <div className="flex items-center gap-1 mt-6">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-[#FFC107]" size={14} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function ReviewsSection() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperWrapperRef = useRef(null);
  const tagRef = useRef(null);
  const titleRef = useRef(null);
  const subtextRef = useRef(null);
  const lightboxRef = useRef(null);

  useEffect(() => {
    if (tagRef.current) setupScrollReveal(tagRef.current);
    if (titleRef.current) setupSplitText(titleRef.current);
    if (subtextRef.current) setupScrollReveal(subtextRef.current, 0.2);
    setupScrollReveal(".review-card", 0.3);

    // Initialize Lightbox for video testimonials
    const initLightbox = () => {
      if (lightboxRef.current) lightboxRef.current.destroy();
      lightboxRef.current = GLightbox({
        selector: '.video-testimonial-item',
        touchNavigation: true,
        loop: true,
        autoplayVideos: true,
        zoomable: false,
        draggable: true,
      });
    };

    initLightbox();

    const el = swiperWrapperRef.current;
    if (!el) return;
    const getLenis = () => window.__lenis_instance__;
    const onTouchStart = () => { if (getLenis()) getLenis().stop(); };
    const onTouchEnd = () => { if (getLenis()) getLenis().start(); };
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    el.addEventListener('touchcancel', onTouchEnd, { passive: true });
    return () => {
      if (lightboxRef.current) lightboxRef.current.destroy();
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
      if (getLenis()) getLenis().start();
    };
  }, []);

  return (
    <section className="py-20 md:py-32 bg-[#EBEBEB] w-full overflow-hidden">
      <div className="container max-w-[1240px] mx-auto px-4 md:px-6">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-8">
          <div className="flex flex-col text-left">
            <span ref={tagRef} className="text-accent-red font-sora font-semibold text-[13px] uppercase tracking-[0.25em] mb-4">
              {reviewsHeaderData.tag}
            </span>
            <h2 ref={titleRef} className="text-primary-navy font-sora font-bold text-[32px] md:text-[42px] lg:text-[48px] leading-[1.15] tracking-tight">
              {reviewsHeaderData.title}
            </h2>
            <p ref={subtextRef} className="text-gray-500 font-body text-[16px] mt-4 max-w-[500px]">
              Hear directly from our students who have transformed their careers with ACADOME's professional programs.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button 
              ref={prevRef}
              className="w-[44px] h-[44px] rounded-full border border-primary-navy/10 flex items-center justify-center text-primary-navy transition-all duration-300 hover:border-primary-navy hover:bg-primary-navy hover:text-white cursor-pointer"
            >
              <FaChevronLeft size={16} />
            </button>
            <button 
              ref={nextRef}
              className="w-[44px] h-[44px] rounded-full bg-primary-navy flex items-center justify-center text-white transition-all duration-300 hover:bg-accent-red cursor-pointer"
            >
              <FaChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Swiper Carousel */}
        <div className="relative" ref={swiperWrapperRef} style={{ touchAction: 'pan-y' }}>
          <Swiper
            modules={[Autoplay, Navigation]}
            loop={true}
            loopAdditionalSlides={reviewsData.length}
            grabCursor={true}
            speed={800}
            autoplay={{
              delay: 3500, // Slightly faster 
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="!overflow-visible"
          >
            {[...reviewsData, ...reviewsData, ...reviewsData].map((review, index) => (
              <SwiperSlide key={`${review.id}-${index}`} className="!h-auto">
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
