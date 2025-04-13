import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send as SendIcon, 
  Mic as MicIcon, 
  AttachFile as AttachFileIcon,
  Close as CloseIcon,
  Chat as ChatIcon
} from '@mui/icons-material';
import { VoiceModal } from './VoiceModal';

// Define the API URL as a constant for consistency
// Use the URL that works in GitHub Codespaces
const API_URL = 'https://expert-couscous-5gr56j9rv59jc455x-8000.app.github.dev';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ text: string; isUser: boolean; type?: 'text' | 'file' | 'audio' }[]>([
    { text: 'Hi! How can I help you today?', isUser: false, type: 'text' }
  ]);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Load session ID from localStorage on component mount
  useEffect(() => {
    const savedSessionId = localStorage.getItem('chatSessionId');
    if (savedSessionId) {
      setSessionId(savedSessionId);
      // Optionally load previous messages for this session
      fetchConversationHistory(savedSessionId);
    }
  }, []);

  // Handle clicks outside the chat window to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isOpen && 
          chatWindowRef.current && 
          !chatWindowRef.current.contains(event.target as Node) &&
          !(event.target as Element).closest('.chat-bubble')) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch conversation history for an existing session
  const fetchConversationHistory = async (sid: string) => {
    try {
      const response = await fetch(`${API_URL}/conversations/${sid}`);
      if (response.ok) {
        const data = await response.json();
        if (data.messages && data.messages.length > 0) {
          setMessages(data.messages);
        }
      } else {
        console.error('Failed to fetch conversation history');
      }
    } catch (error) {
      console.error('Error fetching conversation history:', error);
    }
  };

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  const handleSend = async () => {
    if (message.trim()) {
      // Add user message to chat
      setMessages(prev => [...prev, { text: message, isUser: true, type: 'text' }]);
      
      try {
        // Send message to backend API with session ID if available
        const response = await fetch(`${API_URL}/echo-message`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            message: message,
            session_id: sessionId 
          }),
        });
        
        const data = await response.json();
        
        // Store the session ID if it's returned
        if (data.session_id && (!sessionId || sessionId !== data.session_id)) {
          setSessionId(data.session_id);
          localStorage.setItem('chatSessionId', data.session_id);
        }
        
        // Add response from backend to chat
        setMessages(prev => [...prev, { 
          text: data.message, 
          isUser: false, 
          type: 'text' 
        }]);
      } catch (error) {
        console.error('Error sending message to backend:', error);
        // Show error message in chat
        setMessages(prev => [...prev, { 
          text: "Sorry, there was an error communicating with the server.", 
          isUser: false, 
          type: 'text' 
        }]);
      }
      
      setMessage('');
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMessages([...messages, { 
        text: `Attached file: ${file.name}`, 
        isUser: true, 
        type: 'file' 
      }]);
      
      // Clear the input for future uploads
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleVoiceInput = async (text: string) => {
    setMessages(prev => [...prev, { 
      text: text, 
      isUser: true, 
      type: 'audio' 
    }]);
    
    try {
      // Send voice transcription to backend API with session ID
      const response = await fetch(`${API_URL}/echo-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          session_id: sessionId
        }),
      });
      
      const data = await response.json();
      
      // Store the session ID if it's returned
      if (data.session_id && (!sessionId || sessionId !== data.session_id)) {
        setSessionId(data.session_id);
        localStorage.setItem('chatSessionId', data.session_id);
      }
      
      // Add response from backend to chat
      setMessages(prev => [...prev, { 
        text: data.message, 
        isUser: false, 
        type: 'text' 
      }]);
    } catch (error) {
      console.error('Error sending voice message to backend:', error);
      // Show error message in chat
      setMessages(prev => [...prev, { 
        text: "Sorry, there was an error communicating with the server.", 
        isUser: false, 
        type: 'text' 
      }]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Function to start a new conversation
  const startNewConversation = () => {
    setSessionId(null);
    localStorage.removeItem('chatSessionId');
    setMessages([{ text: 'Hi! How can I help you today?', isUser: false, type: 'text' }]);
  };

  return (
    <div className="chat-widget">
      <div className="chat-bubble" onClick={toggleChat}>
        <ChatIcon style={{ fontSize: '28px' }} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="chat-window"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            ref={chatWindowRef}
            style={{ maxHeight: 'calc(100vh - 120px)' }}
          >
            <div className="chat-header">
              <div className="chat-header-title">
                <div className="bot-avatar"></div>
                <span>Asha AI Assistant</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  className="chat-icon-button" 
                  onClick={startNewConversation}
                  title="Start a new conversation"
                  style={{ 
                    background: 'transparent', 
                    width: '30px', 
                    height: '30px',
                    color: 'white'
                  }}
                >
                  <span style={{ fontSize: '16px' }}>+</span>
                </button>
                <button 
                  className="chat-icon-button" 
                  onClick={() => setIsOpen(false)}
                  style={{ 
                    background: 'transparent', 
                    width: '30px', 
                    height: '30px',
                    color: 'white'
                  }}
                >
                  <CloseIcon />
                </button>
              </div>
            </div>

            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message-container ${msg.isUser ? 'user' : ''}`}
                >
                  <div className={`message-avatar ${msg.isUser ? 'user-avatar' : 'bot-message-avatar'}`}>
                  </div>
                  <div className={`message ${msg.isUser ? 'user' : 'bot'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <div className="chat-icons">
                <button
                  className="chat-icon-button"
                  onClick={() => setIsVoiceModalOpen(true)}
                  title="Record audio"
                >
                  <MicIcon />
                </button>
                <button
                  className="chat-icon-button"
                  onClick={() => fileInputRef.current?.click()}
                  title="Attach file"
                >
                  <AttachFileIcon />
                </button>
                <button 
                  className="chat-icon-button send-button" 
                  onClick={handleSend} 
                  title="Send message"
                >
                  <SendIcon />
                </button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <VoiceModal 
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onSubmit={handleVoiceInput}
      />
    </div>
  );
}