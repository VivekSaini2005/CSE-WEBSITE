const Card = ({ name, designation = "Professor", specialization, subject, image }) => {
  const spec = specialization || subject;

  return (
    <div className="group bg-white rounded-xl shadow-soft p-6 text-center border border-slate-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30 flex flex-col items-center">
      
      {/* Normalized Avatar Wrapper identical to Student layout */}
      <div className="w-20 h-20 mx-auto rounded-full mb-4 overflow-hidden shadow-sm border-4 border-slate-50 group-hover:border-primary/10 transition-colors">
        {image && image !== "" && !image.includes("placeholder") ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              // Fallback explicitly to the raw SVG silhouette if image fetch fails
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
        ) : null}
        
        {/* SVG Base64 Geometry Fallback */}
        <div className={`w-full h-full bg-slate-200 ${(!image || image === "" || image.includes("placeholder")) ? "flex" : "hidden"} items-center justify-center text-slate-400`}>
          <svg className="w-10 h-10 object-cover" fill="currentColor" viewBox="0 0 24 24">
             <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
      </div>

      {/* Typography identical mapping */}
      <h3 className="text-lg font-bold font-heading text-slate-800 tracking-tight group-hover:text-primary transition-colors">
        {name}
      </h3>
      
      <p className="text-sm font-semibold text-accent mt-1 tracking-wide">
        {designation}
      </p>
      
      {/* Interactive Divider Line */}
      <div className="w-12 h-[2px] bg-slate-100 my-3 group-hover:bg-primary/20 transition-colors"></div>
      
      <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed px-2">
        {spec}
      </p>

    </div>
  );
};

export default Card;