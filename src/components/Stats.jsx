const Stats = () => {
  const stats = [
    { label: "Students", value: "300+" },
    { label: "Faculty", value: "30+" },
    { label: "Labs", value: "10+" },
    { label: "Placements", value: "95%" },
  ];

  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-6">
        {stats.map((item, index) => (
          <div key={index}>
            <h2 className="text-3xl font-bold text-blue-600">
              {item.value}
            </h2>
            <p className="text-gray-600">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;