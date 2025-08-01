import express, { Request, Response } from "express";
const cors = require("cors")
import authRoutes from "./authentication";
const app = express();
const PORT = process.env.PORT || 4000 ;
import path from 'path';

app.use(cors({
  origin: "https://notes-frontend-c3jx.onrender.com",
  // origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true,
}));

app.use(express.json()); 
app.use("/api", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json("API is connected");
});

app.listen(PORT, () => { 
  console.log(`Server running on http://localhost:${PORT}`);
}); 
