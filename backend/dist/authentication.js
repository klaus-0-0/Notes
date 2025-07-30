"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;
// Signup Route
router.post("/Signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const existingUser = yield prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        const hashedPassword = yield bcrypt.hash(password, 10);
        const newUser = yield prisma.user.create({
            data: { username, email, password: hashedPassword },
        });
        res.status(201).json({ message: "User created", user: newUser });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error during signup" });
    }
}));
// Login Route
router.post("/Login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = yield bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ message: "Login successful", token, user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Login failed" });
    }
}));
router.post("/Notes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, userId } = req.body;
    try {
        if (content && userId) {
            yield prisma.note.create({
                data: {
                    content,
                    user: { connect: { id: userId } }
                }
            });
            res.status(201).json({ message: "Note created" });
        }
        else {
            res.status(400).json({ error: "Missing required fields: content, title, userId" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error during note creation" });
    }
}));
router.post("/FetchNotes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const notes = yield prisma.note.findMany({
        where: {
            userId
        }
    });
    try {
        if (notes) {
            res.status(201).json({ message: "Note Fetched", notes });
        }
        else {
            res.status(400).json({ error: "Missing required fields: content, title, userId" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error during note creation" });
    }
}));
exports.default = router;
