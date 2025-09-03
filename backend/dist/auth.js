import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { z } from "zod";
import { getUserIdFromToken } from "./tokenVerify.js";
import { any } from "zod/mini";
const app = express();
const prisma = new PrismaClient();
const router = Router();
const secret = process.env.TOKEN;
console.log("secret", secret);
if (!secret) {
    throw new Error("JWT secret (process.env.TOKEN) is not defined");
}
app.use(express.json());
const signupSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email format"),
    password: z.any()
});
// Signup route
router.post("/signup", async (req, res) => {
    const parseResult = signupSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({
            error: parseResult.error.flatten(),
        });
    }
    const { username, email, password } = parseResult.data;
    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });
        const token = Jwt.sign({ userId: newUser.id }, secret, { expiresIn: "1h" });
        res.status(201).json({
            message: "Signup successful",
            token,
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
            },
        });
    }
    catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});
const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: any()
});
router.post("/login", async (req, res) => {
    const parseResult = loginSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({ error: parseResult.error.flatten() });
    }
    const { email, password } = parseResult.data;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = Jwt.sign({ userId: user.id }, secret, {
            expiresIn: "1h",
        });
        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        });
    }
    catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.post("/notes", async (req, res) => {
    const { userId, error } = getUserIdFromToken(req.headers.authorization);
    console.log(userId);
    if (!userId) {
        return res.status(401).json({ message: error });
    }
    const noteSchema = z.object({
        title: z.string().min(1),
        content: z.string().min(1),
    });
    const parseResult = noteSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({ error: parseResult.error.flatten() });
    }
    const { title, content } = parseResult.data;
    try {
        const note = await prisma.note.create({
            data: {
                title,
                content,
                userId,
            },
        });
        res.status(201).json({ message: "Note created", note });
    }
    catch (err) {
        console.error("Note creation error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/fetchNotes", async (req, res) => {
    const { userId, error } = getUserIdFromToken(req.headers.authorization);
    if (!userId) {
        return res.status(401).json({ message: error });
    }
    try {
        const notes = await prisma.note.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });
        res.json({ notes });
    }
    catch (err) {
        console.error("Fetch notes error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});
export default router;
