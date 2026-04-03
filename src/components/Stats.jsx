const Stats = () => {
  const stats = [
    { label: "Faculty Members", value: "00" },
    { label: "Students", value: "00" },
    { label: "Research Papers", value: "00" },
    { label: "Placements", value: "0%" },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div 
            key={index}
            className="bg-white shadow-soft rounded-lg p-6 text-center hover:-translate-y-1 transition-transform duration-300"
          >
            <h3 className="text-3xl lg:text-4xl font-bold font-heading text-primary">
              {item.value}
            </h3>
            <p className="text-muted mt-2 font-medium text-sm sm:text-base">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;