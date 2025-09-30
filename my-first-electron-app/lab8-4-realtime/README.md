# Lab8-4 Features Testing

## 🧪 ทดสอบการทำงาน

### 1. เปิดไฟล์
- กดปุ่ม "เปิดไฟล์"
- เลือกไฟล์ text หรือ JSON
- ดูเนื้อหาที่แสดง

![เปิดไฟล์](https://github.com/user-attachments/assets/d85a2d7e-4465-44fa-92f6-d5f05560f65c)

### 2. Export
- กดปุ่ม "Export Agent Data"
- เลือกตำแหน่งบันทึก
- เปิดไฟล์ CSV ที่สร้าง

![Export](https://github.com/user-attachments/assets/ed727ceb-316a-480b-9dd5-2588dad22003)

### 3. บันทึกข้อความ
- แก้ไขข้อความใน text editor
- กดปุ่ม "บันทึกเนื้อหา"
- เลือกชื่อไฟล์และบันทึก

![บันทึก](https://github.com/user-attachments/assets/5ef00f0b-55a5-4265-8c84-cb51a3b85d76)

✅ ผลลัพธ์ที่ควรได้:
- 📁 File dialogs ของ OS เปิดขึ้นมา
- 📄 เนื้อหาไฟล์แสดงใน app
- 💾 ไฟล์ถูกบันทึกในตำแหน่งที่เลือก
- 🔍 Console logs แสดงข้อมูลครบถ้วน

---

## ทดสอบทุก Features

### 1. File Operations
- เปิดไฟล์และดูเนื้อหา
- Export CSV ของ agent data
- บันทึกข้อความจาก text editor

![File Operations 1](https://github.com/user-attachments/assets/5befb9e5-35b2-465e-b3f7-9ab426ef75b9)
![File Operations 2](https://github.com/user-attachments/assets/b6b856b6-24da-4f5d-9ea5-324cb681b30d)
![File Operations 3](https://github.com/user-attachments/assets/19630607-5dbf-47f7-97ee-a1712d1d731d)

### 2. Desktop Notifications
- ทดสอบ notification พื้นฐาน
- ทดสอบ agent login notification
- ทดสอบ urgent alert

![Notifications 1](https://github.com/user-attachments/assets/e0304df4-914f-4e68-9d9d-60a019d0f074)
![Notifications 2](https://github.com/user-attachments/assets/6bf60542-8028-45e6-a5da-2800c376ba74)
![Notifications 3](https://github.com/user-attachments/assets/91ad6339-3d83-4360-8c1c-ec73644dcb07)
![Notifications 4](https://github.com/user-attachments/assets/0edeaba3-cc98-4b14-9307-4be240aaef3d)

### 3. System Tray
- ดู tray icon ใน taskbar/menubar
- คลิกขวาเพื่อเปิดเมนู
- ทดสอบเปลี่ยนสถานะจาก tray
- ปิด window และเปิดจาก tray

![System Tray 1](https://github.com/user-attachments/assets/3c6f30dc-eba0-491a-8e41-64f945d56a2f)
![System Tray 2](https://github.com/user-attachments/assets/9200ff4d-76e9-4f69-b96a-1c46ba2dad51)
![System Tray 3](https://github.com/user-attachments/assets/f86862fc-c94c-43cf-8904-a17ed393ac82)

---

## สิ่งที่ทำเพิ่ม

### 1. Agent Status Dashboard
- Real-time Monitoring - แสดงสถานะ Agent แบบเรียลไทม์
- Status Management - เปลี่ยนสถานะได้ทันที
- Performance Stats - สถิติการทำงานแบบรวม
- Add/Remove Agents - เพิ่ม-ลบ Agent

![Agent Status Dashboard](https://github.com/user-attachments/assets/39f6a716-dd22-4484-b3f1-4f9cdeff4f86)

### 2. Performance Analytics
- Bar Charts - แสดงจำนวนสายที่รับของแต่ละ Agent
- Real-time Updates - อัพเดทกราฟอัตโนมัติ
- Data Visualization - มองเห็นภาพรวมได้ง่าย

### 3. Smart Notifications
- Agent Login / Logout / Status Change / Call Received / Call Ended / Urgent Alerts

![Smart Notifications](https://github.com/user-attachments/assets/331d0735-a40c-4748-829b-c523c4b867b4)

### 4. Sound Notifications
- Call Sound / Notification Sound / Alert Sound

### 5. Enhanced System Tray
- Real-time Tooltip
- Quick Status Change
- Simulate Calls
- Add Agents
- Quick Settings

![Enhanced System Tray](https://github.com/user-attachments/assets/0e883905-8263-4ca8-9469-cc5c6b74236c)

### 6. Keyboard Shortcuts
- Ctrl+1 → Available
- Ctrl+2 → Busy
- Ctrl+3 → Break
- Ctrl+4 → แสดง/ซ่อน App
- Ctrl+5 → ซ่อนไป Tray
- Ctrl+Q → ออกจากโปรแกรม

### 7. Auto-Refresh System
- Updates ทุก 30 วินาที
- Call Simulation
- Data Refresh

![Auto-Refresh](https://github.com/user-attachments/assets/496873df-e773-4d50-8553-26f0b5c0276e)

### 8. Settings Management
- Sound Enabled
- Auto Refresh
- Call Simulation
- Agent Data

### 9. Enhanced File Operations
- Export Reports
- Backup Settings
- File Dialogs

### 10. Settings Panel
- Sound Notifications
- Auto-Refresh
- Call Simulation
- Save/Load/Reset Settings

### 11. User Experience Improvements
- Modern UI / Responsive / Animations / Visual Feedback
- Pulse Animations / Hover Effects / Status Indicators

### 12. Event-Driven Architecture
- status-changed-from-tray
- open-settings-tab
- simulate-incoming-call
- add-new-agent

### 13. Security & Stability
- Context Isolation / No Node Integration / Preload Script
- Error Handling / Memory Management / Clean Shutdown

### 14. Real-World Use Cases
- Call Center: Real-time Monitoring, Performance Tracking, Quick Status Changes
- Management: Export Reports, Notification System, Background Operation

---

## ภาพรวมหน้าตา

![Overview 1](https://github.com/user-attachments/assets/e50a63e5-3c72-4030-9dde-bbc83cb09167)
![Overview 2](https://github.com/user-attachments/assets/0068df8f-3019-47a4-8370-149e89d7a851)
![Overview 3](https://github.com/user-attachments/assets/a512033b-84d9-4bd2-82e0-e1129a6540ce)
![Overview 4](https://github.com/user-attachments/assets/8c5e366d-d367-4b36-807d-cfb7530f7409)

---

## ทดสอบ Features (API & Real-Time)

### 1. Time API
- อัพเดทจาก WorldTimeAPI
- กดปุ่ม "รีเฟรช"

![Time API](https://github.com/user-attachments/assets/bb15a695-a65a-413f-a78e-08a65a5b9fa9)

### 2. Mock Agents API
- ดูรายชื่อ agents จาก JSONPlaceholder
- Auto Refresh ทุก 30 วินาที

![Mock Agents Before](https://github.com/user-attachments/assets/3defdf25-4d52-41ff-b209-efdef93d129f)
![Mock Agents After](https://github.com/user-attachments/assets/f349e9db-7e1c-4508-907f-511dd33a7b38)

### 3. WebSocket
- เชื่อมต่อ WebSocket
- ส่งข้อความ
- ดู echo message กลับมา

![WebSocket](https://github.com/user-attachments/assets/ee764fb7-c759-432e-9d33-87f6ac9641ab)

### 4. Weather API
- ดู fallback data
- สมัคร API key เพื่อทดสอบจริง

![Weather 1](https://github.com/user-attachments/assets/18accdfe-6a4c-4f87-a5fa-490510fa38cb)
![Weather 2](https://github.com/user-attachments/assets/a508ad9b-b82f-432c-ac95-1d2ece582238)
![Weather Before](https://github.com/user-attachments/assets/e15b05b5-2e5d-41d0-b974-a96f441a2b25)
![Weather After](https://github.com/user-attachments/assets/1d428f2d-8ce1-4bee-b655-4d40bfb26199)
![Weather Chart](https://github.com/user-attachments/assets/e7a7f724-b0ae-42d9-99f2-b928610f9e21)

### 5. WebSocket Before/After
![WebSocket Before](https://github.com/user-attachments/assets/d62c37cf-6dd7-453a-b422-aaf520eaf90f)
![WebSocket After](https://github.com/user-attachments/assets/6c0a51cf-806e-4b52-8bdb-b51f994c3b9e)
![WebSocket Log](https://github.com/user-attachments/assets/d9c1c0d5-3c88-4234-a524-10f8d01ecc36)

### 6. Mock Agents API Before/After
![Mock Agents Before](https://github.com/user-attachments/ass)
