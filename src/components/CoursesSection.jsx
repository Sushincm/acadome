import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { coursesHeaderData, coursesTabsData } from '../data';

export default function CoursesSection() {
  const [activeTabId, setActiveTabId] = useState(coursesTabsData[0].id);
  const contentRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Active course data
  const activeCourse = coursesTabsData.find(c => c.id === activeTabId);

  const handleTabClick = (tabId) => {
    if (tabId === activeTabId || isTransitioning) return;
    
    setIsTransitioning(true);

    const elements = contentRef.current.querySelectorAll('.reveal-item');
    if (elements.length > 0) {
      // Fade out and translate up slightly
      gsap.to(elements, {
        opacity: 0,
        y: -10,
        duration: 0.15,
        ease: "power1.in",
        stagger: 0.02,
        onComplete: () => {
          setActiveTabId(tabId);
        }
      });
    } else {
      setActiveTabId(tabId);
    }
  };

  useEffect(() => {
    if (isTransitioning) {
      const elements = contentRef.current.querySelectorAll('.reveal-item');
      if (elements.length > 0) {
        // Fade in and translate up from bottom to original position
        gsap.fromTo(elements, {
          opacity: 0,
          y: 20
        }, {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
          stagger: 0.05,
          onComplete: () => setIsTransitioning(false)
        });
      } else {
        setIsTransitioning(false);
      }
    }
  }, [activeTabId, isTransitioning]);

  return (
    <section id="programs" className="py-[80px] md:py-[5%] px-4 md:px-6 w-full mx-auto bg-[#f9fafb] flex flex-col items-center justify-center relative">
      <div className="container max-w-[1200px] flex flex-col items-center">
        
        {/* Header Strip & Title */}
        <div className="text-center mb-10 w-full flex flex-col items-center">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white border border-gray-100 text-[13px] font-medium text-gray-500 mb-6 uppercase tracking-widest shadow-sm">
            {coursesHeaderData.tag}
          </div>
          <h2 className="font-heading text-[28px] md:text-[36px] lg:text-[42px] leading-[1.2] text-[#111827] font-semibold max-w-[800px]">
            {coursesHeaderData.title}
          </h2>
        </div>

        {/* Tabs Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10 md:mb-16">
          {coursesTabsData.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`px-8 py-3.5 rounded-lg font-body font-medium text-[15px] transition-all duration-300 w-full sm:w-auto min-w-[160px] ${
                  isActive
                    ? 'bg-accent-red text-white shadow-md scale-[1.02] border border-accent-red'
                    : 'bg-white text-gray-600 border border-gray-200 shadow-sm hover:bg-gray-50 hover:text-primary-navy hover:shadow-md'
                }`}
              >
                {tab.tabLabel}
              </button>
            );
          })}
        </div>

        {/* Content Area Wrap (min-h to prevent jumps) */}
        <div className="w-full min-h-[500px] lg:min-h-[450px]" ref={contentRef}>
          {activeCourse && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              
              {/* Left Column (Text Info) */}
              <div className="flex flex-col items-start text-left w-full h-full justify-center order-2 lg:order-1">
                <span className="reveal-item inline-block px-3 py-1 bg-gray-100 text-gray-800 text-[13px] font-medium rounded-full mb-4 uppercase tracking-wider">
                  {activeCourse.durationInfo}
                </span>
                
                <h3 className="reveal-item font-heading font-semibold text-[26px] md:text-[32px] text-gray-900 leading-[1.3] mb-5">
                  {activeCourse.title}
                </h3>
                
                <p className="reveal-item font-body text-[16px] text-gray-600 leading-relaxed mb-6">
                  {activeCourse.description}
                </p>

                {activeCourse.topics && activeCourse.topics.length > 0 && (
                  <div className="reveal-item mb-8 w-full">
                    <h4 className="font-body font-semibold text-[15px] text-gray-800 mb-3 uppercase tracking-wider">Key Topics Covered:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                      {activeCourse.topics.map((topic, i) => (
                        <li key={i} className="flex items-start text-gray-600 font-body text-[14px]">
                          <span className="text-accent-red mr-2">•</span>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <a
                  href={activeCourse.buttonLink}
                  className="reveal-item inline-flex items-center justify-center mt-2 px-8 py-3.5 font-body font-medium text-[15px] rounded-lg bg-primary-navy text-white hover:bg-accent-red transition-colors shadow-sm w-full md:w-auto text-center"
                >
                  {activeCourse.buttonText}
                  <span className="ml-2">&rarr;</span>
                </a>
              </div>

              {/* Right Column (Image & Floating Badge) */}
              <div className="reveal-item w-full relative order-1 lg:order-2 self-start lg:self-center overflow-visible">
                {/* Floating Badge */}
                <div className="absolute top-4 right-4 md:-right-4 md:-top-4 z-20">
                  <div className="px-4 py-2 bg-primary-navy text-white font-body font-semibold text-[13px] rounded-lg shadow-lg">
                    {activeCourse.durationInfo}
                  </div>
                </div>

                {/* Subtile Hover Zoom Wrapper */}
                <div className="w-full relative rounded-[16px] overflow-hidden group shadow-md border border-gray-100 bg-gray-200 aspect-[4/3] md:aspect-[3/2] lg:aspect-auto h-full lg:h-[450px]">
                  <img
                    src={activeCourse.imageSrc}
                    alt={activeCourse.title}
                    className="absolute w-full h-[120%] -top-[10%] left-0 object-cover rounded-[16px] transition-transform duration-700 ease-out group-hover:scale-[1.03] parallax-img"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
