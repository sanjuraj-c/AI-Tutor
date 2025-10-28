import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const queryAPI = async (question) => {
  try {
    const response = await api.post('/query', { question });
    return response.data;
  } catch (error) {
    console.error('Query API error:', error);
    throw error;
  }
};

export const chatAPI = async (message) => {
  try {
    const response = await api.post('/chat', { message });
    return response.data;
  } catch (error) {
    console.error('Chat API error:', error);
    throw error;
  }
};

export const clearChat = async () => {
  try {
    const response = await api.delete('/chat/clear');
    return response.data;
  } catch (error) {
    console.error('Clear chat error:', error);
    throw error;
  }
};

export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('Health check error:', error);
    throw error;
  }
};

export default api;



