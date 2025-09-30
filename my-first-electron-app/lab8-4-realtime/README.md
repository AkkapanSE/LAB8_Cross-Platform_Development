# Lab8-4 Features Testing

## 🧪 ทดสอบ Features

### 1. 🕒 Time API
- ดูเวลาที่อัพเดทจาก WorldTimeAPI
- กดปุ่ม "รีเฟรช" เพื่อดูการเปลี่ยนแปลง
![Time API](https://github.com/user-attachments/assets/bb15a695-a65a-413f-a78e-08a65a5b9fa9)

### 2. 📊 Mock Agents API
- ดูรายชื่อ agents จาก JSONPlaceholder
- ทดสอบ Auto Refresh ทุก 30 วินาที
**Before Refresh:**  
![Mock Agents Before](https://github.com/user-attachments/assets/3defdf25-4d52-41ff-b209-efdef93d129f)  
**After Refresh:**  
![Mock Agents After](https://github.com/user-attachments/assets/f349e9db-7e1c-4508-907f-511dd33a7b38)

### 3. ⚡ WebSocket
- กดปุ่ม "เชื่อมต่อ" เพื่อเชื่อมต่อ WebSocket
- กดปุ่ม "ทดสอบ" เพื่อส่งข้อความ
- ดู echo message กลับมา
![WebSocket](https://github.com/user-attachments/assets/ee764fb7-c759-432e-9d33-87f6ac9641ab)

### 4. 🌤️ Weather API
- ดู fallback data (เพราะไม่ได้ตั้ง API key)
- สมัคร API key ฟรีที่ OpenWeatherMap เพื่อทดสอบจริง
![Weather 1](https://github.com/user-attachments/assets/18accdfe-6a4c-4f87-a5fa-490510fa38cb)  
![Weather 2](https://github.com/user-attachments/assets/a508ad9b-b82f-432c-ac95-1d2ece582238)

---

## ✅ ผลลัพธ์ที่ควรได้
- ⏰ Live clock ทำงานตลอดเวลา  
- 🌐 API calls ได้ข้อมูลจริงจากเซิร์ฟเวอร์ภายนอก  
- ⚡ WebSocket เชื่อมต่อและรับส่งข้อความได้  
- 🔄 Auto refresh อัพเดทข้อมูลอัตโนมัติ  

---

## ทดสอบ Features (2)

### 1. 🌤️ Weather API
**Before Refresh:**  
![Weather Before](https://github.com/user-attachments/assets/e15b05b5-2e5d-41d0-b974-a96f441a2b25)  
**After Refresh:**  
![Weather After](https://github.com/user-attachments/assets/1d428f2d-8ce1-4bee-b655-4d40bfb26199)  
![Weather Chart](https://github.com/user-attachments/assets/e7a7f724-b0ae-42d9-99f2-b928610f9e21)

### 2. ⚡ WebSocket
**Before:**  
![WebSocket Before](https://github.com/user-attachments/assets/d62c37cf-6dd7-453a-b422-aaf520eaf90f)  
**After:**  
![WebSocket After](https://github.com/user-attachments/assets/6c0a51cf-806e-4b52-8bdb-b51f994c3b9e)  
![WebSocket Log](https://github.com/user-attachments/assets/d9c1c0d5-3c88-4234-a524-10f8d01ecc36)

### 3. 📊 Mock Agents API
**Before:**  
![Mock Agents Before 2](https://github.com/user-attachments/assets/afbb8854-ed3d-4160-b9ce-3b4eb23147d4)  
**After Refresh:**  
![Mock Agents After Refresh](https://github.com/user-attachments/assets/3d2e0691-21a3-45f5-bfa5-4006300cd858)  
![Auto Refresh Status](https://github.com/user-attachments/assets/7d3e8cd9-c686-4c9f-bca1-a33f2f673024)  
**After Auto Re-:**  
![Auto Refresh On](https://github.com/user-attachments/assets/57331651-156c-4df3-bf03-90ea0b44de70)  
![Auto Refresh Chart](https://github.com/user-attachments/assets/51f1d294-6a69-4f2d-8a73-981b9bc20fec)  
**After Stop Auto Re-:**  
![Stop Auto Refresh](https://github.com/user-attachments/assets/1b112f39-9aae-434d-ae46-997aff4a83f9)

### 4. 📊 Agent Status Simulator
**Before:**  
![Simulator Before](https://github.com/user-attachments/assets/a112a3b3-0eed-4080-90e4-3ff51da78ea4)  
**After Start:**  
![Simulator After Start](https://github.com/user-attachments/assets/ad62ac54-ffe4-4903-9bbf-4410abadf0fd)  
![Simulator Status](https://github.com/user-attachments/assets/ff1f7602-3b2c-47aa-be25-1cb7d695b87b)  
**After Test API Key:**  
![API Key Test 1](https://github.com/user-attachments/assets/6b858002-092d-4802-ab10-9dbc85a9a7cd)  
![API Key Test 2](https://github.com/user-attachments/assets/dcb9c23a-41a5-4e5d-9f7a-3c8c8a9ede78)  
![API Key Test 3](https://github.com/user-attachments/assets/7626b1fe-f3cf-41bd-983b-fcfe84214c2c)

### 5. 📊 System Health
![System Health 1](https://github.com/user-attachments/assets/84c3d5a3-bbf6-4e94-8f81-36ba0145b16c)  
![System Health 2](https://github.com/user-attachments/assets/f05d3390-d7d6-4fdd-9550-aaf2966a4650)  
![System Health 3](https://github.com/user-attachments/assets/f3a8d969-6fe9-49fb-b9cc-4f560b773df1)  
![System Health 4](https://github.com/user-attachments/assets/1d6482d9-3f0c-491c-9fc4-f5746b46f36b)  
![Testing System](https://github.com/user-attachments/assets/f6c0b030-dce8-470e-b90b-a4d3b1302325)

---

## สิ่งที่ต้องทำเพิ่ม
1. 🕒 **Time API** – WorldTimeAPI → Fallback: Time.ly → Local system time ✅  
2. ⚡ **Real-time Features** – WebSocket, Auto Refresh, Agent Simulator ✅  
3. 🎨 **Dashboard Enhancement** – UI/UX, Metrics, System Stats  
4. 🔊 **Sound System** – Beep sound, On/Off ✅  
![Sound System](https://github.com/user-attachments/assets/f0bd4321-bcca-4199-8beb-710f17b94e07)  
5. **Desktop Notifications**  
![Desktop Notifications](https://github.com/user-attachments/assets/2e86a15a-4a81-4a3e-b633-c5dc46286ae2)  
6. **Real-time Charts**  
![Charts](https://github.com/user-attachments/assets/a378f2ff-434c-4639-9808-e78fbc39a98)  
7. **Dark/Light Mode Toggle**  
![Dark/Light Mode](https://github.com/user-attachments/assets/baedfeee-ebe6-4195-bb9e-36bc2d9dc8a2)  
8. **Save/Load Settings**  
![Save/Load Settings 1](https://github.com/user-attachments/assets/fa2d5d44-d69d-40a4-aa47-f5e536383ca6)  
![Save/Load Settings 2](https://github.com/user-attachments/assets/79a48f46-be4b-4ea6-b683-6f94916720eb)  
9. **System Tray Integration**  
![System Tray](https://github.com/user-attachments/assets/a1f9e522-7901-4008-b701-0ab09793f56d)

---

## ภาพรวมหน้าตา
![Overview 1](https://github.com/user-attachments/assets/5d5eae2d-2bc7-4b8b-8335-85093d687d0a)  
![Overview 2](https://github.com/user-attachments/assets/cfeb94d3-afd8-4358-8875-f12a652f5051)  
![Overview 3](https://github.com/user-attachments/assets/7eadb450-57cb-4889-919d-75666c6aaf98)
