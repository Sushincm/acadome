import { useEffect, useRef, useState } from "react";
import { setupScrollReveal } from "../utils/animations";
import { courseComparisonData, courseFaqs } from "../data";
import CoursesSection from "../components/CoursesSection";
import MarqueeSection from "../components/MarqueeSection";
import { FaChevronDown } from "react-icons/fa";

const FaqItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group transition-all"
      >
        <span className={`text-[17px] font-semibold transition-colors ${isOpen ? 'text-accent-red' : 'text-primary-navy group-hover:text-accent-red'}`}>
          {faq.question}
        </span>
        <FaChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent-red' : 'text-gray-400'}`} size={16} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-gray-600 leading-relaxed text-[16px]">
          {faq.answer}
        </p>
      </div>
    </div>
  );
};

export default function OurCourses() {
  const heroRef = useRef(null);
  const comparisonRef = useRef(null);
  const faqRef = useRef(null);

  useEffect(() => {
    if (heroRef.current) setupScrollReveal(heroRef.current.children);
    if (comparisonRef.current) setupScrollReveal(comparisonRef.current.children);
    if (faqRef.current) setupScrollReveal(faqRef.current.children);
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="bg-primary-navy pt-[140px] pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-red/10 rounded-full blur-[100px]"></div>
        <div ref={heroRef} className="container max-w-[1240px] mx-auto text-center relative z-10">
          <h1 className="font-heading font-semibold text-[40px] md:text-[56px] text-white mb-6">
            Our Courses
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            Comprehensive programs designed to transform you into a professional accountant with real-world expertise.
          </p>
          <div className="flex items-center justify-center gap-2 text-white/60 text-[14px]">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <span className="text-white font-medium">Our Courses</span>
          </div>
        </div>
      </section>

      {/* Main Courses Section */}
      <CoursesSection />

      {/* Software Tools Marquee */}
      <MarqueeSection />

      {/* Course Comparison Table */}
      <section className="py-20 md:py-32 px-6 bg-gray-50 overflow-hidden">
        <div className="container max-w-[1240px] mx-auto">
          <div ref={comparisonRef} className="text-center mb-16">
            <h2 className="font-heading font-bold text-[28px] md:text-[36px] lg:text-[42px] text-primary-navy mb-6">
              Compare Our Programs
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find the perfect fit for your career goals. Whether you're a fresh graduate or a working professional.
            </p>
          </div>
          
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-primary-navy text-white text-[15px] uppercase tracking-wider">
                  {courseComparisonData.columns.map((col, i) => (
                    <th key={i} className={`p-6 md:p-8 font-bold ${i === 0 ? '' : 'text-center'}`}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {courseComparisonData.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="p-6 md:p-8 font-bold text-primary-navy bg-gray-50/30">{row.label}</td>
                    {row.values.map((val, i) => (
                      <td key={i} className="p-6 md:p-8 text-center text-gray-600 font-medium">
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 px-6 bg-white overflow-hidden">
        <div className="container max-w-[900px] mx-auto">
          <div ref={faqRef} className="mb-12">
            <h2 className="font-heading font-bold text-[28px] md:text-[36px] lg:text-[42px] text-primary-navy mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Find answers to common queries about our courses, certifications, and career support.
            </p>
          </div>
          
          <div className="bg-gray-50/50 px-8 py-4 rounded-3xl border border-gray-100">
            {courseFaqs.map((faq, i) => (
              <FaqItem key={i} faq={faq} />
            ))}
          </div>
        </div>
      </section>

      {/* Red CTA Section - Refined for Conversion */}
      <section className="py-20 px-6 bg-white overflow-hidden">
        <div className="container max-w-[1240px] mx-auto bg-accent-red rounded-3xl md:rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden group shadow-2xl shadow-accent-red/20">
          <div className="relative z-10 flex flex-col items-center gap-10">
            <h2 className="font-heading font-bold text-[28px] md:text-[38px] lg:text-[46px] text-white max-w-[850px] leading-[1.1] tracking-tight">
              Not sure which course is right for you? <br className="hidden md:block"/> Let's find your perfect path together.
            </h2>
            
            <div className="flex flex-wrap justify-center gap-5 md:gap-8">
               <a 
                href="/contact-us" 
                className="inline-flex items-center justify-center px-10 py-5 bg-white text-accent-red font-body font-bold text-[17px] rounded-2xl hover:bg-primary-navy hover:text-white transition-all duration-500 shadow-xl hover:-translate-y-1 active:scale-95"
               >
                Talk to Our Experts <span>&rarr;</span>
               </a>
               <a 
                href="https://wa.me/919778914198" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center px-10 py-5 bg-primary-navy text-white font-body font-bold text-[17px] rounded-2xl hover:bg-white hover:text-primary-navy transition-all duration-500 shadow-xl hover:-translate-y-1 active:scale-95 border border-white/10"
               >
                WhatsApp Us <span>&rarr;</span>
               </a>
            </div>
          </div>

          {/* Dynamic Background Accents */}
          <div className="absolute top-0 left-0 w-full h-full opacity-5 hover:opacity-10 transition-opacity pointer-events-none">
             <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-[100px]"></div>
             <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-black rounded-full blur-[120px]"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
