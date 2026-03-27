import hero from "../assets/hero.png"
const Hero = () => {
  return (
    <div className="relative h-[80vh]">
      <img
        src={hero}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-white text-center px-4">
        <h1 className="text-5xl font-bold mb-4">
          Computer Science Department
        </h1>

        <p className="text-lg mb-6 max-w-xl">
          Empowering students with innovation, technology, and excellence.
        </p>

        <button className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700">
          Explore More
        </button>
      </div>
    </div>
  );
};

export default Hero;