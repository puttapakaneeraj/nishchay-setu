import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Send, Bot, User, Globe } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  language?: string;
}

const predefinedQuestions = [
  { 
    text: "12th science ke baad kya karu?", 
    translation: "What should I do after 12th science?",
    language: "hindi" 
  },
  { 
    text: "Commerce stream mein kya scope hai?", 
    translation: "What scope is there in commerce stream?",
    language: "hindi" 
  },
  { 
    text: "Nearest government college kaha hai?", 
    translation: "Where is the nearest government college?",
    language: "hindi" 
  },
  { 
    text: "Arts degree worth hai kya?", 
    translation: "Is an arts degree worth it?",
    language: "hindi" 
  },
  {
    text: "What are the best engineering branches?",
    translation: "What are the best engineering branches?",
    language: "english"
  },
  {
    text: "Government jobs after graduation?",
    translation: "Government jobs after graduation?", 
    language: "english"
  }
];

const getRandomResponse = () => {
  const responses = [
    "That's a great question! Let me help you with career guidance. 🎯",
    "Interesting! I can provide you with detailed information about this. 📚",
    "Perfect question for career planning! Let me give you comprehensive guidance. 🚀"
  ];
  return responses[Math.floor(Math.random() * responses.length)];
};

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'नमस्ते! मैं Dost हूँ, आपका AI career guidance friend! 🤖✨\n\nI can help you with:\n• Career guidance in Hindi/English/Telugu\n• College recommendations\n• Stream selection advice\n• Government job information\n\nWhat would you like to know?',
      timestamp: new Date(),
      language: 'hindi'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('hindi');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content,
      timestamp: new Date(),
      language: selectedLanguage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Call the advanced chat edge function
      const { data, error } = await supabase.functions.invoke('advanced-chat', {
        body: {
          message: content,
          language: selectedLanguage
        }
      });

      if (error) throw error;

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: data.response || data.fallbackResponse || getRandomResponse(),
        timestamp: new Date(),
        language: selectedLanguage
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Chat error:', error);
      
      // Fallback response
      const fallbackResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: selectedLanguage === 'hindi' 
          ? 'माफ करें, मुझे कुछ तकनीकी समस्या हो रही है। कृपया बाद में कोशिश करें।'
          : selectedLanguage === 'telugu' 
          ? 'క్షమించండి, నాకు కొంత సాంకేతిక సమస్య ఉంది. దయచేసి తర్వాత ప్రయత్నించండి.'
          : 'Sorry, I\'m experiencing some technical difficulties. Please try again later.',
        timestamp: new Date(),
        language: selectedLanguage
      };

      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuestionClick = (question: string) => {
    sendMessage(question);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center animate-glow-pulse shadow-float">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gradient">Meet Dost 🤖</h1>
              <p className="text-muted-foreground">Your AI-powered career guidance assistant</p>
            </div>
          </div>

          {/* Language Selector */}
          <div className="flex justify-center space-x-2 mb-6">
            <Badge 
              variant={selectedLanguage === 'hindi' ? 'default' : 'outline'}
              className="cursor-pointer hover-lift"
              onClick={() => setSelectedLanguage('hindi')}
            >
              हिंदी
            </Badge>
            <Badge 
              variant={selectedLanguage === 'english' ? 'default' : 'outline'}
              className="cursor-pointer hover-lift"
              onClick={() => setSelectedLanguage('english')}
            >
              English
            </Badge>
            <Badge 
              variant={selectedLanguage === 'telugu' ? 'default' : 'outline'}
              className="cursor-pointer hover-lift"
              onClick={() => setSelectedLanguage('telugu')}
            >
              తెలుగు
            </Badge>
          </div>
        </div>

        {/* Chat Container */}
        <Card className="glass-card h-[600px] flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {messages.map((message, index) => (
              <div 
                key={message.id} 
                className={`flex items-start space-x-3 animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {message.type === 'bot' && (
                  <Avatar className="gradient-primary shadow-glow">
                    <AvatarFallback className="bg-transparent">
                      <Bot className="w-5 h-5 text-white" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div className={`flex-1 ${message.type === 'user' ? 'flex justify-end' : ''}`}>
                  <div className={`${message.type === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'} max-w-md`}>
                    <div className="whitespace-pre-line text-sm leading-relaxed">
                      {message.content}
                    </div>
                    <div className="text-xs opacity-60 mt-2">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>

                {message.type === 'user' && (
                  <Avatar className="bg-accent">
                    <AvatarFallback className="bg-transparent">
                      <User className="w-5 h-5 text-white" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-3 animate-slide-up">
                <Avatar className="gradient-primary shadow-glow">
                  <AvatarFallback className="bg-transparent">
                    <Bot className="w-5 h-5 text-white" />
                  </AvatarFallback>
                </Avatar>
                <div className="chat-bubble-bot">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="px-6 py-4 border-t border-border/10">
            <div className="text-sm text-muted-foreground mb-3 flex items-center">
              <Globe className="w-4 h-4 mr-1" />
              Quick questions to get started:
            </div>
            <div className="flex flex-wrap gap-2">
              {predefinedQuestions
                .filter(q => q.language === selectedLanguage)
                .map((q, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuestionClick(q.text)}
                  className="text-xs glass-card border-primary/20 hover:bg-primary/10 hover:border-primary/40"
                >
                  {q.text}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-border/10">
            <div className="flex space-x-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={`Type your question in ${selectedLanguage}...`}
                className="flex-1 glass-card border-primary/20 focus:border-primary/40"
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputValue)}
              />
              <Button 
                onClick={() => sendMessage(inputValue)}
                disabled={!inputValue.trim() || isTyping}
                className="gradient-primary text-white shadow-glow hover-lift"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChatBot;