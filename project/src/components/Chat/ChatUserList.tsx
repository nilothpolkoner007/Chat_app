import React from 'react';
import { ChatUser } from '@/types/chat';

interface ChatUserListProps {
  users: ChatUser[];
}

export function ChatUserList({ users }: ChatUserListProps) {
  return (
    <div className="w-64 border-r bg-gray-50 p-4">
      <h3 className="text-lg font-semibold mb-4">Online Users</h3>
      <div className="space-y-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100"
          >
            <div
              className={`w-2 h-2 rounded-full ${
                user.isOnline ? 'bg-green-500' : 'bg-gray-300'
              }`}
            />
            <div>
              <div className="font-medium">{user.nickname}</div>
              <div className="text-xs text-gray-500">{user.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}