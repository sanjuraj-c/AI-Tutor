import { useEffect, useRef } from 'react';

const ChatUI = ({ messages, onClear }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-full max-h-[600px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Conversation</h2>
        {messages.length > 0 && (
          <button
            onClick={onClear}
            className="text-sm text-red-600 hover:text-red-700 font-semibold px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
          >
            Clear Chat
          </button>
        )}
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="text-lg font-semibold">Start a conversation!</p>
              <p className="text-sm mt-2">Click the mic button and ask me anything</p>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-md ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                    : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800'
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0">
                    {message.role === 'user' ? '👤' : '🤖'}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">
                      {message.text}
                    </p>
                    {message.emotion && message.role === 'assistant' && (
                      <div className="mt-2 text-xs opacity-70">
                        <span className="capitalize">Feeling: {message.emotion}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-xs opacity-70 mt-2">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-4 border-t border-gray-200 text-center text-sm text-gray-600">
        <p>💡 Powered by RAG + LLM</p>
      </div>
    </div>
  );
};

export default ChatUI;



