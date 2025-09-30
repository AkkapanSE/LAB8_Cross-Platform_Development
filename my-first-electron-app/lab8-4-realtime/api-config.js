// api-config.js - การตั้งค่า APIs ที่ใช้
require('dotenv').config();

module.exports = {
  // 🕒 World Time API (ฟรี) - ใช้ RapidAPI
  timeAPI: 'https://world-time-api3.p.rapidapi.com/timezone/Asia/Bangkok',
  timeHost: 'world-time-api3.p.rapidapi.com',
  timeKey: process.env.AAA || '0aac1d5cb7msh57a7347e524be78p111257jsn278b3b3d978f',

  // 📊 JSONPlaceholder (ฟรี - สำหรับทดสอบ HTTP requests)
  usersAPI: 'https://jsonplaceholder.typicode.com/users',
  postsAPI: 'https://jsonplaceholder.typicode.com/posts',
  
  // ⚡ WebSocket Echo Test (ฟรี)
  websocketURL: 'wss://echo.websocket.org/',
  
  // 🌤️ OpenWeatherMap (ฟรี)
  weatherAPI: 'https://api.openweathermap.org/data/2.5/weather',
  weatherKey: process.env.YYY || '6b19824f1d43e7d60e8c84f078103345',
  
  // 📱 จำลอง Agent API endpoints
  mockAgentAPI: {
    status: 'http://localhost:3001/api/agents/status',
    update: 'http://localhost:3001/api/agents/update'
  }
};