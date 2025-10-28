import { useState, useEffect, useRef } from 'react';
import Mascot from './components/Mascot';
import ChatUI from './components/ChatUI';
import { healthCheck } from './services/api';

function App() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('checking');
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  useEffect(() => {
    // Check backend health on mount
    healthCheck()
      .then(() => setConnectionStatus('connected'))
      .catch(() => setConnectionStatus('disconnected'));
  }, []);

  useEffect(() => {
    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleUserMessage(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    } else {
      alert('Speech recognition not supported in this browser');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleUserMessage = async (userText) => {
    // Add user message to chat
    const userMessage = {
      role: 'user',
      text: userText,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // Call the chat API
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });

      const data = await response.json();

      // Add AI response to chat
      const aiMessage = {
        role: 'assistant',
        text: data.text,
        emotion: data.emotion,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);

      // Speak the response
      speakText(data.text);

      return data;
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        role: 'assistant',
        text: 'I encountered an error. Please try again!',
        emotion: 'calm',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      speakText('I encountered an error. Please try again.');
    }
  };

  const speakText = (text) => {
    if (synthRef.current) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
      };
      
      synthRef.current.speak(utterance);
    }
  };

  const clearChat = async () => {
    try {
      await fetch('http://localhost:8000/chat/clear', {
        method: 'DELETE',
      });
      setMessages([]);
    } catch (error) {
      console.error('Error clearing chat:', error);
    }
  };

  const currentEmotion = messages.length > 0 
    ? messages[messages.length - 1]?.emotion || 'default'
    : 'default';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">
            🤖 AI Tutor
          </h1>
          <p className="text-white/90 text-lg">
            Your Conversational Learning Assistant
          </p>
          {connectionStatus !== 'connected' && (
            <div className="mt-4 inline-block bg-yellow-500/20 border border-yellow-500 rounded-lg px-4 py-2">
              <p className="text-yellow-100">
                Backend {connectionStatus === 'checking' ? 'connecting...' : 'not connected'}
              </p>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mascot Section */}
            <div className="flex flex-col items-center justify-center">
              <Mascot 
                emotion={currentEmotion}
                isListening={isListening}
                isSpeaking={isSpeaking}
                onStartListening={startListening}
                onStopListening={stopListening}
              />
            </div>

            {/* Chat Section */}
            <div className="flex flex-col">
              <ChatUI 
                messages={messages}
                onClear={clearChat}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;



