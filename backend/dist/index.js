"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require("cors");
const authentication_1 = __importDefault(require("./authentication"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/api", authentication_1.default);
app.get("/", (req, res) => {
    res.json("API is connected");
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
