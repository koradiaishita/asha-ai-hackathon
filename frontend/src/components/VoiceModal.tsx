import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { 
  Mic, 
  Stop, 
  Pause, 
  PlayArrow, 
  Refresh, 
  Send 
} from '@mui/icons-material';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  color: #333;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem;
  border-radius: 50%;
  border: none;
  background: #ff1493;
  color: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const Timer = styled.div`
  font-size: 2rem;
  margin: 1rem 0;
  font-weight: bold;
  color: #ff1493;
`;

const TranscriptText = styled.p`
  margin: 1rem 0;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
  min-height: 60px;
`;

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (text: string) => void;
}

export function VoiceModal({ isOpen, onClose, onSubmit }: VoiceModalProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [timer, setTimer] = useState(0);
  const recognition = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      recognition.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event) => {
        const current = event.resultIndex;
        const transcriptResult = event.results[current][0].transcript;
        setTranscript(transcriptResult);
      };
    }

    return () => {
      if (recognition.current) {
        recognition.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  const startRecording = () => {
    if (recognition.current) {
      recognition.current.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (recognition.current) {
      recognition.current.stop();
      setIsRecording(false);
    }
  };

  const togglePause = () => {
    if (recognition.current) {
      if (isPaused) {
        recognition.current.start();
      } else {
        recognition.current.stop();
      }
      setIsPaused(!isPaused);
    }
  };

  const resetRecording = () => {
    stopRecording();
    setTranscript('');
    setTimer(0);
  };

  const handleSubmit = () => {
    if (transcript) {
      onSubmit(transcript);
      onClose();
      resetRecording();
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>Voice Recording</h2>
        <Timer>
          {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
        </Timer>
        <TranscriptText>
          {transcript || 'Start speaking...'}
        </TranscriptText>
        <ButtonGroup>
          {!isRecording ? (
            <IconButton onClick={startRecording}>
              <Mic />
            </IconButton>
          ) : (
            <>
              <IconButton onClick={stopRecording}>
                <Stop />
              </IconButton>
              <IconButton onClick={togglePause}>
                {isPaused ? <PlayArrow /> : <Pause />}
              </IconButton>
            </>
          )}
          <IconButton onClick={resetRecording}>
            <Refresh />
          </IconButton>
          <IconButton 
            onClick={handleSubmit}
            disabled={!transcript}
          >
            <Send />
          </IconButton>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
}
