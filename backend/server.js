import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
const port = process.env.PORT || 5000;

connectDB();

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//API routes
app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

//Running the server
app.listen(port, () => {
  console.log("server running on ", port);
});
