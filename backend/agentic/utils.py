from langchain_anthropic import ChatAnthropic
from dotenv import load_dotenv
import os
import re


class ClaudeClient:
    def __init__(self, model="claude-3-5-haiku-latest"):
        load_dotenv()
        if "ANTHROPIC_API_KEY" not in os.environ:
            print("no API key!")
        self.client = ChatAnthropic(model_name=model)

    def llm_call(self) -> str:
        """
        Calls the model with the given prompt and returns the response.

        Args:
            prompt (str): The user prompt to send to the model.
            system_prompt (str, optional): The system prompt to send to the model. Defaults to "".
            model (str, optional): The model to use for the call. Defaults to "claude-3-5-sonnet-20241022".

        Returns:
            str: The response from the language model.
        """

        output = self.client.generate(
            {
                """Give me the code for a typescript (.tsx) react website with shadcn components, 
                            that has button and an input. Assume already that shadcn and all components are installed. Just give the website code nothing else and ensure the code is delimited by ```"""
            }
        )
        response = output.generations[0][0].text

        extracted_typescript = self.extract_tsx_code(response)

        print(extracted_typescript)
        return extracted_typescript

    def repeated_code_check(self, code: str, max_repetitions: int = 3):
        for _ in range(max_repetitions):
            new_code = self.__check_code(code)
            if new_code == "YES":
                return new_code
            code = self.__extract_tsx_code(new_code)
        return code

    def rewrite_code(
        self, code: str, pathname: str = "backend/virtual-frontend/src/app/page.tsx"
    ):
        with open(pathname, "w") as f:
            f.write(code)

    def __extract_tsx_code(self, text: str):
        """
        Extracts TypeScript React (TSX) code from a given text string.

        :param text: String containing text with embedded TSX code.
        :return: Extracted TSX code as a string.
        """
        match = re.search(r"```tsx\n(.*?)\n```", text, re.DOTALL)
        return match.group(1) if match else None

    def __check_code(self, code_str: str):
        prompt = """You are an expert in TypeScript and React, specializing in Next.js. Your task is to evaluate the syntax of a given page.tsx file. The code is below, delimited by ```.
        
        Rules:
        If the syntax is valid, respond with the word "YES" only, and nothing else.
        If the syntax is invalid, return a corrected version of the code with only the necessary changes to fix the syntax errors. Do not modify anything else.

        Input:
        A string containing TypeScript and React code only

        Output (only if there are syntax errors):
        A new extract of the corrected page.tsx file with the relevant changes. Ensure the output contains only the corrected code, delimited by ```, and nothing else. Do not add any explanations or comments."""
        output = self.client.generate({f"""{prompt}\n ```{code_str}```"""})

        print(output)

        if output == "YES":
            return True
