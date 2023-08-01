import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import cookieparser from "cookie-parser";
//-------------------------------------------//
connectDB(); // connect to database
const port = process.env.PORT || 5000;
const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieparser());
//-------------------------------------------//

app.get("/", (req, res) => {
  res.send("API is running....");
});
// routes for product APIs
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);
//-------------------------------------------//
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
