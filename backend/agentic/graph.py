from langgraph.graph import StateGraph, MessagesState, START, END
from utils import ClaudeClient
from langgraph.prebuilt import ToolNode
from CustomToolNode import WebSynthToolNode
from langchain_core.prompts import SystemMessagePromptTemplate

class AgenticWorkflow:

  def __init__(self, tools):
      self.agent = ClaudeClient()
      self.tools = tools
      self.model_with_tools = self.agent.client.bind_tools(tools)
      self.tool_node = WebSynthToolNode(self.tools)

  def should_continue(self, state: MessagesState):
      messages = state["messages"]
      last_message = messages[-1]
      if last_message.tool_calls:
          return "tools"
      return END

  def call_model(self, state: MessagesState):
    #   print("Calling model")
      messages = state["messages"]
      response = self.model_with_tools.invoke(messages)
    #   print('Tool Model Response: ', response.tool_calls)
      return {"messages": [response]}

  def compile_graph(self):
    workflow = StateGraph(MessagesState)

    workflow.add_node("agent", self.call_model)
    workflow.add_node("tools", self.tool_node)

    workflow.add_edge(START, "agent")
    workflow.add_conditional_edges("agent", self.should_continue, ["tools", END])
    workflow.add_edge("tools", "agent")

    app = workflow.compile()
    return app