import { useEffect, useRef } from "react";
import ContactSection from "../components/ContactSection";
import { setupScrollReveal } from "../utils/animations";
import { FaClock, FaCalendarAlt, FaGlobeAmericas } from "react-icons/fa";

export default function ContactUs() {
  const heroRef = useRef(null);
  const infoCardsRef = useRef(null);

  useEffect(() => {
    if (heroRef.current) setupScrollReveal(heroRef.current.children);
    if (infoCardsRef.current) setupScrollReveal(infoCardsRef.current.children);
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="bg-primary-navy pt-[120px] pb-20 px-6 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-primary-navy z-0">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-red/10 rounded-full blur-[120px]"></div>
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]"></div>
        </div>
        <div ref={heroRef} className="container max-w-[1240px] mx-auto relative z-10">
          <h1 className="font-heading font-semibold text-[40px] md:text-[64px] text-white mb-6 leading-tight">
            Get in Touch
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Have questions about our programs or need career guidance? Reach out to us today and start your journey towards excellence.
          </p>
          <div className="flex items-center justify-center gap-3 text-white/50 text-[15px] font-medium">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span className="w-1.5 h-1.5 rounded-full bg-accent-red"></span>
            <span className="text-white">Contact Us</span>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <div className="bg-[#EBEBEB]">
         <ContactSection />
      </div>

      {/* Additional Info Cards */}
      <section className="py-20 md:py-32 px-6 bg-white overflow-hidden relative">
         <div className="container max-w-[1240px] mx-auto">
            <div ref={infoCardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Office Hours */}
               <div className="p-10 bg-gray-50 rounded-[32px] border border-gray-100 flex flex-col items-center text-center group hover:bg-primary-navy transition-all duration-500 shadow-sm hover:shadow-xl">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-accent-red mb-6 shadow-sm group-hover:scale-110 transition-transform">
                     <FaClock size={24} />
                  </div>
                  <h3 className="font-heading font-bold text-[22px] text-primary-navy mb-4 group-hover:text-white">Office Hours</h3>
                  <p className="text-gray-600 group-hover:text-white/80 leading-relaxed text-[15px]">
                     Monday to Saturday<br />
                     <span className="font-bold text-primary-navy group-hover:text-white text-[16px]">9:00 AM – 6:00 PM IST</span>
                  </p>
               </div>

               {/* Visit Us */}
               <div className="p-10 bg-gray-50 rounded-[32px] border border-gray-100 flex flex-col items-center text-center group hover:bg-primary-navy transition-all duration-500 shadow-sm hover:shadow-xl">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-accent-red mb-6 shadow-sm group-hover:scale-110 transition-transform">
                     <FaCalendarAlt size={24} />
                  </div>
                  <h3 className="font-heading font-bold text-[22px] text-primary-navy mb-4 group-hover:text-white">Personal Counseling</h3>
                  <p className="text-gray-600 group-hover:text-white/80 leading-relaxed text-[15px]">
                     Walk-ins are welcome, but we recommend scheduling a session for personalized career guidance.
                  </p>
               </div>

               {/* Global Reach */}
               <div className="p-10 bg-gray-50 rounded-[32px] border border-gray-100 flex flex-col items-center text-center group hover:bg-primary-navy transition-all duration-500 shadow-sm hover:shadow-xl">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-accent-red mb-6 shadow-sm group-hover:scale-110 transition-transform">
                     <FaGlobeAmericas size={24} />
                  </div>
                  <h3 className="font-heading font-bold text-[22px] text-primary-navy mb-4 group-hover:text-white">Global Reach</h3>
                  <p className="text-gray-600 group-hover:text-white/80 leading-relaxed text-[15px]">
                     Connecting students across India and GCC markets through physical centers and advanced online learning.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* Social Strip */}
      <section className="py-20 px-6 bg-gray-50 text-center">
         <div className="container max-w-[800px] mx-auto">
            <h4 className="font-heading font-bold text-[28px] md:text-[36px] lg:text-[42px] text-primary-navy mb-8">Follow Our Journey</h4>
            <div className="flex justify-center gap-6">
               {['Instagram', 'LinkedIn', 'Facebook'].map((social) => (
                  <a key={social} href="#" className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-accent-red hover:text-white transition-all transform hover:-translate-y-1">
                     <span className="sr-only">{social}</span>
                     {social === 'Instagram' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.56.216.96.474 1.38.894.42.42.678.82.894 1.38.163.422.358 1.057.412 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.412 2.227-.216.56-.474.96-.894 1.38-.42.42-.82.678-1.38.894-.422.163-1.057.358-2.227.412-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.412-.56-.216-.96-.474-1.38-.894-.42-.42-.678-.82-.894-1.38-.163-.422-.358-1.057-.412-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227.216-.56.474-.96.894-1.38.42-.42.82-.678 1.38-.894.422-.163 1.057-.358 2.227-.412 1.266-.058 1.646-.07 4.85-.07M12 0C8.741 0 8.333.014 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.132 5.775.072 7.053.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.058-1.28.072-1.687.072-4.947s-.014-8.333-.072-7.053c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>}
               {social === 'LinkedIn' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>}
               {social === 'Facebook' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-8.74h-2.94v-3.403h2.94v-2.511c0-2.915 1.782-4.502 4.38-4.502 1.244 0 2.315.093 2.626.134v3.045l-1.802.001c-1.414 0-1.688.672-1.688 1.658v2.173h3.371l-.439 3.403h-2.932v8.74h6.056c.731 0 1.325-.593 1.325-1.325v-21.351c0-.731-.593-1.325-1.325-1.325z"/></svg>}
            </a>
         ))}
      </div>
   </div>
</section>
</div>
);
}
