from langchain_anthropic import ChatAnthropic
from dotenv import load_dotenv
import os
import re

class ClaudeClient:

    def __init__(self):
        load_dotenv()
        if "ANTHROPIC_API_KEY" not in os.environ:
            print("no API key!")
        self.client = ChatAnthropic(model_name="claude-3-5-haiku-latest")

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
