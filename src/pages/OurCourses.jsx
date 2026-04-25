import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { setupScrollReveal } from "../utils/animations";
import { courseComparisonData, courseFaqs, coursesHeaderData, coursesTabsData } from "../data/courses";
// import CoursesSection from "../components/CoursesSection"; // Replaced with custom grid
import MarqueeSection from "../components/MarqueeSection";
import SEO from "../components/SEO";
import { FaChevronDown, FaClock, FaCheckCircle } from "react-icons/fa";

const CourseCard = ({ course }) => (
  <div className="group bg-white rounded-[32px] overflow-hidden border border-gray-200 shadow-lg hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] hover:border-accent-red/20 transition-all duration-500 flex flex-col h-full">
    <div className="relative aspect-[16/10] overflow-hidden">
      <img 
        src={course.imageSrc} 
        alt={course.title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute top-6 left-6">
        <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-primary-navy text-[12px] font-bold uppercase tracking-wider rounded-full shadow-sm flex items-center gap-2">
          <FaClock className="text-accent-red" />
          {course.durationInfo}
        </span>
      </div>
    </div>
    
    <div className="p-8 md:p-10 flex flex-col flex-grow">
      <h3 className="font-heading font-bold text-[24px] md:text-[28px] text-primary-navy mb-4 leading-tight group-hover:text-accent-red transition-colors">
        {course.title}
      </h3>
      <p className="text-gray-600 font-body text-[16px] leading-relaxed mb-8 flex-grow">
        {course.description}
      </p>
      
      <div className="space-y-4 mb-10">
        <h4 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">Core Curriculum</h4>
        <div className="grid grid-cols-1 gap-3">
          {course.topics.slice(0, 4).map((topic, i) => (
            <div key={i} className="flex items-center gap-3 text-gray-700 text-[15px]">
              <FaCheckCircle className="text-accent-red shrink-0" size={14} />
              <span>{topic}</span>
            </div>
          ))}
        </div>
      </div>
      
      <a 
        href={`https://wa.me/919778914198?text=${encodeURIComponent(course.whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-flex items-center justify-center px-8 py-4.5 bg-primary-navy text-white font-body font-bold text-[15px] rounded-2xl hover:bg-accent-red transition-all duration-300 shadow-lg group/btn"
      >
        Enroll Now
        <span className="ml-2 group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
      </a>
    </div>
  </div>
);

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

  const comparisonRef = useRef(null);
  const faqRef = useRef(null);

  useEffect(() => {

    if (comparisonRef.current) setupScrollReveal(comparisonRef.current.children);
    if (faqRef.current) setupScrollReveal(faqRef.current.children);
  }, []);

  return (
    <div className="bg-white">
      <SEO 
        title="Our Courses" 
        description="Discover professional accounting and finance courses at ACADOME. SAP FICO, Tally, Zoho Books, and comprehensive training designed for GCC job markets."
      />

      {/* Main Courses Section - Re-designed to Grid */}
      <section className="pt-32 pb-20 md:pt-[160px] md:pb-24 px-6 bg-white overflow-hidden flex items-center min-h-[400px] md:min-h-[550px]">
        <div className="container max-w-[1240px] mx-auto">
          <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg bg-gray-50 text-[13px] font-medium text-gray-500 mb-6 uppercase tracking-widest shadow-sm">
              {coursesHeaderData.tag}
            </div>
            <h2 className="font-heading font-bold text-[32px] md:text-[44px] lg:text-[52px] text-primary-navy mb-6 tracking-tight leading-[1.1]">
              {coursesHeaderData.title}
            </h2>
            <p className="text-gray-500 max-w-2xl text-[17px] md:text-[19px] leading-relaxed">
              Explore our range of professional accounting programs, each tailored to specific career milestones and industry demands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {coursesTabsData.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

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
      <section className="pb-20 md:pb-32 px-6 bg-white overflow-hidden">
        <div className="container max-w-[900px] mx-auto">
          <div ref={faqRef} className="mb-12 text-center flex flex-col items-center">
            <h2 className="font-heading font-bold text-[28px] md:text-[36px] lg:text-[42px] text-primary-navy mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl">
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
               <Link 
                to="/contact-us" 
                className="inline-flex items-center justify-center px-10 py-5 bg-white text-accent-red font-body font-bold text-[17px] rounded-2xl hover:bg-primary-navy hover:text-white transition-all duration-500 shadow-xl hover:-translate-y-1 active:scale-95"
               >
                Talk to Our Experts <span>&rarr;</span>
               </Link>
               <a 
                href="https://wa.me/919778914198?text=Hi%20ACADOME%2C%20I'm%20exploring%20your%20courses%20and%20need%20help%20choosing%20the%20right%20program%20for%20my%20career." 
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
