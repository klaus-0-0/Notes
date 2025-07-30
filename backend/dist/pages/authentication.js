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
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const { PrismaClient } = require('@prisma/client');
const Prisma = new PrismaClient();
const router = express.Router();
router.post("/Signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const existingUser = yield Prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(404).json({ message: "user already eists" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ error: "server error" });
    }
    const hashedPassword = yield bcrypt.hash(password, 10);
    const newUser = yield Prisma.user.create({
        data: { username, email, password: hashedPassword }
    });
}));
router.post("/Login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield Prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(404).json({ message: "user not foud" });
        }
        const ispassordValid = yield bcrypt.compare(password, user.password);
        if (!ispassordValid) {
            res.status(404).json({ message: "invalid password" });
        }
        if (user && ispassordValid) {
            res.status(200).json({ message: `login success ${user.username}` });
        }
    }
    catch (e) {
        console.error(e);
        res.status(404).json({ error: "login failed" });
    }
}));
module.exports = router;
