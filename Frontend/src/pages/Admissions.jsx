import React from "react";
import { Link } from "react-router-dom";

const Admissions = () => {
  return (
    <div className="flex flex-col gap-10 w-full animate-fade-in-up items-center">
      {/* Centered Top Header */}
      <div className="w-full border-b border-slate-200 pb-4 text-center mb-6">
        <h2 className="text-3xl lg:text-4xl font-bold font-heading text-primary">
          Admissions Information
        </h2>
        <p className="text-muted mt-3 max-w-2xl mx-auto leading-relaxed">
          Join the Department of Computer Science & Engineering and help shape the next era of technological advancement across the global ecosystem.
        </p>
      </div>

      {/* Main Content Area properly constrained for readability */}
      <div className="w-full max-w-4xl flex flex-col gap-8 pb-12">
        
        {/* Eligibility Criteria Section */}
        <section className="bg-white p-6 md:p-8 rounded-lg shadow-soft border border-slate-100">
          <h3 className="text-2xl font-bold font-heading text-slate-800 border-b border-slate-100 pb-4 mb-5">
            Undergraduate Eligibility Criteria
          </h3>
          <p className="text-slate-600 mb-4 leading-relaxed">
            Candidates seeking admission to the competitive B.Tech Computer Science & Engineering program must strictly adhere to the following national criteria schemas:
          </p>
          <ul className="list-disc ml-6 mt-2 text-slate-700 space-y-3 marker:text-primary">
            <li>Successful completion of 10+2 secondary examination frameworks featuring Physics, Mathematics, and Chemistry as core disciplines.</li>
            <li>Securing a minimum aggregate of 75% marks strictly in the board examinations (or landing within the top 20 percentile brackets).</li>
            <li>Securing a highly competitive rank in the Joint Entrance Examination (JEE Main) conducted globally by the NTA.</li>
            <li>Ultimate admission mapping relies exclusively on centralized JoSAA counseling iterations reacting directly toward real-time cutoff metrics.</li>
          </ul>
        </section>

      </div>
    </div>
  );
};

export default Admissions;
