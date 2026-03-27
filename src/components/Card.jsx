const Card = ({ name, subject, image }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition">
      <img
        src={image}
        className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
      />

      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-500">{subject}</p>
    </div>
  );
};

export default Card;