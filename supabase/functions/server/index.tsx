import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

app.use('*', logger(console.log));
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// ── Health ──────────────────────────────────────────────────────────────────
app.get("/make-server-55228eec/health", (c) => c.json({ status: "ok" }));

// ── Default seeds ────────────────────────────────────────────────────────────
const DEFAULT_PROFILE = {
  name: "홍길동",
  university: "충북대",
  department: "심리학과",
  studentId: "2099123456",
  grade: "24학번",
  penalties: 0,
  verified: true,
};

const DEFAULT_TEAM = {
  id: "team_001",
  teamName: "충북대 심리학과팀",
  gender: "남성",
  size: "3v3",
  members: [
    { id: "u1", name: "홍길동", role: "팀장", initial: "나" },
    { id: "u2", name: "김민준", role: "팀원", initial: "김" },
  ],
  maxMembers: 3,
  applied: false,
  createdAt: new Date().toISOString(),
};

const DEFAULT_STATS = {
  todayApplications: 12,
  maleWaiting: 8,
  femaleWaiting: 8,
  todayMatches: 6,
  updatedAt: new Date().toISOString(),
};

const DEFAULT_RESTAURANTS = [
  { id: 1, name: "치킨앤비어 중대점", location: "서울", district: "도봉구", teamCount: 3, seats: 20 },
  { id: 2, name: "물맥주 중대점",     location: "서울", district: "도봉구", teamCount: 3, seats: 16 },
  { id: 3, name: "청춘삼겹 중대점",   location: "서울", district: "도봉구", teamCount: 2, seats: 24 },
  { id: 4, name: "호프마을 중대점",   location: "서울", district: "도봉구", teamCount: 4, seats: 30 },
];

const DEFAULT_CHATS = {
  active: [
    {
      id: 1,
      name: "경영학과 이지원 팀",
      initial: "이",
      lastMessage: "좋아요! 충대 근처 어떠세요?",
      time: "오후 6:05",
      status: "active",
      unread: 2,
      expireWarning: "23시간 후 자동 종료",
    },
  ],
  done: [
    {
      id: 2,
      name: "사회학과 김다은 팀",
      initial: "김",
      lastMessage: "즐거운 시간이었어요 :)",
      time: "3월 21일",
      status: "done",
    },
  ],
};

const DEFAULT_MESSAGES: Record<string, unknown[]> = {
  "1": [
    { id: 0, text: "안녕하세요! 매칭이 완료됐어요. 채팅은 약속 잡는 용도로만 사용해요. 24시간 무응답 시 자동 종료되며 패널티가 부여돼요.", sender: "bot", time: "" },
    { id: 1, text: "안녕하세요! 반가워요 :)", sender: "other", time: "오후 6:02" },
    { id: 2, text: "반가워요! 이번 주 토요일 어때요?", sender: "me", time: "오후 6:03" },
    { id: 3, text: "좋아요! 충대 근처 어떠세요?", sender: "other", time: "오후 6:05" },
  ],
  "2": [
    { id: 0, text: "매칭이 완료됐어요!", sender: "bot", time: "" },
    { id: 1, text: "안녕하세요~", sender: "other", time: "오후 5:00" },
    { id: 2, text: "반가워요!", sender: "me", time: "오후 5:01" },
    { id: 3, text: "즐거운 시간이었어요 :)", sender: "other", time: "오후 8:30" },
  ],
};

const DEFAULT_HISTORY = [
  { id: 1, name: "경영학과 이지원 팀", date: "2025.04.08", place: "치킨앤비어 충대점" },
  { id: 2, name: "사회학과 김다은 팀", date: "2025.03.21", place: "이자카야 하나" },
];

const DEFAULT_NOTIFICATIONS = [
  { id: 1, type: "match", title: "새로운 매칭 신청이 왔어요!", body: "경영학과 이지원 팀이 매칭을 신청했어요.", time: "방금 전", read: false },
  { id: 2, type: "chat",  title: "새 메시지가 도착했어요",     body: "경영학과 이지원 팀: 충대 근처 어떠세요?",  time: "5분 전",  read: false },
  { id: 3, type: "info",  title: "indeed 이용 안내",            body: "팀원이 모두 모여야 매칭 신청이 가능해요.", time: "1시간 전", read: true  },
];

// ── Helper ────────────────────────────────────────────────────────────────────
async function getOrSeed<T>(key: string, defaultVal: T): Promise<T> {
  try {
    const raw = await kv.get(key);
    if (raw) return JSON.parse(raw as string);
    await kv.set(key, JSON.stringify(defaultVal));
    return defaultVal;
  } catch (e) {
    console.log(`getOrSeed error for key=${key}:`, e);
    return defaultVal;
  }
}

// ── Profile ──────────────────────────────────────────────────────────────────
app.get("/make-server-55228eec/profile", async (c) => {
  try {
    const data = await getOrSeed("indeed:profile", DEFAULT_PROFILE);
    return c.json(data);
  } catch (e) {
    console.log("GET /profile error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

app.put("/make-server-55228eec/profile", async (c) => {
  try {
    const body = await c.req.json();
    await kv.set("indeed:profile", JSON.stringify(body));
    return c.json(body);
  } catch (e) {
    console.log("PUT /profile error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

// ── Team ─────────────────────────────────────────────────────────────────────
app.get("/make-server-55228eec/team", async (c) => {
  try {
    const raw = await kv.get("indeed:team");
    if (!raw) return c.json(null);
    return c.json(JSON.parse(raw as string));
  } catch (e) {
    console.log("GET /team error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

app.post("/make-server-55228eec/team", async (c) => {
  try {
    const body = await c.req.json();
    const team = {
      id: `team_${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
    };
    await kv.set("indeed:team", JSON.stringify(team));
    return c.json(team);
  } catch (e) {
    console.log("POST /team error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

app.put("/make-server-55228eec/team", async (c) => {
  try {
    const body = await c.req.json();
    await kv.set("indeed:team", JSON.stringify(body));
    return c.json(body);
  } catch (e) {
    console.log("PUT /team error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

app.delete("/make-server-55228eec/team", async (c) => {
  try {
    await kv.del("indeed:team");
    return c.json({ ok: true });
  } catch (e) {
    console.log("DELETE /team error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

// 팀 apply 상태 토글
app.post("/make-server-55228eec/team/apply", async (c) => {
  try {
    const raw = await kv.get("indeed:team");
    if (!raw) return c.json({ error: "팀이 없어요" }, 404);
    const team = JSON.parse(raw as string);
    team.applied = !team.applied;
    await kv.set("indeed:team", JSON.stringify(team));
    // stats 갱신
    const stats = await getOrSeed("indeed:stats", DEFAULT_STATS);
    if (team.applied) stats.todayApplications += 1;
    else if (stats.todayApplications > 0) stats.todayApplications -= 1;
    stats.updatedAt = new Date().toISOString();
    await kv.set("indeed:stats", JSON.stringify(stats));
    return c.json(team);
  } catch (e) {
    console.log("POST /team/apply error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

// ── Stats ─────────────────────────────────────────────────────────────────────
app.get("/make-server-55228eec/stats", async (c) => {
  try {
    const data = await getOrSeed("indeed:stats", DEFAULT_STATS);
    return c.json(data);
  } catch (e) {
    console.log("GET /stats error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

app.put("/make-server-55228eec/stats", async (c) => {
  try {
    const body = await c.req.json();
    const updated = { ...body, updatedAt: new Date().toISOString() };
    await kv.set("indeed:stats", JSON.stringify(updated));
    return c.json(updated);
  } catch (e) {
    console.log("PUT /stats error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

// ── Restaurants ───────────────────────────────────────────────────────────────
app.get("/make-server-55228eec/restaurants", async (c) => {
  try {
    const data = await getOrSeed("indeed:restaurants", DEFAULT_RESTAURANTS);
    return c.json(data);
  } catch (e) {
    console.log("GET /restaurants error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

app.post("/make-server-55228eec/restaurants", async (c) => {
  try {
    const body = await c.req.json();
    const list = await getOrSeed("indeed:restaurants", DEFAULT_RESTAURANTS);
    const newItem = { id: Date.now(), ...body };
    const updated = [...list, newItem];
    await kv.set("indeed:restaurants", JSON.stringify(updated));
    return c.json(updated);
  } catch (e) {
    console.log("POST /restaurants error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

app.put("/make-server-55228eec/restaurants", async (c) => {
  try {
    const body = await c.req.json(); // expects full array
    await kv.set("indeed:restaurants", JSON.stringify(body));
    return c.json(body);
  } catch (e) {
    console.log("PUT /restaurants error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

// ── Chats ─────────────────────────────────────────────────────────────────────
app.get("/make-server-55228eec/chats", async (c) => {
  try {
    const data = await getOrSeed("indeed:chats", DEFAULT_CHATS);
    return c.json(data);
  } catch (e) {
    console.log("GET /chats error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

app.post("/make-server-55228eec/chats", async (c) => {
  try {
    const body = await c.req.json();
    const chats = await getOrSeed("indeed:chats", DEFAULT_CHATS);
    const newChat = { id: Date.now(), ...body, status: "active" };
    chats.active = [newChat, ...chats.active];
    await kv.set("indeed:chats", JSON.stringify(chats));
    return c.json(newChat);
  } catch (e) {
    console.log("POST /chats error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

// 채팅방 읽음 처리
app.post("/make-server-55228eec/chats/:id/read", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    const chats = await getOrSeed("indeed:chats", DEFAULT_CHATS);
    chats.active = chats.active.map((ch: Record<string, unknown>) => ch.id === id ? { ...ch, unread: 0 } : ch);
    await kv.set("indeed:chats", JSON.stringify(chats));
    return c.json({ ok: true });
  } catch (e) {
    console.log("POST /chats/:id/read error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

// 채팅방 완료 처리
app.post("/make-server-55228eec/chats/:id/complete", async (c) => {
  try {
    const id = Number(c.req.param("id"));
    const chats = await getOrSeed("indeed:chats", DEFAULT_CHATS);
    const found = chats.active.find((ch: Record<string, unknown>) => ch.id === id);
    if (found) {
      chats.active = chats.active.filter((ch: Record<string, unknown>) => ch.id !== id);
      chats.done = [{ ...found, status: "done" }, ...chats.done];
    }
    await kv.set("indeed:chats", JSON.stringify(chats));
    return c.json({ ok: true });
  } catch (e) {
    console.log("POST /chats/:id/complete error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

// ── Messages ──────────────────────────────────────────────────────────────────
app.get("/make-server-55228eec/chats/:id/messages", async (c) => {
  try {
    const id = c.req.param("id");
    const defaultMsgs = DEFAULT_MESSAGES[id] ?? [];
    const data = await getOrSeed(`indeed:messages:${id}`, defaultMsgs);
    return c.json(data);
  } catch (e) {
    console.log(`GET /chats/${c.req.param("id")}/messages error:`, e);
    return c.json({ error: String(e) }, 500);
  }
});

app.post("/make-server-55228eec/chats/:id/messages", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const defaultMsgs = DEFAULT_MESSAGES[id] ?? [];
    const messages = await getOrSeed(`indeed:messages:${id}`, defaultMsgs);
    const newMsg = { id: Date.now(), ...body };
    const updated = [...messages, newMsg];
    await kv.set(`indeed:messages:${id}`, JSON.stringify(updated));

    // 채팅 목록 lastMessage 업데이트
    const chats = await getOrSeed("indeed:chats", DEFAULT_CHATS);
    const numId = Number(id);
    chats.active = chats.active.map((ch: Record<string, unknown>) =>
      ch.id === numId
        ? { ...ch, lastMessage: body.text, time: body.time }
        : ch
    );
    await kv.set("indeed:chats", JSON.stringify(chats));

    return c.json(newMsg);
  } catch (e) {
    console.log(`POST /chats/${c.req.param("id")}/messages error:`, e);
    return c.json({ error: String(e) }, 500);
  }
});

// ── History ───────────────────────────────────────────────────────────────────
app.get("/make-server-55228eec/history", async (c) => {
  try {
    const data = await getOrSeed("indeed:history", DEFAULT_HISTORY);
    return c.json(data);
  } catch (e) {
    console.log("GET /history error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

app.post("/make-server-55228eec/history", async (c) => {
  try {
    const body = await c.req.json();
    const list = await getOrSeed("indeed:history", DEFAULT_HISTORY);
    const newItem = { id: Date.now(), ...body };
    const updated = [newItem, ...list];
    await kv.set("indeed:history", JSON.stringify(updated));
    return c.json(updated);
  } catch (e) {
    console.log("POST /history error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

// ── Notifications ─────────────────────────────────────────────────────────────
app.get("/make-server-55228eec/notifications", async (c) => {
  try {
    const data = await getOrSeed("indeed:notifications", DEFAULT_NOTIFICATIONS);
    return c.json(data);
  } catch (e) {
    console.log("GET /notifications error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

app.post("/make-server-55228eec/notifications/read-all", async (c) => {
  try {
    const list = await getOrSeed("indeed:notifications", DEFAULT_NOTIFICATIONS);
    const updated = list.map((n: Record<string, unknown>) => ({ ...n, read: true }));
    await kv.set("indeed:notifications", JSON.stringify(updated));
    return c.json(updated);
  } catch (e) {
    console.log("POST /notifications/read-all error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

// ── Reset (개발용) ─────────────────────────────────────────────────────────────
app.delete("/make-server-55228eec/reset", async (c) => {
  try {
    await kv.del("indeed:profile");
    await kv.del("indeed:team");
    await kv.del("indeed:stats");
    await kv.del("indeed:restaurants");
    await kv.del("indeed:chats");
    await kv.del("indeed:history");
    await kv.del("indeed:notifications");
    await kv.del("indeed:messages:1");
    await kv.del("indeed:messages:2");
    return c.json({ ok: true, message: "모든 데이터가 초기화됐어요" });
  } catch (e) {
    console.log("DELETE /reset error:", e);
    return c.json({ error: String(e) }, 500);
  }
});

Deno.serve(app.fetch);
