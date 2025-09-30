const { contextBridge, ipcRenderer } = require('electron');

console.log('🌉 [PRELOAD] ตั้งค่า Real-time APIs...');

// สร้าง audio context สำหรับเสียงแจ้งเตือน
let audioContext = null;
let beepSound = null;

try {
  if (window.AudioContext || window.webkitAudioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // สร้างเสียง beep ง่ายๆ
    function createBeepSound() {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    }
    
    beepSound = createBeepSound;
  }
} catch (error) {
  console.warn('🔊 [PRELOAD] ไม่สามารถสร้าง audio context ได้:', error);
}

contextBridge.exposeInMainWorld('realtimeAPI', {
  // 🕒 Time API
  getWorldTime: () => {
    console.log('🕒 [PRELOAD] ร้องขอเวลา...');
    return ipcRenderer.invoke('get-world-time');
  },
  
  // 🕒 Time API with Retry
  getWorldTimeWithRetry: () => {
    console.log('🕒 [PRELOAD] ร้องขอเวลา (พร้อม retry)...');
    return ipcRenderer.invoke('get-world-time-retry');
  },
  
  // 📊 Mock Agents API
  getMockAgents: () => {
    console.log('📊 [PRELOAD] ร้องขอข้อมูล agents...');
    return ipcRenderer.invoke('get-mock-agents');
  },
  
  // 🌤️ Weather API
  getWeather: () => {
    console.log('🌤️ [PRELOAD] ร้องขอสภาพอากาศ...');
    return ipcRenderer.invoke('get-weather');
  },
  
  // 🎭 Agent Simulator
  startSimulator: () => {
    console.log('🎭 [PRELOAD] เริ่ม simulator...');
    return ipcRenderer.invoke('start-agent-simulator');
  },
  
  stopSimulator: () => {
    console.log('⏹️ [PRELOAD] หยุด simulator...');
    return ipcRenderer.invoke('stop-agent-simulator');
  },
  
  getSimulationStats: () => {
    return ipcRenderer.invoke('get-simulation-stats');
  },
  
  // ⚙️ Settings Management
  getSettings: () => {
    return ipcRenderer.invoke('get-settings');
  },
  
  saveSettings: (newSettings) => {
    return ipcRenderer.invoke('save-settings', newSettings);
  },
  
  showNotification: (notificationData) => {
    return ipcRenderer.invoke('show-notification', notificationData);
  },
  
  // 🔊 Sound Functions
  playBeepSound: () => {
    if (beepSound) {
      try {
        beepSound();
        return true;
      } catch (error) {
        console.warn('🔊 [PRELOAD] เล่นเสียงไม่สำเร็จ:', error);
        return false;
      }
    }
    return false;
  },
  
  // 📡 รับ events จาก main process
  onAgentStatusChanged: (callback) => {
    console.log('📡 [PRELOAD] ลงทะเบียน agent status listener...');
    ipcRenderer.on('agent-status-changed', (event, data) => callback(data));
  },
  
  onSettingsChanged: (callback) => {
    console.log('⚙️ [PRELOAD] ลงทะเบียน settings changed listener...');
    ipcRenderer.on('settings-changed', (event, data) => callback(data));
  },
  
  // 🧹 ล้าง listeners
  removeAllListeners: (channel) => {
    ipcRenderer.removeAllListeners(channel);
  }
});

console.log('✅ [PRELOAD] Real-time APIs พร้อมใช้งาน');