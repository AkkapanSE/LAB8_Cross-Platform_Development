const { app, BrowserWindow, ipcMain, dialog, Notification, Menu, Tray, nativeImage, globalShortcut } = require('electron');
const path = require('path');
const fs = require('fs').promises;

let mainWindow;
let tray = null;
let appIsQuitting = false;

// ===== WINDOW MANAGEMENT =====
function createWindow() {
  console.log('🚀 [MAIN] สร้าง window...');
  
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1000,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'assets', 'icon.png'),
    title: 'Agent Wallboard - Lab 8.3'
  });

  mainWindow.loadFile('index.html');
  
  // เปิด DevTools ในโหมด development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
  
  console.log('✅ [MAIN] Window พร้อมแล้ว');
  
  // ✅ เรียก createTray หลังจาก window พร้อมแล้ว
  createTray();
  
  // ✅ ลงทะเบียน keyboard shortcuts
  registerGlobalShortcuts();
  
  // ซ่อน window แทนการปิดเมื่อกด X
  mainWindow.on('close', (event) => {
    if (!appIsQuitting) {
      event.preventDefault();
      mainWindow.hide();
      
      // แสดง notification แจ้งว่า app ยังทำงานอยู่
      new Notification({
        title: 'Agent Wallboard',
        body: 'แอปยังทำงานอยู่ใน system tray\nคลิกขวาที่ icon เพื่อเปิดเมนู'
      }).show();
    }
  });

  // เมื่อ window ได้รับ focus
  mainWindow.on('focus', () => {
    updateTrayContextMenu();
  });
}

// ===== SYSTEM TRAY =====
function createTray() {
  console.log('🖱️ [MAIN] สร้าง system tray...');
  
  try {
    let trayIcon;
    
    // พยายามโหลด icon จากไฟล์
    try {
      const iconPath = path.join(__dirname, 'assets', 'icon.png');
      console.log('🔍 [MAIN] พยายามโหลด icon จาก:', iconPath);
      
      if (require('fs').existsSync(iconPath)) {
        trayIcon = nativeImage.createFromPath(iconPath);
        console.log('✅ [MAIN] โหลด tray icon สำเร็จ');
        console.log('📏 ขนาด icon เดิม:', trayIcon.getSize());
      } else {
        throw new Error('Icon file not found');
      }
    } catch (error) {
      console.error('❌ [MAIN] Error โหลด icon:', error.message);
      // สร้าง icon ชั่วคราว
      trayIcon = nativeImage.createFromDataURL('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAdgAAAHYBTnsmCAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFYSURBVFiFtZc9SwNBEIafgAQLK1sLG1sLG1sLG1sLG1sLG1sLG1sLG1sLG1sLG1sLG1sLG1sLG1sLG1sLG1sLG1sLG1sLG1sLG1sLG1sLG1sLG1sLG1sLG1v5NxYSjBcQyMKys7PvzO7M7CilFEEiBDIAbQAVwA3wCjwAe8A8kA8iQBUwC1wCb8A7cA/sAktAHZAIJEAU0AkcA2/AB3ALbAADQDYQA0QAEUAE0A5sA6/AB3ADrAHdQCaQAEQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAARQAQQAUQAEUAEEAFEABFABBABRAAR4C/wCQ2ZG4QZoS1zAAAAAElFTkSuQmCC');
    }

    // สำหรับ macOS
    if (process.platform === 'darwin') {
      trayIcon = trayIcon.resize({ width: 16, height: 16 });
      trayIcon.setTemplateImage(true);
    }
    
    // สำหรับ Windows/Linux - resize ให้เหมาะสม
    if (process.platform !== 'darwin' && !trayIcon.isEmpty()) {
      const size = trayIcon.getSize();
      if (size.width > 32 || size.height > 32) {
        trayIcon = trayIcon.resize({ width: 32, height: 32 });
        console.log('📏 ขนาด icon หลัง resize:', trayIcon.getSize());
      }
    }
    
    tray = new Tray(trayIcon);
    
    // อัพเดท context menu เริ่มต้น
    updateTrayContextMenu();
    
    // ตั้งค่า tooltip เริ่มต้น
    tray.setToolTip('Agent Wallboard - Desktop App');
    
    // เมื่อคลิก tray icon
    tray.on('click', () => {
      console.log('🖱️ [TRAY] คลิก tray icon');
      if (mainWindow && mainWindow.isVisible()) {
        mainWindow.hide();
      } else if (mainWindow) {
        mainWindow.show();
        mainWindow.focus();
      }
    });

    // เมื่อคลิกขวาที่ tray icon
    tray.on('right-click', () => {
      console.log('🖱️ [TRAY] คลิกขวาที่ tray icon');
      updateTrayContextMenu();
    });
    
    console.log('✅ [MAIN] System tray พร้อมแล้ว');
    
  } catch (error) {
    console.error('❌ [MAIN] Error สร้าง tray:', error);
  }
}

function updateTrayContextMenu() {
  if (!tray || tray.isDestroyed()) return;

  const availableCount = 0; // จะถูกอัพเดทจาก renderer
  const contextMenu = Menu.buildFromTemplate([
    {
      label: `📊 แสดง Wallboard (Available: ${availableCount})`,
      accelerator: 'Ctrl+4',
      click: () => {
        console.log('📊 [TRAY] แสดง wallboard');
        if (mainWindow) {
          mainWindow.show();
          mainWindow.focus();
        }
      }
    },
    { type: 'separator' },
    {
      label: '🔄 เปลี่ยนสถานะด่วน',
      submenu: [
        {
          label: '🟢 Available',
          accelerator: 'Ctrl+1',
          click: () => changeAgentStatusFromTray('available')
        },
        {
          label: '🔴 Busy',
          accelerator: 'Ctrl+2', 
          click: () => changeAgentStatusFromTray('busy')
        },
        {
          label: '🟡 Break',
          accelerator: 'Ctrl+3',
          click: () => changeAgentStatusFromTray('break')
        }
      ]
    },
    { type: 'separator' },
    {
      label: '📞 สุ่มสายเข้า',
      click: () => simulateIncomingCall()
    },
    {
      label: '👥 เพิ่ม Agent ใหม่',
      click: () => {
        if (mainWindow) {
          mainWindow.show();
          mainWindow.focus();
          mainWindow.webContents.send('add-new-agent');
        }
      }
    },
    { type: 'separator' },
    {
      label: '⚙️ ตั้งค่า',
      click: () => {
        console.log('⚙️ [TRAY] เปิดตั้งค่า');
        if (mainWindow) {
          mainWindow.show();
          mainWindow.focus();
          mainWindow.webContents.send('open-settings-tab');
        }
      }
    },
    { type: 'separator' },
    {
      label: '❌ ออกจากโปรแกรม',
      accelerator: 'Ctrl+Q',
      click: () => {
        console.log('❌ [TRAY] ออกจากโปรแกรม');
        appIsQuitting = true;
        app.quit();
      }
    }
  ]);
  
  tray.setContextMenu(contextMenu);
}

function changeAgentStatusFromTray(status) {
  console.log('🔄 [TRAY] เปลี่ยนสถานะเป็น:', status);
  
  // ส่งข้อความไปยัง renderer
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('status-changed-from-tray', {
      newStatus: status,
      timestamp: new Date().toISOString()
    });
  }
  
  // แสดง notification
  let notificationIcon = null;
  try {
    const notiIconPath = path.join(__dirname, 'assets', 'notification.png');
    if (require('fs').existsSync(notiIconPath)) {
      notificationIcon = notiIconPath;
    }
  } catch (error) {
    console.warn('⚠️ [MAIN] ไม่สามารถโหลด notification icon');
  }
  
  new Notification({
    title: 'สถานะเปลี่ยนแล้ว',
    body: `เปลี่ยนสถานะเป็น ${status} แล้ว`,
    icon: notificationIcon
  }).show();
}

function simulateIncomingCall() {
  console.log('📞 [TRAY] จำลองสายเข้า');
  
  // ส่ง event ไปยัง renderer เพื่อจำลองสายเข้า
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('simulate-incoming-call');
  }
}

// ===== KEYBOARD SHORTCUTS =====
function registerGlobalShortcuts() {
  // ลบ shortcut เดิมทั้งหมด
  globalShortcut.unregisterAll();
  
  // ลงทะเบียน shortcut ใหม่
  const shortcuts = [
    { 
      accelerator: 'CommandOrControl+1', 
      action: () => {
        console.log('⌨️ [MAIN] Shortcut: Ctrl+1 - Available');
        changeAgentStatusFromTray('available');
      }
    },
    { 
      accelerator: 'CommandOrControl+2', 
      action: () => {
        console.log('⌨️ [MAIN] Shortcut: Ctrl+2 - Busy');
        changeAgentStatusFromTray('busy');
      }
    },
    { 
      accelerator: 'CommandOrControl+3', 
      action: () => {
        console.log('⌨️ [MAIN] Shortcut: Ctrl+3 - Break');
        changeAgentStatusFromTray('break');
      }
    },
    { 
      accelerator: 'CommandOrControl+4', 
      action: () => {
        console.log('⌨️ [MAIN] Shortcut: Ctrl+4 - Show App');
        if (mainWindow) {
          mainWindow.show();
          mainWindow.focus();
        }
      }
    },
    { 
      accelerator: 'CommandOrControl+5', 
      action: () => {
        console.log('⌨️ [MAIN] Shortcut: Ctrl+5 - Hide to Tray');
        if (mainWindow) {
          mainWindow.hide();
        }
      }
    },
    { 
      accelerator: 'CommandOrControl+Q', 
      action: () => {
        console.log('⌨️ [MAIN] Shortcut: Ctrl+Q - Quit');
        appIsQuitting = true;
        app.quit();
      }
    }
  ];
  
  shortcuts.forEach(({ accelerator, action }) => {
    const ret = globalShortcut.register(accelerator, action);
    if (ret) {
      console.log(`✅ [MAIN] ลงทะเบียน shortcut: ${accelerator}`);
    } else {
      console.error(`❌ [MAIN] ไม่สามารถลงทะเบียน shortcut: ${accelerator}`);
    }
  });
}

// ===== FILE SYSTEM APIS =====
ipcMain.handle('open-file', async () => {
  console.log('📂 [MAIN] เปิด file dialog...');
  
  try {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openFile'],
      filters: [
        { name: 'Text Files', extensions: ['txt', 'json', 'csv'] },
        { name: 'JSON Files', extensions: ['json'] },
        { name: 'CSV Files', extensions: ['csv'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    });

    if (!result.canceled && result.filePaths[0]) {
      const filePath = result.filePaths[0];
      const content = await fs.readFile(filePath, 'utf8');
      
      console.log('✅ [MAIN] อ่านไฟล์สำเร็จ:', path.basename(filePath));
      
      return {
        success: true,
        fileName: path.basename(filePath),
        filePath: filePath,
        content: content,
        size: content.length
      };
    }
    
    return { success: false, cancelled: true };
    
  } catch (error) {
    console.error('❌ [MAIN] Error:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('save-file', async (event, { content, fileName = 'export.txt' }) => {
  console.log('💾 [MAIN] บันทึกไฟล์...');
  
  try {
    const result = await dialog.showSaveDialog(mainWindow, {
      defaultPath: fileName,
      filters: [
        { name: 'Text Files', extensions: ['txt'] },
        { name: 'CSV Files', extensions: ['csv'] },
        { name: 'JSON Files', extensions: ['json'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    });

    if (!result.canceled && result.filePath) {
      await fs.writeFile(result.filePath, content, 'utf8');
      
      console.log('✅ [MAIN] บันทึกสำเร็จ:', path.basename(result.filePath));
      
      return {
        success: true,
        fileName: path.basename(result.filePath),
        filePath: result.filePath
      };
    }
    
    return { success: false, cancelled: true };
    
  } catch (error) {
    console.error('❌ [MAIN] Error:', error);
    return { success: false, error: error.message };
  }
});

// ===== NOTIFICATION APIS =====
ipcMain.handle('show-notification', async (event, { title, body, urgent = false }) => {
  console.log('🔔 [MAIN] แสดง notification:', title);

  try {
    // ตรวจสอบ notification icon
    let notificationIcon = null;
    const notiIconPath = path.join(__dirname, 'assets', 'notification.png');
    
    if (require('fs').existsSync(notiIconPath)) {
      notificationIcon = notiIconPath;
      console.log('✅ [MAIN] พบ notification icon');
    } else {
      console.warn('⚠️ [MAIN] ไม่พบ notification.png, ใช้ default icon');
    }

    const notification = new Notification({
      title: title,
      body: body,
      icon: notificationIcon,
      urgency: urgent ? 'critical' : 'normal',
      timeoutType: urgent ? 'never' : 'default'
    });
    
    notification.show();
    
    // เมื่อคลิก notification
    notification.on('click', () => {
      console.log('🔔 [MAIN] คลิก notification');
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.show();
        mainWindow.focus();
      }
    });
    
    console.log('✅ [MAIN] แสดง notification สำเร็จ');
    return { success: true };
    
  } catch (error) {
    console.error('❌ [MAIN] Error notification:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('notify-agent-event', async (event, { agentName, eventType, details = {} }) => {
  console.log('📢 [MAIN] Agent event notification:', agentName, eventType);
  
  const eventMessages = {
    'login': `🟢 ${agentName} เข้าสู่ระบบแล้ว`,
    'logout': `🔴 ${agentName} ออกจากระบบแล้ว`,
    'status_change': `🔄 ${agentName} เปลี่ยนสถานะเป็น ${details.newStatus || 'Unknown'}`,
    'call_received': `📞 ${agentName} รับสายใหม่จาก ${details.callerNumber || 'Unknown'}`,
    'call_ended': `📞 ${agentName} จบการโทร (${details.duration || '0'} วินาที)`
  };
  
  try {
    let notificationIcon = null;
    const notiIconPath = path.join(__dirname, 'assets', 'notification.png');
    
    if (require('fs').existsSync(notiIconPath)) {
      notificationIcon = notiIconPath;
    }

    const notification = new Notification({
      title: 'Agent Wallboard Update',
      body: eventMessages[eventType] || `📊 ${agentName}: ${eventType}`,
      icon: notificationIcon
    });
    
    notification.show();
    
    notification.on('click', () => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.show();
        mainWindow.focus();
      }
    });
    
    return { success: true };
    
  } catch (error) {
    console.error('❌ [MAIN] Error agent notification:', error);
    return { success: false, error: error.message };
  }
});

// ===== SOUND APIS =====
ipcMain.handle('play-sound', async (event, { type }) => {
  console.log('🔊 [MAIN] เล่นเสียง:', type);
  
  try {
    // สำหรับ Windows - ใช้ PowerShell เล่นเสียงระบบ
    if (process.platform === 'win32') {
      const { exec } = require('child_process');
      
      let soundCommand;
      switch(type) {
        case 'call':
          soundCommand = `powershell -c (New-Object Media.SoundPlayer "SystemExclamation").PlaySync()`;
          break;
        case 'login':
          soundCommand = `powershell -c (New-Object Media.SoundPlayer "SystemAsterisk").PlaySync()`;
          break;
        case 'status_change':
          soundCommand = `powershell -c (New-Object Media.SoundPlayer "SystemHand").PlaySync()`;
          break;
        default:
          soundCommand = `powershell -c (New-Object Media.SoundPlayer "SystemNotification").PlaySync()`;
      }
      
      exec(soundCommand, (error, stdout, stderr) => {
        if (error) {
          console.warn('⚠️ ไม่สามารถเล่นเสียงได้:', error.message);
        }
      });
      
      return { success: true };
    }
    // สำหรับ macOS - ใช้ osascript
    else if (process.platform === 'darwin') {
      const { exec } = require('child_process');
      exec('osascript -e "beep"');
      return { success: true };
    }
    // สำหรับ Linux - ใช้ beep command
    else {
      const { exec } = require('child_process');
      exec('beep', (error) => {
        if (error) {
          console.warn('⚠️ ไม่สามารถเล่นเสียงได้ (ติดตั้ง beep ก่อน):', error.message);
        }
      });
      return { success: true };
    }
    
  } catch (error) {
    console.warn('⚠️ ไม่สามารถเล่นเสียงได้:', error.message);
    return { success: false, error: error.message };
  }
});

// ===== SETTINGS MANAGEMENT =====
const settingsFile = path.join(__dirname, 'settings.json');

ipcMain.handle('save-settings', async (event, settings) => {
  try {
    await fs.writeFile(settingsFile, JSON.stringify(settings, null, 2));
    console.log('✅ [MAIN] บันทึก settings สำเร็จ');
    return { success: true };
  } catch (error) {
    console.error('❌ [MAIN] Error บันทึก settings:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('load-settings', async () => {
  try {
    if (require('fs').existsSync(settingsFile)) {
      const data = await fs.readFile(settingsFile, 'utf8');
      console.log('✅ [MAIN] โหลด settings สำเร็จ');
      return { success: true, settings: JSON.parse(data) };
    }
    return { success: true, settings: {} };
  } catch (error) {
    console.error('❌ [MAIN] Error โหลด settings:', error);
    return { success: false, error: error.message };
  }
});

// ===== IPC EVENTS =====
ipcMain.on('hide-to-tray', () => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.hide();
    console.log('👁️ [MAIN] ซ่อนแอปไป tray');
  }
});

ipcMain.on('show-app', () => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.show();
    mainWindow.focus();
    console.log('👁️ [MAIN] แสดงแอปจาก tray');
  }
});

ipcMain.on('quit-app', () => {
  console.log('❌ [MAIN] ออกจากแอป');
  appIsQuitting = true;
  app.quit();
});

ipcMain.on('update-tray-tooltip', (event, tooltip) => {
  if (tray && !tray.isDestroyed()) {
    tray.setToolTip(`Agent Wallboard - ${tooltip}`);
    console.log('🔄 [MAIN] อัพเดท tray tooltip:', tooltip);
  }
});

// ===== APP EVENT HANDLERS =====
app.whenReady().then(() => {
  createWindow();

  // macOS: สร้าง window ใหม่เมื่อกด Dock icon ถ้าไม่มี window
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    } else if (mainWindow) {
      mainWindow.show();
    }
  });
});

// ป้องกันการปิด app เมื่อปิด window สุดท้าย
app.on('window-all-closed', () => {
  // ไม่ quit เพื่อให้ app ทำงานใน tray ต่อไป
  console.log('🪟 [MAIN] ปิดหน้าต่างทั้งหมด แต่แอปยังทำงานใน tray');
});

// เมื่อจะปิด app จริงๆ
app.on('before-quit', () => {
  appIsQuitting = true;
  console.log('❌ [MAIN] กำลังปิดแอป...');
});

// ลบ shortcuts เมื่อปิดแอป
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
  console.log('⌨️ [MAIN] ลบ keyboard shortcuts ทั้งหมด');
});

// Handle app startup
app.on('ready', () => {
  console.log('🎯 [MAIN] Agent Wallboard เริ่มทำงานแล้ว!');
});

// Handle app shutdown
app.on('before-quit', (event) => {
  if (!appIsQuitting) {
    event.preventDefault();
  }
});