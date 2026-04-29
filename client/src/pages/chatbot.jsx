import React, { useState } from "react";
import "../styles/chatbot.css";



function Chatbot() {

  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello 👋 I am your AI Placement Assistant. Ask me about placements, aptitude, coding interviews or resume tips." }
  ]);

  const [input, setInput] = useState("");

  const sendMessage = async () => {

  if (!input) return;

  const userMessage = { sender: "user", text: input };

  setMessages([...messages, userMessage]);

  try {

    const response = await fetch("http://127.0.0.1:8000/chatbot/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: input
      })
    });

    const data = await response.json();

    const botReply = {
      sender: "bot",
      text: data.reply
    };

    setMessages(prev => [...prev, botReply]);

  } catch (error) {

    setMessages(prev => [
      ...prev,
      { sender: "bot", text: "Server error. Please try again." }
    ]);

  }

  setInput("");

};

  return (

    <div className="container">

      {/* SIDEBAR */}

      <div className="sidebar">

        <h2 className="title">🎓Placement Assistant</h2>

        <div className="menu">
          <button className="active">Chatbot</button>
        </div>

        <div className="profile">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="profile"
          />
          <div>
            <h4>Ambika</h4>
            <p>Student</p>
          </div>
        </div>

      </div>
{/* CHAT AREA */}

      <div className="chat-area">

        <h1>AI Placement Chatbot</h1>
        <p>Ask anything about placements, aptitude or interviews.</p>

        <div className="chat-box">

          {messages.map((msg, index) => (

            <div
              key={index}
              className={msg.sender === "user" ? "user-msg" : "bot-msg"}
            >
              {msg.text}
            </div>

          ))}

        </div>


        <div className="input-area">

          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button onClick={sendMessage}>Send</button>

        </div>

      </div>

    </div>

  );
}

export default Chatbot;