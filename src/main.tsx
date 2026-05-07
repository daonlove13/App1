import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
import { supabase } from "./app/services/supabaseClient.ts";

async function init() {
  // OAuth 콜백 URL의 hash fragment 처리 (access_token이 있으면 세션 설정)
  if (window.location.hash && window.location.hash.includes('access_token')) {
    await supabase.auth.getSession();
    // hash 제거하고 클린 URL로
    window.history.replaceState(null, '', window.location.pathname);
  }

  createRoot(document.getElementById("root")!).render(<App />);
}

init();
