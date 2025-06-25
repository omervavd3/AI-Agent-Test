import { useState } from "react";
import "./App.css";


function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [allMessages, setAllMessages] = useState<string[]>([]);

  const BACK_API = "http://localhost:8000"; // Adjust this if needed

  const ask = async () => {
    setPrompt("");
    const curPrompt = `User: ${prompt}`;
    setAllMessages((prev) => [...prev, curPrompt]);
    const res = await fetch(`${BACK_API}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: prompt,
        session_id: "frontend-session", // you can make this dynamic later
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      setResponse(`Error: ${err.detail || res.status}`);
    } else {
      const data = await res.json();
      setResponse(data.response);
      const aiMessage = `AI: ${data.response}`;
      await setAllMessages((prev) => [...prev, aiMessage]);
    }
  };

  return (
    <div className="container">
      <h1>AI Agent</h1>
      <h2>Current Conversation:</h2>
      <div>
        {allMessages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <textarea
        rows={4}
        cols={50}
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
        placeholder="Type your message..."
      />
      <br />
      <button onClick={ask}>Send</button>
      <p>
        <strong>Last Response:</strong> {response}
      </p>
    </div>
  );
}

export default App;
