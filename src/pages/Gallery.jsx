import { useEffect, useRef } from "react";
import GallerySection from "../components/GallerySection";
import { setupScrollReveal } from "../utils/animations";

export default function Gallery() {
  const heroRef = useRef(null);
  
  useEffect(() => {
    if (heroRef.current) setupScrollReveal(heroRef.current.children);
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="bg-primary-navy pt-[140px] pb-20 px-6 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-primary-navy z-0">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-red/10 rounded-full blur-[120px]"></div>
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]"></div>
        </div>
        <div ref={heroRef} className="container max-w-[1240px] mx-auto relative z-10">
          <h1 className="font-heading font-semibold text-[40px] md:text-[64px] text-white mb-6 leading-tight">
            Life at Acadome
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            A visual journey through our practical training sessions, workshops, graduation celebrations, and campus life.
          </p>
          <div className="flex items-center justify-center gap-3 text-white/50 text-[15px] font-medium">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span className="w-1.5 h-1.5 rounded-full bg-accent-red"></span>
            <span className="text-white">Gallery</span>
          </div>
        </div>
      </section>

      {/* Main Gallery Masonry */}
      <div className="bg-white">
         <GallerySection fullPage={true} />
      </div>

      {/* Optional Video Section (As per spec) */}
      <section className="py-20 md:py-32 px-6 bg-gray-50 overflow-hidden text-center">
         <div className="container max-w-[1240px] mx-auto">
            <h2 className="font-heading font-bold text-[28px] md:text-[36px] lg:text-[42px] text-primary-navy mb-6">
               Watch Us in Action
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-16">
               See how our students engage in interactive workshops and hands-on accounting software training.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1000px] mx-auto">
               <div className="aspect-video bg-gray-200 rounded-3xl overflow-hidden shadow-lg border-8 border-white group relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors z-10">
                     <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-accent-red shadow-xl group-hover:scale-110 transition-transform cursor-pointer">
                        <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M4.516 2.104a.5.5 0 01.484.014l11 7a.5.5 0 010 .864l-11 7A.5.5 0 014 16.5v-13a.5.5 0 01.516-.396z"/></svg>
                     </div>
                  </div>
                  <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800" alt="Video Placeholder" className="w-full h-full object-cover" />
               </div>
               <div className="aspect-video bg-gray-200 rounded-3xl overflow-hidden shadow-lg border-8 border-white group relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors z-10">
                     <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-accent-red shadow-xl group-hover:scale-110 transition-transform cursor-pointer">
                        <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M4.516 2.104a.5.5 0 01.484.014l11 7a.5.5 0 010 .864l-11 7A.5.5 0 014 16.5v-13a.5.5 0 01.516-.396z"/></svg>
                     </div>
                  </div>
                  <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" alt="Video Placeholder" className="w-full h-full object-cover" />
               </div>
            </div>
         </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-32 px-6">
         <div className="container max-w-[1100px] mx-auto text-center">
            <h3 className="font-heading font-bold text-[28px] md:text-[36px] lg:text-[42px] text-primary-navy mb-8">
               Want to be part of our next batch?
            </h3>
            <a href="/contact-us" className="inline-flex items-center justify-center px-10 py-5 bg-primary-navy text-white font-body font-bold text-[18px] rounded-2xl hover:bg-accent-red transition-all shadow-xl scale-100 hover:scale-105 active:scale-95">
               Join Acadome Now →
            </a>
         </div>
      </section>
    </div>
  );
}
