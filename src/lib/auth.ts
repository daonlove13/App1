import { supabase } from './supabase'

// 이메일 유효성 검사 (일반 이메일 허용 — 학생 인증은 학생증 수동 승인으로 대체)
const ALLOWED_EMAIL_DOMAINS = [
  'gmail.com',
  'naver.com',
  'kakao.com',
  'daum.net',
  'hanmail.net',
  'nate.com',
  'outlook.com',
  'hotmail.com',
  'icloud.com',
]

export function isValidUniversityEmail(email: string): boolean {
  const normalized = email.trim().toLowerCase()
  const domain = normalized.split('@')[1]
  if (!domain) return false
  // ac.kr 계열도 계속 허용
  if (domain.endsWith('.ac.kr')) return true
  return ALLOWED_EMAIL_DOMAINS.includes(domain)
}

// 이메일 로그인 (Supabase Magic Link 방식)
export async function signInWithEmail(email: string): Promise<{
  success: boolean
  message: string
}> {
  if (!isValidUniversityEmail(email)) {
    return {
      success: false,
      message: '대학교 이메일(.ac.kr)만 사용할 수 있어요.',
    }
  }

  const { error } = await supabase.auth.signInWithOtp({
    email: email.trim().toLowerCase(),
    options: {
      emailRedirectTo: window.location.origin,
    },
  })

  if (error) {
    return {
      success: false,
      message: error.message ?? '로그인 중 오류가 발생했어요. 다시 시도해주세요.',
    }
  }

  return {
    success: true,
    message: '인증 메일을 발송했어요. 이메일을 확인해주세요.',
  }
}

// 이메일 + 비밀번호 로그인 (일반 로그인)
export async function signInWithPassword(email: string, password: string): Promise<{
  success: boolean
  message: string
}> {
  if (!isValidUniversityEmail(email)) {
    return {
      success: false,
      message: '대학교 이메일(.ac.kr)만 사용할 수 있어요.',
    }
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  })

  if (error) {
    return {
      success: false,
      message: '이메일 또는 비밀번호가 올바르지 않아요.',
    }
  }

  return {
    success: true,
    message: '로그인 성공!',
  }
}

// 이메일 + 비밀번호 회원가입
export async function signUpWithEmail(email: string, password: string): Promise<{
  success: boolean
  message: string
}> {
  if (!isValidUniversityEmail(email)) {
    return {
      success: false,
      message: '대학교 이메일(.ac.kr)만 사용할 수 있어요.',
    }
  }

  const { error } = await supabase.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: {
      emailRedirectTo: window.location.origin,
    },
  })

  if (error) {
    return {
      success: false,
      message: error.message ?? '회원가입 중 오류가 발생했어요.',
    }
  }

  return {
    success: true,
    message: '인증 메일을 발송했어요. 이메일을 확인해주세요.',
  }
}

// 로그아웃
export async function signOut(): Promise<{
  success: boolean
  message: string
}> {
  const { error } = await supabase.auth.signOut()

  if (error) {
    return {
      success: false,
      message: '로그아웃 중 오류가 발생했어요.',
    }
  }

  return {
    success: true,
    message: '로그아웃 되었어요.',
  }
}

// 현재 로그인 상태 확인
export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) return null
  return user
}

// 현재 세션 확인
export async function getSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (error || !session) return null
  return session
}

// 로그인 상태 변화 구독 (컴포넌트에서 사용)
// 사용 예: const { data: { subscription } } = onAuthStateChange((user) => { ... })
// 컴포넌트 언마운트 시 subscription.unsubscribe() 호출 필수
export function onAuthStateChange(callback: (user: ReturnType<typeof supabase.auth.getUser> extends Promise<infer T> ? T extends { data: { user: infer U } } ? U : null : null) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null as any)
  })
}
