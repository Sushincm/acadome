import { FaInstagram, FaLinkedinIn, FaFacebookF, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleAnchorClick = (e, target) => {
    if (target && target.startsWith('#')) {
      e.preventDefault();
      const lenis = window.__lenis_instance__;
      if (lenis) {
        lenis.scrollTo(target, { offset: -80 });
      }
    }
  };

  return (
    <footer className="bg-primary-navy text-white pt-20 pb-10 w-full overflow-hidden">
      <div className="container max-w-[1240px] mx-auto px-4 md:px-6">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Col 1: Brand Info */}
          <div className="flex flex-col">
            <a href="#home" onClick={(e) => handleAnchorClick(e, '#home')} className="mb-6 block w-fit">
              <img 
                src="/images/ACADOME-LOGO-WHITE.png" 
                alt="Acadome Logo" 
                className="h-9 w-auto object-contain"
              />
            </a>
            <p className="text-white/70 font-body text-[15px] leading-relaxed mb-8 max-w-[280px]">
              Empowering individuals with cutting-edge financial management skills.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: <FaInstagram size={16} />, href: "#" },
                { icon: <FaLinkedinIn size={16} />, href: "#" },
                { icon: <FaFacebookF size={16} />, href: "#" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href} 
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80 transition-all duration-300 hover:border-accent-red hover:bg-accent-red hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="flex flex-col">
            <h4 className="font-sora font-bold text-[18px] mb-8 text-white">Quick Links</h4>
            <ul className="flex flex-col gap-4">
              {[
                { label: "About Us", href: "#about" },
                { label: "Our Courses", href: "#programs" },
                { label: "Gallery", href: "#gallery" },
                { label: "Contact Us", href: "#contact" }
              ].map((link, i) => (
                <li key={i}>
                  <a 
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="font-body text-[15px] text-white/70 transition-all duration-300 hover:text-accent-red flex items-center group"
                  >
                    {link.label}
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                      &rarr;
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Programs */}
          <div className="flex flex-col">
            <h4 className="font-sora font-bold text-[18px] mb-8 text-white">Our Courses</h4>
            <ul className="flex flex-col gap-4">
              {[
                { label: "CCAP", href: "#programs" },
                { label: "DAFA", href: "#programs" },
                { label: "SAP FICO", href: "#programs" }
              ].map((course, i) => (
                <li key={i}>
                  <a 
                    href={course.href}
                    onClick={(e) => handleAnchorClick(e, course.href)}
                    className="font-body text-[15px] text-white/70 transition-all duration-300 hover:text-accent-red flex items-center group"
                  >
                    {course.label}
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                      &rarr;
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="flex flex-col">
            <h4 className="font-sora font-bold text-[18px] mb-8 text-white">Contact Info</h4>
            <ul className="flex flex-col gap-6">
              <li className="flex items-start gap-4">
                <FaMapMarkerAlt className="text-accent-red mt-1 shrink-0" size={16} />
                <span className="text-white/70 font-body text-[14px] leading-relaxed">
                  Chowallur Tower, Room No. 52/1067/35, 3rd floor, West Fort, Civil Lane, Thrissur, Kerala — 680004
                </span>
              </li>
              <li className="flex items-center gap-4">
                <FaPhoneAlt className="text-accent-red shrink-0" size={14} />
                <div className="flex flex-col gap-1">
                  <a href="tel:+919778914198" className="text-white/70 font-body text-[14px] hover:text-white transition-colors">+91 9778914198</a>
                  <a href="tel:+96569606980" className="text-white/70 font-body text-[14px] hover:text-white transition-colors">+965 69606980</a>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <FaEnvelope className="text-accent-red shrink-0" size={14} />
                <a href="mailto:info@acadome.in" className="text-white/70 font-body text-[14px] hover:text-white transition-colors">info@acadome.in</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-8 overflow-hidden relative">
           {/* Animated line movement could go here if GSAP is used */}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-center gap-6 px-2">
          <p className="text-white/40 font-body text-[13px] tracking-wide uppercase font-medium text-center">
            &copy; {currentYear} ACADOME. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
