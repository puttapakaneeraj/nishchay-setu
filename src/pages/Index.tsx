import { useState } from 'react';
import Navigation from '@/components/Navigation';
import LandingPage from '@/components/LandingPage';
import Quiz from '@/components/Quiz';
import QuizResults from '@/components/QuizResults';
import ChatBot from '@/components/ChatBot';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [quizResults, setQuizResults] = useState(null);

  const handleQuizComplete = (results: any) => {
    setQuizResults(results);
    setCurrentPage('results');
  };

  const handleStartOver = () => {
    setQuizResults(null);
    setCurrentPage('quiz');
  };

  const handleExploreColleges = () => {
    // TODO: Implement college explorer
    setCurrentPage('colleges');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage />;
      case 'quiz':
        return <Quiz onComplete={handleQuizComplete} />;
      case 'results':
        return quizResults ? (
          <QuizResults 
            results={quizResults} 
            onStartOver={handleStartOver}
            onExploreColleges={handleExploreColleges}
          />
        ) : <LandingPage />;
      case 'chat':
        return <ChatBot />;
      case 'colleges':
        return (
          <div className="min-h-screen flex items-center justify-center p-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gradient mb-4">College Explorer</h1>
              <p className="text-xl text-muted-foreground">Coming Soon! 🎓</p>
            </div>
          </div>
        );
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderCurrentPage()}
      <div className="pb-20 md:pb-0"></div>
    </div>
  );
};

export default Index;
