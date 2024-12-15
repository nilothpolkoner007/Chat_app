export interface Message {
  id: string;
  userId: string;
  text: string;
  timestamp: Date;
  userName: string;
}

export interface ChatUser {
  id: string;
  name: string;
  nickname: string;
  isOnline: boolean;
  lastSeen?: Date;
}