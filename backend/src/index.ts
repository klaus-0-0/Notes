<<<<<<< HEAD
import express from "express";
import type { Request, Response } from "express";
import cors from "cors"
import auth from './auth.js'

const app = express();
app.use(express.json());

app.use(cors({
  origin: "https://notes-frontend-c3jx.onrender.com",
  credentials: true,
  methods: ["GET", "POST"]
}))
app.use("/api", auth);


app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
}); 
=======
import express, { Request, Response } from "express";
const cors = require("cors")
import authRoutes from "./authentication";
const app = express();
const PORT = process.env.PORT || 4000 ;

app.use(cors({
  origin: "https://notes-frontend-c3jx.onrender.com",
  // origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true,
}));

app.use(express.json()); 
app.use("/api", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json("API is connected...!");
});

app.listen(PORT, () => { 
  console.log(`Server running on http://localhost:${PORT}`);
}); 
>>>>>>> 91fc13734932e154529fcab8519e0d2a9e7b3f4a
