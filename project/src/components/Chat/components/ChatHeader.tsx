import React from 'react';

interface ChatHeaderProps {
  onlineCount: number;
}

export function ChatHeader({ onlineCount }: ChatHeaderProps) {
  return (
    <div className="bg-white border-b px-6 py-4">
      <h2 className="text-xl font-semibold">Chat Room</h2>
      <p className="text-sm text-gray-500">
        {onlineCount} {onlineCount === 1 ? 'user' : 'users'} online
      </p>
    </div>
  );
}