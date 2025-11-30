import dotenv from "dotenv";

dotenv.config();

import express  from "express";
import mongoose from "mongoose";
import cors from "cors";

// les différennts routes
import stagiaireRoutes from "./routes/Stagiaire.routes";
import encadrantRoutes from "./routes/Encadrant.routes";
import rapportRoutes from "./routes/Rapport.routes";
import attestationRoutes from "./routes/Pdf.routes";
import dashboardRoutes from "./routes/Dashboard.routes";

const app = express();
const PORT = process.env.PORT || 5000;

//middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());

//routes
app.use('/api/stagiaires', stagiaireRoutes);
app.use('/api/encadrant', encadrantRoutes);
app.use("/api/rapports", rapportRoutes);
app.use("/api/attestations", attestationRoutes);
app.use("/api/dashboard", dashboardRoutes);

// routes de test
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