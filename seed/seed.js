const db = require("../models");
const bcrypt = require("bcrypt"); // ใช้ bcrypt สำหรับ hash รหัสผ่าน

const seedData = async () => {
  try {
    // ลบและสร้างตารางใหม่
    await db.sequelize.sync({ force: true });

    // กำหนดค่า saltRounds
    const saltRounds = 10;

    // Hash รหัสผ่านก่อนบันทึกลงฐานข้อมูล
    const hashedPasswords = await Promise.all([
      bcrypt.hash("securepass", saltRounds),
      bcrypt.hash("securepass", saltRounds),
    ]);

    // ✅ เพิ่ม Users 2 คนโดยใช้ bulkCreate
    const users = await db.User.bulkCreate(
      [
        { name: "Seksan Chaorainak", email: "seksan.chaorainak@gmail.com", password: hashedPasswords[0] },
        { name: "Tester2", email: "Tester2@gmail.com", password: hashedPasswords[1] },
      ],
      { returning: true } // ✅ ต้องใช้ `{ returning: true }` เพื่อให้ได้ userId
    );

    // ✅ ตรวจสอบว่า users ถูกสร้างหรือไม่
    console.log("✅ Users created:", users);

    // ✅ สร้าง Wallet สำหรับแต่ละ User
    const wallets = users.map((user) => ({
      userId: user.id, // ✅ ใช้ user.id จาก Users ที่สร้าง
      balance: 1000, // ✅ ตั้งค่า balance เริ่มต้น
      currency: "USD",
    }));

    // ✅ ตรวจสอบค่าที่จะถูกบันทึกใน Wallets
    console.log("✅ Wallets to be created:", wallets);

    // ✅ บันทึก Wallets ลงในฐานข้อมูล
    await db.Wallet.bulkCreate(wallets);

    console.log("✅ Database Seeded Successfully!");
  } catch (error) {
    console.error("❌ Error Seeding Database:", error);
  } finally {
    process.exit(); // ออกจากโปรแกรมหลังจากทำเสร็จ
  }
};

// ✅ เรียกใช้ฟังก์ชัน
seedData();
