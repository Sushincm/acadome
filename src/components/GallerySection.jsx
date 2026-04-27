import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { setupSplitText, setupScrollReveal } from '../utils/animations';
import useLightbox from '../hooks/useLightbox';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { galleryCategories, galleryHeaderData, galleryImages } from '../data/gallery';
import { FaPlus } from 'react-icons/fa';
import { highlightBrand } from '../utils/textUtils';

const INITIAL_COUNT = 6;

// Reusable Gallery Card
const GalleryCard = ({ img, className = '', heightClass = 'h-full' }) => (
  <div className={`relative rounded-[24px] overflow-hidden group cursor-pointer shadow-sm border border-gray-100 bg-white h-full ${className}`}>
    <a 
      href={img.src} 
      className="gallery-item block relative overflow-hidden h-full"
    >
      <img 
        src={img.src} 
        alt={img.caption}
        className={`w-full ${heightClass} object-cover transition-transform duration-700 ease-out group-hover:scale-105`}
        loading="lazy"
      />
      
      {/* Hover / Tap Overlay */}
      <div className="absolute inset-0 bg-[#1B2A3B]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
        <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-4 transform scale-90 group-hover:scale-100 transition-transform duration-300">
          <FaPlus size={18} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent">
          <p className="text-white font-body text-[11px] font-bold uppercase tracking-[0.12em] mb-1 opacity-80">
            {img.category}
          </p>
          <h4 className="text-white font-heading font-semibold text-[14px] leading-tight">
            {img.caption}
          </h4>
        </div>
      </div>
    </a>
  </div>
);

export default function GallerySection({ fullPage = false, isHome = false }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredImages, setFilteredImages] = useState(galleryImages);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAll, setShowAll] = useState(fullPage);
  const titleRef = useRef(null);
  const tagRef = useRef(null);
  const subtextRef = useRef(null);

  const visibleImages = showAll ? filteredImages : filteredImages.slice(0, INITIAL_COUNT);
  const hasMore = !fullPage && !isHome && filteredImages.length > INITIAL_COUNT;

  useEffect(() => {
    if (tagRef.current) setupScrollReveal(tagRef.current);
    if (titleRef.current) setupSplitText(titleRef.current);
    if (subtextRef.current) setupScrollReveal(subtextRef.current, 0.2);
    setupScrollReveal(".gallery-reveal", 0.3);
  }, [visibleImages, isHome]);

  useLightbox({
    selector: '.gallery-item',
    touchNavigation: true,
    loop: true,
  }, [visibleImages, activeCategory, isHome]);
  const handleFilterChange = (category) => {
    if (category === activeCategory || isAnimating) return;
    setIsAnimating(true);
    if (!fullPage) setShowAll(false);
    
    setTimeout(() => {
      setActiveCategory(category);
      if (category === "All") {
        setFilteredImages(galleryImages);
      } else {
        setFilteredImages(galleryImages.filter(img => img.category === category));
      }
      setTimeout(() => setIsAnimating(false), 50);
    }, 150);
  };

  const toggleShowAll = () => setShowAll(prev => !prev);

  // ═══ HOME PAGE: Curated Collage Layout ═══
  if (isHome) {
    return (
      <section id="gallery" className="py-20 md:py-32 px-4 md:px-6 bg-white w-full overflow-hidden">
        <div className="container max-w-[1240px] mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-16 lg:gap-24">
            
            {/* Left Hand: Stylized Text */}
            <div className="w-full lg:w-[45%] text-left order-2 lg:order-1">
              <div ref={tagRef} className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg bg-gray-50 text-[13px] font-medium text-gray-500 mb-6 uppercase tracking-widest shadow-sm">
                {highlightBrand(galleryHeaderData.tag)}
              </div>
              <h2 ref={titleRef} className="text-[#1B2A3B] font-heading font-bold text-[36px] md:text-[48px] lg:text-[56px] leading-[1.1] mb-8 tracking-tight whitespace-normal break-words max-w-full">
                {highlightBrand("Glimpse of Academic Life")}
              </h2>
              <p ref={subtextRef} className="text-gray-500 font-body text-base md:text-lg leading-relaxed mb-10 max-w-[500px]">
                {highlightBrand(galleryHeaderData.subtext)}
              </p>
              
              <Link to="/gallery" className="group inline-flex items-center justify-center px-8 py-4 bg-primary-navy text-white font-body font-bold text-[16px] rounded-xl hover:bg-accent-red transition-all shadow-lg hover:shadow-accent-red/20 w-full sm:w-auto">
                Explore Full Gallery
                <span className="ml-3 transform group-hover:translate-x-1.5 transition-transform">&rarr;</span>
              </Link>
            </div>

            {/* Right Hand: Asymmetrical Collage */}
            <div className="w-full lg:w-[55%] order-1 lg:order-2 self-start lg:self-center">
              <div className="relative w-full aspect-[4/5] md:aspect-[4/5] lg:aspect-[4/5] max-w-[550px] mx-auto">
                {/* Main Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent-red/5 rounded-full blur-[100px] md:blur-[140px] pointer-events-none"></div>

                <div className="relative w-full h-full">
                  {/* Image 1: Top Left (Creative/Atmosphere) */}
                  <div className="absolute top-[0%] left-[0%] w-[52%] aspect-square z-10 gallery-reveal -rotate-3 hover:rotate-0 transition-all duration-500 hover:z-40 border-4 border-white shadow-xl rounded-[24px] overflow-hidden">
                    <GalleryCard img={galleryImages[0]} heightClass="h-full" />
                  </div>
                  
                  {/* Image 2: Center Main (Large - Focal Point) */}
                  <div className="absolute top-[20%] left-[22%] w-[65%] aspect-[4/5] z-20 gallery-reveal rotate-2 hover:rotate-0 transition-all duration-500 shadow-2xl hover:z-40 border-4 border-white rounded-[24px] overflow-hidden">
                    <GalleryCard img={galleryImages[1]} heightClass="h-full" />
                  </div>
                  
                  {/* Image 3: Bottom Right (Action/Learning) */}
                  <div className="absolute top-[62%] right-[0%] w-[55%] aspect-[3/2] z-30 gallery-reveal -rotate-2 hover:rotate-0 transition-all duration-500 hover:z-40 shadow-2xl border-4 border-white rounded-[24px] overflow-hidden">
                    <GalleryCard img={galleryImages[2]} heightClass="h-full" />
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-[15%] right-[10%] w-3 h-3 md:w-4 md:h-4 rounded-full bg-accent-red animate-ping-once opacity-30"></div>
                  <div className="absolute bottom-[10%] left-[10%] w-[120px] h-1 bg-accent-red/20 rounded-full blur-sm"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    );
  }

  // ═══ GALLERY PAGE: Standard Grid Layout ═══
  return (
    <section id="gallery" className={`${fullPage ? 'py-12 md:py-20' : 'py-20 md:py-32'} px-4 md:px-6 bg-white w-full overflow-hidden`}>
      <div className="container max-w-[1240px] mx-auto">
        
        {/* Header Block - Only show if NOT on full page */}
        {!fullPage && (
          <div className="text-center mb-12 md:mb-16 max-w-[800px] mx-auto flex flex-col items-center">
            <div ref={tagRef} className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg bg-gray-50 text-[13px] font-medium text-gray-500 mb-6 uppercase tracking-widest shadow-sm">
              {highlightBrand(galleryHeaderData.tag)}
            </div>
            <h2 ref={titleRef} className="text-[#1B2A3B] font-heading font-bold text-[32px] md:text-[44px] lg:text-[52px] leading-[1.15] mb-6 tracking-tight">
              {highlightBrand(galleryHeaderData.title)}
            </h2>
            <p ref={subtextRef} className="text-gray-500 font-body text-base md:text-lg leading-relaxed max-w-[600px]">
              {highlightBrand(galleryHeaderData.subtext)}
            </p>
          </div>
        )}

        {/* Filter Tabs */}
        <div className={`flex flex-wrap items-center justify-center gap-0 mb-10 ${fullPage ? 'md:mb-12' : 'md:mb-16'}`}>
          {galleryCategories.map((cat, idx) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleFilterChange(cat)}
                className={`px-8 py-3 font-body font-medium text-[15px] transition-all duration-300 border ${
                  idx === 0 ? 'rounded-l-lg' : idx === galleryCategories.length - 1 ? 'rounded-r-lg' : ''
                } ${
                  isActive
                    ? 'bg-accent-red text-white border-accent-red shadow-md z-10'
                    : 'bg-white text-gray-500 border-gray-200 hover:bg-accent-red hover:text-white hover:border-accent-red'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ═══ MOBILE: Swiper JS Carousel (< md) ═══ */}
        <div className="md:hidden">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            slidesPerView={1.2}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            grabCursor={true}
            className={`transition-opacity duration-200 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
          >
            {visibleImages.map((img) => (
              <SwiperSlide key={img.id} className="gallery-reveal">
                <GalleryCard img={img} heightClass="h-[320px]" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ═══ DESKTOP: Unified Grid (md+) ═══ */}
        <div 
          className={`hidden md:block transition-opacity duration-200 ease-in-out ${
            isAnimating ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleImages.map((img, i) => (
              <div key={`${img.id}-${i}`} className="w-full gallery-reveal">
                <GalleryCard img={img} heightClass="h-[400px]" />
              </div>
            ))}
          </div>

          {/* Expand/Collapse Button — Desktop Only */}
          {hasMore && (
            <div className="mt-14 md:mt-20 flex justify-center">
              <button 
                onClick={toggleShowAll}
                className="group inline-flex items-center justify-center px-6 py-3 font-body font-medium text-[15px] rounded-[8px] bg-transparent border border-[#1B2A3B] text-[#1B2A3B] transition-all duration-300 hover:bg-[#1B2A3B] hover:text-white hover:-translate-y-0.5"
              >
                {showAll ? 'Show Less' : 'View Full Gallery'}
                <span className="ml-3 transform group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
