import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  MessageCircle,
  Mic,
  Languages
} from 'lucide-react';

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
    language: "hi" 
  },
  { 
    text: "Commerce stream mein kya scope hai?", 
    translation: "What scope is there in commerce stream?",
    language: "hi" 
  },
  { 
    text: "Nearest government college kaha hai?", 
    translation: "Where is the nearest government college?",
    language: "hi" 
  },
  { 
    text: "Arts degree worth hai kya?", 
    translation: "Is an arts degree worth it?",
    language: "hi" 
  }
];

const botResponses: Record<string, string> = {
  "12th science ke baad kya karu?": "Great question! Science ke baad aapke paas bohot options hain:\n\n🔬 Engineering (B.Tech/B.E.)\n⚕️ Medical (MBBS/BDS/BAMS)\n🧪 Pure Sciences (B.Sc Physics/Chemistry/Biology)\n📊 Applied Sciences (B.Sc IT/Computer Science)\n\nAapka interest kya hai? Main aapko specific guidance de sakta hun!",
  
  "commerce stream mein kya scope hai?": "Commerce mein excellent scope hai! 📈\n\n💼 Business & Management\n📊 Chartered Accountancy (CA)\n🏦 Banking & Finance\n📋 Company Secretary (CS)\n💰 Investment Banking\n🎯 Digital Marketing\n\nGovernment jobs bhi bohot hain - Bank PO, SSC, Railways. Kya specific field mein interested ho?",
  
  "nearest government college kaha hai?": "Main aapko nearest government colleges find karne mein help kar sakta hun! 📍\n\nAapka location batayiye:\n🏫 Degree Colleges\n🎓 Engineering Colleges  \n⚕️ Medical Colleges\n📚 Arts & Science Colleges\n\nLocation share kariye ya city name batayiye, main exact colleges suggest karunga!",
  
  "arts degree worth hai kya?": "Bilkul worth hai! Arts degree ke fayde:\n\n✅ Versatile career options\n📝 Civil Services (IAS/IPS)\n👨‍🏫 Teaching & Education\n📰 Journalism & Media\n🎨 Creative Industries\n💼 Management roles\n\nGovernment colleges mein fees bhi kam hai. Specific subject mein interest hai kya?"
};

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'नमस्ते! मैं Dost हूँ, आपका career guidance friend! 🤖✨\n\nMain aapki career aur education ki saari queries solve kar sakta hun. Kya jaanna chahte hain?',
      timestamp: new Date(),
      language: 'hi'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('hi');
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
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = botResponses[content] || 
        `Main samjha ki aap "${content}" ke baare mein pooch rahe hain. 🤔\n\nYe topic thoda complex hai, lekin main aapki help kar sakta hun! Kya aap:\n\n1️⃣ Specific colleges ke baare mein jaanna chahte hain?\n2️⃣ Career options explore karna chahte hain?\n3️⃣ Admission process understand karna chahte hain?\n\nBataiye, main detailed guidance dunga! 😊`;

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response,
        timestamp: new Date(),
        language: 'hi'
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
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
              <p className="text-muted-foreground">Your friendly career guidance assistant</p>
            </div>
          </div>

          {/* Language Selector */}
          <div className="flex justify-center space-x-2 mb-6">
            <Badge 
              variant={selectedLanguage === 'hi' ? 'default' : 'outline'}
              className="cursor-pointer hover-lift"
              onClick={() => setSelectedLanguage('hi')}
            >
              हिंदी
            </Badge>
            <Badge 
              variant={selectedLanguage === 'en' ? 'default' : 'outline'}
              className="cursor-pointer hover-lift"
              onClick={() => setSelectedLanguage('en')}
            >
              English
            </Badge>
            <Badge 
              variant={selectedLanguage === 'te' ? 'default' : 'outline'}
              className="cursor-pointer hover-lift"
              onClick={() => setSelectedLanguage('te')}
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
              <Sparkles className="w-4 h-4 mr-1" />
              Quick questions to get started:
            </div>
            <div className="flex flex-wrap gap-2">
              {predefinedQuestions.map((q, index) => (
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
                placeholder="Type your question... (Hindi, English, Telugu supported)"
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