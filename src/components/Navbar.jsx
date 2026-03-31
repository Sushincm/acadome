import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../data";

export default function Navbar({ isNavOpen, setIsNavOpen, isNavFloating, toggleNav, closeNav, lenisRef }) {
  const location = useLocation();

  const handleAnchorClick = (e, target) => {
    if (target && target.startsWith("#")) {
      if (location.pathname === "/") {
        e.preventDefault();
        closeNav();
        const targetElement = document.querySelector(target);
        if (targetElement) {
          lenisRef.current?.scrollTo(targetElement, { offset: -80 });
        }
      }
    } else {
      closeNav();
    }
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 mx-auto w-full bg-white z-[60] flex items-center py-4 ${isNavFloating ? "nav-floating" : ""}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center relative">
        <Link to="/" onClick={(e) => handleAnchorClick(e, "/")} className="flex items-center flex-shrink-0 relative z-20">
          <img src="/images/ACADOME-LOGO.png" alt="Acadome Logo" className="h-9 w-auto object-contain" />
        </Link>

        <div className="hidden md:flex items-center gap-8 relative z-20">
          <div className="flex items-center gap-8">
            {navLinks && navLinks.map((link) => (
              <Link 
                key={link.id} 
                to={link.href} 
                onClick={closeNav}
                className={`font-body text-[15px] font-medium transition-colors relative group ${location.pathname === link.href ? "text-primary-navy font-bold" : "text-gray-600 hover:text-primary-navy"}`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-[2px] bg-accent-red transition-all duration-300 group-hover:w-full ${location.pathname === link.href ? "w-full" : ""}`}></span>
              </Link>
            ))}
          </div>
          <Link to="/contact-us" className="inline-flex items-center justify-center px-5 py-2.5 font-body font-medium text-[14px] rounded-lg bg-primary-navy text-white hover:bg-accent-red transition-all shadow-sm">
            Enroll Now →
          </Link>
        </div>

        <button onClick={toggleNav} className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer relative z-50 w-[24px]" aria-label="Toggle navigation">
          <span className="w-full h-[2px] bg-gray-800 transition-all duration-300 origin-center" style={isNavOpen ? { transform: "translateY(7px) rotate(45deg)" } : {}}></span>
          <span className="w-full h-[2px] bg-gray-800 transition-all duration-300 origin-center" style={isNavOpen ? { opacity: "0" } : {}}></span>
          <span className="w-full h-[2px] bg-gray-800 transition-all duration-300 origin-center" style={isNavOpen ? { transform: "translateY(-7px) rotate(-45deg)" } : {}}></span>
        </button>
      </div>

      <div id="nav-links" className={`fixed top-0 left-0 w-full h-screen bg-white z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 ease-in-out md:hidden ${isNavOpen ? "mobile-menu-active" : "mobile-menu-inactive"}`}>
        {navLinks.map((link) => (
          <Link key={link.id} to={link.href} onClick={closeNav} className={`font-body text-2xl font-medium ${location.pathname === link.href ? "text-primary-navy" : "text-gray-800"}`}>
            {link.label}
          </Link>
        ))}
        <Link to="/contact-us" onClick={closeNav} className="inline-flex items-center justify-center px-8 py-3 font-body font-medium text-lg rounded-lg border border-primary-navy bg-primary-navy text-white shadow-sm mt-4 hover:bg-accent-red hover:border-accent-red transition-colors">
          Enroll Now →
        </Link>
      </div>
    </nav>
  );
}
