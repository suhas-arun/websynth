from typing import List, Tuple

class Input:
    def __init__(self, code: str, position: List[Tuple[int, int]], description: str):
        self.code: str = code
        self.position: List[Tuple[int, int]] = position
        self.description: str = description