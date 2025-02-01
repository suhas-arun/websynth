from langchain_anthropic import ChatAnthropic

from langchain_core.tools import tools

from dotenv import load_dotenv

import os

import re

class ClaudeClient:

    def __init__(self):
        load_dotenv()
        if "ANTHROPIC_API_KEY" not in os.environ:
            print("no API key!")
        self.client = ChatAnthropic(model_name="claude-3-5-haiku-latest")


    def llm_call(self, model="claude-3-5-haiku-latest") -> str:
        """
        Calls the model with the given prompt and returns the response.

        Args:
            prompt (str): The user prompt to send to the model.
            system_prompt (str, optional): The system prompt to send to the model. Defaults to "".
            model (str, optional): The model to use for the call. Defaults to "claude-3-5-sonnet-20241022".

        Returns:
            str: The response from the language model.
        """

        output = self.client.generate({"""Give me the code for a typescript (.tsx) react website with shadcn components, 
                            that has button and an input. Assume already that shadcn and all components are installed. Just give the website code nothing else and ensure the code is delimited by ```"""})
        response = output.generations[0][0].text

        print(response)
        extracted_typescript = self.extract_tsx_code(response)

        print(extracted_typescript)
        return extracted_typescript

    def extract_tsx_code(self, text: str):
        """
        Extracts TypeScript React (TSX) code from a given text string.

        :param text: String containing text with embedded TSX code.
        :return: Extracted TSX code as a string.
        """
        match = re.search(r'```tsx\n(.*?)\n```', text, re.DOTALL)
        return match.group(1) if match else None
    
    def rewrite_code(code: str, pathname: str="backend/virtual-frontend/src/app/page.tsx"):
        with open(pathname) as f:
            f.write(code)