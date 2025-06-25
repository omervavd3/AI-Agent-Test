import { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const ask = async () => {
    const res = await fetch("http://localhost:8000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setResponse(data.response);
  };

  return (
    <div>
      <h1>AI Agent</h1>
      <textarea onChange={(e) => setPrompt(e.target.value)} value={prompt} />
      <button onClick={ask}>Send</button>
      <p>
        <strong>Response:</strong> {response}
      </p>
    </div>
  );
}

export default App;
