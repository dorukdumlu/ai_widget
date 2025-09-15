import React from 'react';

interface ChatBubbleProps {
  onClick?: () => void;
}

export default function ChatBubble({ onClick }: ChatBubbleProps) {
  return (
    <button onClick={onClick} aria-label="Open chat" className="fixed bottom-4 right-4 h-14 w-14 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center hover:bg-blue-700 focus:outline-none">
      <span className="text-xl"></span>
    </button>
  );
}
