import news from "../data/newsData";

const NewsSection = () => {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6">Latest News</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {news.map((item) => (
          <div
            key={item.id}
            className="p-5 border rounded-lg shadow-sm hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-xl mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;