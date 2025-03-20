const bcrypt = require("bcrypt");
const { User, Wallet } = require("../models");

// ✅ ดึง Users ทั้งหมด
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ include: Wallet });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error); // 👉 เพิ่ม Log
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// ✅ ดึงข้อมูล User ตาม ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, { include: Wallet });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving user" });
  }
};

// ✅ ลงทะเบียนผู้ใช้ใหม่
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // เช็คว่ามี Email ซ้ำไหม
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // เข้ารหัสรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);

    // สร้าง User และ Wallet
    const newUser = await User.create({ name, email, password: hashedPassword });

    const newWallet = await Wallet.create({
      userId: newUser.id,
      balance: 1000,
      currency: "USD",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
      wallet: newWallet,
    });
  } catch (error) {
    res.status(500).json({ error: "Registration failed", details: error.message });
  }
};
