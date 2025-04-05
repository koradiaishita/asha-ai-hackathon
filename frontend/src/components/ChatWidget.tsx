import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send as SendIcon, 
  Mic as MicIcon, 
  AttachFile as AttachFileIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { VoiceModal } from './VoiceModal';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ text: string; isUser: boolean; type?: 'text' | 'file' | 'audio' }[]>([
    { text: 'Hi! How can I help you today?', isUser: false, type: 'text' }
  ]);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

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

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, isUser: true, type: 'text' }]);
      
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: "I'm your Asha AI assistant. How can I help you?", 
          isUser: false, 
          type: 'text' 
        }]);
      }, 1000);
      
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

  const handleVoiceInput = (text: string) => {
    setMessages([...messages, { 
      text: text, 
      isUser: true, 
      type: 'audio' 
    }]);
    
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "I received your voice message. How else can I assist you?", 
        isUser: false, 
        type: 'text' 
      }]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-widget">
      <div className="chat-bubble" onClick={toggleChat}>
        🤖
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