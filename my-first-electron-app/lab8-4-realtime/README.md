# 🚀 Lab: Cross-Platform Development – Advanced Features

## 🧪 การทดสอบ Features

### 1. 🕒 Time API
- ดูเวลาที่อัพเดทจาก **WorldTimeAPI**
- กดปุ่ม **"รีเฟรช"** เพื่อดูการเปลี่ยนแปลง  
<img width="940" height="566" src="https://github.com/user-attachments/assets/bb15a695-a65a-413f-a78e-08a65a5b9fa9" />

---

### 2. 📊 Mock Agents API
- ดูรายชื่อ agents จาก **JSONPlaceholder**
- ทดสอบ Auto Refresh ทุก 30 วินาที  

**After Refresh**  
<img width="714" height="981" src="https://github.com/user-attachments/assets/f349e9db-7e1c-4508-907f-511dd33a7b38" />

**Before Refresh**  
<img width="866" height="978" src="https://github.com/user-attachments/assets/3defdf25-4d52-41ff-b209-efdef93d129f" />

---

### 3. ⚡ WebSocket
- กดปุ่ม **"เชื่อมต่อ"** เพื่อเชื่อมต่อ WebSocket  
- กดปุ่ม **"ทดสอบ"** เพื่อส่งข้อความ  
- ดู **echo message** กลับมา  
<img width="940" height="427" src="https://github.com/user-attachments/assets/ee764fb7-c759-432e-9d33-87f6ac9641ab" />

---

### 4. 🌤️ Weather API
- ดู fallback data (ไม่ได้ตั้ง API key)  
- หากต้องการทดสอบจริง ต้องสมัคร API key ฟรีที่ **OpenWeatherMap**  

<img width="375" height="616" src="https://github.com/user-attachments/assets/18accdfe-6a4c-4f87-a5fa-490510fa38cb" />
<img width="373" height="517" src="https://github.com/user-attachments/assets/a508ad9b-b82f-432c-ac95-1d2ece582238" />

---

✅ **ผลลัพธ์ที่ควรได้**  
- ⏰ Live clock ทำงานตลอดเวลา  
- 🌐 API calls ได้ข้อมูลจริงจากเซิร์ฟเวอร์ภายนอก  
- ⚡ WebSocket เชื่อมต่อและรับส่งข้อความได้  
- 🔄 Auto refresh อัพเดทข้อมูลอัตโนมัติ  

---

## 🧪 การทดสอบ Features (2)

### 1. 🌤️ Weather API
**Before Refresh**  
<img width="358" height="520" src="https://github.com/user-attachments/assets/e15b05b5-2e5d-41d0-b974-a96f441a2b25" />

**After Refresh**  
<img width="352" height="511" src="https://github.com/user-attachments/assets/1d428f2d-8ce1-4bee-b655-4d40bfb26199" />  
<img width="527" height="328" src="https://github.com/user-attachments/assets/e7a7f724-b0ae-42d9-99f2-b928610f9e21" />

---

### 2. ⚡ WebSocket
**Before**  
<img width="940" height="458" src="https://github.com/user-attachments/assets/d62c37cf-6dd7-453a-b422-aaf520eaf90f" />

**After**  
<img width="364" height="508" src="https://github.com/user-attachments/assets/6c0a51cf-806e-4b52-8bdb-b51f994c3b9e" />  
<img width="940" height="247" src="https://github.com/user-attachments/assets/d9c1c0d5-3c88-4234-a524-10f8d01ecc36" />

---

### 3. 📊 Mock Agents API
**Before**  
<img width="549" height="528" src="https://github.com/user-attachments/assets/afbb8854-ed3d-4160-b9ce-3b4eb23147d4" />

**After Refresh**  
<img width="548" height="557" src="https://github.com/user-attachments/assets/3d2e0691-21a3-45f5-bfa5-4006300cd858" />  
<img width="451" height="85" src="https://github.com/user-attachments/assets/7d3e8cd9-c686-4c9f-bca1-a33f2f673024" />

**After (Auto Refresh)**  
<img width="940" height="78" src="https://github.com/user-attachments/assets/57331651-156c-4df3-bf03-90ea0b44de70" />  
<img width="717" height="730" src="https://github.com/user-attachments/assets/51f1d294-6a69-4f2d-8a73-981b9bc20fec" />

**After (Stop Auto Refresh)**  
<img width="940" height="199" src="https://github.com/user-attachments/assets/1b112f39-9aae-434d-ae46-997aff4a83f9" />

---

### 4. 📊 Agent Status Simulator
**Before**  
<img width="375" height="1036" src="https://github.com/user-attachments/assets/a112a3b3-0eed-4080-90e4-3ff51da78ea4" />

**After Start**  
<img width="372" height="1109" src="https://github.com/user-attachments/assets/ad62ac54-ffe4-4903-9bbf-4410abadf0fd" />  
<img width="940" height="158" src="https://github.com/user-attachments/assets/ff1f7602-3b2c-47aa-be25-1cb7d695b87b" />

**After test API key**  
<img width="940" height="155" src="https://github.com/user-attachments/assets/6b858002-092d-4802-ab10-9dbc85a9a7cd" />  
<img width="581" height="208" src="https://github.com/user-attachments/assets/dcb9c23a-41a5-4e5d-9f7a-3c8c8a9ede78" />  
<img width="940" height="258" src="https://github.com/user-attachments/assets/7626b1fe-f3cf-41bd-983b-fcfe84214c2c" />

---

### 5. 📊 System Health
ตรวจสอบสถานะของ **Main / Renderer / Simulator / Auto Refresh / WebSocket**

**Case 1**  
<img width="378" height="764" src="https://github.com/user-attachments/assets/84c3d5a3-bbf6-4e94-8f81-36ba0145b16c" />

**Case 2**  
<img width="355" height="755" src="https://github.com/user-attachments/assets/f05d3390-d7d6-4fdd-9550-aaf2966a4650" />

**Case 3**  
<img width="394" height="761" src="https://github.com/user-attachments/assets/f3a8d969-6fe9-49fb-b9cc-4f560b773df1" />

**Case 4**  
<img width="417" height="705" src="https://github.com/user-attachments/assets/1d6482d9-3f0c-491c-9fc4-f5746b46f36b" />

**Case 5** – Click on button **"testing system"**  
<img width="522" height="100" src="https://github.com/user-attachments/assets/f6c0b030-dce8-470e-b90b-a4d3b1302325" />

---

## 📌 สิ่งที่ทำเพิ่ม
1. 🕒 Time API – ✅ ทำงานได้  
2. ⚡ Real-time Features (WebSocket, Auto Refresh, Agent Simulator) – ✅ ทำงานได้  
3. 🎨 Dashboard Enhancement – UI/UX + สถิติ  
4. 📊 System Statistics – ค่าเฉลี่ย, Service Level %  
5. 🔊 Sound System – beep เมื่อ agent เปลี่ยนสถานะ  
6. 🔔 Desktop Notifications  
7. 📈 Real-time Charts  
8. 🌗 Dark/Light Mode Toggle  
9. 💾 Save/Load Settings  
10. 🖱️ System Tray Integration  

---

## 🖼️ ภาพรวมหน้าตา
<img width="940" height="407" src="https://github.com/user-attachments/assets/5d5eae2d-2bc7-4b8b-8335-85093d687d0a" />  
<img width="940" height="522" src="https://github.com/user-attachments/assets/cfeb94d3-afd8-4358-8875-f12a652f5051" />  
<img width="368" height="356" src="https://github.com/user-attachments/assets/7eadb450-57cb-4889-919d-75666c6aaf98" />  
