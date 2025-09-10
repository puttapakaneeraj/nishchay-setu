import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Heart, Lightbulb, Users, Zap, Brain, Target } from 'lucide-react';

interface QuizOption {
  id: string;
  text: string;
  emoji: string;
  category: 'builder' | 'analyst' | 'creator' | 'helper' | 'explorer';
}

interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: QuizOption[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "How do you spend your free Sunday?",
    subtitle: "Choose what excites you most",
    options: [
      { id: 'build', text: "Building something with my hands", emoji: "🔧", category: 'builder' },
      { id: 'read', text: "Reading books or solving puzzles", emoji: "📚", category: 'analyst' },
      { id: 'create', text: "Drawing, music, or creative projects", emoji: "🎨", category: 'creator' },
      { id: 'help', text: "Helping family or volunteering", emoji: "❤️", category: 'helper' }
    ]
  },
  {
    id: 2,
    question: "In group projects, you usually...",
    subtitle: "Pick your natural role",
    options: [
      { id: 'lead', text: "Take charge and organize everyone", emoji: "👑", category: 'builder' },
      { id: 'research', text: "Do the research and analysis", emoji: "🔍", category: 'analyst' },
      { id: 'design', text: "Handle presentation and design", emoji: "✨", category: 'creator' },
      { id: 'support', text: "Support others and keep peace", emoji: "🤝", category: 'helper' }
    ]
  },
  {
    id: 3,
    question: "Your dream job would involve...",
    subtitle: "What motivates you daily?",
    options: [
      { id: 'impact', text: "Making a real impact on society", emoji: "🌍", category: 'builder' },
      { id: 'solve', text: "Solving complex problems", emoji: "🧩", category: 'analyst' },
      { id: 'express', text: "Expressing ideas creatively", emoji: "🎭", category: 'creator' },
      { id: 'care', text: "Taking care of people", emoji: "🌟", category: 'helper' }
    ]
  },
  {
    id: 4,
    question: "When learning something new, you prefer...",
    subtitle: "What's your learning style?",
    options: [
      { id: 'hands-on', text: "Hands-on practice and doing", emoji: "🛠️", category: 'builder' },
      { id: 'theory', text: "Understanding theory first", emoji: "📖", category: 'analyst' },
      { id: 'visual', text: "Visual examples and stories", emoji: "🎬", category: 'creator' },
      { id: 'discussion', text: "Group discussions and sharing", emoji: "💬", category: 'helper' }
    ]
  },
  {
    id: 5,
    question: "Your friends describe you as...",
    subtitle: "Pick what resonates most",
    options: [
      { id: 'practical', text: "Practical and determined", emoji: "💪", category: 'builder' },
      { id: 'logical', text: "Logical and detail-oriented", emoji: "🎯", category: 'analyst' },
      { id: 'imaginative', text: "Imaginative and inspiring", emoji: "🌈", category: 'creator' },
      { id: 'caring', text: "Caring and understanding", emoji: "🤗", category: 'helper' }
    ]
  }
];

const Quiz = ({ onComplete }: { onComplete: (results: any) => void }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnimating, setIsAnimating] = useState(false);

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswer = (optionId: string) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setAnswers(prev => ({ ...prev, [currentQuestion]: optionId }));
    
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        // Calculate results
        const categoryScores = { builder: 0, analyst: 0, creator: 0, helper: 0, explorer: 0 };
        
        Object.values(answers).forEach(answerId => {
          quizQuestions.forEach(q => {
            const option = q.options.find(opt => opt.id === answerId);
            if (option) {
              categoryScores[option.category]++;
            }
          });
        });
        
        const topCategory = Object.entries(categoryScores).reduce((a, b) => 
          categoryScores[a[0] as keyof typeof categoryScores] > categoryScores[b[0] as keyof typeof categoryScores] ? a : b
        )[0];
        
        onComplete({ topCategory, scores: categoryScores });
      }
      setIsAnimating(false);
    }, 300);
  };

  const question = quizQuestions[currentQuestion];

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Progress Header */}
        <div className="mb-8 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-3 rounded-full" />
        </div>

        {/* Question Card */}
        <Card className={`glass-card p-8 mb-8 ${isAnimating ? 'animate-scale-in' : 'animate-slide-up'}`}>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gradient mb-2">
              {question.question}
            </h2>
            <p className="text-lg text-muted-foreground">
              {question.subtitle}
            </p>
          </div>

          {/* Options */}
          <div className="grid gap-4">
            {question.options.map((option, index) => (
              <div
                key={option.id}
                className={`quiz-option ${isAnimating ? 'opacity-50 pointer-events-none' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleAnswer(option.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{option.emoji}</div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{option.text}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center animate-slide-up">
          <Button 
            variant="outline" 
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0 || isAnimating}
            className="glass-card border-primary/30"
          >
            Previous
          </Button>
          
          <div className="flex space-x-2">
            {quizQuestions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentQuestion 
                    ? 'bg-primary shadow-glow' 
                    : index < currentQuestion 
                    ? 'bg-success' 
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>
          
          <div className="w-20"></div> {/* Spacer for symmetry */}
        </div>
      </div>
    </div>
  );
};

export default Quiz;