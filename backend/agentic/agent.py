from langchain_anthropic import ChatAnthropic
from dotenv import load_dotenv
import re
load_dotenv()

model = ChatAnthropic(model_name="claude-3-5-haiku-latest")

def prompt_model(current_code: str, user_prompt) -> str:

    prompt = f"""Give me the code for a nextJS react website with shadcn components as per user requirements.
    User requirements: {user_prompt}
    Current Code: {current_code}
    Assume already that shadcn and all components are installed. Only give the code for page.tsx"""

    output = model.generate({prompt})
    print(output.generations[0][0].text)
    return output.generations[0][0].text

def extract_js_ts_code(text) -> str:
    """
    Extracts JavaScript (JS), JSX, TypeScript (TS), or TSX code from a given text string.

    :param text: String containing text with embedded code.
    :return: Extracted code as a string.
    """
    match = re.search(r'```(js|javascript|jsx|ts|tsx|typescript)\n(.*?)\n```', text, re.DOTALL)
    if match:
      print(match.group(2))
      return match.group(2)
    else:
      raise ValueError("No valid code block found in the text.")

def update_page_code(page_code: str):
    with open("../virtual-frontend/src/app/page.tsx", "w") as f:
        f.write(page_code)
    print("Page code updated successfully.")

   


if __name__ == "__main__":
    user_input = input("Hi let's get start building your website. What do you want to build today? \n")
    code = ""
    while True:
        try:
            text_code = prompt_model(code, user_input)
            code = extract_js_ts_code(text_code)
            update_page_code(code)
        except Exception as e:
           print(e)
        user_input = input("What's next?")

    
        
        
        

    