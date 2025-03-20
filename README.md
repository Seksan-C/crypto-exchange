# Crypto Exchange API

ระบบแลกเปลี่ยนสกุลเงินดิจิทัล (Cryptocurrency Exchange) โดยใช้ Node.js และ MySQL พร้อมฟังก์ชันการซื้อ-ขายและกระเป๋าเงินดิจิทัล

## 🔥 Features
- ระบบสมัครสมาชิก
- ระบบกระเป๋าเงินดิจิทัล (Wallet) สำหรับฝาก-ถอนเงิน
- สร้างคำสั่งซื้อขาย (Buy/Sell Order)
- ระบบบันทึกธุรกรรม (Transaction)

---

## 🚀 วิธีติดตั้งและรันโปรเจกต์

### 1️⃣ **ติดตั้ง Dependencies**
git clone https://github.com/Seksan-C/crypto-exchange.git
cd crypto-exchange
npm install

2️⃣ ตั้งค่า Database
ใช้ MySQL และสร้างฐานข้อมูลชื่อ crypto_exchange

ตั้งค่าตัวแปร .env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=crypto_exchange
PORT=3000

3️⃣ Seed ข้อมูล
node seed/seed.js

4️⃣ รันเซิร์ฟเวอร์
npm start

หรือใช้ nodemon (ถ้าติดตั้งแล้ว)
npm run dev

📌 การทดสอบ API
1️⃣ สมัครสมาชิก
Endpoint: POST /users/register
Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "User registered successfully",
  "user": { ... },
  "wallet": { ... }
}

2️⃣ ฝากเงิน
Endpoint: POST /wallet/deposit
Body:
{
  "userId": 1,
  "amount": 500,
  "currency": "USD"
}

Response:
{
  "message": "Deposit successful",
  "balance": 1500
}

3️⃣ สร้างคำสั่งซื้อ (Buy Order)
Endpoint: POST /orders
Body:
{
  "userId": 1,
  "type": "buy",
  "cryptocurrency": "BTC",
  "price": 40000,
  "amount": 0.5
}

4️⃣ บันทึกธุรกรรม  (Transaction)
Endpoint: POST /transactions
Body:
{
  "type": "withdraw",
  "amount": 50.00,
  "status": "completed",
  "userId": 1
}

🛠 Tools & Technologies
- Node.js + Express.js - Backend API
- Sequelize + MySQL - ORM และฐานข้อมูล
- bcrypt.js - Hashing Password
- dotenv - จัดการตัวแปรแวดล้อม
- nodemon - Auto-restart server
