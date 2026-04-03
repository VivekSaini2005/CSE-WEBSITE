import { Link } from "react-router-dom";
import hero from "../assets/hero.png";

const Hero = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 animate-fade-in-up">
      {/* Contained Hero Box with Deep Rounded Corners */}
      <div className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[650px] rounded-[0.5rem] md:rounded-[1rem] overflow-hidden shadow-2xl border border-white/10 group">
        
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src={hero}
            alt="CSE Department Campus View"
            className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105"
          />
          {/* Professional Overlay Gradient for Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/50 to-transparent opacity-95"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        </div>

        {/* Hero Content Area */}
        <div className="relative z-10 h-full flex flex-col justify-center items-start px-8 md:px-16 lg:px-20 py-12 max-w-5xl">
          
          {/* Department Label / Suffix */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 border border-accent/30 rounded-full text-accent text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm animate-pulse">
            <span className="w-2 h-2 bg-accent rounded-full"></span>
            Established 2016
          </div>

          {/* Main Title - Responsive Hierarchy */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-white leading-[1.1] tracking-tight">
            Engineering the <br /> 
            <span className="text-accent underline decoration-accent/30 underline-offset-8 decoration-4">Future</span> of Technology
          </h1>
          
          {/* Detailed Subtext */}
          <p className="mt-8 text-base md:text-lg text-slate-100 max-w-xl font-medium leading-relaxed drop-shadow-sm opacity-90">
            Fostering an ecosystem of excellence through world-class labs, cross-disciplinary research, and a curriculum designed for the global digital economy.
          </p>

          {/* Strategic CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
            <Link 
              to="/news"
              className="group px-8 py-4 bg-accent text-white font-bold rounded-2xl hover:bg-[#b08e22] transition-all shadow-xl hover:shadow-accent/40 w-full sm:w-auto flex items-center justify-center gap-2 hover:-translate-y-1 transform active:scale-95"
            >
              Recent Updates
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </Link>
            
            <Link 
              to="/contact"
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-2xl hover:bg-white hover:text-primary transition-all shadow-lg w-full sm:w-auto flex items-center justify-center gap-2 hover:-translate-y-1 transform active:scale-95"
            >
              Contact Us
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;