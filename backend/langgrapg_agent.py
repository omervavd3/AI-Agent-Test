# agent.py
import os
from typing import TypedDict, List, Union
from langchain_core.messages import HumanMessage, AIMessage
#from langchain_openai import ChatOpenAI
from langchain_community.chat_models import ChatOllama
from langgraph.graph import StateGraph, START, END
from dotenv import load_dotenv

# Loads OPENAI_API_KEY automatically from .env file
load_dotenv()

class AgentState(TypedDict):
    messages: List[Union[HumanMessage, AIMessage]]

llm = ChatOllama(
    model="gemma:2b",
    base_url=os.getenv("OLLAMA_HOST", "http://ollama:11434"),
    temperature=0.3
)

def process(state: AgentState) -> AgentState:
    response = llm.invoke(state["messages"])
    state["messages"].append(AIMessage(content=response.content))
    state["messages"] = state["messages"][-10:]
    return state


graph = StateGraph(AgentState)
graph.add_node("process", process)
graph.add_edge(START, "process")
graph.add_edge("process", END)
agent = graph.compile()
