import React from "react";

const About = () => {
  return (
    <div className="flex flex-col w-full animate-fade-in-up items-center">
      {/* Centered Top Header */}
      <div className="w-full border-b border-slate-200 pb-4 text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold font-heading text-primary">
          About the Department
        </h2>
        <p className="text-muted mt-3 max-w-2xl mx-auto">
          Pioneering computational excellence through rigorous academics, cutting-edge research, and inclusive innovation.
        </p>
      </div>

      {/* Main Content Area explicitly constrained to max-w-3xl for extreme readability */}
      <div className="w-full max-w-3xl flex flex-col gap-12 text-slate-700 leading-relaxed pb-8">
        
        {/* Department Overview */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold font-heading text-slate-800">Department Overview</h3>
          </div>
          <p className="mb-4">
            The Department of Computer Science & Engineering (CSE) is inherently driven to push the boundaries of computational science. We are dedicated to providing our students with an educational foundation that bridges advanced theoretical mechanics with highly practical, real-world engineering methodologies.
          </p>
          <p>
            Our curriculum is continually refreshed and adapted, aligning strongly with modern industry directives to ensure our graduates enter the workforce as distinguished computational leaders and problem solvers. With highly equipped laboratories and strategic ties to leading technological organizations, our graduates receive exceptional exposure to both foundational computing logic and advanced domains like Artificial Intelligence, Quantum Networks, and Distributed Architecture.
          </p>
        </section>

        <div className="w-full h-px bg-slate-200 opacity-50 my-2"></div>

        {/* Vision & Mission */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold font-heading text-slate-800">Vision & Mission</h3>
          </div>
          
          <h4 className="text-xl font-semibold text-primary mb-3">Our Vision</h4>
          <p className="mb-8 italic border-l-4 border-accent pl-5 text-slate-600 bg-slate-50 py-4 rounded-r-lg shadow-sm">
            "To be globally recognized as a premier center of excellence in computer science education, driving transformative research and producing ethically sound future technology leaders."
          </p>

          <h4 className="text-xl font-semibold text-primary mb-3">Our Mission</h4>
          <ul className="list-disc pl-5 space-y-3 marker:text-accent outline-none">
            <li>To impart state-of-the-art computational knowledge and highly competent engineering frameworks.</li>
            <li>To foster a vibrant research ecosystem that solves intricate societal and global technical challenges.</li>
            <li>To instill unwavering professional ethics, collaborative responsibility, and strong communication dynamics among students.</li>
            <li>To construct an inclusive administrative culture supporting continuous learning for both students and distinguished faculty.</li>
          </ul>
        </section>

        <div className="w-full h-px bg-slate-200 opacity-50 my-2"></div>

        {/* History */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold font-heading text-slate-800">Department History</h3>
          </div>
          <p className="mb-4">
            Established in 1995, the CSE department began with a singularly focused undergraduate program containing just 40 students. It was born out of a strategic institutional vision recognizing the inevitable societal paradigm shift toward mass digitalization and software engineering.
          </p>
          <p>
            Over the past three decades, the department has grown exponentially into a massive technological hub supporting highly sought after Bachelor's, Master's, and Doctoral degree structures. The progression timeline marks aggressive integration with national defense projects, large-scale research grants, and continuous infrastructural overhauls resulting in our currently established high-performance data pipelines and sophisticated edge-computing laboratories.
          </p>
        </section>

      </div>
    </div>
  );
};

export default About;
