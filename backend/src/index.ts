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

// Serve static files from React build folder
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// Your API routes here
app.post('/api/something', (req, res) => {
  // handle API
});

// Catch-all for React Router paths
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
});



app.use(express.json()); 
app.use("/api", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json("API is connected");
});

app.listen(PORT, () => { 
  console.log(`Server running on http://localhost:${PORT}`);
}); 
