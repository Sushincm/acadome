import { useEffect, useState, useRef } from 'react';
import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.min.css';
import { galleryCategories, galleryHeaderData, galleryImages } from '../data';
import { FaPlus } from 'react-icons/fa';

const INITIAL_COUNT = 6;

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredImages, setFilteredImages] = useState(galleryImages);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const lightboxRef = useRef(null);

  const visibleImages = showAll ? filteredImages : filteredImages.slice(0, INITIAL_COUNT);
  const hasMore = filteredImages.length > INITIAL_COUNT;

  useEffect(() => {
    // Wait for DOM to fully render before initializing GLightbox
    const timer = requestAnimationFrame(() => {
      setTimeout(() => {
        if (lightboxRef.current) {
          lightboxRef.current.destroy();
          lightboxRef.current = null;
        }

        const elements = document.querySelectorAll('.gallery-item');
        if (elements.length > 0) {
          lightboxRef.current = GLightbox({
            elements: Array.from(elements).map(el => ({
              href: el.getAttribute('href'),
              type: 'image',
              title: el.getAttribute('data-title') || '',
              description: el.getAttribute('data-description') || '',
            })),
            touchNavigation: true,
            loop: true,
          });

          // Attach click handlers manually
          elements.forEach((el, i) => {
            el.addEventListener('click', (e) => {
              e.preventDefault();
              if (lightboxRef.current) {
                lightboxRef.current.openAt(i);
              }
            });
          });
        }
      }, 100);
    });

    return () => {
      cancelAnimationFrame(timer);
      if (lightboxRef.current) {
        lightboxRef.current.destroy();
        lightboxRef.current = null;
      }
    };
  }, [visibleImages]);

  const handleFilterChange = (category) => {
    if (category === activeCategory || isAnimating) return;

    setIsAnimating(true);
    setShowAll(false); // Reset expand on filter change
    
    // Fade out duration 150ms
    setTimeout(() => {
      setActiveCategory(category);
      if (category === "All") {
        setFilteredImages(galleryImages);
      } else {
        setFilteredImages(galleryImages.filter(img => img.category === category));
      }
      
      // Visual buffer for filter swap
      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
    }, 150);
  };

  const toggleShowAll = () => {
    setShowAll(prev => !prev);
  };

  return (
    <section id="gallery" className="py-20 md:py-32 px-4 md:px-6 bg-white w-full overflow-hidden">
      <div className="container max-w-[1240px] mx-auto">
        
        {/* Header Block */}
        <div className="text-center mb-12 md:mb-16 max-w-[800px] mx-auto flex flex-col items-center">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg bg-gray-50 text-[13px] font-medium text-gray-500 mb-6 uppercase tracking-widest shadow-sm">
            {galleryHeaderData.tag}
          </div>
          <h2 className="text-[#1B2A3B] font-heading font-bold text-[32px] md:text-[44px] lg:text-[52px] leading-[1.15] mb-6 tracking-tight">
            {galleryHeaderData.title}
          </h2>
          <p className="text-gray-500 font-body text-base md:text-lg leading-relaxed max-w-[600px]">
            {galleryHeaderData.subtext}
          </p>
        </div>

        {/* Filter Tabs - Unified Style */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10 md:mb-16">
          {galleryCategories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleFilterChange(cat)}
                className={`px-8 py-3 rounded-lg font-body font-medium text-[15px] transition-all duration-300 border ${
                  isActive
                    ? 'bg-[#1B2A3B] text-white border-[#1B2A3B] shadow-md scale-[1.02]'
                    : 'bg-white text-gray-500 border-gray-200 shadow-sm hover:bg-gray-50 hover:text-primary-navy hover:shadow-md'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Masonry Grid */}
        <div 
          className={`columns-2 md:columns-3 gap-4 lg:gap-6 transition-opacity duration-200 ease-in-out ${
            isAnimating ? 'opacity-0 scale-98' : 'opacity-100 scale-100'
          }`}
          style={{ columnFill: 'balance' }}
        >
          {visibleImages.map((img) => (
            <div 
              key={img.id} 
              className="relative mb-4 lg:mb-6 break-inside-avoid rounded-[12px] overflow-hidden group cursor-pointer shadow-sm border border-gray-100"
            >
              <a 
                href={img.src} 
                className="gallery-item block relative overflow-hidden"
                data-title={img.caption}
                data-description={img.category}
              >
                <img 
                  src={img.src} 
                  alt={img.caption}
                  className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ minHeight: '200px', height: `${img.h}px` }}
                  loading="lazy"
                />
                
                {/* Hover Overlay - Navy Semi-transparent */}
                <div className="absolute inset-0 bg-[#1B2A3B]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                  {/* Plus Icon in Circle */}
                  <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-4 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <FaPlus size={18} />
                  </div>
                  
                  {/* Caption & Category */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-white font-body text-[11px] font-bold uppercase tracking-[0.12em] mb-1 opacity-80">
                      {img.category}
                    </p>
                    <h4 className="text-white font-heading font-semibold text-[15px] leading-tight">
                      {img.caption}
                    </h4>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* View Full Gallery / Show Less — Ghost Button */}
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
    </section>
  );
}
