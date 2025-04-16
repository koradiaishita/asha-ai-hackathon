from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class Message(BaseModel):
    text: str
    isUser: bool
    type: str = "text"

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[Message]] = []

class ChatResponse(BaseModel):
    response: str

# Mock database of responses
responses = {
    "hello": "Hi there! How can I help you today?",
    "help": "I can help you with career advice, resume reviews, interview preparation, and finding project ideas.",
    "project": "I can suggest project ideas based on your interests and skill level. What technologies are you interested in?",
    "resume": "I can help review your resume or suggest improvements. Would you like to attach your resume for review?",
    "interview": "I can help you prepare for interviews by providing practice questions and feedback.",
}

# Default response for unknown queries
default_response = "I'm your Asha AI assistant. I don't have an answer for that yet, but I'm here to help with your career and skills development."

@app.get("/")
def read_root():
    return {"message": "Welcome to Asha AI API"}

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    user_message = request.message.lower()
    
    # Simple keyword matching for demo purposes
    for keyword, response in responses.items():
        if keyword in user_message:
            return ChatResponse(response=response)
    
    return ChatResponse(response=default_response)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)