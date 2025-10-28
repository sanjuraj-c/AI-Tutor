from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import os
from dotenv import load_dotenv
import traceback

load_dotenv()

app = FastAPI(title="AI Tutor API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get API key
api_key = os.getenv("OPENAI_API_KEY") or "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"

# Initialize OpenAI client (OpenRouter compatible)
client = openai.OpenAI(
    api_key=api_key,
    base_url="https://openrouter.ai/api/v1"  # OpenRouter API endpoint
)

# Request/Response Models
class QueryRequest(BaseModel):
    question: str

class ChatRequest(BaseModel):
    message: str

class QueryResponse(BaseModel):
    text: str
    emotion: str
    sources: int = 0

# Knowledge base
knowledge_base = """Artificial Intelligence (AI) is a branch of computer science that aims to create systems capable of performing tasks that typically require human intelligence. These tasks include learning, reasoning, problem-solving, perception, and language understanding.

Machine Learning is a subset of AI that enables computers to learn and improve from experience without being explicitly programmed. It uses algorithms to analyze data, identify patterns, and make predictions or decisions.

Deep Learning uses neural networks with multiple layers to model and understand complex patterns. It's particularly effective for image recognition, natural language processing, and speech recognition.

Natural Language Processing (NLP) enables computers to understand, interpret, and generate human language. Applications include chatbots, translation services, and sentiment analysis.

Retrieval-Augmented Generation (RAG) combines retrieval-based systems and generative models. It first retrieves relevant information from a knowledge base, then generates responses based on that information, ensuring more accurate answers.
"""

def detect_emotion(text):
    """Detect emotion from text"""
    text_lower = text.lower()
    
    if any(word in text_lower for word in ["great", "excellent", "wonderful", "amazing", "perfect"]):
        return "happy"
    elif any(word in text_lower for word in ["think", "consider", "interesting", "let me", "hmm"]):
        return "thinking"
    elif any(word in text_lower for word in ["explain", "understand", "means", "therefore", "because", "so that"]):
        return "explaining"
    elif any(word in text_lower for word in ["try", "practice", "keep going", "you can", "attempt"]):
        return "encouraging"
    elif any(word in text_lower for word in ["wow", "awesome", "fantastic", "brilliant", "incredible"]):
        return "excited"
    else:
        return "calm"

@app.get("/")
def root():
    return {"message": "AI Tutor API is running!", "endpoints": ["/query", "/chat", "/health"]}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.post("/query", response_model=QueryResponse)
async def single_query(request: QueryRequest):
    """Handle single-turn question-answering"""
    try:
        prompt = f"""You are a helpful AI tutor. Answer questions based on this knowledge base:

{knowledge_base}

Question: {request.question}

Provide a clear, educational answer:"""
        
        # Try the free model first
        try:
            response = client.chat.completions.create(
                model="deepseek/deepseek-chat-v3.1:free",
                messages=[
                    {"role": "system", "content": "You are a helpful AI tutor."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=500,
                temperature=0.7,
                extra_headers={
                    "HTTP-Referer": "http://localhost:3000",
                    "X-Title": "AI Tutor"
                }
            )
        except Exception as free_error:
            print(f"DEBUG: Free model failed, trying without free suffix")
            # If free model fails, try without the :free suffix
            response = client.chat.completions.create(
                model="deepseek/deepseek-chat",
                messages=[
                    {"role": "system", "content": "You are a helpful AI tutor."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=500,
                temperature=0.7,
                extra_headers={
                    "HTTP-Referer": "http://localhost:3000",
                    "X-Title": "AI Tutor"
                }
            )
        
        answer = response.choices[0].message.content
        emotion = detect_emotion(answer)
        
        return QueryResponse(text=answer, emotion=emotion, sources=1)
        
    except Exception as e:
        print(f"ERROR in /query: {str(e)}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat", response_model=QueryResponse)
async def chat(request: ChatRequest):
    """Handle multi-turn conversations"""
    try:
        print(f"DEBUG: Received chat request: {request.message}")
        
        prompt = f"""You are a helpful AI tutor. Answer questions based on this knowledge base:

{knowledge_base}

Question: {request.message}

Provide a clear, educational answer:"""
        
        print(f"DEBUG: Sending request to DeepSeek API")
        
        # Try the free model first
        try:
            response = client.chat.completions.create(
                model="deepseek/deepseek-chat-v3.1:free",
                messages=[
                    {"role": "system", "content": "You are a helpful AI tutor."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=500,
                temperature=0.7,
                extra_headers={
                    "HTTP-Referer": "http://localhost:3000",
                    "X-Title": "AI Tutor"
                }
            )
        except Exception as free_error:
            print(f"DEBUG: Free model failed, trying without free suffix")
            # If free model fails, try without the :free suffix
            response = client.chat.completions.create(
                model="deepseek/deepseek-chat",
                messages=[
                    {"role": "system", "content": "You are a helpful AI tutor."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=500,
                temperature=0.7,
                extra_headers={
                    "HTTP-Referer": "http://localhost:3000",
                    "X-Title": "AI Tutor"
                }
            )
        
        print(f"DEBUG: Got response from API")
        answer = response.choices[0].message.content
        print(f"DEBUG: Answer length: {len(answer)}")
        print(f"DEBUG: Answer preview: {answer[:100]}...")
        
        emotion = detect_emotion(answer)
        print(f"DEBUG: Detected emotion: {emotion}")
        
        return QueryResponse(text=answer, emotion=emotion, sources=1)
        
    except Exception as e:
        print(f"ERROR in /chat: {str(e)}")
        traceback.print_exc()
        
        # Check if it's a privacy policy error
        if "privacy" in str(e).lower() or "data policy" in str(e).lower():
            error_message = """I need you to configure your OpenRouter settings first.

Please visit: https://openrouter.ai/settings/privacy
And enable the "Allow free models" option.

Or you can add a data policy by going to:
https://openrouter.ai/keys
And clicking "Add Data Policy"

After that, try asking your question again!"""
        else:
            error_message = f"I encountered an error: {str(e)}. Please try again!"
        
        return QueryResponse(
            text=error_message,
            emotion="calm",
            sources=0
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
