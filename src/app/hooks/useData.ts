import { useState, useEffect, useCallback } from 'react';
import * as api from '../services/api';
import type {
  UserProfile, Team, Stats, Restaurant, ChatList, Message, HistoryItem, Notification,
} from '../services/api';

// ── Generic fetch hook ────────────────────────────────────────────────────────
function useFetch<T>(fetcher: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      setData(result);
    } catch (e) {
      console.error('useFetch error:', e);
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { load(); }, [load]);

  return { data, loading, error, reload: load, setData };
}

// ── Profile ───────────────────────────────────────────────────────────────────
export function useProfile() {
  const { data, loading, error, reload, setData } = useFetch<UserProfile>(api.getProfile);

  const update = useCallback(async (partial: Partial<UserProfile>) => {
    try {
      const updated = await api.updateProfile(partial);
      setData(updated);
      return updated;
    } catch (e) {
      console.error('useProfile.update error:', e);
      throw e;
    }
  }, [setData]);

  return { profile: data, loading, error, reload, update };
}

// ── Team ──────────────────────────────────────────────────────────────────────
export function useTeam() {
  const { data, loading, error, reload, setData } = useFetch<Team | null>(api.getTeam);

  const create = useCallback(async (payload: Omit<Team, 'id' | 'createdAt'>) => {
    try {
      const team = await api.createTeam(payload);
      setData(team);
      return team;
    } catch (e) {
      console.error('useTeam.create error:', e);
      throw e;
    }
  }, [setData]);

  const update = useCallback(async (team: Team) => {
    try {
      const updated = await api.updateTeam(team);
      setData(updated);
      return updated;
    } catch (e) {
      console.error('useTeam.update error:', e);
      throw e;
    }
  }, [setData]);

  const remove = useCallback(async () => {
    try {
      await api.deleteTeam();
      setData(null);
    } catch (e) {
      console.error('useTeam.remove error:', e);
      throw e;
    }
  }, [setData]);

  const toggleApply = useCallback(async () => {
    try {
      const updated = await api.toggleApply();
      setData(updated);
      return updated;
    } catch (e) {
      console.error('useTeam.toggleApply error:', e);
      throw e;
    }
  }, [setData]);

  return { team: data, loading, error, reload, create, update, remove, toggleApply };
}

// ── Stats ──────────────────────────────────────────────────────────────────────
export function useStats() {
  return useFetch<Stats>(api.getStats);
}

// ── Restaurants ────────────────────────────────────────────────────────────────
export function useRestaurants() {
  const { data, loading, error, reload, setData } = useFetch<Restaurant[]>(api.getRestaurants);

  const add = useCallback(async (item: Omit<Restaurant, 'id'>) => {
    try {
      const updated = await api.addRestaurant(item);
      setData(updated);
    } catch (e) {
      console.error('useRestaurants.add error:', e);
      throw e;
    }
  }, [setData]);

  return { restaurants: data ?? [], loading, error, reload, add };
}

// ── Chats ──────────────────────────────────────────────────────────────────────
export function useChats() {
  const { data, loading, error, reload, setData } = useFetch<ChatList>(api.getChats);

  const markRead = useCallback(async (id: number) => {
    try {
      await api.markChatRead(id);
      setData(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          active: prev.active.map(c => c.id === id ? { ...c, unread: 0 } : c),
        };
      });
    } catch (e) {
      console.error('useChats.markRead error:', e);
    }
  }, [setData]);

  const complete = useCallback(async (id: number) => {
    try {
      await api.completeChat(id);
      await reload();
    } catch (e) {
      console.error('useChats.complete error:', e);
    }
  }, [reload]);

  return {
    chats: data ?? { active: [], done: [] },
    loading,
    error,
    reload,
    markRead,
    complete,
  };
}

// ── Messages ────────────────────────────────────────────────────────────────────
export function useMessages(chatId: number) {
  const { data, loading, error, reload, setData } = useFetch<Message[]>(
    () => api.getMessages(chatId),
    [chatId],
  );

  const send = useCallback(async (msg: Omit<Message, 'id'>) => {
    try {
      const newMsg = await api.sendMessage(chatId, msg);
      setData(prev => [...(prev ?? []), newMsg]);
      return newMsg;
    } catch (e) {
      console.error('useMessages.send error:', e);
      throw e;
    }
  }, [chatId, setData]);

  return { messages: data ?? [], loading, error, reload, send };
}

// ── History ─────────────────────────────────────────────────────────────────────
export function useHistory() {
  const { data, loading, error, reload, setData } = useFetch<HistoryItem[]>(api.getHistory);

  const add = useCallback(async (item: Omit<HistoryItem, 'id'>) => {
    try {
      const updated = await api.addHistory(item);
      setData(updated);
    } catch (e) {
      console.error('useHistory.add error:', e);
      throw e;
    }
  }, [setData]);

  return { history: data ?? [], loading, error, reload, add };
}

// ── Notifications ────────────────────────────────────────────────────────────────
export function useNotifications() {
  const { data, loading, error, reload, setData } = useFetch<Notification[]>(api.getNotifications);

  const readAll = useCallback(async () => {
    try {
      const updated = await api.markAllRead();
      setData(updated);
    } catch (e) {
      console.error('useNotifications.readAll error:', e);
    }
  }, [setData]);

  const unreadCount = (data ?? []).filter(n => !n.read).length;

  return { notifications: data ?? [], loading, error, reload, readAll, unreadCount };
}
