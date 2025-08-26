import React from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ChatToggleProps {
  isOpen: boolean;
  onToggle: () => void;
  unreadCount?: number;
}

export default function ChatToggle({ isOpen, onToggle, unreadCount = 0 }: ChatToggleProps) {
  const { theme } = useApp();

  return (
    <button
      onClick={onToggle}
      className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 ${
        isOpen 
          ? theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
          : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
      } flex items-center justify-center relative group`}
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
    >
      <div className={`transition-all duration-200 ${isOpen ? 'rotate-0 opacity-100' : 'rotate-180 opacity-0'} absolute`}>
        <X className="h-6 w-6" />
      </div>
      <div className={`transition-all duration-200 ${isOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'} absolute`}>
        <MessageCircle className="h-6 w-6" />
      </div>
      
      {!isOpen && unreadCount > 0 && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
          {unreadCount > 9 ? '9+' : unreadCount}
        </div>
      )}

      {/* Tooltip */}
      <div className={`absolute right-16 bottom-1/2 transform translate-y-1/2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-900 text-white'
      } opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap`}>
        {isOpen ? 'Close AI Assistant' : 'Ask AI Assistant'}
        <div className={`absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-r-0 border-t-4 border-b-4 ${
          theme === 'dark' ? 'border-l-gray-700' : 'border-l-gray-900'
        } border-t-transparent border-b-transparent`}></div>
      </div>
    </button>
  );
}