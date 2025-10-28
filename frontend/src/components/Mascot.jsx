import { useState, useEffect } from 'react';

const Mascot = ({ emotion, isListening, onStartListening, onStopListening, isSpeaking = false }) => {
  const [mouthOpen, setMouthOpen] = useState(false);
  const [speakingKey, setSpeakingKey] = useState(0);

  // Lip-sync animation when speaking
  useEffect(() => {
    if (isSpeaking) {
      setSpeakingKey(prev => prev + 1);
      const interval = setInterval(() => {
        setMouthOpen(prev => !prev);
      }, 200); // Mouth movement interval
      return () => clearInterval(interval);
    } else {
      setMouthOpen(false);
    }
  }, [isSpeaking]);

  // Emotion-based visual styles with facial features
  const emotionStyles = {
    happy: { 
      bg: 'from-yellow-400 to-orange-500', 
      emoji: '😊', 
      animation: 'animate-bounce-slow',
      eyeShape: 'w-8 h-8',        // Big eyes
      eyeBlink: 'animate-blink',
      mouthWidth: 'w-20',
      mouthHeight: mouthOpen ? 'h-12' : 'h-8',
      mouthShape: 'rounded-full',
      blush: true,
      eyebrow: 'slanted-up'
    },
    thinking: { 
      bg: 'from-blue-400 to-purple-500', 
      emoji: '🤔', 
      animation: 'animate-pulse-slow',
      eyeShape: 'w-6 h-6',        // Smaller eyes
      eyeBlink: 'animate-blink-slow',
      mouthWidth: 'w-14',
      mouthHeight: mouthOpen ? 'h-10' : 'h-4',
      mouthShape: 'rounded-xl',
      blush: false,
      eyebrow: 'straight'
    },
    explaining: { 
      bg: 'from-green-400 to-blue-500', 
      emoji: '💡', 
      animation: 'animate-pulse',
      eyeShape: 'w-7 h-7',
      eyeBlink: 'animate-blink',
      mouthWidth: 'w-16',
      mouthHeight: mouthOpen ? 'h-10' : 'h-6',
      mouthShape: 'rounded-lg',
      blush: false,
      eyebrow: 'straight'
    },
    encouraging: { 
      bg: 'from-pink-400 to-rose-500', 
      emoji: '👏', 
      animation: 'animate-bounce-slow',
      eyeShape: 'w-8 h-8',
      eyeBlink: 'animate-blink',
      mouthWidth: 'w-18',
      mouthHeight: mouthOpen ? 'h-11' : 'h-8',
      mouthShape: 'rounded-full',
      blush: true,
      eyebrow: 'slanted-up'
    },
    excited: { 
      bg: 'from-orange-400 to-red-500', 
      emoji: '🎉', 
      animation: 'animate-wiggle',
      eyeShape: 'w-9 h-9',        // Very big eyes
      eyeBlink: 'animate-blink-fast',
      mouthWidth: 'w-22',
      mouthHeight: mouthOpen ? 'h-14' : 'h-10',
      mouthShape: 'rounded-full',
      blush: true,
      eyebrow: 'slanted-up'
    },
    calm: { 
      bg: 'from-teal-400 to-cyan-500', 
      emoji: '😌', 
      animation: 'animate-pulse-slow',
      eyeShape: 'w-6 h-6',
      eyeBlink: 'animate-blink-slow',
      mouthWidth: 'w-12',
      mouthHeight: mouthOpen ? 'h-8' : 'h-3',
      mouthShape: 'rounded-xl',
      blush: false,
      eyebrow: 'straight'
    },
    default: { 
      bg: 'from-indigo-400 to-purple-500', 
      emoji: '🤖', 
      animation: 'animate-pulse-slow',
      eyeShape: 'w-7 h-7',
      eyeBlink: '',
      mouthWidth: 'w-14',
      mouthHeight: mouthOpen ? 'h-8' : 'h-4',
      mouthShape: 'rounded-lg',
      blush: false,
      eyebrow: 'straight'
    }
  };

  const currentStyle = emotionStyles[emotion] || emotionStyles.default;

  return (
    <div className="relative w-full max-w-md">
      {/* Mascot Container */}
      <div className={`relative bg-gradient-to-br ${currentStyle.bg} rounded-3xl p-8 shadow-2xl ${currentStyle.animation}`}>
        {/* Mascot Face */}
        <div className="flex flex-col items-center justify-center relative">
          
          {/* Face Background */}
          <div className="relative bg-white/30 rounded-full p-8 backdrop-blur-sm">
            
            {/* Blush circles (for positive emotions) */}
            {currentStyle.blush && (
              <>
                <div className="absolute -left-8 -top-2 w-16 h-20 bg-pink-300 rounded-full blur-2xl opacity-60"></div>
                <div className="absolute -right-8 -top-2 w-16 h-20 bg-pink-300 rounded-full blur-2xl opacity-60"></div>
              </>
            )}

            {/* Eyes - with emotion-based size */}
            <div className="flex gap-6 mb-4">
              <div className={`${currentStyle.eyeShape} bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isListening ? 'animate-pulse' : ''}`}>
                <div className={`bg-black rounded-full transition-all duration-300 ${currentStyle.eyeBlink} ${
                  mouthOpen ? 'w-5 h-5' : currentStyle.eyeShape
                }`}></div>
              </div>
              <div className={`${currentStyle.eyeShape} bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isListening ? 'animate-pulse' : ''}`}>
                <div className={`bg-black rounded-full transition-all duration-300 ${currentStyle.eyeBlink} ${
                  mouthOpen ? 'w-5 h-5' : currentStyle.eyeShape
                }`}></div>
              </div>
            </div>

            {/* Mouth - with lip-sync animation based on speaking state */}
            <div className="flex justify-center">
              <div 
                className={`${currentStyle.mouthWidth} ${currentStyle.mouthHeight} bg-black rounded-full shadow-lg transition-all duration-150 transform ${
                  isSpeaking && mouthOpen ? 'scale-110' : 'scale-100'
                }`}
                style={{
                  animation: isSpeaking && mouthOpen ? 'pulse 0.2s ease-in-out' : 'none'
                }}
              >
                {isSpeaking && (
                  <div className="w-full h-full bg-red-400 rounded-full animate-pulse flex items-center justify-center">
                    <div className="w-2/3 h-2/3 bg-pink-200 rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Speaking Indicator - Visual wave effect */}
          {isSpeaking && (
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2">
              {[...Array(7)].map((_, i) => (
                <div
                  key={`${speakingKey}-${i}`}
                  className="w-2 bg-white rounded-full animate-pulse"
                  style={{
                    height: `${15 + Math.sin(i * 0.5) * 15}px`,
                    animationDelay: `${i * 0.15}s`,
                    animationDuration: '0.8s'
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Voice Waves when listening (only show when listening, not speaking) */}
        {isListening && !isSpeaking && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 bg-white/80 rounded-full animate-pulse"
                  style={{
                    height: `${20 + i * 10}px`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '1s'
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Control Button */}
      <div className="mt-6 flex justify-center">
        {!isListening ? (
          <button
            onClick={onStartListening}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transform transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
            </svg>
            Start Speaking
          </button>
        ) : (
          <button
            onClick={onStopListening}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transform transition-all hover:scale-105 active:scale-95 flex items-center gap-3 animate-pulse"
          >
            <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
            Listening...
          </button>
        )}
      </div>

      {/* Emotion Indicator */}
      <div className="mt-4 text-center">
        <span className="inline-block bg-black/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
          {currentStyle.emoji} <span className="capitalize">{emotion}</span>
        </span>
        {isSpeaking && (
          <span className="ml-3 inline-block bg-green-400/30 text-green-800 px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
            Speaking...
          </span>
        )}
      </div>
    </div>
  );
};

export default Mascot;
