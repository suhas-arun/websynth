from langchain_core.tools import tool
import os
from agentic.utils import ClaudeClient
import subprocess
import base64
import anthropic
import re

main_dir = '/Users/timmap/Desktop/Work/ICHACK25/websynth/demos/test-app/src/app/'
main_dir_components = '/Users/timmap/Desktop/Work/ICHACK25/websynth/demos/test-app/src/components/'
base_dir = '/Users/timmap/Desktop/Work/ICHACK25/websynth/demos/test-app'


# print ls command of the current director

# @tool
# def read_file(file_path: str) -> str:
#     """Tool to read a file and return its content as a string."""
#     print('Reading file: ', file_path)
#     with open(os.path.join(MAIN, file_path), "r") as f:
#         return f.read() 
    
# @tool
# def write_to_file(file_path: str, content: str) -> None:
#     """Tool to create or write content to a file."""
#     print('Writing to file: ', file_path)
#     with open(os.path.join(MAIN, file_path), "w") as f:
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
        os.makedirs(os.path.join(MAIN, dir_path), exist_ok=True)
    with open(os.path.join(MAIN, file_path), "w") as f:
        f.write('')

@tool 
def list_dir(dir_path: str) -> list:
    """Tool to list the contents of a directory. You are already in the app directory."""
    if 'app' in dir_path:
        dir_path = dir_path.split('app')[1]
    if dir_path.startswith('/'):
        dir_path = dir_path[1:]
    return os.listdir(os.path.join(MAIN, dir_path))

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
    with open(os.path.join(MAIN, file_path), "r") as f:
        current_code = f.read() 
    
    programmer = ClaudeClient()
    prompt = f"""You are a programmer tasked with making changes to the following NextJS code. 
    You can only use shadcn components, nextjs, framer-motion and react. DO NOT use any other external libraries.
    ONLY return code within ```tsx``` delimiters.
    Only use the default tailwind colours, bg-primary, text-primary etc.
        Code:\n{current_code}
        Changes:\n{changes}        
    """ 
    code = programmer.client.generate({prompt})

    tsx_code = programmer.extract_tsx_code(code.generations[0][0].text)


    if tsx_code is None:
        return "No TSX code found in the response. Please try again."
    
    ## Check & install missing components
    pattern = r'import\s+(?:\{[\s\w,]*\}|\w+)\s+from\s+["\']@/components/([\w/]+)["\'];?'
    matches = re.findall(pattern, tsx_code)

    components = [match.split("/")[-1] for match in matches]
    unique_components = set(components)

    for c in unique_components:
        component = c.replace("@/", "")

        component_path = os.path.join(COMPONENTS, f"{component}.tsx")

        if os.path.exists(component_path):
            print(f"{component} is already installed.")
            continue
        else:
            print(f"Installing {component}...")
        try:
            command = f"echo 'Use --force' | npx shadcn@latest add {component}"
            subprocess.run(
                command,
                shell=True,
                check=True,
                text=True,
                cwd=MAIN,
            )
            print(f"{component} installed successfully.")
        except subprocess.CalledProcessError as error:
            print(f"Failed to install {component}: {error}")


    
    programmer.rewrite_code(tsx_code, str(os.path.join(MAIN, file_path)))
    
    return f"The changes to the code were successfully made to the file: {file_path}"


def image_to_text(image_path: str) -> str:
    """Tool to convert an image to text using Claude"""
    image_media_type = "image/png"
    image_data = open(image_path, "rb").read()
    image_data = base64.b64encode(image_data).decode("utf-8")

    client = anthropic.Anthropic()
    message = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=1024,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": image_media_type,
                            "data": image_data,
                        },
                    },
                    {
                        "type": "text",
                        "text": "Describe this image."
                    }
                ],
            }
        ],
    )
    return message.content[0].text


