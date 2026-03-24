const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;

  db.run(query, [name, email, hashedPassword, role], function (err) {
    if (err) return res.status(400).json(err.message);

    res.json({ message: "User registered successfully" });
  });
};

// LOGIN
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (!user) return res.status(400).json("User not found");

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return res.status(400).json("Invalid password");

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, user });
    console.log({ token, user });
    
  });
};