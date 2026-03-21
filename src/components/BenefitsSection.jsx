import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { benefitsCards, benefitsHeaderData } from '../data';
import { FaWrench, FaBookOpen, FaUserCheck, FaCalendarAlt } from 'react-icons/fa';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

gsap.registerPlugin(ScrollTrigger);

const getIcon = (iconId) => {
  switch (iconId) {
    case 'wrench': return <FaWrench size={18} />;
    case 'book': return <FaBookOpen size={18} />;
    case 'user': return <FaUserCheck size={18} />;
    case 'calendar': return <FaCalendarAlt size={18} />;
    default: return <FaWrench size={18} />;
  }
};

// Reusable card — used by both the swiper and desktop grid
function BenefitCard({ card }) {
  return (
    <div className="group bg-white rounded-[16px] p-8 border border-[#E2E8F0] overflow-hidden relative cursor-grab active:cursor-grabbing transition-all duration-250 ease-out hover:-translate-y-[6px] hover:border-[#1B2A3B] hover:shadow-[0_16px_40px_rgba(27,42,59,0.12)] h-full select-none">
      {/* Icon Block */}
      <div className="mb-8 flex items-center justify-between">
        <div className="w-[42px] h-[42px] rounded-xl bg-primary-navy text-white flex items-center justify-center transition-colors duration-250 ease-out group-hover:bg-accent-red">
          {getIcon(card.iconId)}
        </div>
        <h4 className="font-heading font-bold text-[18px] text-gray-300">
          {card.num}
        </h4>
      </div>

      {/* Text Block */}
      <div>
        <h3 className="font-heading font-semibold text-[20px] text-[#111827] leading-[1.3] mb-4">
          {card.title}
        </h3>
        <p className="font-body font-normal text-[15px] text-gray-500 leading-relaxed">
          {card.description}
        </p>
      </div>
    </div>
  );
}

export default function BenefitsSection() {
  const cardsRef = useRef(null);
  const titleRef = useRef(null);
  const tagRef = useRef(null);
  const descRef = useRef(null);
  const swiperWrapperRef = useRef(null);

  // ── Lenis ↔ Swiper conflict fix ──────────────────────────────────────────
  // Lenis (with syncTouch:true) hijacks touchmove events which prevents Swiper
  // from detecting horizontal drags. We temporarily stop Lenis while the user
  // is touching the carousel and restart it once they lift their finger.
  useEffect(() => {
    const el = swiperWrapperRef.current;
    if (!el) return;

    const getLenis = () => window.__lenis_instance__;

    const onTouchStart = () => {
      const lenis = getLenis();
      if (lenis) lenis.stop();
    };

    const onTouchEnd = () => {
      const lenis = getLenis();
      if (lenis) lenis.start();
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    el.addEventListener('touchcancel', onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
      // Always ensure lenis is running when we unmount
      const lenis = getLenis();
      if (lenis) lenis.start();
    };
  }, []);

  // ── GSAP animations ──────────────────────────────────────────────────────
  useEffect(() => {
    const splitTextIntoSpans = (element) => {
      const text = element.innerText;
      element.innerHTML = '';
      return text.split('').map((char) => {
        const outer = document.createElement('span');
        outer.style.cssText = 'display:inline-block; overflow:hidden; vertical-align:bottom;';
        const inner = document.createElement('span');
        inner.style.cssText = 'display:inline-block;';
        inner.textContent = char === ' ' ? '\u00A0' : char;
        outer.appendChild(inner);
        element.appendChild(outer);
        return inner;
      });
    };

    if (titleRef.current) {
      const chars = splitTextIntoSpans(titleRef.current);
      gsap.fromTo(
        chars,
        { y: '110%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.6,
          ease: 'power4.out',
          stagger: 0.015,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    if (tagRef.current) {
      gsap.fromTo(
        tagRef.current,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: tagRef.current, start: 'top 88%' },
        }
      );
    }

    if (descRef.current) {
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          delay: 0.1,
          scrollTrigger: { trigger: descRef.current, start: 'top 88%' },
        }
      );
    }

    // Desktop grid stagger
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
          },
        }
      );
    }
  }, []);

  return (
    <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6 w-full mx-auto flex flex-col items-center justify-center relative overflow-hidden isolate">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/why-choose-us-bg.webp"
          alt="Why Choose Us Background"
          className="w-full h-[120%] absolute -top-[10%] left-0 object-cover parallax-img"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="container max-w-[1200px] flex flex-col items-start text-left relative z-10">

        {/* Header */}
        <div className="w-full flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-end justify-between mb-12 md:mb-16 px-2 lg:px-0">
          <div className="flex-1 max-w-[600px]">
            <div ref={tagRef} className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg border border-white/20 bg-white/10 text-[13px] font-medium text-white mb-6 uppercase tracking-widest shadow-sm">
              {benefitsHeaderData.tag}
            </div>
            <h2 ref={titleRef} className="font-heading font-bold text-[36px] md:text-[44px] lg:text-[48px] leading-[1.15] text-white">
              {benefitsHeaderData.title}
            </h2>
          </div>
          <div className="flex-1 md:max-w-[450px]">
            <p ref={descRef} className="font-body text-[16px] text-white/90 leading-relaxed">
              {benefitsHeaderData.description}
            </p>
          </div>
        </div>

        {/* ── MOBILE: Swiper carousel (hidden on md+) ── */}
        <div
          ref={swiperWrapperRef}
          className="w-full md:hidden"
          // Prevent Swiper's horizontal drag from bubbling up and triggering
          // Lenis vertical scroll simultaneously
          style={{ touchAction: 'pan-y' }}
        >
          <Swiper
            modules={[Autoplay]}
            loop={true}
            loopAdditionalSlides={benefitsCards.length} // enough clones for seamless loop
            grabCursor={true}
            touchRatio={1.5}             // more sensitive drag
            touchAngle={45}              // wider angle = easier to trigger swipe
            threshold={5}               // very low movement threshold
            resistance={false}          // no rubberbanding — helps loop feel
            simulateTouch={true}        // enables mouse drag too
            touchStartPreventDefault={false} // let lenis stop/start handle it
            autoplay={{
              delay: 2500,
              disableOnInteraction: false, // resume after user stops dragging
              pauseOnMouseEnter: true,
            }}
            speed={600}
            slidesPerView={1.15}
            spaceBetween={16}
            centeredSlides={true}
            className="w-full !overflow-visible"
            style={{ padding: '0 0 4px' }}
          >
            {benefitsCards.map((card) => (
              <SwiperSlide key={card.id} style={{ height: 'auto' }}>
                <BenefitCard card={card} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ── DESKTOP: 4-col grid (hidden on mobile) ── */}
        <div
          ref={cardsRef}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
        >
          {benefitsCards.map((card) => (
            <BenefitCard key={card.id} card={card} />
          ))}
        </div>

      </div>
    </section>
  );
}
