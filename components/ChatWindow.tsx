import React from 'react';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

export default function ChatWindow({ isOpen, onClose, title = 'Assistant', children }: ChatWindowProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed bottom-24 right-4 w-80 max-h-[70vh] bg-white shadow-xl rounded-lg border flex flex-col overflow-hidden">
      <div className="px-3 py-2 bg-blue-600 text-white flex items-center justify-between">
        <span className="font-medium">{title}</span>
        <button onClick={onClose} aria-label="Close chat" className="text-white"></button>
      </div>
      <div className="p-3 flex-1 overflow-auto space-y-2">{children}</div>
    </div>
  );
}
