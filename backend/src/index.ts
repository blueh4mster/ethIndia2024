import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetchRouter from "./routes/fetchRoutes";

const app = express();
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", fetchRouter);

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
