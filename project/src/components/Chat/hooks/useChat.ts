import { useState, useEffect } from 'react';
import { Message, ChatUser } from '@/types/chat';

export const useChat = (currentUser: ChatUser) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize chat room
    setUsers([currentUser]);
    setIsLoading(false);
  }, [currentUser]);

  const sendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      userId: currentUser.id,
      userName: currentUser.nickname,
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return {
    messages,
    users,
    isLoading,
    error,
    sendMessage,
  };
};