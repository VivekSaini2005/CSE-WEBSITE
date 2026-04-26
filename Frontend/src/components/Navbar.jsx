import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext.jsx';
import logo from "../assets/logo.png";

const navLinks = [
  { path: "/", label: "Home" },
  { 
    label: "Academics", 
    dropdown: [
      { path: "/academics/admissions", label: "Admission Info" },
      { path: "/academics/syllabus", label: "Syllabus" },
      { path: "/academics/materials", label: "Curated Study Materials" }
    ]
  },
  { 
    label: "People", 
    dropdown: [
      { path: "/faculty", label: "Faculty" },
      { path: "/students", label: "Students" }
    ]
  },
  { 
    label: "About", 
    dropdown: [
      { path: "/about", label: "General Information" },
      { path: "/contact", label: "Contact Us" }
    ]
  },
  { path: "/research", label: "Research" },
  { path: "/achievements", label: "Achievements" },
  { path: "/alumni", label: "Alumni" },
  { path: "/news", label: "News" }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { token, isAdmin, logout } = useAuth();

  // Handle dynamic scroll shadow and padding
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Guarantee mobile menu closes upon route navigation
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`sticky top-0 z-50 bg-white transition-all duration-300 h-16 shadow-sm border-b border-slate-100 px-6`}
    >
      <div className="container mx-auto flex justify-between items-center h-full">
        {/* Left: Logo + Title */}
        <Link to="/" className="flex items-center gap-3 group focus:outline-none h-full">
          <img 
             src={logo} 
             alt="College Logo" 
             className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col leading-tight">
            {/* Desktop: 2-line Name */}
            <div className="hidden md:block">
              <div className="text-sm md:text-[15px] lg:text-base font-semibold text-primary">
                Computer Science and Engineering
              </div>
              <div className="text-[10px] md:text-xs text-slate-500 font-medium uppercase tracking-wider">
                Department
              </div>
            </div>
            {/* Mobile: Short Name */}
            <div className="block md:hidden text-sm font-semibold text-primary">
              CSE Dept
            </div>
          </div>
        </Link>

        {/* Right: Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 h-full">
          {(() => {
            const elements = [];
            navLinks.forEach((link, idx) => {
              if (idx === 1 && link.label === "Academics") {
                // Render Academics as second item
                const isParentActive = link.dropdown.some(drop => location.pathname === drop.path);
                elements.push(
                  <div key={`dropdown-academics`} className="relative group/dropdown h-full flex items-center">
                    <button
                      className={`group font-medium text-sm lg:text-[15px] py-1 transition-colors flex items-center gap-1 focus:outline-none h-full ${
                        isParentActive ? "text-primary" : "text-slate-600 hover:text-primary"
                      }`}
                    >
                      {link.label}
                      <svg className="w-4 h-4 transition-transform group-hover/dropdown:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      <span 
                        className={`absolute left-0 -bottom-px w-full h-[2.5px] bg-primary transition-transform origin-left duration-300 ease-out ${
                          isParentActive ? "scale-x-100" : "scale-x-0 group-hover/dropdown:scale-x-100"
                        }`}
                      ></span>
                    </button>
                    <div className="absolute right-0 top-full pt-1 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-300 transform origin-top translate-y-1 group-hover/dropdown:translate-y-0 min-w-50 z-60">
                      <div className="bg-white rounded-b-lg shadow-lg py-2 flex flex-col border border-slate-100 border-t-0">
                        {link.dropdown.map(drop => {
                          const isDropActive = location.pathname === drop.path;
                          return (
                            <Link
                              key={drop.path}
                              to={drop.path}
                              className={`px-4 py-2.5 block text-sm font-medium transition-colors ${
                                isDropActive 
                                  ? "bg-slate-50 text-primary border-l-4 border-primary" 
                                  : "text-slate-600 hover:bg-slate-50 hover:text-primary border-l-4 border-transparent"
                              }`}
                            >
                              {drop.label}
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                );
              } else if (idx === 2 && link.label === "People") {
                // Render People as third item
                elements.push(
                  <div key="dropdown-people" className="relative group/dropdown h-full flex items-center">
                    <button className="group font-medium text-sm lg:text-[15px] py-1 transition-colors flex items-center gap-1 focus:outline-none h-full text-slate-600 hover:text-primary">
                      People
                      <svg className="w-4 h-4 transition-transform group-hover/dropdown:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute right-0 top-full pt-1 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-300 transform origin-top translate-y-1 group-hover/dropdown:translate-y-0 min-w-50 z-60">
                      <div className="bg-white rounded-b-lg shadow-lg py-2 flex flex-col border border-slate-100 border-t-0">
                        <Link to="/faculty" className="px-4 py-2.5 block text-sm font-medium transition-colors text-slate-600 hover:bg-slate-50 hover:text-primary border-l-4 border-transparent">Faculty</Link>
                        <Link to="/students" className="px-4 py-2.5 block text-sm font-medium transition-colors text-slate-600 hover:bg-slate-50 hover:text-primary border-l-4 border-transparent">Students</Link>
                        {!token && (
                          <>
                            <Link to="/login" className="px-4 py-2.5 block text-sm font-medium transition-colors text-slate-600 hover:bg-slate-50 hover:text-primary border-l-4 border-transparent">Login</Link>
                            <Link to="/register" className="px-4 py-2.5 block text-sm font-medium transition-colors text-slate-600 hover:bg-slate-50 hover:text-primary border-l-4 border-transparent">Register</Link>
                          </>
                        )}
                        {token && isAdmin && (
                          <Link to="/admin" className="px-4 py-2.5 block text-sm font-medium transition-colors text-slate-600 hover:bg-slate-50 hover:text-primary border-l-4 border-transparent">Admin Panel</Link>
                        )}
                        {token && (
                          <button onClick={() => { logout(); navigate('/'); }} className="px-4 py-2.5 text-left block text-sm font-medium transition-colors text-slate-600 hover:bg-slate-50 hover:text-primary border-l-4 border-transparent">Logout</button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              } else if ((idx !== 1 && idx !== 2) && link.dropdown) {
                const isParentActive = link.dropdown.some(drop => location.pathname === drop.path);
                elements.push(
                  <div key={`dropdown-${idx}`} className="relative group/dropdown h-full flex items-center">
                    <button
                      className={`group font-medium text-sm lg:text-[15px] py-1 transition-colors flex items-center gap-1 focus:outline-none h-full ${
                        isParentActive ? "text-primary" : "text-slate-600 hover:text-primary"
                      }`}
                    >
                      {link.label}
                      <svg className="w-4 h-4 transition-transform group-hover/dropdown:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      <span 
                        className={`absolute left-0 -bottom-px w-full h-[2.5px] bg-primary transition-transform origin-left duration-300 ease-out ${
                          isParentActive ? "scale-x-100" : "scale-x-0 group-hover/dropdown:scale-x-100"
                        }`}
                      ></span>
                    </button>
                    <div className="absolute right-0 top-full pt-1 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-300 transform origin-top translate-y-1 group-hover/dropdown:translate-y-0 min-w-50 z-60">
                      <div className="bg-white rounded-b-lg shadow-lg py-2 flex flex-col border border-slate-100 border-t-0">
                        {link.dropdown.map(drop => {
                          const isDropActive = location.pathname === drop.path;
                          return (
                            <Link
                              key={drop.path}
                              to={drop.path}
                              className={`px-4 py-2.5 block text-sm font-medium transition-colors ${
                                isDropActive 
                                  ? "bg-slate-50 text-primary border-l-4 border-primary" 
                                  : "text-slate-600 hover:bg-slate-50 hover:text-primary border-l-4 border-transparent"
                              }`}
                            >
                              {drop.label}
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                );
              } else if (!link.dropdown && link.label !== "People") {
                const isActive = location.pathname === link.path;
                elements.push(
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`group relative font-medium text-sm lg:text-[15px] py-1 transition-colors h-full flex items-center ${
                      isActive ? "text-primary" : "text-slate-600 hover:text-primary"
                    }`}
                  >
                    {link.label}
                    <span
                        className={`absolute left-0 -bottom-px w-full h-[2.5px] bg-primary transition-transform origin-left duration-300 ease-out ${
                          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                    ></span>
                  </Link>
                );
              }
            });
            return elements;
          })()}
        </div>

        {/* Mobile menu trigger: Shifted to lg:hidden so we don't break layouts on iPads in portrait */}
        <button
          className="lg:hidden p-2 text-slate-600 hover:text-primary transition-colors focus:outline-none"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle Navigation"
        >
          {isMobileOpen ? (
            // X icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu: Expandable layout wrapper */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white transition-all duration-300 overflow-y-auto ${
          isMobileOpen ? "max-h-[75vh] shadow-soft border-t border-slate-100" : "max-h-0"
        }`}
      >
        <div className="flex flex-col py-4 px-6 gap-1">
          {navLinks.map((link) => {
            // Mobile Expandable Section
            if (link.label === "People") {
              return (
                <div key={`mob-drop-people`} className="flex flex-col focus:outline-none">
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-400 pl-4 py-2 mt-2">
                    People
                  </span>
                  {!token && (
                    <>
                      <Link to="/login" className="font-medium text-[15px] transition-all border-l-2 pl-6 py-2.5 rounded-r-md text-slate-600 border-transparent hover:text-primary hover:bg-slate-50">Login</Link>
                      <Link to="/register" className="font-medium text-[15px] transition-all border-l-2 pl-6 py-2.5 rounded-r-md text-slate-600 border-transparent hover:text-primary hover:bg-slate-50">Register</Link>
                    </>
                  )}
                  {token && isAdmin && (
                    <>
                      <Link to="/admin" className="font-medium text-[15px] transition-all border-l-2 pl-6 py-2.5 rounded-r-md text-slate-600 border-transparent hover:text-primary hover:bg-slate-50">Admin Panel</Link>
                      <button onClick={() => { logout(); navigate('/'); }} className="text-left font-medium text-[15px] transition-all border-l-2 pl-6 py-2.5 rounded-r-md text-slate-600 border-transparent hover:text-primary hover:bg-slate-50">Logout</button>
                    </>
                  )}
                  {token && !isAdmin && (
                    <button onClick={() => { logout(); navigate('/'); }} className="text-left font-medium text-[15px] transition-all border-l-2 pl-6 py-2.5 rounded-r-md text-slate-600 border-transparent hover:text-primary hover:bg-slate-50">Logout</button>
                  )}
                </div>
              );
            }
            // Standard Mobile Link
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium text-base transition-all border-l-2 pl-4 py-2.5 rounded-r-md ${
                  isActive
                    ? "text-primary border-primary bg-primary/5"
                    : "text-slate-600 border-transparent hover:text-primary hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;