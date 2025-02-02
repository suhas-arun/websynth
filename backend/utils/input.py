from typing import List, Tuple
from pydantic import BaseModel

class Component:
    def __init__(self, x: int, y: int, width: int, height: int, name: str, description: str):
        self.x = x
        self.y = y
        self.width = width
        self.height = height
        self.name = name
        self.description = description

    def __repr__(self):
        return f"Component(x={self.x}, y={self.y}, width={self.width}, height={self.height}, name={self.name}, description={self.description})"

class Data(BaseModel):
    def __init__(self, prompt: str, screenshot: str, components: List[Component]):
        self.prompt = prompt
        self.screenshot = screenshot
        self.components = components
    
    def __repr__(self):
        return f"Data(prompt={self.prompt}, screenshot={self.screenshot}, components={self.components})"