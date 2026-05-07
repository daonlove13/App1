import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
import { supabase } from "./app/services/supabaseClient.ts";

async function init() {
  if (window.location.hash && window.location.hash.includes('access_token')) {
    // hash에서 세션 설정 - Supabase가 자동으로 처리
    const { data } = await supabase.auth.getSession();
    console.log('OAuth session:', data.session?.user?.email);
  }
  createRoot(document.getElementById("root")!).render(<App />);
}

init();
