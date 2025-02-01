from langchain_core.tools import tool
import os
from utils import ClaudeClient

main_dir = '../virtual-frontend/src/app/'

# @tool
# def read_file(file_path: str) -> str:
#     """Tool to read a file and return its content as a string."""
#     print('Reading file: ', file_path)
#     with open(os.path.join(main_dir, file_path), "r") as f:
#         return f.read() 
    
# @tool
# def write_to_file(file_path: str, content: str) -> None:
#     """Tool to create or write content to a file."""
#     print('Writing to file: ', file_path)
#     with open(os.path.join(main_dir, file_path), "w") as f:
#         f.write(content)  

@tool
def create_file(file_path: str) -> None:
    """Tool to create a file."""
    print('Writing to file: ', file_path)
    if 'app' in file_path:
        file_path = file_path.split('app')[1]
    if file_path.startswith('/'):
        file_path = file_path[1:]
    dir_path = os.path.dirname(file_path)
    if dir_path:
        os.makedirs(os.path.join(main_dir, dir_path), exist_ok=True)
    with open(os.path.join(main_dir, file_path), "w") as f:
        f.write('') 

@tool 
def list_dir(dir_path: str) -> list:
    """Tool to list the contents of a directory. You are already in the app directory."""
    if 'app' in dir_path:
        dir_path = dir_path.split('app')[1]
    if dir_path.startswith('/'):
        dir_path = dir_path[1:]
    return os.listdir(os.path.join(main_dir, dir_path))

@tool
def make_change_to_file(file_path: str, changes: str) -> str:
    """Tool to tell a programmer what changes to make to a file.
    
    Args:
        file_path (str): The path to the file to make changes to.
        change (str): A descriptive message explaining the change to make.
    """

    if 'app' in file_path:
        file_path = file_path.split('app')[1]
    if file_path.startswith('/'):
        file_path = file_path[1:]

    # Get the code from file
    with open(os.path.join(main_dir, file_path), "r") as f:
        current_code = f.read() 
    
    programmer = ClaudeClient()
    prompt = f"""You are a programmer tasked with making changes to the following NextJS code. 
    You can only use shadcn components, nextjs and react. DO NOT use any other external libraries.
    ONLY return code within ```tsx``` delimiters.
        Code:\n{current_code}
        Changes:\n{changes}        
    """ 
    code = programmer.client.generate({prompt})
    
    tsx_code = programmer.extract_tsx_code(code.generations[0][0].text)

    if tsx_code is None:
        return "No TSX code found in the response. Please try again."
    
    programmer.rewrite_code(tsx_code, str(os.path.join(main_dir, file_path)))
    
    return f"The changes to the code were successfully made to the file: {file_path}"