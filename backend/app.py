from utils.input import Data, input_to_prompt
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from agentic.graph import AgenticApp

app = FastAPI()
agent = AgenticApp()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (or specify your frontend URL)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.post("/submit/")
async def root(data: Data):
    agent.run(data)
    return {"message": "Success"}

@app.get("/")
def read_root():
    return {"message": "Hello World Viyan"}

