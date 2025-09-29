const { contextBridge, ipcRenderer } = require('electron');

console.log('🌉 [PRELOAD] ตั้งค่า Native APIs...');

// เปิดเผย Native APIs ให้ Renderer ใช้
contextBridge.exposeInMainWorld('nativeAPI', {
  // 📁 File Operations
  openFile: () => {
    console.log('📁 [PRELOAD] เปิดไฟล์...');
    return ipcRenderer.invoke('open-file');
  },
  
  saveFile: (content, fileName) => {
    console.log('💾 [PRELOAD] บันทึกไฟล์...');
    return ipcRenderer.invoke('save-file', { content, fileName });
  },
  
  // 🔔 Notifications
  showNotification: (title, body, urgent = false) => {
    console.log('🔔 [PRELOAD] แสดง notification:', title);
    return ipcRenderer.invoke('show-notification', { title, body, urgent });
  },
  
  notifyAgentEvent: (agentName, eventType, details = {}) => {
    console.log('📢 [PRELOAD] Agent event:', agentName, eventType);
    return ipcRenderer.invoke('notify-agent-event', { agentName, eventType, details });
  },
  
  // 🔊 Sound notifications
  playNotificationSound: (type = 'default') => {
    console.log('🔊 [PRELOAD] เล่นเสียง:', type);
    return ipcRenderer.invoke('play-sound', { type });
  },
  
  // 🖱️ System Tray Events
  onStatusChangedFromTray: (callback) => {
    console.log('🖱️ [PRELOAD] ลงทะเบียน tray status listener');
    ipcRenderer.on('status-changed-from-tray', (event, data) => callback(data));
  },

  onOpenSettingsTab: (callback) => {
    console.log('⚙️ [PRELOAD] ลงทะเบียน open settings listener');
    ipcRenderer.on('open-settings-tab', () => callback());
  },
  
  hideToTray: () => {
    console.log('👁️ [PRELOAD] ซ่อนไป tray');
    ipcRenderer.send('hide-to-tray');
  },
  
  showApp: () => {
    console.log('👁️ [PRELOAD] แสดง app');
    ipcRenderer.send('show-app');
  },

  quitApp: () => {
    console.log('❌ [PRELOAD] ออกจาก app');
    ipcRenderer.send('quit-app');
  },
  
  // 🔄 Update tray
  updateTrayTooltip: (tooltip) => {
    console.log('🔄 [PRELOAD] อัพเดท tray tooltip:', tooltip);
    ipcRenderer.send('update-tray-tooltip', tooltip);
  },
  
  // 💾 Settings
  saveSettings: (settings) => {
    console.log('💾 [PRELOAD] บันทึก settings');
    return ipcRenderer.invoke('save-settings', settings);
  },
  
  loadSettings: () => {
    console.log('💾 [PRELOAD] โหลด settings');
    return ipcRenderer.invoke('load-settings');
  }
});

console.log('✅ [PRELOAD] Native APIs พร้อมใช้งาน');