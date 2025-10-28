# 🤖 Conversational AI Tutor with Animated Mascot

A full-stack conversational AI tutoring system featuring an animated mascot with lip-sync, emotion detection, and real-time voice interaction.

## 🎯 Project Overview

This project demonstrates an **end-to-end AI tutor** with:

- **RAG-powered Backend**: OpenRouter + DeepSeek V3.1
- **Animated Mascot**: 2D character with lip-sync and emotion-based expressions
- **Speech Integration**: Speech-to-Text and Text-to-Speech
- **Live API Integration**: Full REST API for conversational learning

## 🎨 Key Features

### ✅ Animated Mascot
- **Lip-sync animation** - Mouth moves while AI is speaking
- **6 emotion states** with color-coded expressions
- **Blush effects** for happy/excited emotions
- **Eye animations** that react to state
- **Smooth transitions** between emotions

### ✅ Speech Integration
- **Speech-to-Text**: Voice input via Web Speech API
- **Text-to-Speech**: AI speaks responses aloud
- **Real-time sync**: Visual feedback during speech

### ✅ Conversational AI
- **Multi-turn conversations**: Context-aware responses
- **Emotion detection**: AI responses tagged with emotions
- **Knowledge-based**: Built-in knowledge base about AI/ML

## 📁 Project Structure

```
AI Tutor/
├── backend/
│   ├── main_simple.py      # FastAPI server
│   ├── requirements.txt     # Python dependencies
│   ├── data/
│   │   └── ai_knowledge.txt # Knowledge base
│   └── vectorstore/         # (auto-generated)
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Mascot.jsx   # Animated mascot with lip-sync
│   │   │   └── ChatUI.jsx   # Chat interface
│   │   ├── App.jsx          # Main component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── package.json         # Node dependencies
│   └── vite.config.js       # Vite configuration
│
└── README.md                 # This file
```

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- OpenRouter API key (get from https://openrouter.ai)

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
# OR: source venv/bin/activate # Mac/Linux

pip install -r requirements.txt

# Create .env file with your OpenRouter API key:
echo "OPENAI_API_KEY=your_key_here" > .env

python main_simple.py
```

Backend runs on `http://localhost:8000`

**Important**: Configure OpenRouter at https://openrouter.ai/settings/privacy and enable "Allow free models".

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

## 🎭 Emotion States

The mascot displays 6 different emotions:

| Emotion | Color | Animation | Face |
|---------|-------|-----------|------|
| **Happy** 😊 | Yellow/Orange | Bounce | Blush, big eyes |
| **Thinking** 🤔 | Blue/Purple | Pulse | Small eyes |
| **Explaining** 💡 | Green/Blue | Pulse | Normal |
| **Encouraging** 👏 | Pink/Rose | Bounce | Blush |
| **Excited** 🎉 | Orange/Red | Wiggle | Blush, big eyes |
| **Calm** 😌 | Teal/Cyan | Pulse | Small eyes |

## 🎤 How It Works

### User Flow

1. **User clicks "Start Speaking"** → Speech recognition starts
2. **User speaks question** → Transcribed to text
3. **Text sent to backend** → API processes with DeepSeek V3.1
4. **AI generates response** → With emotion detection
5. **Response displayed** → In chat interface
6. **TTS speaks response** → Mascot mouth moves (lip-sync)
7. **Mascot animates** → Based on detected emotion

### Technologies

**Backend:**
- FastAPI - REST API
- OpenRouter API - DeepSeek V3.1 integration
- OpenAI SDK - Compatible client

**Frontend:**
- React 18 - UI framework
- Vite - Build tool
- TailwindCSS - Styling
- Web Speech API - Voice features

## 📊 API Endpoints

### `POST /chat`
Handle multi-turn conversations with emotion detection.

**Request:**
```json
{
  "message": "What is artificial intelligence?"
}
```

**Response:**
```json
{
  "text": "AI is...",
  "emotion": "explaining",
  "sources": 1
}
```

### `GET /health`
Health check endpoint.

### `DELETE /chat/clear`
Clear conversation history.

## 🎨 Mascot Features

### Lip-Sync
- Mouth opens and closes while AI speaks
- Smooth animations at 150ms intervals
- Visual wave effect during speech

### Emotion Expressions
- **Facial features** change per emotion
- **Eye size** varies (happy = big, calm = small)
- **Mouth shape** changes (happy = wide, calm = narrow)
- **Blush effects** for certain emotions
- **Animations** (bounce, pulse, wiggle)

### Visual Feedback
- Voice waves when listening
- Speaking indicators when AI responds
- Smooth color transitions for emotions

## 🔧 Configuration

### Backend `.env`
```env
OPENAI_API_KEY=your_openrouter_api_key
```

### OpenRouter Setup
1. Get API key from https://openrouter.ai
2. Configure privacy: https://openrouter.ai/settings/privacy
3. Enable "Allow free models"

## 🧪 Testing

1. Open http://localhost:3000
2. Click "Start Speaking"
3. Ask: "What is artificial intelligence?"
4. Watch the mascot:
   - Change color based on emotion
   - Move mouth while speaking
   - Show facial expressions
   - Display animations

## 🐛 Troubleshooting

**Mascot not animating?**
- Make sure backend is running on port 8000
- Check browser console for errors

**Speech not working?**
- Use Chrome or Edge
- Allow microphone permissions
- Check browser compatibility

**API errors?**
- Verify OpenRouter settings are configured
- Check API key in backend/.env
- Ensure "Allow free models" is enabled

## 📈 Enhancements Made

✅ **Enhanced Mascot:**
- Added lip-sync with mouth movement
- Emotion-based facial features
- Blush effects for positive emotions
- Dynamic eye sizes
- Visual wave effects during speech

✅ **Cleaned Project:**
- Removed unused files
- Simplified structure
- Updated documentation

✅ **Better Animations:**
- Smooth transitions
- Real-time lip-sync
- Emotion-driven expressions

## 🎓 Learning Outcomes

This project demonstrates:
- Full-stack AI integration
- Real-time voice interaction
- Emotion detection and visualization
- Animated UI with React
- REST API design
- Cross-browser compatibility

## 📄 License

MIT License - Feel free to use and modify!

---

**Built with ❤️ using FastAPI, React, and OpenRouter**
