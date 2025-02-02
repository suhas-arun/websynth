from typing import List, Tuple
from pydantic import BaseModel

class Component(BaseModel):
    x: int
    y: int
    width: int
    height: int
    name: str
    description: str

class Data(BaseModel):
    prompt: str
    screenshot: str
    components: List[Component]


def input_to_prompt(data: Data) -> str:
    prompt = ""
    general_prompt = data.prompt
    components = data.components
    prompt = "The user has the general prompt: " + general_prompt + "\n"
    for component in components:
        prompt += f"Create/Edit a Component: {component.name} at position: x: {component.x}, y: {component.y} with the Description: {component.description}\n"
    
    print(prompt)
    return prompt