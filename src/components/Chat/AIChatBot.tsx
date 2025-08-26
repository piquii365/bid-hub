import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Search,
  Home,
  Gavel,
  Building,
  Car,
  Laptop,
  Crown,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
}

interface AIChatBotProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function AIChatBot({ isOpen, onToggle }: AIChatBotProps) {
  const { theme, properties } = useApp();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your BidHub AI assistant. I can help you search for properties, answer questions about auctions, or guide you through our platform. What would you like to know?",
      sender: 'bot',
      timestamp: new Date(),
      suggestions: [
        "Search for luxury properties",
        "How do live auctions work?",
        "Show me cars under $50k",
        "What are sealed bid auctions?"
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const botResponse = generateBotResponse(messageText);
    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);
  };

  const generateBotResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Search queries
    if (lowerMessage.includes('search') || lowerMessage.includes('find') || lowerMessage.includes('show me')) {
      if (lowerMessage.includes('luxury') || lowerMessage.includes('expensive')) {
        const luxuryProperties = properties.filter(p => p.currentPrice > 500000);
        return {
          id: Date.now().toString(),
          text: `I found ${luxuryProperties.length} luxury properties for you! These include high-end residential and commercial properties. Would you like me to show you the search results?`,
          sender: 'bot',
          timestamp: new Date(),
          suggestions: [
            "Show luxury properties",
            "Filter by residential only",
            "Show properties over $1M",
            "Search in specific location"
          ]
        };
      }
      
      if (lowerMessage.includes('car') || lowerMessage.includes('vehicle')) {
        const cars = properties.filter(p => p.type === 'car');
        return {
          id: Date.now().toString(),
          text: `I found ${cars.length} vehicles available for auction! These range from luxury cars to vintage classics. Let me help you find the perfect vehicle.`,
          sender: 'bot',
          timestamp: new Date(),
          suggestions: [
            "Show all cars",
            "Cars under $50k",
            "Luxury vehicles only",
            "Vintage cars"
          ]
        };
      }

      if (lowerMessage.includes('house') || lowerMessage.includes('residential')) {
        const residential = properties.filter(p => p.type === 'residential');
        return {
          id: Date.now().toString(),
          text: `I found ${residential.length} residential properties! From cozy apartments to luxury penthouses. What type of home are you looking for?`,
          sender: 'bot',
          timestamp: new Date(),
          suggestions: [
            "Show all homes",
            "Apartments only",
            "Houses with gardens",
            "Properties under $300k"
          ]
        };
      }

      return {
        id: Date.now().toString(),
        text: "I can help you search through our extensive property catalog! What type of property are you interested in? I can search by type, price range, location, or specific features.",
        sender: 'bot',
        timestamp: new Date(),
        suggestions: [
          "Residential properties",
          "Commercial buildings", 
          "Cars and vehicles",
          "Electronics and gadgets"
        ]
      };
    }

    // Auction type questions
    if (lowerMessage.includes('live auction') || lowerMessage.includes('how do auctions work')) {
      return {
        id: Date.now().toString(),
        text: "Live auctions are real-time bidding events! You compete with other bidders and see bids update instantly. The highest bidder when time runs out wins. You can set auto-bid limits to bid automatically up to your maximum.",
        sender: 'bot',
        timestamp: new Date(),
        suggestions: [
          "Show live auctions",
          "What are sealed bids?",
          "How to set auto-bid?",
          "Auction safety tips"
        ]
      };
    }

    if (lowerMessage.includes('sealed bid') || lowerMessage.includes('sealed auction')) {
      return {
        id: Date.now().toString(),
        text: "Sealed bid auctions keep all bids private until the auction ends! You submit your best offer without seeing other bids. When the auction closes, the highest bidder wins. It's great for strategic bidding!",
        sender: 'bot',
        timestamp: new Date(),
        suggestions: [
          "Show sealed bid auctions",
          "Sealed bid strategies",
          "How to win sealed bids?",
          "Compare auction types"
        ]
      };
    }

    // Navigation requests
    if (lowerMessage.includes('dashboard') || lowerMessage.includes('my account')) {
      return {
        id: Date.now().toString(),
        text: "I can help you navigate to your dashboard where you can view your bids, listings, and account activity. Would you like me to take you there?",
        sender: 'bot',
        timestamp: new Date(),
        suggestions: [
          "Go to dashboard",
          "View my bids",
          "Check notifications",
          "Account settings"
        ]
      };
    }

    // Default responses
    const responses = [
      {
        text: "I'm here to help you with anything related to BidHub! I can assist with property searches, explain auction types, help with account questions, or guide you through our platform.",
        suggestions: [
          "Search properties",
          "How auctions work",
          "Account help",
          "Platform features"
        ]
      },
      {
        text: "Great question! I can help you find the perfect property or answer any questions about our bidding process. What specific information are you looking for?",
        suggestions: [
          "Property search tips",
          "Bidding strategies", 
          "Payment process",
          "Safety guidelines"
        ]
      }
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    return {
      id: Date.now().toString(),
      text: randomResponse.text,
      sender: 'bot',
      timestamp: new Date(),
      suggestions: randomResponse.suggestions
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { icon: <Search className="h-4 w-4" />, label: "Search Properties", action: () => navigate('/browse') },
    { icon: <Home className="h-4 w-4" />, label: "Go Home", action: () => navigate('/') },
    { icon: <Gavel className="h-4 w-4" />, label: "Live Auctions", action: () => navigate('/live-auctions') }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <div className={`w-96 h-[600px] rounded-2xl shadow-2xl border ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      } flex flex-col overflow-hidden`}>
        
        {/* Header */}
        <div className={`p-4 border-b ${
          theme === 'dark' ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'
        } flex items-center justify-between`}>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                BidHub AI Assistant
              </h3>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Online
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className={`p-1.5 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'hover:bg-gray-700 text-gray-400'
                  : 'hover:bg-gray-200 text-gray-600'
              }`}
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={onToggle}
              className={`p-1.5 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'hover:bg-gray-700 text-gray-400'
                  : 'hover:bg-gray-200 text-gray-600'
              }`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`flex items-start space-x-2 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'user' 
                          ? 'bg-blue-600' 
                          : 'bg-gradient-to-r from-blue-600 to-purple-600'
                      }`}>
                        {message.sender === 'user' ? (
                          <User className="h-3 w-3 text-white" />
                        ) : (
                          <Bot className="h-3 w-3 text-white" />
                        )}
                      </div>
                      
                      <div className={`rounded-2xl px-4 py-2 ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : theme === 'dark'
                          ? 'bg-gray-700 text-gray-200'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                      </div>
                    </div>
                    
                    {message.suggestions && message.sender === 'bot' && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className={`text-xs px-2 py-1 rounded-full border transition-colors ${
                              theme === 'dark'
                                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                                : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                      <Bot className="h-3 w-3 text-white" />
                    </div>
                    <div className={`rounded-2xl px-4 py-2 ${
                      theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className={`px-4 py-2 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex space-x-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs transition-colors ${
                      theme === 'dark'
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {action.icon}
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about properties..."
                  className={`flex-1 px-3 py-2 rounded-lg border text-sm transition-colors ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim() || isTyping}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}