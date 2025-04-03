import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send as SendIcon, 
  Mic as MicIcon, 
  AttachFile as AttachFileIcon 
} from '@mui/icons-material';

const ChatBubble = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: white;
  padding: 1rem;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  color: #ff1493;
  cursor: pointer;
  z-index: 1000;
`;

const ChatWindow = styled(motion.div)`
  position: fixed;
  bottom: 6rem;
  right: 2rem;
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  z-index: 999;
`;

const ChatHeader = styled.div`
  background: linear-gradient(135deg, #ff69b4, #ff1493);
  color: white;
  padding: 1rem;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  background: #f5f5f5;
`;

const ChatInput = styled.div`
  padding: 1rem;
  border-top: 1px solid #eee;
  display: flex;
  gap: 0.5rem;
  background: white;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
  &:focus {
    border-color: #ff1493;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  font-size: 1.2rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #ff1493;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 20, 147, 0.1);
  }

  svg {
    font-size: 20px;
  }

  &.recording {
    color: red;
    animation: pulse 1.5s infinite;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ text: string; isUser: boolean; type?: 'text' | 'file' | 'audio' }[]>([
    { text: 'Hi! How can I help you today?', isUser: false, type: 'text' }
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = React.createRef<HTMLInputElement>();

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, isUser: true, type: 'text' }]);
      setMessage('');
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMessages([...messages, { 
        text: `Attached file: ${file.name}`, 
        isUser: true, 
        type: 'file' 
      }]);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Start recording logic would go here
      console.log('Started recording');
    } else {
      // Stop recording logic would go here
      console.log('Stopped recording');
    }
  };

  return (
    <>
      <ChatBubble onClick={() => setIsOpen(true)}>
        👋 Chat with Asha AI
      </ChatBubble>

      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <ChatHeader>
              <span>Asha AI Assistant</span>
              <CloseButton onClick={() => setIsOpen(false)}>✕</CloseButton>
            </ChatHeader>

            <ChatMessages>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    textAlign: msg.isUser ? 'right' : 'left',
                    marginBottom: '0.5rem'
                  }}
                >
                  <div
                    style={{
                      display: 'inline-block',
                      background: msg.isUser ? '#ff1493' : '#f0f0f0',
                      color: msg.isUser ? 'white' : 'black',
                      padding: '0.5rem 1rem',
                      borderRadius: '15px',
                      maxWidth: '80%'
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </ChatMessages>

            <ChatInput>
              <Input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <IconsContainer>
                <IconButton
                  className={isRecording ? 'recording' : ''}
                  onClick={toggleRecording}
                  title="Record audio"
                >
                  <MicIcon />
                </IconButton>
                <IconButton
                  onClick={() => fileInputRef.current?.click()}
                  title="Attach file"
                >
                  <AttachFileIcon />
                </IconButton>
                <IconButton onClick={handleSend} title="Send message">
                  <SendIcon />
                </IconButton>
              </IconsContainer>
              <HiddenFileInput
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
              />
            </ChatInput>
          </ChatWindow>
        )}
      </AnimatePresence>
    </>
  );
}