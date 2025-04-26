import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import CategoryQuestionsPage from "./pages/CategoryQuestionsPage";
import LoginPage from "./pages/LoginPage";
import CreateQuestionPage from "./pages/CreateQuestionPage";
import ProfilePage from "./pages/ProfilePage"; // Adjust path if needed
import EditProfilePage from "./pages/EditProfilePage";
import QuestionDetailPage from "./pages/QuestionDetailPage";
import TickerForm from "./pages/TickerForm";
import LeaderboardPage from "./pages/LeaderboardPage";
import PredictionInsightPage from "./pages/PredictionInsightPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCreateQuestion from "./pages/AdminCreateQuestion";
import AdminSetOutcome from "./pages/AdminSetOutcome";
import AdminUpdateTicker from "./pages/AdminUpdateTicker";
import DeleteQuestionPage from "./pages/DeleteQuestionPage";
import UnsetOutcomePage from "./pages/UnsetOutcomePage";
import DeleteTickerPage from "./pages/DeleteTickerPage";
import CreateCategoryPage from "./pages/CreateCategoryPage";
import DeleteCategoryPage from "./pages/DeleteCategoryPage";
import AdminCreateArticlePage from "./pages/AdminCreateArticlePage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import RelatedArticlesPage from "./pages/RelatedArticlesPage";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/categories/:categorySlug" element={<CategoryQuestionsPage />} />
        <Route path="/questions/create" element={<CreateQuestionPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />
        <Route path="/questions/:id" element={<QuestionDetailPage />} />
        <Route path="/admin/ticker" element={<TickerForm />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/questions/:questionId/insight" element={<PredictionInsightPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/questions/create" element={<AdminCreateQuestion />} />
        <Route path="/admin/questions/resolve" element={<AdminSetOutcome />} />
        <Route path="/admin/tickers/update" element={<AdminUpdateTicker />} />
        <Route path="/admin/delete-question" element={<DeleteQuestionPage />} />
        <Route path="/admin/unset-outcome" element={<UnsetOutcomePage />} />
        <Route path="/admin/delete-ticker" element={<DeleteTickerPage />} />
        <Route path="/admin/category/create" element={<CreateCategoryPage />} />
        <Route path="/admin/category/delete" element={<DeleteCategoryPage />} />
        <Route path="/admin/create-article" element={<AdminCreateArticlePage />} />
        <Route path="/articles/:id" element={<ArticleDetailPage />} />
        <Route path="/questions/:questionId/related-articles" element={<RelatedArticlesPage />} />

      </Routes>
    </Router>
  );
}

export default App;
