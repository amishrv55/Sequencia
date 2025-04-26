import React, { useEffect, useState } from "react";
import HeroSlider from "../components/HeroSlider";
import Header from "../components/Header";
import api from "../api/axiosInstance";

const HomePage = () => {
  const [tickers, setTickers] = useState([]);
  const [featuredQuestion, setFeaturedQuestion] = useState(null);

  // Fetch tickers
  useEffect(() => {
    const fetchTickers = async () => {
      try {
        const res = await api.get("/tickers/");
        setTickers(res.data);
      } catch (err) {
        console.error("❌ Error fetching tickers:", err);
      }
    };
    fetchTickers();
  }, []);

  // Fetch featured question
  const fetchFeatured = async () => {
    try {
      const res = await api.get("/questions/featured");
      setFeaturedQuestion(res.data);
    } catch (err) {
      console.error("❌ Error fetching featured question:", err);
    }
  };

  useEffect(() => {
    fetchFeatured(); // Initial load
    const interval = setInterval(fetchFeatured, 30000); // Every 30 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <Header />

      {/* Hero / Featured Question */}
      <section className="bg-indigo-100 py-10 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-indigo-700 font-medium">Featured Prediction</p>
          {featuredQuestion ? (
            <>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
                {featuredQuestion.title}
              </h2>
             
              
              <div className="flex justify-center mt-6">
               <button
                onClick={() => window.location.href = "/categories"}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg"
                >
                 See More Questions
                </button>
              </div>


            </>
          ) : (
            <p>Loading featured question...</p>
          )}
        </div>
      </section>

      {/* Hero Image Slider */}
      <div className="mt-10">
        <HeroSlider />
      </div>

      {/* Dynamic Ticker Cards */}
      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tickers.length > 0 ? (
            tickers.map((ticker) => (
              <MetricCard
                key={ticker.id}
                title={ticker.name}
                value={ticker.value}
                iconUrl={ticker.icon_url}
              />
            ))
          ) : (
            <p className="text-gray-500">No tickers available.</p>
          )}
        </div>
      </section>

      {/* Leaderboard Preview (Static) */}
      <section className="bg-white py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4">Top Forecasters</h3>
          <ul className="space-y-3">
            <LeaderboardItem rank={1} name="Amit Raj" score={96.2} />
            <LeaderboardItem rank={2} name="Priya Sharma" score={94.1} />
            <LeaderboardItem rank={3} name="David Lee" score={93.7} />
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} ForecastPro — Predict Smart. Win Credibility.
      </footer>
    </div>
  );
};

// ✅ Ticker Card
const MetricCard = ({ title, value, iconUrl }) => (
  <div className="bg-white rounded-lg shadow-md p-5 text-center">
    {iconUrl && <img src={iconUrl} alt={title} className="w-8 h-8 mx-auto mb-2" />}
    <p className="text-gray-500">{title}</p>
    <h4 className="text-xl font-semibold text-indigo-700 mt-2">{value}</h4>
  </div>
);

// ✅ Leaderboard Preview Card
const LeaderboardItem = ({ rank, name, score }) => (
  <li className="flex justify-between bg-gray-50 p-3 rounded border">
    <span className="font-medium">{rank}. {name}</span>
    <span className="text-indigo-600 font-semibold">{score}%</span>
  </li>
);

export default HomePage;
