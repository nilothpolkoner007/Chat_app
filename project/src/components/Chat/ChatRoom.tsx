import React, { useState, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ChatUserList } from './ChatUserList';
import { Message, ChatUser } from '@/types/chat';
import { UserFormData } from '@/types/user';

interface ChatRoomProps {
  currentUser: UserFormData;
}

export function ChatRoom({ currentUser }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<ChatUser[]>([
    {
      id: '1',
      name: currentUser.name,
      nickname: currentUser.nickname,
      isOnline: true,
    },
    // Simulated users for demo
    {
      id: '2',
      name: 'Jane Smith',
      nickname: 'jane123',
      isOnline: true,
    },
    {
      id: '3',
      name: 'John Doe',
      nickname: 'johnd',
      isOnline: false,
    },
  ]);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      userId: '1', // Current user's ID
      userName: currentUser.nickname,
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="flex h-[calc(100vh-2rem)] bg-white rounded-lg shadow-lg overflow-hidden">
      <ChatUserList users={users} />
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isOwnMessage={message.userId === '1'}
            />
          ))}
        </div>
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}