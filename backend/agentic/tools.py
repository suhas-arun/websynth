from langchain_core.tools import tool
import os

main_dir = '../virtual-frontend/src/app/'

@tool
def read_file(file_path: str) -> str:
    """Tool to read a file and return its content as a string."""
    print('Reading file: ', file_path)
    with open(os.path.join(main_dir, file_path), "r") as f:
        return f.read() 
    
@tool
def write_to_file(file_path: str, content: str) -> None:
    """Tool to create or write content to a file."""
    print('Writing to file: ', file_path)
    with open(os.path.join(main_dir, file_path), "w") as f:
        f.write(content)  
    
@tool
def create_dir(dir_path: str) -> None:
    """Tool to create a directory."""
    print('Creating directory: ', dir_path)
    os.makedirs(os.path.join(main_dir, dir_path), exist_ok=True)

@tool 
def list_dir(dir_path: str) -> list:
    """Tool to list the contents of a directory."""
    print('Listing directory: ', os.path.join(main_dir, dir_path))
    print('Result: ', os.listdir(os.path.join(main_dir, dir_path)))
    return os.listdir(os.path.join(main_dir, dir_path))
