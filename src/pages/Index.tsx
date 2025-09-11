import { useState } from 'react';
import Navigation from '@/components/Navigation';
import LandingPage from '@/components/LandingPage';
import Quiz from '@/components/Quiz';
import QuizResults from '@/components/QuizResults';
import ChatBot from '@/components/ChatBot';
import CourseExplorer from '@/components/CourseExplorer';

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

  const handleExploreCourses = () => {
    setCurrentPage('courses');
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
            onExploreCourses={handleExploreCourses}
          />
        ) : <LandingPage />;
      case 'chat':
        return <ChatBot />;
      case 'courses':
        return <CourseExplorer />;
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
