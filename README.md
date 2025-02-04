# websynth.ai

## The Anthropic "Build with Claude" winning project at ICHack
We wanted to bridge the gap between the fleeting, off-the-wall scribbles that often capture the most creative web-design concepts, and functional, easily modifiable code, that is non-trivial to produce.

Our ultimate aim was to remove the limiter on human imagination, supercharging creativity in the realm of web development.

### What it does

WebSynth provides the user with a customisable, interactive interface to create and describe front-end elements, while leveraging Claude via a multi-agent workflow which translates ideas into code, synthesising the user's desired web development changes. The use of an agentic workflow, featuring a 'Project Manager', 'Programmer' and 'Tester', upholds code quality without annoying code slumps. The incorporation of InterSystem's IRIS data system and VectorSearch, also assists in grounded content generation, avoiding LLM hallucination. Further, our unique IDE increases flexibility by enabling dynamic web development through the use of web containers.

### How we built it

One half of our project, our agentic workflow, involved building a pipeline that orchestrated and coordinated tasks carried out by multiple autonomous agents; by evaluating and assessing each-other, our agents were able to produce robust responses, allowing us to maximise our use of the Claude inference endpoint.

Our interactive UI aimed to resemble natural free-flowing design; developed in next.js, users have the ability to click-and-drag any region of the screen. This allows them to produce typescript elements by simply describing their desired functionality in plain English.

Built with scalability in mind, our project also extensively utilised docker and web containers.

### Challenges we ran into

Our project faced several technical hurdles that required careful thought. First, the unpredictability of LLM responses meant smart safeguards were needed to keep outputs consistent. Budget constraints also played a role—every API call had to be optimized to balance accuracy with cost. Ensuring our vector database delivered reliable, high-precision results added another layer of complexity.

On the infrastructure side, websocket stability was a challenge, requiring robust reconnection logic for real-time performance. Filesystem mirroring needed careful synchronization to prevent data inconsistencies. Orchestrating tool-calling in an agentic workflow required fine-tuning execution paths, error handling, and dynamic task coordination to ensure responses were accurate.

### Accomplishments that we're proud of

Technically, we are proud of our seemless interaction between the front end UI and back end agentic workflow, and the integration of vector embedding to aid optional content generation, further enhancing functionality. Philosophically, we are proud of providing users not so well-versed in front end development with the opportunity to create exciting webpages, unbounded by domain experience and creative limitations.

### What's next for WebSynth.ai

-Integration and support for further web development tools.

-Built-in interactive code editor to pair with front end visualisation

## To reproduce
```bash
./run.sh -local
```
Ensure you have required python and next.js dependancies installed


## Bibliography
Timms, A., Langbridge, A. and O’Donncha, F. (2024) Agentic anomaly detection for shipping, NeurIPS. Available at: https://openreview.net/forum?id=mmBrJRoppK&referrer=%5BAuthor+Console%5D%28%2Fgroup%3Fid%3DNeurIPS.cc%2F2024%2FWorkshop%2FOWA%2FAuthors%23your-submissions%29 (Accessed: 01 February 2025). 

Timms A, Langbridge A, Antonopoulos A, Mygiakis A, Donncha F. Agentic AI for Digital Twin. AAAI. 2025 Feb 25 [cited 2025 Feb 2]; Available from: https://research.ibm.com/publications/agentic-ai-for-digital-twin
  

## Contributors 
Alexander Timms, Ben James, Suhas Arun, Viyan Raj, Matthew Gummow, Sidhanth Sureshkumar
