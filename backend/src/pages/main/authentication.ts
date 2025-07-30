import express, { Request, Response } from "express";
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();
const JWT_SECRET = "your_jwt_secret_key"; // ⛔ Replace with env var in production

// Signup Route
router.post("/Signup", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    res.status(201).json({ message: "User created", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error during signup" });
  }
});

// Login Route
router.post("/Login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
});

router.post("/Notes", async (req: Request, res: Response) => {
  const { content, userId } = req.body;

  try {
    if (content && userId) {
      await prisma.note.create({
        data: {
          content,
          user: { connect: { id: userId } }
        }
      });
      res.status(201).json({ message: "Note created" });
    } else {
      res.status(400).json({ error: "Missing required fields: content, title, userId" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error during note creation" });
  }
})

router.post("/FetchNotes", async (req: Request, res: Response) => {
  const { userId } = req.body;
  const notes = await prisma.note.findMany({
    where: {
      userId
    }
  }); try {
    if (notes) {
      res.status(201).json({ message: "Note Fetched",  notes });
    } else {
      res.status(400).json({ error: "Missing required fields: content, title, userId" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error during note creation" });
  }
})

export default router;