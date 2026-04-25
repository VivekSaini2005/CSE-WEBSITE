import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
    }, 500);
  };

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="border-b border-slate-200 pb-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold font-heading text-primary">
          Contact Us
        </h2>
        <p className="text-muted mt-3 max-w-2xl mx-auto">
          We'd love to hear from you. Reach out with any inquiries regarding the department.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Contact Info Column */}
        <div className="bg-white p-8 rounded-xl shadow-soft border border-slate-100 flex flex-col gap-8 h-full">
          <div>
            <h3 className="text-2xl font-bold font-heading text-slate-800 mb-6">Get in Touch</h3>
            <p className="text-slate-600 leading-relaxed mb-8">
              Whether you're a prospective student seeking information about our programs, a researcher looking to collaborate, or an industry partner, our department is always open for dialogue.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-800 mb-1">Mailing Address</h4>
                <p className="text-slate-600 text-sm leading-relaxed text-muted">
                  Department of Computer Science & Engineering<br />
                  Rajkiya Engineering College<br />
                  Kannauj - 209732, Uttar Pradesh, India
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-800 mb-1">Email Connect</h4>
                <a href="mailto:contact@cse.reck.ac.in" className="text-primary hover:underline text-sm block mb-1">cseacademic@reck.com</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-800 mb-1">Phone Line</h4>
                <p className="text-slate-600 text-sm block mb-1">+91 (011) 2345-6789</p>
                <p className="text-muted text-xs block">Mon - Fri, 9:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="bg-white p-8 rounded-xl shadow-soft border border-slate-100 h-full flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold font-heading text-slate-800 mb-6">Send a Message</h3>
            
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="Enter your full name"
                  className="border border-slate-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                  Email Address <span className="text-accent">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="xyz@example.com"
                  className="border border-slate-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                  Your Message <span className="text-accent">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows="5"
                  placeholder="How can we help you?"
                  className="border border-slate-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="mt-2 w-full bg-primary text-white font-medium py-3 px-6 rounded-lg hover:bg-slate-800 transition-all duration-300 transform hover:-translate-y-1 shadow-soft hover:shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Alert Success */}
          {submitted && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-3 animate-fade-in-up">
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-sm font-medium">Thank you! Your message has been securely sent.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Contact;
