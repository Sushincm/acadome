import { useState } from 'react';
import { contactData, coursesTabsData } from '../data';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaArrowRight, FaCheck } from 'react-icons/fa';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate API call
    setTimeout(() => {
      // Simulate success
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', course: '', message: '' });
      
      // Reset back to idle after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    }, 2000);
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
    <section id="contact" className="py-20 md:py-32 bg-[#EBEBEB] w-full overflow-hidden">
      <div className="container max-w-[1240px] mx-auto px-4 md:px-6">
        
        {/* TOP: Contact Info & Form Row */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start mb-20 md:mb-24">
          
          {/* Left Side: Contact Info (Header + Info List) */}
          <div className="w-full lg:w-[42%] flex flex-col items-start text-left">
            <span className="text-accent-red font-sora font-semibold text-[13px] uppercase tracking-[0.25em] mb-4">
              {contactData.header.tag}
            </span>
            <h2 className="text-primary-navy font-sora font-bold text-[36px] md:text-[44px] lg:text-[48px] leading-[1.1] mb-10">
              Connect with Our Expert Team
            </h2>
            
            {/* Contact Details List */}
            <div className="flex flex-col w-full">
              {contactData.details.map((item, idx) => {
                const isLink = item.type === 'tel' || item.type === 'email';
                const href = item.type === 'tel' ? `tel:${item.value}` : `mailto:${item.value}`;
                
                const Content = (
                  <div key={idx} className="flex items-center gap-6 py-5 border-b border-gray-100 group w-full">
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

          {/* Right Side: Form (Navy Background) */}
          <div className="w-full lg:w-[58%] bg-primary-navy p-8 md:p-12 lg:p-14 rounded-[24px] shadow-[0_20px_50px_rgba(15,39,71,0.15)] relative overflow-hidden">
            {/* Subtle decorative circle */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-white/40 font-body text-[10px] uppercase tracking-widest font-bold ml-1">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    disabled={status === 'sending'}
                    className="bg-white border border-gray-200 rounded-[10px] px-4 py-3 outline-none text-primary-navy font-body placeholder:text-gray-300 transition-all focus:ring-2 focus:ring-accent-red/20 w-full text-[15px]"
                    required
                  />
                </div>
                {/* Email Address */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-white/40 font-body text-[10px] uppercase tracking-widest font-bold ml-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. name@email.com"
                    disabled={status === 'sending'}
                    className="bg-white border border-gray-200 rounded-[10px] px-4 py-3 outline-none text-primary-navy font-body placeholder:text-gray-300 transition-all focus:ring-2 focus:ring-accent-red/20 w-full text-[15px]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone Number */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-white/40 font-body text-[10px] uppercase tracking-widest font-bold ml-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 0000 000 000"
                    disabled={status === 'sending'}
                    className="bg-white border border-gray-200 rounded-[10px] px-4 py-3 outline-none text-primary-navy font-body placeholder:text-gray-300 transition-all focus:ring-2 focus:ring-accent-red/20 w-full text-[15px]"
                    required
                  />
                </div>
                {/* Course Interest */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="course" className="text-white/40 font-body text-[10px] uppercase tracking-widest font-bold ml-1">Course Interest</label>
                  <div className="relative">
                    <select
                      id="course"
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      disabled={status === 'sending'}
                      className="bg-white border border-gray-200 rounded-[10px] px-4 py-3 outline-none text-primary-navy font-body transition-all focus:ring-2 focus:ring-accent-red/20 w-full appearance-none cursor-pointer text-[15px]"
                      required
                    >
                      <option value="" disabled>Choose a program</option>
                      <option value="CCAP">CCAP — Certified Comprehensive Accounting Program</option>
                      <option value="DAFA">DAFA — Diploma in Advanced Financial Accounting</option>
                      <option value="SAP">SAP FICO</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <FaArrowRight size={10} className="rotate-90" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Your Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-white/40 font-body text-[10px] uppercase tracking-widest font-bold ml-1">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell us a bit about what you need..."
                  disabled={status === 'sending'}
                  className="bg-white border border-gray-200 rounded-[10px] px-4 py-3 outline-none text-primary-navy font-body placeholder:text-gray-300 transition-all focus:ring-2 focus:ring-accent-red/20 w-full resize-none text-[15px]"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className={`w-full py-4 rounded-lg font-sora font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 shadow-md 
                  ${status === 'idle' ? 'bg-accent-red hover:bg-white hover:text-primary-navy' : ''}
                  ${status === 'sending' ? 'bg-white/20 cursor-not-allowed' : ''}
                  ${status === 'success' ? 'bg-green-600' : ''}
                  ${status === 'error' ? 'bg-accent-red' : ''}
                `}
              >
                {status === 'idle' && (
                  <>
                    Send Message <FaArrowRight size={12} />
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
        <div className="w-full rounded-[24px] overflow-hidden border border-gray-100 group shadow-lg transition-all duration-300 hover:shadow-xl h-[350px] md:h-[450px]">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1961.36172908012!2d76.1985316983948!3d10.522433700000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7ef420d023be5%3A0x528908e46c76b22f!2sACADOME%20%7C%20ACCOUNTING%20TRAINING%20INSTITUTE%20IN%20THRISSUR!5e0!3m2!1sen!2sus!4v1774463429405!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Acadome Location"
            className="transition-opacity duration-300 opacity-95 group-hover:opacity-100"
          />
        </div>
      </div>
    </section>
  );
}
