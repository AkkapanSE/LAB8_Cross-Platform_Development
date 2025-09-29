# Lab 8 - Cross Platform Development (Electron)

## ทดสอบการทำงาน (1)

### 1. 📤 ทดสอบการส่งข้อความ
- พิมพ์ข้อความใน input box
- กดปุ่ม "ส่งข้อความ"
- ดูผลลัพธ์ที่ได้รับกลับ

![image](https://github.com/user-attachments/assets/03f94edd-728e-4a2a-afac-ca0c0d8e164a)

---

### 2. 👋 ทดสอบระบบทักทาย
- ใส่ชื่อ Agent
- กดปุ่ม "เข้าสู่ระบบ"
- ดูข้อความต้อนรับ

![image](https://github.com/user-attachments/assets/845f05f3-40c5-43bf-b530-463116cc5f7f)

---

### 3. 🔍 ตรวจสอบ Console
- เปิด DevTools (F12)
- ดู console logs จาก Renderer Process
- ดู terminal logs จาก Main Process

![Renderer Console](https://github.com/user-attachments/assets/5027a13e-a96f-4453-b8e3-65b07d0525af)
![Main Terminal](https://github.com/user-attachments/assets/fbd4f5a3-ad6d-4647-bbf9-e5909b37d4fb)

**สิ่งที่ควรเห็น:**
- ✅🖥️ Main Process logs ใน terminal
- ✅🎨 Renderer Process logs ใน browser console
- ✅📤 ข้อมูลถูกส่งไปกลับระหว่าง processes
- ✅🔄 Response กลับมาเป็น JSON object

---

## ทดสอบ Agent Functions

### 1. 📊 ทดสอบโหลดข้อมูล
- กดปุ่ม "โหลดข้อมูล Agents"
- ดูข้อมูล agents และสถิติที่แสดง
- ตรวจสอบ console logs

![image](https://github.com/user-attachments/assets/1e095641-4111-400f-a4ec-1f0be41c71a2)

---

### 2. 🔄 ทดสอบเปลี่ยนสถานะ
- กดปุ่ม "เปลี่ยนสถานะ"
- เลือก Agent และ Status ใหม่
- กดปุ่ม "เปลี่ยน"
- ดูการอัพเดทข้อมูล

![image](https://github.com/user-attachments/assets/8eca6167-a3cd-4f38-8900-69eeafa171b4)

---

### 3. 🔍 ตรวจสอบไฟล์
- เปิดไฟล์ `agent-data.json`
- ดูว่าข้อมูลเปลี่ยนแล้วหรือไม่

![image](https://github.com/user-attachments/assets/4c67b7ec-0ad5-419a-b5d1-9c3e4db2fef2)

---

## สิ่งที่ทำเพิ่ม

### 1. ระบบ Login (Authentication System)
- ฟอร์ม Login: ช่องกรอก Agent ID และ Password
- IPC Handler: login handler ใน `main.js` สำหรับตรวจสอบ credentials
- Credential Validation: ตรวจสอบกับข้อมูลใน `agent-data.json`

![image](https://github.com/user-attachments/assets/792ccddd-3763-4801-8d36-1e49d6b13a6d)

---

### 2. Dashboard ส่วนตัวหลัง Login
- Personal Info Card: แสดงข้อมูล agent ที่ login
- Status Change: ปุ่มเปลี่ยนสถานะตัวเองได้
- Session Management: ระบบจัดการ session

![image](https://github.com/user-attachments/assets/8f4cb252-34b8-4cdd-aabc-72a930a510da)

---

### 3. Real-time Notification System
- Status Change Alerts: แจ้งเตือนเมื่อ agent เปลี่ยนสถานะ
- IPC Events: ใช้ `ipcRenderer.on` สำหรับ real-time updates
- Visual + Audio Alerts: Popup + เสียงแจ้งเตือน

![image](https://github.com/user-attachments/assets/09371780-3ba0-4f51-a60d-d3db2f1430b5)

---

### 4. Bonus Features
- 🕒 Real-time Clock

![image](https://github.com/user-attachments/assets/6354ed11-8ad4-4808-a3e1-7c18d3600ca5)

- 📈 Statistics Display

![image](https://github.com/user-attachments/assets/8ef09b4a-a7d3-46c3-92a3-2d9b950a44c2)

- 💾 Remember Login

![image](https://github.com/user-attachments/assets/b452e793-da71-48d1-8420-b40db54b7a22)

---

### 5. Security Features
- Context Isolation: ป้องกันการเข้าถึง Node.js APIs โดยตรง
- Preload Script: ตัวกลางที่ปลอดภัยสำหรับ IPC
- No Node Integration: ปิด nodeIntegration เพื่อความปลอดภัย

![image](https://github.com/user-attachments/assets/617faa0b-8c93-47ba-93cd-8053cfdf921a)

---

### 6. Agent Management System
- Agent Wallboard: จัดการ agents ทั้งหมดในระบบ
- Bulk Status Change: เปลี่ยนสถานะ agent ใดก็ได้
- Real-time Updates: อัพเดทข้อมูลแบบ real-time

![image](https://github.com/user-attachments/assets/2f663af1-f6c7-454c-8a9d-c251ad894f2b)

---

### 7. Enhanced UI/UX
- Responsive Design: รองรับทุกขนาดหน้าจอ
- Visual Status Indicators: ใช้สีและ emoji แสดงสถานะ
- Loading States: แสดงสถานะกำลังโหลด
- Error Handling: จัดการ error แบบ user-friendly

![image](https://github.com/user-attachments/assets/6c1392b5-8a00-456d-930f-45935b3cc430)

---

### 8. Data Persistence
- File-based Storage: ใช้ `agent-data.json` เป็น database
- Real-time File Updates: อัพเดทไฟล์เมื่อมีการเปลี่ยนแปลง
- Data Consistency: ข้อมูลคงความสอดคล้อง

![image](https://github.com/user-attachments/assets/c3e328fd-274a-446a-aab9-594b2c521fc2)
![image](https://github.com/user-attachments/assets/1c7fed08-12e1-4a55-9751-1bc58d8efcd1)

