from langgraph.prebuilt import ToolNode
from tools import list_dir, make_change_to_file, create_dir, create_file
from graph import AgenticWorkflow

tools = [list_dir, make_change_to_file, create_dir, create_file]

PM_PROMPT = """
You are a Project Manager, who is tasked with breaking down a request into changes required to the project structure.
You have access to a set of tools to explore the project structure and make changes to the project.
When making a change, explain to the programmer what changes to make to the code, do not write any code yourself.
"""


if __name__ == "__main__":  
    workflow = AgenticWorkflow(tools)
    app = workflow.compile_graph()
    app.invoke({
        "messages": [
            {"role": "system", "content": PM_PROMPT},
            {"role": "user", "content": "Add a button that says 'Click Me' to the home page."},
    ]}, debug=True)
     
    #  Add a 'programmer' agent who takes the output from the Project Manager and updates the relevant files.
    #  Add a 'tester' agent who takes the output from the Programmer and tests the changes.


