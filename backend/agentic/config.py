import os

class Config:
    BASE_DIR = ""
    MAIN_DIR = ""
    COMPONENTS_DIR = ""

    @classmethod
    def set_paths(cls, base_path: str):
        """Set global paths dynamically."""
        cls.BASE_DIR = base_path
        cls.MAIN_DIR = os.path.join(base_path, "src/app/")
        cls.COMPONENTS_DIR = os.path.join(base_path, "src/components/")

    @classmethod
    def print_paths(cls):
        """Debugging function to verify path updates."""
        print(f"BASE_DIR: {cls.BASE_DIR}")
        print(f"MAIN_DIR: {cls.MAIN_DIR}")
        print(f"COMPONENTS_DIR: {cls.COMPONENTS_DIR}")
