import { Link } from "react-router-dom";
import news from "../data/newsData";

const NewsSection = () => {
  // Ensure we only slice the 3 latest nodes for the homepage preview
  const latestNews = news.slice(0, 3);

  return (
    <div className="w-full">
      <div className="border-b border-gray-200 pb-4 mb-8">
        <h2 className="text-3xl lg:text-4xl font-bold font-heading text-primary">
          Latest News
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestNews.map((item) => (
          <div
            key={item.id}
            className="group bg-white p-5 rounded-lg border border-gray-100 hover:border-primary transition-all duration-300 hover:shadow-soft flex flex-col h-full"
          >
            {/* Matching standard news-page aesthetic */}
            <div className="flex justify-between items-start gap-4 mb-2 flex-col sm:flex-row sm:items-center">
              <h3 className="text-lg font-semibold font-heading text-primary leading-tight group-hover:text-slate-800 transition-colors">
                {item.title}
              </h3>
              <span className="text-xs font-medium text-muted bg-slate-50 px-3 py-1 rounded border border-slate-100 whitespace-nowrap self-start sm:self-auto">
                {item.date}
              </span>
            </div>
            
            <p className="text-sm text-slate-600 mt-2 mb-5 flex-grow leading-relaxed line-clamp-3">
              {item.description}
            </p>
            
            <Link 
              to="/news" 
              className="mt-auto text-sm font-medium text-accent hover:text-primary transition-colors focus:outline-none self-start flex items-center gap-1 group/btn"
            >
              Read More
              <svg className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18" />
              </svg>
            </Link>
          </div>
        ))}
      </div>

      {/* Central View All Button */}
      <div className="mt-10 flex justify-center">
        <Link 
          to="/news" 
          className="bg-primary text-white font-medium px-8 py-3 rounded-lg hover:bg-slate-800 hover:shadow-soft transition-all duration-300 transform hover:-translate-y-1"
        >
          View All News
        </Link>
      </div>
    </div>
  );
};

export default NewsSection;