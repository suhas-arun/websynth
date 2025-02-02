import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from agentic.graph import AgenticApp
from utils.input import Data, input_to_prompt
from agentic.config import Config

app = FastAPI(debug=True)
agent = AgenticApp()

message = ""

process_done = False

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (or specify your frontend URL)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.post("/submit/")
async def root(data: Data):
    Config.set_paths(data.root)
    Config.print_paths()
    
    # Run the Agentic app
    agent.run(data)
    process_done = True  # Update status
    return {"message": "Success"}

@app.get("/check-status/")
async def check_status():
    return {"done": process_done}

@app.get("/")
def read_root():
    return {"message": "Hello World Viyan"}
