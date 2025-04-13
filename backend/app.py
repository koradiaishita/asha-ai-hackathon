from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict
import logging
import os
import base64
import google.generativeai as genai
import json
import uuid
from datetime import datetime
import pathlib

# Set up logging
# Create logs directory
LOGS_DIR = pathlib.Path("./logs")
LOGS_DIR.mkdir(exist_ok=True)

# Configure logging to file and console
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(LOGS_DIR / f"asha_ai_{datetime.now().strftime('%Y%m%d')}.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Log start of application
logger.info("=== Starting Asha AI Backend Service ===")

# Initialize Google Generative AI client
try:
    genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))
    logger.info("Gemini API configured successfully")
except Exception as e:
    logger.error(f"Failed to configure Gemini AI: {str(e)}")

class MessageRequest(BaseModel):
    message: str
    session_id: Optional[str] = None

class Message(BaseModel):
    text: str
    isUser: bool
    timestamp: str
    type: str = "text"

class Conversation(BaseModel):
    session_id: str
    messages: List[Message]
    created_at: str
    last_updated: str

# Create a directory to store conversation files
CONVERSATION_DIR = pathlib.Path("./conversations")
CONVERSATION_DIR.mkdir(exist_ok=True)
logger.info(f"Conversation directory created at {CONVERSATION_DIR}")

# In-memory store for active conversations
active_conversations: Dict[str, Conversation] = {}

app = FastAPI()

# Allow CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_or_create_conversation(session_id: Optional[str] = None) -> Conversation:
    """Get an existing conversation or create a new one"""
    # If no session_id provided or not found in active conversations, create a new one
    if not session_id or session_id not in active_conversations:
        new_session_id = session_id or str(uuid.uuid4())
        now = datetime.now().isoformat()
        
        # Check if a saved conversation exists for this session
        conversation_file = CONVERSATION_DIR / f"{new_session_id}.json"
        if conversation_file.exists():
            try:
                with open(conversation_file, "r") as f:
                    conversation_data = json.load(f)
                    conversation = Conversation(**conversation_data)
                    active_conversations[new_session_id] = conversation
                    logger.info(f"Loaded existing conversation with ID {new_session_id}")
                    return conversation
            except Exception as e:
                logger.error(f"Error loading conversation file: {str(e)}")
        
        # Create new conversation
        conversation = Conversation(
            session_id=new_session_id,
            messages=[
                Message(
                    text="Hi! How can I help you today?",
                    isUser=False,
                    timestamp=now,
                    type="text"
                )
            ],
            created_at=now,
            last_updated=now
        )
        active_conversations[new_session_id] = conversation
        save_conversation(conversation)
        logger.info(f"Created new conversation with ID {new_session_id}")
        return conversation
    
    # Return existing conversation
    logger.debug(f"Retrieved active conversation with ID {session_id}")
    return active_conversations[session_id]

def save_conversation(conversation: Conversation):
    """Save conversation to a JSON file"""
    try:
        conversation_file = CONVERSATION_DIR / f"{conversation.session_id}.json"
        with open(conversation_file, "w") as f:
            f.write(conversation.json())
        logger.debug(f"Saved conversation to {conversation_file}")
    except Exception as e:
        logger.error(f"Error saving conversation: {str(e)}")

def add_message_to_conversation(conversation: Conversation, text: str, is_user: bool, msg_type: str = "text") -> Message:
    """Add a message to the conversation and save it"""
    now = datetime.now().isoformat()
    message = Message(
        text=text,
        isUser=is_user,
        timestamp=now,
        type=msg_type
    )
    conversation.messages.append(message)
    conversation.last_updated = now
    save_conversation(conversation)
    return message

@app.post("/echo-message")
async def echo_message(request: Request):
    try:
        # Log the request content type
        logger.info(f"Received message request: Content-Type: {request.headers.get('content-type')}")
        
        # Try to parse JSON from the request body
        body = await request.body()
        logger.debug(f"Raw request body: {body}")
        
        if not body:
            logger.warning("Empty request body received")
            return {"message": "Empty request received", "session_id": None}
        
        try:
            # Try to parse as JSON
            data = await request.json()
            logger.debug(f"Parsed JSON data: {data}")
            message = data.get("message", "")
            session_id = data.get("session_id")
            logger.info(f"Processing message request - Session ID: {session_id}, Message length: {len(message)}")
            
            # Get or create conversation
            conversation = get_or_create_conversation(session_id)
            
            # Add user message to conversation
            if message:
                add_message_to_conversation(conversation, message, True)
                logger.info(f"User message added to conversation {conversation.session_id}")
            
                # Process the message with Gemini AI
                try:
                    logger.info(f"Sending message to Gemini AI")
                    response_text = generate_gemini_response(message, conversation)
                    # Add bot response to conversation
                    add_message_to_conversation(conversation, response_text, False)
                    logger.info(f"Gemini response added to conversation {conversation.session_id}")
                    return {"message": response_text, "session_id": conversation.session_id}
                except Exception as e:
                    logger.error(f"Gemini AI error: {str(e)}")
                    error_msg = "I encountered an issue processing your request. Please try again later."
                    add_message_to_conversation(conversation, error_msg, False)
                    return {"message": error_msg, "session_id": conversation.session_id}
            else:
                logger.warning("Empty message received")
                return {"message": "I didn't receive any message to respond to.", "session_id": conversation.session_id}
                
        except Exception as e:
            logger.error(f"JSON parsing error: {str(e)}")
            # If JSON parsing fails, try to decode as text
            try:
                message = body.decode("utf-8")
                logger.info(f"Decoded as text: {message}")
                
                # Get or create conversation (without session ID since we couldn't parse it)
                conversation = get_or_create_conversation()
                
                # Add user message to conversation
                if message:
                    add_message_to_conversation(conversation, message, True)
                    logger.info(f"User message added to conversation {conversation.session_id}")
                    
                    # Process the message with Gemini AI
                    try:
                        logger.info(f"Sending message to Gemini AI")
                        response_text = generate_gemini_response(message, conversation)
                        # Add bot response to conversation
                        add_message_to_conversation(conversation, response_text, False)
                        logger.info(f"Gemini response added to conversation {conversation.session_id}")
                        return {"message": response_text, "session_id": conversation.session_id}
                    except Exception as e:
                        logger.error(f"Gemini AI error: {str(e)}")
                        error_msg = "I encountered an issue processing your request. Please try again later."
                        add_message_to_conversation(conversation, error_msg, False)
                        return {"message": error_msg, "session_id": conversation.session_id}
                else:
                    logger.warning("Empty message received")
                    return {"message": "I didn't receive any message to respond to.", "session_id": conversation.session_id}
            except:
                # If decoding fails, return a default message
                message = "Received non-text content"
                logger.warning("Unable to decode body as text")
                return {"message": "I'm unable to process the content you sent. Please send a text message.", "session_id": None}
        
    except Exception as e:
        logger.error(f"Unexpected error in echo_message endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")

def generate_gemini_response(input_text: str, conversation: Conversation):
    """Generate a response using Gemini AI with conversation history"""
    try:
        logger.info("Generating Gemini response with conversation history")
        
        # Create a history of the conversation for context
        history = []
        
        # Convert the last few messages (up to 10) into format for Gemini
        recent_messages = conversation.messages[-10:] if len(conversation.messages) > 10 else conversation.messages
        logger.debug(f"Using {len(recent_messages)} recent messages for context")
        
        # Set up the system prompt
        system_prompt = """Asha AI Chatbot System Prompt

You are Asha, an AI assistant developed for the JobsForHer Foundation platform. Your purpose is to enhance user engagement by providing seamless access to publicly available information about women's career development, job opportunities, community events, mentorship programs, and professional growth resources.

## Core Identity and Purpose

- You are a helpful, informative, and encouraging AI assistant named Asha.
- Your primary goal is to empower women in their professional journeys by providing accurate, relevant information about career opportunities and resources.
- You represent the JobsForHer Foundation, focusing on women's professional development and career advancement.

## Knowledge Base and Capabilities

1. **Career Information**: Provide guidance on career paths, skill development, and professional growth strategies for women.

2. **Job Listings**: Access and share current job opportunities from the JobsForHer platform that match users' skills, experience, and preferences.

3. **Community Events**: Share information about upcoming webinars, workshops, networking events, and career fairs.

4. **Mentorship Programs**: Explain available mentorship opportunities, application processes, and benefits.

5. **Learning Resources**: Recommend courses, certifications, and learning materials relevant to users' career goals.

## Interaction Guidelines

### Conversational Style

- Maintain a warm, professional, and encouraging tone.
- Use clear, concise language that is accessible to users with varying levels of technical knowledge.
- Be patient and supportive, especially with users who may be returning to the workforce or transitioning careers.
- Personalize responses based on the conversation context while respecting privacy boundaries."""

        model = genai.GenerativeModel(model_name="gemini-2.0-flash")
        
        # Create conversation history in Gemini format
        chat_history = []
        for msg in recent_messages[:-1]:  # Exclude the latest user message
            role = "user" if msg.isUser else "model"
            chat_history.append({"role": role, "parts": [msg.text]})
        
        # Create a chat session with the system prompt and history
        chat = model.start_chat(history=[
            {
                "role": "user", 
                "parts": [system_prompt]
            },
            {
                "role": "model",
                "parts": ["I understand my role as Asha, the AI assistant for JobsForHer Foundation. I'm ready to help with career development, job opportunities, events, mentorship programs, and professional resources for women."]
            },
            *chat_history
        ])
        
        # Send the user's message and get a response
        response = chat.send_message(input_text)
        logger.info("Received response from Gemini AI")
        
        return response.text
    except Exception as e:
        logger.error(f"Error generating Gemini response: {str(e)}")
        return "I'm sorry, I encountered an issue while processing your request. Please try again later."

@app.get("/conversations/{session_id}")
async def get_conversation(session_id: str):
    """Retrieve a conversation by session ID"""
    logger.info(f"Retrieving conversation for session ID: {session_id}")
    # Check in-memory storage first
    if session_id in active_conversations:
        return active_conversations[session_id]
    
    # If not in memory, try to load from file
    conversation_file = CONVERSATION_DIR / f"{session_id}.json"
    if conversation_file.exists():
        try:
            with open(conversation_file, "r") as f:
                conversation_data = json.load(f)
                conversation = Conversation(**conversation_data)
                # Add to active conversations
                active_conversations[session_id] = conversation
                return conversation
        except Exception as e:
            logger.error(f"Error loading conversation file: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Error retrieving conversation: {str(e)}")
    
    # If not found
    raise HTTPException(status_code=404, detail="Conversation not found")

@app.get("/logs")
async def get_logs(lines: int = 100):
    """Retrieve the most recent log entries"""
    try:
        logger.info(f"Request to retrieve {lines} log lines")
        log_files = sorted(list(LOGS_DIR.glob("*.log")), reverse=True)
        
        if not log_files:
            return {"logs": "No log files found"}
        
        latest_log = log_files[0]
        with open(latest_log, "r") as f:
            log_content = f.readlines()
        
        # Get the last N lines
        recent_logs = log_content[-lines:] if len(log_content) > lines else log_content
        return {"logs": "".join(recent_logs)}
    except Exception as e:
        logger.error(f"Error retrieving logs: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error retrieving logs: {str(e)}")

@app.get("/")
async def root():
    logger.info("Root endpoint accessed")
    return {"message": "API is running! Try POST /echo-message"}