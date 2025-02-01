from langgraph.prebuilt import ToolNode
from tools import read_file, write_file, create_file, create_dir, list_dir
from graph import AgenticWorkflow

tools = [read_file, write_file, create_file, create_dir, list_dir]


if __name__ == "__main__":  
    workflow = AgenticWorkflow(tools)
    app = workflow.compile_graph()
    app.invoke({
        "messages": [
            {"role": "system", "content": "You are an agentic system for making NextJS website, aid the user. You have access to all shadcn components. You can read, write, create files and directories inside the app directory, for example to read the homepage use `read_file('page.tsx') do not include the app directory in the path`"},
            {"role": "user", "content": "On the interactions page, add a sheet that comes up from the bottom that will show an overview to the page, and add a button that will open the sheet in the far right and halfway up the page"},
    ]}, debug=True)