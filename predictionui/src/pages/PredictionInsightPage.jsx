import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosInstance";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import Header from "../components/Header";

const PredictionInsightPage = () => {
  const { questionId } = useParams();
  const [predictions, setPredictions] = useState([]);
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const qRes = await api.get(`/questions/${questionId}`);
      setQuestion(qRes.data);

      const res = await api.get(`/predictions/question/${questionId}`);
      setPredictions(res.data);
    };

    fetchData();
  }, [questionId]);

  // Group predictions into ranges
  const rangeData = {};

  predictions.forEach((p) => {
    const key = `${p.predicted_range_min}–${p.predicted_range_max}`;
    if (!rangeData[key]) rangeData[key] = 0;
    rangeData[key]++;
  });

  const chartData = Object.entries(rangeData).map(([range, count]) => ({
    range,
    count,
  }));

  let yesCount = 0, noCount = 0;
let yesConfidenceTotal = 0, noConfidenceTotal = 0;

predictions.forEach((p) => {
  if (p.predicted_binary === "yes") {
    yesCount += 1;
    yesConfidenceTotal += p.confidence || 0;
  } else if (p.predicted_binary === "no") {
    noCount += 1;
    noConfidenceTotal += p.confidence || 0;
  }
});

const binaryChartData = [
  {
    name: "Yes",
    count: yesCount,
    avgConfidence: yesCount > 0 ? Math.round(yesConfidenceTotal / yesCount) : 0,
  },
  {
    name: "No",
    count: noCount,
    avgConfidence: noCount > 0 ? Math.round(noConfidenceTotal / noCount) : 0,
  },
];


  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4 text-indigo-700">
          Prediction Insights
        </h1>

        {question && (
          <div className="mb-6 bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{question.title}</h2>
            <p className="text-sm text-gray-600">{question.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              Prediction Type: {question.prediction_type}
            </p>
          </div>
        )}

        {question?.prediction_type === "range" && chartData.length > 0 && (
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Range Predictions Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {question?.prediction_type === "range" && chartData.length === 0 && (
          <p className="text-gray-500">No predictions yet.</p>
        )}

{question?.prediction_type === "binary" && (
  <div className="bg-white p-4 rounded shadow mt-8">
    <h3 className="text-lg font-semibold mb-4">Binary Prediction Insight</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={binaryChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="count" fill="#6366f1" name="Vote Count" />
        <Bar yAxisId="right" dataKey="avgConfidence" fill="#10b981" name="Avg. Confidence (%)" />
      </BarChart>
    </ResponsiveContainer>
    {/* Table */}
    <table className="w-full mt-6 text-sm border">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 text-left">Prediction</th>
          <th className="p-2 text-left">Number of Votes</th>
          <th className="p-2 text-left">Average Confidence</th>
        </tr>
      </thead>
      <tbody>
        {binaryChartData.map((item) => (
          <tr key={item.name} className="border-t">
            <td className="p-2">{item.name}</td>
            <td className="p-2">{item.count}</td>
            <td className="p-2">{item.avgConfidence}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}


      </div>
    </div>
  );
};

export default PredictionInsightPage;
