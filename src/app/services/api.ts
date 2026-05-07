import { supabase } from './supabaseClient';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface UserProfile {
  name: string;
  university: string;
  department: string;
  gender: string;
  studentId: string;
  grade: string;
  penalties: number;
  verified: boolean;
  studentCardUrl?: string;
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

// ── Helpers ───────────────────────────────────────────────────────────────────

async function getCurrentUserId(): Promise<string | null> {
  const { data: { user } } = await supabase.auth.getUser();
  return user?.id ?? null;
}

function formatTime(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export async function authSignUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw new Error(`회원가입 오류: ${error.message}`);
  return data;
}

export async function authSignIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(`로그인 오류: ${error.message}`);
  return data;
}

export async function authSignOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(`로그아웃 오류: ${error.message}`);
}

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

// ── Profile ───────────────────────────────────────────────────────────────────

export async function getProfile(): Promise<UserProfile> {
  const userId = await getCurrentUserId();
  if (!userId) return {
    name: '', university: '충북대학교', department: '', gender: '',
    studentId: '', grade: '1', penalties: 0, verified: false,
  };

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    console.error('getProfile error:', error);
    throw new Error(`프로필 조회 오류: ${error.message}`);
  }

  if (!data) {
    return {
      name: '', university: '충북대학교', department: '', gender: '',
      studentId: '', grade: '1', penalties: 0, verified: false,
    };
  }

  return {
    name: data.name ?? '',
    university: '충북대학교',
    department: data.department ?? '',
    gender: data.gender ?? '',
    studentId: data.student_id ?? '',
    grade: data.grade ?? '1',
    penalties: data.penalties ?? 0,
    verified: data.verified ?? false,
    studentCardUrl: data.student_card_url ?? undefined,
  };
}

export async function createUserProfile(profile: {
  name: string;
  department: string;
  gender: string;
  studentId?: string;
  phone?: string;
}): Promise<void> {
  const userId = await getCurrentUserId();
  if (!userId) throw new Error('인증 정보가 없습니다. 다시 로그인해주세요.');

  const { error } = await supabase
    .from('users')
    .upsert({
      id: userId,
      name: profile.name,
      university: '충북대학교',
      department: profile.department,
      gender: profile.gender,
      student_id: profile.studentId ?? null,
      phone: profile.phone ?? null,
      verified: false,
      verified_status: 'pending',
    }, { onConflict: 'id' });

  if (error) {
    console.error('createUserProfile error:', error);
    throw new Error(`프로필 생성 오류: ${error.message}`);
  }
}

export async function updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
  const userId = await getCurrentUserId();
  if (!userId) throw new Error('인증 정보가 없습니다. 다시 로그인해주세요.');

  const updates: Record<string, unknown> = {};
  if (data.name !== undefined) updates.name = data.name;
  if (data.department !== undefined) updates.department = data.department;
  if (data.gender !== undefined) updates.gender = data.gender;

  const { error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId);

  if (error) {
    console.error('updateProfile error:', error);
    throw new Error(`프로필 수정 오류: ${error.message}`);
  }

  return getProfile();
}

// ── Student Card Upload ────────────────────────────────────────────────────────

export async function uploadStudentCard(file: File): Promise<string> {
  const userId = await getCurrentUserId();
  if (!userId) throw new Error('인증 정보가 없습니다. 다시 로그인해주세요.');

  const ext = file.name.split('.').pop() ?? 'jpg';
  const path = `${userId}/student-card.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from('student-cards')
    .upload(path, file, { upsert: true, contentType: file.type });

  if (uploadError) {
    console.error('uploadStudentCard storage error:', uploadError);
    throw new Error(`학생증 업로드 오류: ${uploadError.message}`);
  }

  // 업로드 경로 저장 (버킷이 private이므로 path만 저장)
  const { error: updateError } = await supabase
    .from('users')
    .update({ student_card_url: path })
    .eq('id', userId);

  if (updateError) {
    console.error('uploadStudentCard update error:', updateError);
    throw new Error(`학생증 경로 저장 오류: ${updateError.message}`);
  }

  return path;
}

// ── Team ──────────────────────────────────────────────────────────────────────

async function mapTeamRow(row: Record<string, unknown>, profile?: UserProfile): Promise<Team> {
  const p = profile ?? await getProfile();
  const size = (row.size as string) === '2v2' ? '2v2' : '3v3';
  return {
    id: String(row.id),
    teamName: (row.team_name as string) ?? `${p.department} 팀`,
    gender: (row.gender as '남성' | '여성'),
    size,
    members: [{ id: String(row.leader_id), name: p.name, role: '팀장', initial: p.name?.[0] ?? '나' }],
    maxMembers: size === '2v2' ? 2 : 3,
    applied: (row.status as string) === 'applied',
    createdAt: (row.created_at as string) ?? new Date().toISOString(),
  };
}

export async function getTeam(): Promise<Team | null> {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return null;

    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('leader_id', userId)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    return mapTeamRow(data);
  } catch (e) {
    console.error('getTeam error:', e);
    return null;
  }
}

export async function createTeam(payload: Omit<Team, 'id' | 'createdAt'>): Promise<Team> {
  const userId = await getCurrentUserId();
  if (!userId) throw new Error('인증 정보가 없습니다. 다시 로그인해주세요.');

  // 기존 팀 삭제 후 재생성
  await supabase.from('teams').delete().eq('leader_id', userId);

  // 유저 학과 가져오기
  const { data: userData } = await supabase
    .from('users')
    .select('department')
    .eq('id', userId)
    .maybeSingle();

  const insertData: Record<string, unknown> = {
    leader_id: userId,
    department: userData?.department ?? payload.teamName,
    gender: payload.gender,
    size: typeof payload.size === 'string' ? (payload.size === '2v2' ? 2 : 3) : payload.size,
    status: 'waiting',
    created_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('teams')
    .insert(insertData)
    .select()
    .single();

  if (error) {
    console.error('createTeam error:', error);
    throw new Error(`팀 생성 오류: ${error.message}`);
  }

  return mapTeamRow(data);
}

export async function updateTeam(team: Team): Promise<Team> {
  const { error } = await supabase
    .from('teams')
    .update({
      gender: team.gender,
      size: team.size,
      status: team.applied ? 'applied' : 'waiting',
    })
    .eq('id', team.id);

  if (error) {
    console.error('updateTeam error:', error);
    throw new Error(`팀 수정 오류: ${error.message}`);
  }

  return team;
}

export async function deleteTeam(): Promise<{ ok: boolean }> {
  const userId = await getCurrentUserId();
  if (!userId) throw new Error('인증 정보가 없습니다. 다시 로그인해주세요.');

  const { error } = await supabase
    .from('teams')
    .delete()
    .eq('leader_id', userId);

  if (error) {
    console.error('deleteTeam error:', error);
    throw new Error(`팀 삭제 오류: ${error.message}`);
  }

  return { ok: true };
}

export async function toggleApply(): Promise<Team> {
  const team = await getTeam();
  if (!team) throw new Error('팀이 없습니다.');

  const newStatus = team.applied ? 'waiting' : 'applied';
  const { error } = await supabase
    .from('teams')
    .update({ status: newStatus })
    .eq('id', team.id);

  if (error) {
    console.error('toggleApply error:', error);
    throw new Error(`신청 상태 변경 오류: ${error.message}`);
  }

  return { ...team, applied: !team.applied };
}

// ── Stats ──────────────────────────────────────────────────────────────────────

export async function getStats(): Promise<Stats> {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayIso = today.toISOString();

    const [
      { count: todayApplications },
      { count: maleWaiting },
      { count: femaleWaiting },
      { count: todayMatches },
    ] = await Promise.all([
      supabase.from('teams').select('*', { count: 'exact', head: true })
        .eq('status', 'applied').gte('created_at', todayIso),
      supabase.from('teams').select('*', { count: 'exact', head: true })
        .eq('gender', '남성').eq('status', 'waiting'),
      supabase.from('teams').select('*', { count: 'exact', head: true })
        .eq('gender', '여성').eq('status', 'waiting'),
      supabase.from('matches').select('*', { count: 'exact', head: true })
        .gte('created_at', todayIso),
    ]);

    return {
      todayApplications: todayApplications ?? 0,
      maleWaiting: maleWaiting ?? 0,
      femaleWaiting: femaleWaiting ?? 0,
      todayMatches: todayMatches ?? 0,
      updatedAt: new Date().toISOString(),
    };
  } catch (e) {
    console.error('getStats error:', e);
    return { todayApplications: 0, maleWaiting: 0, femaleWaiting: 0, todayMatches: 0, updatedAt: new Date().toISOString() };
  }
}

export async function updateStats(_data: Partial<Stats>): Promise<Stats> {
  return getStats();
}

// ── Restaurants (정적 데이터 — DB 미포함) ──────────────────────────────────────

const STATIC_RESTAURANTS: Restaurant[] = [
  { id: 1, name: '치킨앤비어 중대점', location: '충북 청주시', district: '흥덕구', teamCount: 3, seats: 20 },
  { id: 2, name: '혼마 파스타', location: '충북 청주시', district: '상당구', teamCount: 1, seats: 16 },
  { id: 3, name: '더 플레이스', location: '충북 청주시', district: '청원구', teamCount: 2, seats: 24 },
  { id: 4, name: '소이연남', location: '충북 청주시', district: '서원구', teamCount: 0, seats: 18 },
  { id: 5, name: '비스트로 34', location: '충북 청주시', district: '흥덕구', teamCount: 1, seats: 12 },
];

export async function getRestaurants(): Promise<Restaurant[]> {
  return STATIC_RESTAURANTS;
}

export async function addRestaurant(data: Omit<Restaurant, 'id'>): Promise<Restaurant[]> {
  return STATIC_RESTAURANTS;
}

export async function updateRestaurants(data: Restaurant[]): Promise<Restaurant[]> {
  return data;
}

// ── Chats ──────────────────────────────────────────────────────────────────────

export async function getChats(): Promise<ChatList> {
  try {
    const team = await getTeam();
    if (!team) return { active: [], done: [] };

    const { data: matches, error } = await supabase
      .from('matches')
      .select('*')
      .or(`team_a.eq.${team.id},team_b.eq.${team.id}`);

    if (error) throw error;
    if (!matches || matches.length === 0) return { active: [], done: [] };

    const chatItems: ChatItem[] = await Promise.all(
      matches.map(async (m, idx) => {
        const otherTeamId = m.team_a === team.id ? m.team_b : m.team_a;

        // 상대 팀 정보 조회
        const { data: otherTeam } = await supabase
          .from('teams')
          .select('*, users(name, department)')
          .eq('id', otherTeamId)
          .maybeSingle();

        const deptName = (otherTeam?.users as { department?: string } | null)?.department ?? '상대 학과';
        const name = `${deptName} 팀`;

        // 마지막 메시지 조회
        const { data: lastMsg } = await supabase
          .from('messages')
          .select('*')
          .eq('match_id', m.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        return {
          id: idx + 1,
          name,
          initial: deptName[0] ?? '팀',
          lastMessage: lastMsg?.content ?? '매칭이 성사되었어요! 🎉',
          time: lastMsg?.created_at ? formatTime(lastMsg.created_at) : '',
          status: (m.status === 'completed' ? 'done' : 'active') as 'active' | 'done',
          unread: 0,
        };
      })
    );

    return {
      active: chatItems.filter(c => c.status === 'active'),
      done: chatItems.filter(c => c.status === 'done'),
    };
  } catch (e) {
    console.error('getChats error:', e);
    return { active: [], done: [] };
  }
}

export async function addChat(_data: Omit<ChatItem, 'id' | 'status'>): Promise<ChatItem> {
  throw new Error('addChat is not supported');
}

export async function markChatRead(_id: number): Promise<{ ok: boolean }> {
  return { ok: true };
}

export async function completeChat(id: number): Promise<{ ok: boolean }> {
  try {
    const team = await getTeam();
    if (!team) return { ok: false };

    // 해당 id 인덱스에 맞는 match 조회
    const { data: matches } = await supabase
      .from('matches')
      .select('id')
      .or(`team_a.eq.${team.id},team_b.eq.${team.id}`)
      .limit(id);

    if (!matches || matches.length < id) return { ok: false };
    const matchId = matches[id - 1]?.id;
    if (!matchId) return { ok: false };

    await supabase.from('matches').update({ status: 'completed' }).eq('id', matchId);
    return { ok: true };
  } catch (e) {
    console.error('completeChat error:', e);
    return { ok: false };
  }
}

// ── Messages ──────────────────────────────────────────────────────────────────

export async function getMessages(chatId: number): Promise<Message[]> {
  try {
    const team = await getTeam();
    if (!team) return [];

    // chatId(인덱스)로 실제 match_id 찾기
    const { data: matches } = await supabase
      .from('matches')
      .select('id')
      .or(`team_a.eq.${team.id},team_b.eq.${team.id}`)
      .limit(chatId);

    const matchId = matches?.[chatId - 1]?.id;
    if (!matchId) return [];

    const userId = await getCurrentUserId();
    if (!userId) return [];

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('match_id', matchId)
      .order('created_at', { ascending: true });

    if (error) throw error;

    return (data ?? []).map((m, i) => ({
      id: i + 1,
      text: m.content ?? '',
      sender: m.sender_id === userId ? 'me' : 'other',
      time: formatTime(m.created_at),
    }));
  } catch (e) {
    console.error('getMessages error:', e);
    return [];
  }
}

export async function sendMessage(chatId: number, data: Omit<Message, 'id'>): Promise<Message> {
  const team = await getTeam();
  if (!team) throw new Error('팀이 없습니다.');
  const userId = await getCurrentUserId();
  if (!userId) throw new Error('인증 정보가 없습니다. 다시 로그인해주세요.');

  // chatId(인덱스)로 실제 match_id 찾기
  const { data: matches } = await supabase
    .from('matches')
    .select('id')
    .or(`team_a.eq.${team.id},team_b.eq.${team.id}`)
    .limit(chatId);

  const matchId = matches?.[chatId - 1]?.id;
  if (!matchId) throw new Error('매치를 찾을 수 없습니다.');

  const { data: inserted, error } = await supabase
    .from('messages')
    .insert({
      match_id: matchId,
      sender_id: userId,
      content: data.text,
    })
    .select()
    .single();

  if (error) {
    console.error('sendMessage error:', error);
    throw new Error(`메시지 전송 오류: ${error.message}`);
  }

  return {
    id: inserted.id,
    text: inserted.content,
    sender: 'me',
    time: formatTime(inserted.created_at),
  };
}

// ── History ────────────────────────────────────────────────────────────────────

export async function getHistory(): Promise<HistoryItem[]> {
  try {
    const team = await getTeam();
    if (!team) return [];

    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .or(`team_a.eq.${team.id},team_b.eq.${team.id}`)
      .eq('status', 'completed');

    if (error) throw error;

    return (data ?? []).map((m, i) => ({
      id: i + 1,
      name: '매칭 완료',
      date: m.created_at ? new Date(m.created_at).toLocaleDateString('ko-KR') : '',
      place: '충북대 근처',
    }));
  } catch (e) {
    console.error('getHistory error:', e);
    return [];
  }
}

export async function addHistory(_data: Omit<HistoryItem, 'id'>): Promise<HistoryItem[]> {
  return getHistory();
}

// ── Notifications (DB 미포함 — 정적 반환) ──────────────────────────────────────

export async function getNotifications(): Promise<Notification[]> {
  return [];
}

export async function markAllRead(): Promise<Notification[]> {
  return [];
}

// ── Dev reset ──────────────────────────────────────────────────────────────────

export async function resetAll(): Promise<{ ok: boolean; message: string }> {
  return { ok: true, message: 'Dev reset은 Supabase 직접 연결 모드에서 지원되지 않습니다.' };
}