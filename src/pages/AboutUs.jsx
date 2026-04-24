import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { setupScrollReveal } from "../utils/animations";
import { aboutData } from "../data";
import MentorsSection from "../components/MentorsSection";
import CertificationSection from "../components/CertificationSection";
import SEO from "../components/SEO";

export default function AboutUs() {
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const missionRef = useRef(null);
  const whyRef = useRef(null);

  useEffect(() => {
    if (heroRef.current) setupScrollReveal(heroRef.current.children);
    if (storyRef.current) setupScrollReveal(storyRef.current.children);
    if (missionRef.current) setupScrollReveal(missionRef.current.children);
    if (whyRef.current) setupScrollReveal(whyRef.current.children);
  }, []);

  return (
    <div className="bg-white min-h-screen text-[#1A1A1A]">
      {/* 
        IMMERSIVE HERO SECTION 
        Aligned with Home Page Typography & Spacing
      */}
      <section ref={heroRef} className="pt-[120px] md:pt-[140px] lg:pt-[160px] pb-12 md:pb-24 lg:pb-44 px-6 md:px-10 lg:px-20 bg-[#f9fafb] overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-20 items-start lg:items-end justify-between mb-12 md:mb-20 lg:mb-24">
             <div className="max-w-[800px]">
                <div className="flex items-center gap-4 mb-6 md:mb-8 lg:mb-10 opacity-60">
                   <span className="w-10 md:w-12 h-px bg-gray-400"></span>
                   <span className="uppercase tracking-[0.4em] text-[10px] md:text-[11px] font-bold">Est. Since 2018</span>
                </div>
                <h1 className="font-heading font-semibold text-[36px] md:text-[48px] lg:text-[62px] leading-[1.1] md:leading-[1.02] tracking-tight text-gray-900 mb-0">
                   Redefining Financial <br/> <span className="text-gray-400 font-medium tracking-tight">Excellence.</span>
                </h1>
             </div>
             <p className="text-gray-500 text-[16px] md:text-[18px] lg:text-[19px] max-w-[440px] leading-relaxed mb-2 lg:mb-6">
                We bridge the gap between academic theory and real-world corporate mastery through intensive, high-impact practice.
             </p>
          </div>

          <div className="relative w-full aspect-[16/6] rounded-3xl md:rounded-[32px] overflow-hidden shadow-2xl group isolate">
            <img 
              src="/images/about-us.webp" 
              alt="ACADOME Professional Environment" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
          </div>
        </div>
      </section>

      {/* 
        NEW TWO-COLUMN NARRATIVE SECTION
        Inspired by the RealEstate layout reference
      */}
      <section ref={storyRef} className="pb-12 md:pb-24 lg:pb-44 px-6 bg-white relative">
        <div className="container max-w-[1300px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24 items-start text-left">
          {/* Left Side: Brand Highlight */}
          <div className="w-full lg:w-[45%] lg:sticky lg:top-40 lg:pl-[10%]">
            <span className="text-accent-red font-heading text-[28px] md:text-[32px] lg:text-[40px] leading-tight mb-2 block font-medium">A little bit about</span>
            <h2 className="text-[#0A1628] font-heading font-bold text-[28px] md:text-[36px] lg:text-[42px] leading-[1.1] mb-10 tracking-tight">
              The ACADOME <br className="hidden lg:block"/> Experience
            </h2>
            <Link 
              to="/contact-us" 
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-[#0A1628] text-white font-body text-[14px] font-medium hover:bg-accent-red transition-all duration-300 gap-3 cursor-pointer shadow-md hover:shadow-lg"
            >
              Contact Us
              <span className="text-lg leading-none">&rarr;</span>
            </Link>
          </div>

          {/* Right Side: Narrative Text */}
          <div className="w-full lg:w-[55%] flex flex-col gap-8 md:gap-10">

            <h3 className="text-gray-800 font-heading font-medium text-[26px] md:text-[32px] lg:text-[38px] leading-snug">
              Your partner in professional excellence & growth.
            </h3>
            <div className="flex flex-col gap-6 text-gray-500 text-[17px] md:text-[20px] leading-[1.8] font-body">
              <p>
                {aboutData.story.content[0]}
              </p>
              {aboutData.story.content.slice(1).map((p, i) => (
                <p key={i}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION CARDS */}
      <section className="pb-12 md:pb-24 lg:pb-44 px-6 bg-white">
        <div className="container max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div ref={missionRef} className="p-10 md:p-14 rounded-3xl md:rounded-[32px] bg-gray-50 border border-gray-900/5 hover:shadow-xl transition-all duration-500 flex flex-col justify-center">
               <span className="inline-block px-3 py-1 bg-accent-red/10 text-accent-red text-[11px] font-bold uppercase tracking-[0.2em] rounded-full mb-8 italic w-fit">Mission 01</span>
               <h3 className="font-heading font-bold text-[28px] md:text-[36px] lg:text-[42px] text-gray-900 mb-6">{aboutData.missionVision.mission.title}</h3>
               <p className="text-gray-500 leading-relaxed text-lg">{aboutData.missionVision.mission.content}</p>
            </div>
            <div className="p-10 md:p-14 rounded-3xl md:rounded-[32px] bg-[#0A1628] border border-white/5 text-white shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-center relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
               <span className="inline-block px-3 py-1 bg-white/10 text-white/50 text-[11px] font-bold uppercase tracking-[0.2em] rounded-full mb-8 italic w-fit">Vision 02</span>
               <h3 className="font-heading font-bold text-[28px] md:text-[36px] lg:text-[42px] mb-6">{aboutData.missionVision.vision.title}</h3>
               <p className="text-white/60 leading-relaxed font-body text-lg">{aboutData.missionVision.vision.content}</p>
            </div>
        </div>
      </section>

      {/* CERTIFICATION */}
      <CertificationSection isLight={true} />

      {/* WHY CHOOSE US */}
      <section ref={whyRef} className="py-12 md:py-24 lg:py-44 px-6 bg-[#0A1628] text-white overflow-hidden rounded-3xl md:rounded-[48px] mx-4 md:mx-10 shadow-2xl relative mb-12 md:mb-24 lg:mb-44">
        <div className="absolute inset-0 z-0">
           <img src="/images/why-choose-us-bg.webp" alt="" className="w-full h-full object-cover opacity-30" />
           <div className="absolute inset-0 bg-[#0A1628]/40"></div>
        </div>
        <div className="container max-w-[1240px] mx-auto relative z-10">
          <div className="max-w-[700px] mb-16 md:mb-20">
            <span className="text-accent-red font-bold tracking-[0.4em] uppercase text-[12px] mb-6 block">Why ACADOME?</span>
            <h2 className="font-heading font-bold text-[28px] md:text-[36px] lg:text-[42px] leading-[1.1]">Built for the <br/> <span className="text-white/50">Next Generation.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 border-t border-white/10 pt-16 md:pt-20">
            {aboutData.whyChoose.map((item, i) => (
              <div key={i} className="flex flex-col gap-6 group p-8 rounded-2xl md:rounded-[24px] bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-500 shadow-xl">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white/60 font-heading font-bold group-hover:bg-accent-red group-hover:text-white transition-all">
                     {i+1}
                   </div>
                   <h4 className="font-heading font-bold text-[22px] tracking-tight">{item.title}</h4>
                </div>
                <p className="text-white/70 font-body text-[15px] leading-relaxed group-hover:text-white transition-colors">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MENTORS */}
      <MentorsSection isLight={true} />

    </div>
  );
}
