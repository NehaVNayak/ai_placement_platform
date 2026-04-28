import { useState } from "react";
import Chatbot from "../pages/chatbot"; // your existing chatbot

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* CHAT BUTTON */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "#1a5c35",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 9999,
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
        }}
      >
        🤖
      </div>

      {/* CHAT WINDOW */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 90,
            right: 20,
            width: 350,
            height: 500,
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            overflow: "hidden",
            zIndex: 9999
          }}
        >
          <Chatbot />
        </div>
      )}
    </>
  );
}