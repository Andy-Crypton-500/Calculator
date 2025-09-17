import express from "express";
import bodyParser from "body-parser";
import fs from "fs"; 
import bcrypt from "bcrypt";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
const USERS_FILE = "./users.json";

// 📦 Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public")); // Serve HTML/CSS/JS/images from public

// 🔧 Helpers
function getUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
}

function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// 🔐 Register Middleware
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const users = getUsers();

  const exists = users.find((u) => u.username === username);

  if (exists) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed });
  saveUsers(users);

  res.json({ message: "Registered successfully!" });
});

// 🔐 Login Middleware
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const users = getUsers();

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(400).json({ error: "Incorrect password" });
  }

  res.json({ message: "Login successful!" });
});

app.get("/users", (req, res) => {
  const users = getUsers();
  const usedUsernames = users.map(u => u.username);
  res.json(usedUsernames); // Return array of registered usernames
});

// Serve the main login page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/main.html");
});

app.get("/contract", (req, res) => {
  res.sendFile(__dirname + "/public/contract.html");
});

app.get("/graph", (req, res) => {
  res.sendFile(__dirname + "/public/graph.html");
});

app.get("/game", (req, res) => {
  res.sendFile(__dirname + "/public/game.html");
});

app.get("/derivative", (req, res) => {
  res.sendFile(__dirname + "/public/deravitive.html");
});

// 🟢 Start the server
app.listen(port, () => {
  console.log(`✅ Listening on port ${port}`);
});
