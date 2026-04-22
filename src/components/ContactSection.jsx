import { useState, useEffect, useRef } from 'react';
import { contactData } from '../data';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaArrowRight, FaCheck } from 'react-icons/fa';
import { setupSplitText, setupScrollReveal } from '../utils/animations';

export default function ContactSection({ showMap = true }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const titleRef = useRef(null);
  const tagRef = useRef(null);
  const infoRef = useRef(null);
  const formRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (tagRef.current) setupScrollReveal(tagRef.current);
    if (titleRef.current) setupSplitText(titleRef.current);
    if (infoRef.current) setupScrollReveal(".contact-item", 0.2);
    if (formRef.current) setupScrollReveal(formRef.current, 0.3);
    if (showMap && mapRef.current) setupScrollReveal(mapRef.current, 0.4);
  }, [showMap]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    /* 
      ACTION REQUIRED: For a real working form, replace the URL below with your 
      Formspree endpoint (formspree.io) or your custom backend URL.
    */
    const FORM_ENDPOINT = ""; // e.g. "https://formspree.io/f/your_id"

    if (!FORM_ENDPOINT) {
      // If no endpoint, we still simulate the success for now but with a warning
      console.warn("ContactSection: No FORM_ENDPOINT defined. Submission is simulated.");
      setTimeout(() => {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', course: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      }, 1500);
      return;
    }

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', course: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      console.error("Form error:", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const getIcon = (type) => {
    const icons = {
      tel: <FaPhoneAlt size={14} />,
      email: <FaEnvelope size={14} />,
      text: <FaMapMarkerAlt size={14} />
    };
    return icons[type];
  };

  return (
    <section id="contact" className={`py-20 md:py-32 bg-[#EBEBEB] w-full overflow-hidden ${!showMap ? 'pb-20' : ''}`}>
      <div className="container max-w-[1240px] mx-auto px-4 md:px-6">
        
        {/* TOP: Contact Info & Form Row */}
        <div className={`flex flex-col lg:flex-row gap-16 lg:gap-24 items-start ${showMap ? 'mb-20 md:mb-24' : 'mb-0'}`}>
          
          {/* Left Side: Contact Info (Header + Info List) */}
          <div className="w-full lg:w-[42%] flex flex-col items-start text-left">
            <span ref={tagRef} className="text-accent-red font-sora font-semibold text-[13px] uppercase tracking-[0.25em] mb-4">
              {contactData.header.tag}
            </span>
            <h2 ref={titleRef} className="text-primary-navy font-sora font-bold text-[36px] md:text-[44px] lg:text-[48px] leading-[1.1] mb-10 whitespace-normal break-words max-w-full">
              Connect with Our Expert Team
            </h2>
            
            {/* Contact Details List */}
            <div className="flex flex-col w-full" ref={infoRef}>
              {contactData.details.map((item, idx) => {
                const isLink = item.type === 'tel' || item.type === 'email';
                const href = item.type === 'tel' ? `tel:${item.value}` : `mailto:${item.value}`;
                
                const Content = (
                  <div key={idx} className="flex items-center gap-6 py-5 border-b border-gray-100 group w-full contact-item">
                    <div className="w-9 h-9 rounded-lg bg-primary-navy shrink-0 flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-accent-red">
                      {getIcon(item.type)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-accent-red font-sora font-bold text-[10px] uppercase tracking-widest mb-1">
                        {item.label}
                      </span>
                      <span className="text-primary-navy font-body text-[15.5px] md:text-[17px] font-medium leading-tight">
                        {item.value}
                      </span>
                    </div>
                  </div>
                );

                return isLink ? (
                  <a key={idx} href={href} className="block no-underline">
                    {Content}
                  </a>
                ) : (
                  <div key={idx}>{Content}</div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Form (Modern White Card) */}
          <div ref={formRef} className="w-full lg:w-[58%] bg-white p-8 md:p-12 lg:p-14 rounded-[32px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 relative overflow-hidden group">
            {/* Subtle decorative glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-red/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-accent-red/10 transition-colors"></div>

            <form onSubmit={handleSubmit} className="space-y-7 relative z-10 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                {/* Full Name */}
                <div className="flex flex-col gap-2.5">
                  <label htmlFor="name" className="text-primary-navy font-sora text-[11px] uppercase tracking-[0.15em] font-bold ml-1 opacity-60">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    disabled={status === 'sending'}
                    className="bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-4 outline-none text-primary-navy font-body placeholder:text-gray-400 transition-all focus:ring-2 focus:ring-accent-red/20 focus:border-accent-red/30 w-full text-[15px]"
                    required
                  />
                </div>
                {/* Email Address */}
                <div className="flex flex-col gap-2.5">
                  <label htmlFor="email" className="text-primary-navy font-sora text-[11px] uppercase tracking-[0.15em] font-bold ml-1 opacity-60">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. name@email.com"
                    disabled={status === 'sending'}
                    className="bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-4 outline-none text-primary-navy font-body placeholder:text-gray-400 transition-all focus:ring-2 focus:ring-accent-red/20 focus:border-accent-red/30 w-full text-[15px]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                {/* Phone Number */}
                <div className="flex flex-col gap-2.5">
                  <label htmlFor="phone" className="text-primary-navy font-sora text-[11px] uppercase tracking-[0.15em] font-bold ml-1 opacity-60">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 0000 000 000"
                    disabled={status === 'sending'}
                    className="bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-4 outline-none text-primary-navy font-body placeholder:text-gray-400 transition-all focus:ring-2 focus:ring-accent-red/20 focus:border-accent-red/30 w-full text-[15px]"
                    required
                  />
                </div>
                {/* Course Interest */}
                <div className="flex flex-col gap-2.5">
                  <label htmlFor="course" className="text-primary-navy font-sora text-[11px] uppercase tracking-[0.15em] font-bold ml-1 opacity-60">Course Interest</label>
                  <div className="relative">
                    <select
                      id="course"
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      disabled={status === 'sending'}
                      className="bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-4 outline-none text-primary-navy font-body flex items-center transition-all focus:ring-2 focus:ring-accent-red/20 focus:border-accent-red/30 w-full appearance-none cursor-pointer text-[15px]"
                      required
                    >
                      <option value="" disabled>Choose a program</option>
                      <option value="CCAP">CCAP — Certified Comprehensive Accounting Program</option>
                      <option value="DAFA">DAFA — Diploma in Advanced Financial Accounting</option>
                      <option value="SAP">SAP FICO</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <FaArrowRight size={10} className="rotate-90" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Your Message */}
              <div className="flex flex-col gap-2.5">
                <label htmlFor="message" className="text-primary-navy font-sora text-[11px] uppercase tracking-[0.15em] font-bold ml-1 opacity-60">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Tell us a bit about your career goals..."
                  disabled={status === 'sending'}
                  className="bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-4 outline-none text-primary-navy font-body placeholder:text-gray-400 transition-all focus:ring-2 focus:ring-accent-red/20 focus:border-accent-red/30 w-full resize-none text-[15px]"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className={`w-full py-5 rounded-xl font-sora font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-accent-red/20 scale-100 hover:scale-[1.01] active:scale-[0.99]
                  ${status === 'idle' ? 'bg-primary-navy hover:bg-accent-red' : ''}
                  ${status === 'sending' ? 'bg-gray-300 cursor-not-allowed' : ''}
                  ${status === 'success' ? 'bg-green-600' : ''}
                  ${status === 'error' ? 'bg-accent-red' : ''}
                `}
              >
                {status === 'idle' && (
                  <>
                    Send Message <FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
                
                {status === 'sending' && (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </>
                )}
                
                {status === 'success' && (
                  <>
                    Message Sent <FaCheck size={14} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* BOTTOM: Full Width Map Integration */}
        {showMap && (
          <div ref={mapRef} className="w-full rounded-[24px] overflow-hidden border border-gray-100 group shadow-lg transition-all duration-300 hover:shadow-xl h-[350px] md:h-[450px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1961.36172908012!2d76.1985316983948!3d10.522433700000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7ef420d023be5%3A0x528908e46c76b22f!2sACADOME%20%7C%20ACCOUNTING%20TRAINING%20INSTITUTE%20IN%20THRISSUR!5e0!3m2!1sen!2sus!4v1774463429405!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="ACADOME Location"
              className="transition-opacity duration-300 opacity-95 group-hover:opacity-100"
            />
          </div>
        )}
      </div>
    </section>
  );
}
