import dotenv from "dotenv";

dotenv.config();

import express  from "express";
import mongoose from "mongoose";
import cors from "cors";

import stagiaireRoutes from "./routes/stagiaire.routes";

const app = express();
const PORT = process.env.PORT || 5000;

//middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use('/api/stagiaires', stagiaireRoutes);

//routes
app.get("/", (req, res) => {
  res.send("Welcome to the backend!");
});

//DB + Server
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });