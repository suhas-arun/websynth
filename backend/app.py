from utils.input import Data, input_to_prompt
from fastapi import FastAPI
from agentic.graph import AgenticApp

app = FastAPI()
agent = AgenticApp()

@app.post("/submit/")
async def root(data: Data):
    agent.run(data)
    return {"message": "Success"}

@app.get("/")
def read_root():
    return {"message": "Hello World Viyan"}

