# main.py
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from langchain_core.messages import HumanMessage
from langgrapg_agent import agent  # ← we'll move your LangGraph code to agent.py
import os

app = FastAPI()

# CORS (adjust allowed_origins for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

conversation_memory = {}  # session_id → message history

@app.post("/chat")
async def chat(request: Request):
    data = await request.json()
    session_id = data.get("session_id", "default")  # allows keeping per-user history
    user_input = data.get("prompt", "")

    if session_id not in conversation_memory:
        conversation_memory[session_id] = []

    conversation_memory[session_id].append(HumanMessage(content=user_input))
    result = agent.invoke({"messages": conversation_memory[session_id]})
    conversation_memory[session_id] = result["messages"]

    return {
        "response": result["messages"][-1].content
    }
