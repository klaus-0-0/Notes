import express from "express";
import type { Request, Response } from "express";
import cors from "cors"
import auth from './auth.js'

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
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
