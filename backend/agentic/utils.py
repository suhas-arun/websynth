from langchain_anthropic import ChatAnthropic

from dotenv import load_dotenv

import os

class ClaudeClient:

    def __init__(self):
        load_dotenv()
        if "ANTHROPIC_API_KEY" not in os.environ:
            print("no API key!")
        self.model = ChatAnthropic(model_name="claude-3-5-haiku-latest")


def llm_call(prompt: str, system_prompt: str = "", model="claude-3-5-sonnet-20241022") -> str:
    """
    Calls the model with the given prompt and returns the response.

    Args:
        prompt (str): The user prompt to send to the model.
        system_prompt (str, optional): The system prompt to send to the model. Defaults to "".
        model (str, optional): The model to use for the call. Defaults to "claude-3-5-sonnet-20241022".

    Returns:
        str: The response from the language model.
    """
    client = Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])
    messages = [{"role": "user", "content": prompt}]
    response = client.messages.create(
        model=model,
        max_tokens=4096,
        system=system_prompt,
        messages=messages,
        temperature=0.1,
    )
    return response.content[0].text

def extract_xml(text: str, tag: str) -> str:
    """
    Extracts the content of the specified XML tag from the given text. Used for parsing structured responses 

    Args:
        text (str): The text containing the XML.
        tag (str): The XML tag to extract content from.

    Returns:
        str: The content of the specified XML tag, or an empty string if the tag is not found.
    """
    match = re.search(f'<{tag}>(.*?)</{tag}>', text, re.DOTALL)
    return match.group(1) if match else ""


def extract_tsx_code(text):
    """
    Extracts TypeScript React (TSX) code from a given text string.

    :param text: String containing text with embedded TSX code.
    :return: Extracted TSX code as a string.
    """
    match = re.search(r'```tsx\n(.*?)\n```', text, re.DOTALL)
    return match.group(1) if match else None
