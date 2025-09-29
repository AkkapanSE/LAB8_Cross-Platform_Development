const { contextBridge, ipcRenderer } = require('electron');

console.log('🌉 [PRELOAD] กำลังตั้งค่า security bridge...');

contextBridge.exposeInMainWorld('electronAPI', {
  // 📤 ส่งข้อความไป Main Process
  sendMessage: (message) => {
    console.log('📤 [PRELOAD] ส่งข้อความ:', message);
    return ipcRenderer.invoke('send-message', message);
  },

  // 👋 Hello function ทดสอบ
  sayHello: (name) => {
    console.log('👋 [PRELOAD] ส่งคำทักทาย:', name);
    return ipcRenderer.invoke('say-hello', name);
  },

  // 📊 โหลดข้อมูล agents
  getAgents: () => {
    console.log('📊 [PRELOAD] ร้องขอข้อมูล agents');
    return ipcRenderer.invoke('get-agents');
  },

  // 🔄 เปลี่ยนสถานะ agent
  changeAgentStatus: (agentId, newStatus) => {
    console.log(`🔄 [PRELOAD] เปลี่ยนสถานะ ${agentId} เป็น ${newStatus}`);
    return ipcRenderer.invoke('change-agent-status', { agentId, newStatus });
  },

  // 🔐 ระบบ login (ใช้ชื่อนี้ตามที่คุณมีใน preload)
  login: (agentId, password) => {
    console.log(`🔐 [PRELOAD] ร้องขอ login: ${agentId}`);
    return ipcRenderer.invoke('login', { agentId, password });
  },

  // 🔔 รับ notification จาก main
  onAgentStatusChanged: (callback) => {
    console.log('🔔 [PRELOAD] ตั้งค่า listener สำหรับการเปลี่ยนสถานะ');
    return ipcRenderer.on('agent-status-changed', (event, data) => callback(data));
  }
});

console.log('✅ [PRELOAD] Security bridge พร้อมแล้ว');