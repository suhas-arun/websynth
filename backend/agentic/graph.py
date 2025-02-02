import os
os.chdir('../')
from langgraph.graph import StateGraph, MessagesState, START, END
from agentic.utils import ClaudeClient
from agentic.CustomToolNode import WebSynthToolNode
from agentic.tools import list_dir, make_change_to_file, create_file
from utils.input import Data
print(os.system('ls'))
os.chdir('backend/agentic')

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
      messages = state["messages"]
      response = self.model_with_tools.invoke(messages)
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
  
class AgenticApp:
    def __init__(self):
        tools = [list_dir, make_change_to_file, create_file]

        self.PM_PROMPT = """
        You are tasked with breaking down a request into changes required in a NextJS app router project.
        You have access to a set of tools to explore the project structure and make changes to the project dependant on the user query.
        The first tool you must use is 'list_dir', which lists the contents of a directory. 
        Only request changes to tsx files do not change the globals.css.
        Never make components everything will be done in the page.tsx and layout.tsx files.
        When making a change, explain to the programmer what changes to make to the code, DO NOT write any code yourself, keep explaination direct to tasks do not expand at all.
        """

        self.workflow = AgenticWorkflow(tools)
        self.app = self.workflow.compile_graph()

    def run(self, data: Data):
        return self.app.run({"messages": [
            {"role": "system", "content": self.PM_PROMPT}, 
            {"role": "user", "content": data.prompt}
        ]})
  
