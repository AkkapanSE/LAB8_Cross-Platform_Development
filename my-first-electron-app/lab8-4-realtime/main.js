const { app, BrowserWindow, ipcMain, Notification, Tray, Menu, nativeImage } = require('electron');
const path = require('path');
const https = require('https');
const fs = require('fs').promises;
const config = require('./api-config');

let mainWindow;
let tray = null;
let settings = {};

// โหลด settings
async function loadSettings() {
  try {
    const data = await fs.readFile('settings.json', 'utf8');
    settings = JSON.parse(data);
    console.log('⚙️ [MAIN] โหลด settings สำเร็จ');
  } catch (error) {
    console.log('⚙️ [MAIN] ใช้ default settings');
    settings = {
      theme: 'dark',
      autoRefresh: false,
      notifications: true,
      soundEnabled: false,
      refreshInterval: 30000
    };
  }
}

// บันทึก settings
async function saveSettings() {
  try {
    await fs.writeFile('settings.json', JSON.stringify(settings, null, 2));
    console.log('💾 [MAIN] บันทึก settings สำเร็จ');
  } catch (error) {
    console.error('❌ [MAIN] บันทึก settings ล้มเหลว:', error);
  }
}

function createWindow() {
  console.log('🚀 [MAIN] สร้าง Real-time Wallboard...');
  
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    title: 'Agent Wallboard - Real-time Dashboard',
    icon: path.join(__dirname, 'assets/icon.png')
  });

  mainWindow.loadFile('index.html');
  
  // เปิด DevTools ในโหมด development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
  
  console.log('✅ [MAIN] Wallboard พร้อมแล้ว');
}

// สร้าง System Tray
function createTray() {
  try {
    const iconPath = path.join(__dirname, 'assets/tray-icon.png');
    const trayIcon = nativeImage.createFromPath(iconPath);
    
    tray = new Tray(trayIcon.resize({ width: 16, height: 16 }));
    
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'แสดง Dashboard',
        click: () => {
          if (mainWindow) {
            mainWindow.show();
            mainWindow.focus();
          }
        }
      },
      {
        label: 'ซ่อน',
        click: () => {
          if (mainWindow) {
            mainWindow.hide();
          }
        }
      },
      { type: 'separator' },
      {
        label: 'ออกจากโปรแกรม',
        click: () => {
          app.quit();
        }
      }
    ]);
    
    tray.setToolTip('Agent Wallboard');
    tray.setContextMenu(contextMenu);
    
    tray.on('double-click', () => {
      if (mainWindow) {
        mainWindow.show();
        mainWindow.focus();
      }
    });
    
    console.log('📌 [MAIN] System Tray พร้อมใช้งาน');
  } catch (error) {
    console.warn('⚠️ [MAIN] ไม่สามารถสร้าง System Tray ได้:', error.message);
  }
}

// ===== HTTP API FUNCTIONS =====

function callAPI(url, options = {}) {
  return new Promise((resolve, reject) => {
    console.log('🌐 [MAIN] เรียก API:', url);
    
    const requestOptions = {
      headers: {
        'User-Agent': 'Agent-Wallboard/1.0',
        ...options.headers
      },
      timeout: 10000
    };
    
    https.get(url, requestOptions, (response) => {
      let data = '';
      
      // ตรวจสอบ status code
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
        return;
      }
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          console.log('✅ [MAIN] API สำเร็จ');
          resolve(jsonData);
        } catch (error) {
          console.error('❌ [MAIN] Parse error:', error);
          reject(new Error('Invalid JSON response'));
        }
      });
      
    }).on('error', (error) => {
      console.error('❌ [MAIN] API error:', error);
      reject(error);
    }).on('timeout', () => {
      console.error('❌ [MAIN] API timeout');
      reject(new Error('Request timeout'));
    });
  });
}

// ===== ALTERNATIVE TIME APIS =====

// ใช้ WorldTimeAPI.org (ฟรี, ไม่ต้องใช้ key)
function getWorldTimeAlternative() {
  return new Promise((resolve, reject) => {
    const url = 'https://worldtimeapi.org/api/timezone/Asia/Bangkok';
    console.log('🕒 [MAIN] เรียก WorldTimeAPI...');
    
    https.get(url, (response) => {
      let data = '';
      
      if (response.statusCode !== 200) {
        reject(new Error(`WorldTimeAPI Error: ${response.statusCode}`));
        return;
      }
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        try {
          const timeData = JSON.parse(data);
          console.log('✅ [MAIN] WorldTimeAPI สำเร็จ');
          resolve(timeData);
        } catch (error) {
          console.error('❌ [MAIN] WorldTimeAPI Parse error:', error);
          reject(error);
        }
      });
      
    }).on('error', (error) => {
      console.error('❌ [MAIN] WorldTimeAPI error:', error);
      reject(error);
    });
  });
}

// ใช้ API.time.ly (ฟรี)
function getTimeLyAPI() {
  return new Promise((resolve, reject) => {
    const url = 'https://timeapi.io/api/Time/current/zone?timeZone=Asia/Bangkok';
    console.log('🕒 [MAIN] เรียก TimeLy API...');
    
    https.get(url, (response) => {
      let data = '';
      
      if (response.statusCode !== 200) {
        reject(new Error(`TimeLy API Error: ${response.statusCode}`));
        return;
      }
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        try {
          const timeData = JSON.parse(data);
          console.log('✅ [MAIN] TimeLy API สำเร็จ');
          resolve(timeData);
        } catch (error) {
          console.error('❌ [MAIN] TimeLy API Parse error:', error);
          reject(error);
        }
      });
      
    }).on('error', (error) => {
      console.error('❌ [MAIN] TimeLy API error:', error);
      reject(error);
    });
  });
}

// ===== ADVANCED ERROR HANDLING =====

function callAPIWithRetry(url, maxRetries = 3, delay = 1000) {
  return new Promise(async (resolve, reject) => {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`🔁 [MAIN] พยายามเรียก API (ครั้งที่ ${attempt}/${maxRetries})...`);
        const result = await callAPI(url);
        console.log(`✅ [MAIN] API สำเร็จในครั้งที่ ${attempt}`);
        resolve(result);
        return;
      } catch (error) {
        lastError = error;
        console.warn(`⚠️ [MAIN] API ล้มเหลวครั้งที่ ${attempt}:`, error.message);
        
        if (attempt < maxRetries) {
          console.log(`⏳ [MAIN] รอ ${delay}ms ก่อนลองใหม่...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2;
        }
      }
    }
    
    reject(lastError);
  });
}

// ===== NOTIFICATION SYSTEM =====

function showDesktopNotification(title, body, agentId = null) {
  if (!Notification.isSupported()) {
    console.log('🔔 [MAIN] Desktop notifications ไม่รองรับบน platform นี้');
    return;
  }
  
  if (settings.notifications !== false) {
    const notification = new Notification({
      title: title,
      body: body,
      icon: path.join(__dirname, 'assets/notification-icon.png'),
      silent: settings.soundEnabled === false
    });
    
    notification.show();
    
    notification.on('click', () => {
      if (mainWindow) {
        mainWindow.show();
        mainWindow.focus();
      }
    });
    
    console.log(`🔔 [MAIN] ส่ง notification: ${title}`);
  }
}

// ===== IPC HANDLERS =====

// 🕒 ดึงเวลาจาก World Time API (แก้ไขแล้ว)
ipcMain.handle('get-world-time', async () => {
  try {
    console.log('🕒 [MAIN] พยายามดึงเวลาจาก API ต่างๆ...');
    
    // ลองใช้ WorldTimeAPI.org ก่อน (ฟรี, ไม่ต้องใช้ key)
    try {
      const timeData = await getWorldTimeAlternative();
      const thaiTime = new Date(timeData.datetime).toLocaleString('th-TH', {
        timeZone: 'Asia/Bangkok',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      
      return {
        success: true,
        datetime: timeData.datetime,
        timezone: timeData.timezone,
        formatted: thaiTime,
        source: 'WorldTimeAPI.org'
      };
    } catch (firstError) {
      console.log('⚠️ [MAIN] WorldTimeAPI.org ไม่ทำงาน, ลอง API อื่น...');
      
      // ลองใช้ Time.ly API
      try {
        const timeData = await getTimeLyAPI();
        const date = new Date();
        const datetime = date.toISOString();
        const thaiTime = date.toLocaleString('th-TH', {
          timeZone: 'Asia/Bangkok',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        });
        
        return {
          success: true,
          datetime: datetime,
          timezone: 'Asia/Bangkok',
          formatted: thaiTime,
          source: 'Time.ly API'
        };
      } catch (secondError) {
        console.log('⚠️ [MAIN] Time.ly API ไม่ทำงาน...');
        throw new Error('ทั้งหมด API ไม่ทำงาน: ' + firstError.message + ' | ' + secondError.message);
      }
    }

  } catch (error) {
    console.error('❌ [MAIN] Time API error ทั้งหมด:', error);
    const fallbackTime = new Date().toLocaleString('th-TH', {
      timeZone: 'Asia/Bangkok',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    
    return {
      success: false,
      error: error.message,
      fallback: fallbackTime,
      source: 'Local System'
    };
  }
});

// 🕒 ดึงเวลาจาก World Time API (พร้อม Retry)
ipcMain.handle('get-world-time-retry', async () => {
  try {
    console.log('🕒 [MAIN] ดึงเวลาจาก API (พร้อม retry)...');
    
    // ใช้ WorldTimeAPI.org พร้อม retry
    const timeData = await callAPIWithRetry('https://worldtimeapi.org/api/timezone/Asia/Bangkok', 3, 1000);
    const thaiTime = new Date(timeData.datetime).toLocaleString('th-TH', {
      timeZone: 'Asia/Bangkok',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    return {
      success: true,
      datetime: timeData.datetime,
      timezone: timeData.timezone,
      formatted: thaiTime,
      retryUsed: true,
      source: 'WorldTimeAPI.org (Retry)'
    };

  } catch (error) {
    console.error('❌ [MAIN] Time API error หลังจาก retry:', error);
    const fallbackTime = new Date().toLocaleString('th-TH', {
      timeZone: 'Asia/Bangkok',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    
    return {
      success: false,
      error: error.message,
      fallback: fallbackTime,
      retryFailed: true,
      source: 'Local System'
    };
  }
});

// 📊 ดึงข้อมูล mock users (จำลอง agents)
ipcMain.handle('get-mock-agents', async () => {
  try {
    console.log('📊 [MAIN] ดึงข้อมูล mock agents...');
    const users = await callAPI(config.usersAPI);
    
    // สุ่มสถิติเพิ่มเติม
    const agents = users.slice(0, 8).map((user, index) => {
      const statuses = ['Available', 'Busy', 'Break', 'Offline'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      const callsToday = Math.floor(Math.random() * 20) + 1;
      const avgCallTime = Math.floor(Math.random() * 300) + 60;
      
      return {
        id: `AG${String(index + 1).padStart(3, '0')}`,
        name: user.name,
        email: user.email,
        phone: user.phone,
        status: randomStatus,
        extension: `100${index + 1}`,
        company: user.company.name,
        lastUpdate: new Date().toISOString(),
        stats: {
          callsToday: callsToday,
          avgCallTime: avgCallTime,
          totalTalkTime: callsToday * avgCallTime,
          satisfaction: Math.floor(Math.random() * 20) + 80 // 80-100%
        }
      };
    });
    
    // คำนวณสถิติระบบ
    const systemStats = {
      totalAgents: agents.length,
      availableAgents: agents.filter(a => a.status === 'Available').length,
      busyAgents: agents.filter(a => a.status === 'Busy').length,
      totalCalls: agents.reduce((sum, agent) => sum + agent.stats.callsToday, 0),
      avgWaitTime: Math.floor(Math.random() * 50) + 10,
      serviceLevel: Math.floor(Math.random() * 15) + 85 // 85-100%
    };
    
    return {
      success: true,
      agents: agents,
      systemStats: systemStats,
      count: agents.length,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ [MAIN] Mock agents error:', error);
    
    // Fallback ข้อมูล
    try {
      const mockData = await fs.readFile('mock-data.json', 'utf8');
      const fallbackData = JSON.parse(mockData);
      
      return {
        success: true,
        agents: fallbackData.agents,
        systemStats: fallbackData.systemStats,
        fallback: true,
        error: error.message
      };
    } catch (fallbackError) {
      console.error('❌ [MAIN] Fallback data error:', fallbackError);
      
      // Emergency fallback
      return {
        success: true,
        agents: [
          {
            id: 'AG001',
            name: 'Fallback Agent',
            status: 'Available',
            extension: '1001',
            stats: { callsToday: 0, avgCallTime: 0, totalTalkTime: 0 }
          }
        ],
        systemStats: {
          totalAgents: 1,
          availableAgents: 1,
          busyAgents: 0,
          totalCalls: 0,
          avgWaitTime: 0,
          serviceLevel: 0
        },
        emergencyFallback: true,
        error: error.message
      };
    }
  }
});

// 🌤️ ดึงข้อมูลสภาพอากาศ (แก้ไขแล้ว)
ipcMain.handle('get-weather', async () => {
  try {
    const weatherURL = `${config.weatherAPI}?q=Bangkok,th&appid=${config.weatherKey}&units=metric&lang=th`;
    console.log('🌤️ [MAIN] เรียก Weather API:', weatherURL);
    
    const weatherData = await callAPI(weatherURL);
    
    // แปลงสภาพอากาศเป็นภาษาไทย
    const weatherDescriptions = {
      'clear sky': 'ท้องฟ้าแจ่มใส',
      'few clouds': 'มีเมฆบางส่วน', 
      'scattered clouds': 'เมฆกระจาย',
      'broken clouds': 'มีเมฆมาก',
      'overcast clouds': 'เมฆครึ้ม',
      'light rain': 'ฝนตกเล็กน้อย',
      'moderate rain': 'ฝนตกปานกลาง',
      'heavy intensity rain': 'ฝนตกหนัก',
      'very heavy rain': 'ฝนตกหนักมาก',
      'extreme rain': 'ฝนตกอย่างรุนแรง',
      'thunderstorm': 'พายุฝนฟ้าคะนอง',
      'snow': 'หิมะตก',
      'mist': 'หมอก',
      'fog': 'หมอกหนา',
      'haze': 'หมอกควัน'
    };
    
    const description = weatherData.weather[0].description;
    const thaiDescription = weatherDescriptions[description] || description;
    
    return {
      success: true,
      location: weatherData.name,
      temperature: Math.round(weatherData.main.temp) + '°C',
      description: thaiDescription,
      humidity: weatherData.main.humidity + '%',
      pressure: weatherData.main.pressure + ' hPa',
      windSpeed: (weatherData.wind.speed * 3.6).toFixed(1) + ' km/h', // แปลง m/s เป็น km/h
      icon: weatherData.weather[0].icon,
      feelsLike: Math.round(weatherData.main.feels_like) + '°C'
    };
    
  } catch (error) {
    console.error('❌ [MAIN] Weather API error:', error);
    return {
      success: false,
      error: error.message,
      fallback: {
        location: 'กรุงเทพฯ',
        temperature: '32°C',
        description: 'มีเมฆบางส่วน',
        humidity: '65%',
        pressure: '1013 hPa',
        windSpeed: '5.4 km/h',
        feelsLike: '35°C'
      }
    };
  }
});

// ===== SETTINGS MANAGEMENT =====

ipcMain.handle('get-settings', async () => {
  return settings;
});

ipcMain.handle('save-settings', async (event, newSettings) => {
  settings = { ...settings, ...newSettings };
  await saveSettings();
  
  // ส่ง event ไปยัง renderer ว่า settings เปลี่ยน
  if (mainWindow) {
    mainWindow.webContents.send('settings-changed', settings);
  }
  
  return { success: true };
});

ipcMain.handle('show-notification', async (event, { title, body, agentId }) => {
  showDesktopNotification(title, body, agentId);
  return { success: true };
});

// ===== AGENT STATUS SIMULATOR =====

let agentStatusInterval = null;
let simulationStats = {
  totalChanges: 0,
  lastChange: null,
  agentChanges: {}
};

ipcMain.handle('start-agent-simulator', () => {
  console.log('🎭 [MAIN] เริ่ม Agent Status Simulator...');
  
  if (agentStatusInterval) {
    clearInterval(agentStatusInterval);
  }
  
  const statuses = ['Available', 'Busy', 'Break', 'Offline'];
  const agentIds = ['AG001', 'AG002', 'AG003', 'AG004', 'AG005', 'AG006', 'AG007', 'AG008'];
  
  agentStatusInterval = setInterval(() => {
    const randomAgent = agentIds[Math.floor(Math.random() * agentIds.length)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    // อัพเดทสถิติ
    simulationStats.totalChanges++;
    simulationStats.lastChange = new Date().toISOString();
    simulationStats.agentChanges[randomAgent] = (simulationStats.agentChanges[randomAgent] || 0) + 1;
    
    console.log(`🎭 [SIMULATOR] ${randomAgent} → ${randomStatus} (เปลี่ยนแล้ว ${simulationStats.totalChanges} ครั้ง)`);
    
    // ส่ง notification
    if (settings.notifications !== false) {
      showDesktopNotification(
        `Agent Status Changed`,
        `${randomAgent} is now ${randomStatus}`,
        randomAgent
      );
    }
    
    // ส่งข้อมูลไปยัง renderer
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('agent-status-changed', {
        agentId: randomAgent,
        newStatus: randomStatus,
        timestamp: new Date().toISOString(),
        simulated: true,
        stats: simulationStats
      });
    }
    
  }, 8000); // ทุก 8 วินาที
  
  return { 
    success: true, 
    message: 'Agent Simulator เริ่มทำงานแล้ว',
    interval: 8000
  };
});

ipcMain.handle('stop-agent-simulator', () => {
  console.log('⏹️ [MAIN] หยุด Agent Status Simulator');
  
  if (agentStatusInterval) {
    clearInterval(agentStatusInterval);
    agentStatusInterval = null;
  }
  
  return { 
    success: true, 
    message: 'Agent Simulator หยุดแล้ว',
    finalStats: simulationStats
  };
});

ipcMain.handle('get-simulation-stats', () => {
  return simulationStats;
});

// ===== APP INITIALIZATION =====

app.whenReady().then(async () => {
  await loadSettings();
  createWindow();
  createTray();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('before-quit', async () => {
  await saveSettings();
});