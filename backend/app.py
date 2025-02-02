import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from agentic.graph import AgenticApp
from utils.input import Data, input_to_prompt
from agentic.tools import ROOT, MAIN, COMPONENTS

app = FastAPI(debug=True)
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
    global ROOT, MAIN, COMPONENTS

    root = data.root
    print("THE ROOT IS ", root)
    ROOT = root
    MAIN = os.path.join(root, "/src/app")
    COMPONENTS = os.path.join(root, "/src/components")

    # Run the Agentic app
    agent.run(data)
    return {"message": "Success"}

@app.get("/")
def read_root():
    return {"message": "Hello World Viyan"}

