from langchain_anthropic import ChatAnthropic
from dotenv import load_dotenv
import os
import re
import subprocess
import tempfile
import utils
import os

class ClaudeClient:
    def __init__(self, model="claude-3-5-haiku-latest"):
        load_dotenv()
        if "ANTHROPIC_API_KEY" not in os.environ:
            print("no API key!")
        self.client = ChatAnthropic(model_name=model)

    def llm_call(self, prompt) -> str:
        """
        Calls the model with the given prompt and returns the response.

        Args:
            prompt (str): The user prompt to send to the model.
            system_prompt (str, optional): The system prompt to send to the model. Defaults to "".

        Returns:
            str: The response from the language model.
        """

        output = self.client.generate(prompt + "Ensure all code is delimited by ```.")
        response = output.generations[0][0].text

        extracted_typescript = self.extract_tsx_code(response)

        return extracted_typescript



    def rewrite_code(
        self, code: str, pathname: str = "backend/virtual-frontend/src/app/page.tsx"
    ):
        with open(pathname, "w") as f:
            f.write(code)

    def extract_tsx_code(self, text: str):
        """
        Extracts TypeScript React (TSX) code from a given text string.

        :param text: String containing text with embedded TSX code.
        :return: Extracted TSX code as a string.
        """
        match = re.search(r"```tsx\n(.*?)\n```", text, re.DOTALL)
        return match.group(1) if match else None
    

class ClaudeClientChecker:
    def __init__(self, model="claude-3-5-haiku-latest"):
        load_dotenv()
        if "ANTHROPIC_API_KEY" not in os.environ:
            print("no API key!")
        self.client = ChatAnthropic(model_name=model)
    
    def code_check(self, code: str) -> str:
        syntax_check = self.__syntax_check_typescript(code)
        response = ""
        if syntax_check[0] == False:
            response += syntax_check[1]
        type_check = self.__type_check_typescript(code)
        if type_check[0] == False:
            response += "\n" + type_check[1]
        # if response == "":
        #     response = "The typescript code has no errors and can be displayed to the user."
        return response

    def __syntax_check_typescript(self, code_str: str) -> (bool, str):
        prompt = """You are an expert in TypeScript and React, specializing in Next.js. Your task is to evaluate the syntax of a given page.tsx file. The code is below, delimited by ```.
        
        Rules:
        If the syntax is valid, respond with the word "YES" only, and nothing else.
        If the syntax is invalid, return a reasoned explanation of where it is invalid and why.

        Input:
        A string containing TypeScript and React code only

        Output (only if there are syntax errors):
        An explanation of possible reasons why the syntax is invalid, as where as the locations of errors."""
        output = self.client.generate({f"""{prompt}\n ```{code_str}```"""})
        output = output.generations[0][0].text

        print("SYNTAX CHECK OUTPUT: ", output)

        if output == "YES":
            return (True, output)
        else:
            return (False, output)

        return output

    def __type_check_typescript(self, ts_code: str) -> (bool, str):
        with tempfile.NamedTemporaryFile(suffix=".ts", delete=False) as temp_file:
            temp_file.write(ts_code.encode("utf-8"))
            temp_file_path = temp_file.name

        try:
            result = subprocess.run(
                ["npm install typescript", "npx", "tsc", "--noEmit", "--strict", temp_file_path],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
            )
            error_output = result.stdout.strip() + "\n" + result.stderr.strip()
            error_output = error_output.strip()

            if result.returncode != 0 or error_output:
                return (False, "There was a type error in the code. Here is more detail:" + error_output)
            else:
                return (True, "")
        finally:
            os.remove(temp_file_path)

        # Examples to test typechecking

        # ex_1_valid = """function multiply(a: number, b: number): number {
        #     return a * b;
        # }

        # const result: number = multiply(5, 10);
        # console.log(result);
        # """

        # ex_1_invalid = """function concatenateStrings(a: string, b: string): string {
        #     return a + b;
        # }

        # const result: number = concatenateStrings("Hello", "World"); // Type mismatch
        # console.log(result);"""

        # ex_2_valid = """interface User {
        #     id: number;
        #     name: string;
        #     isAdmin: boolean;
        # }

        # const user: User = {
        #     id: 1,
        #     name: "Alice",
        #     isAdmin: true
        # };

        # console.log(user);"""

        # ex_2_invalid = """interface Product {
        #     id: number;
        #     name: string;
        #     price: number;
        # }

        # const product: Product = {
        #     id: "A100",  //  Type Error: should be a number
        #     name: "Laptop",
        #     price: "1999"  // Type Error: should be a number
        # };
        # console.log(product);"""
