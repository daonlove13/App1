import { projectId, publicAnonKey } from '/utils/supabase/info';

const BASE = `https://${projectId}.supabase.co/functions/v1/make-server-55228eec`;

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${publicAnonKey}`,
};

async function req<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { headers, ...options });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${path} 오류 (${res.status}): ${text}`);
  }
  return res.json() as Promise<T>;
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface UserProfile {
  name: string;
  university: string;
  department: string;
  studentId: string;
  grade: string;
  penalties: number;
  verified: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: '팀장' | '팀원';
  initial: string;
}

export interface Team {
  id: string;
  teamName: string;
  gender: '남성' | '여성';
  size: '2v2' | '3v3';
  members: TeamMember[];
  maxMembers: number;
  applied: boolean;
  createdAt: string;
}

export interface Stats {
  todayApplications: number;
  maleWaiting: number;
  femaleWaiting: number;
  todayMatches: number;
  updatedAt: string;
}

export interface Restaurant {
  id: number;
  name: string;
  location: string;
  district: string;
  teamCount: number;
  seats: number;
}

export interface ChatItem {
  id: number;
  name: string;
  initial: string;
  lastMessage: string;
  time: string;
  status: 'active' | 'done';
  unread?: number;
  expireWarning?: string;
}

export interface ChatList {
  active: ChatItem[];
  done: ChatItem[];
}

export interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other' | 'bot';
  time: string;
}

export interface HistoryItem {
  id: number;
  name: string;
  date: string;
  place: string;
}

export interface Notification {
  id: number;
  type: 'match' | 'chat' | 'info';
  title: string;
  body: string;
  time: string;
  read: boolean;
}

// ── API calls ─────────────────────────────────────────────────────────────────

// Profile
export const getProfile = () => req<UserProfile>('/profile');
export const updateProfile = (data: Partial<UserProfile>) =>
  req<UserProfile>('/profile', { method: 'PUT', body: JSON.stringify(data) });

// Team
export const getTeam = () => req<Team | null>('/team');
export const createTeam = (data: Omit<Team, 'id' | 'createdAt'>) =>
  req<Team>('/team', { method: 'POST', body: JSON.stringify(data) });
export const updateTeam = (data: Team) =>
  req<Team>('/team', { method: 'PUT', body: JSON.stringify(data) });
export const deleteTeam = () =>
  req<{ ok: boolean }>('/team', { method: 'DELETE' });
export const toggleApply = () =>
  req<Team>('/team/apply', { method: 'POST', body: JSON.stringify({}) });

// Stats
export const getStats = () => req<Stats>('/stats');
export const updateStats = (data: Partial<Stats>) =>
  req<Stats>('/stats', { method: 'PUT', body: JSON.stringify(data) });

// Restaurants
export const getRestaurants = () => req<Restaurant[]>('/restaurants');
export const addRestaurant = (data: Omit<Restaurant, 'id'>) =>
  req<Restaurant[]>('/restaurants', { method: 'POST', body: JSON.stringify(data) });
export const updateRestaurants = (data: Restaurant[]) =>
  req<Restaurant[]>('/restaurants', { method: 'PUT', body: JSON.stringify(data) });

// Chats
export const getChats = () => req<ChatList>('/chats');
export const addChat = (data: Omit<ChatItem, 'id' | 'status'>) =>
  req<ChatItem>('/chats', { method: 'POST', body: JSON.stringify(data) });
export const markChatRead = (id: number) =>
  req<{ ok: boolean }>(`/chats/${id}/read`, { method: 'POST', body: JSON.stringify({}) });
export const completeChat = (id: number) =>
  req<{ ok: boolean }>(`/chats/${id}/complete`, { method: 'POST', body: JSON.stringify({}) });

// Messages
export const getMessages = (chatId: number) =>
  req<Message[]>(`/chats/${chatId}/messages`);
export const sendMessage = (chatId: number, data: Omit<Message, 'id'>) =>
  req<Message>(`/chats/${chatId}/messages`, { method: 'POST', body: JSON.stringify(data) });

// History
export const getHistory = () => req<HistoryItem[]>('/history');
export const addHistory = (data: Omit<HistoryItem, 'id'>) =>
  req<HistoryItem[]>('/history', { method: 'POST', body: JSON.stringify(data) });

// Notifications
export const getNotifications = () => req<Notification[]>('/notifications');
export const markAllRead = () =>
  req<Notification[]>('/notifications/read-all', { method: 'POST', body: JSON.stringify({}) });

// Dev reset
export const resetAll = () =>
  req<{ ok: boolean; message: string }>('/reset', { method: 'DELETE' });
