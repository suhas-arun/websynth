from langgraph.prebuilt import ToolNode
from tools import list_dir, make_change_to_file, create_file
from graph import AgenticWorkflow

tools = [list_dir, make_change_to_file, create_file]

PM_PROMPT = """
You are tasked with breaking down a request into changes required in a NextJS app router project.
You have access to a set of tools to explore the project structure and make changes to the project dependant on the user query.
The first tool you must use is 'list_dir', which lists the contents of a directory. Only request changes to tsx files do not change the globals.css.
When making a change, explain to the programmer what changes to make to the code, do not write any code yourself, keep explaination direct to tasks do not expand at all.
"""

if __name__ == "__main__":  
    workflow = AgenticWorkflow(tools)
    app = workflow.compile_graph()
    app.invoke({
        "messages": [
            {"role": "system", "content": PM_PROMPT},
            {"role": "user", "content": "Add a help page, with a button with a link to www.ichack.com. add this page to the navbar"},
    ]}, debug=True)
     
    #  Add a 'programmer' agent who takes the output from the Project Manager and updates the relevant files.
    #  Add a 'tester' agent who takes the output from the Programmer and tests the changes.


