import express from "express";
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js"
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
const port = process.env.PORT || 5000;

connectDB();

const app = express();


//API routes
app.get("/", (req, res) => {
  res.send("Hello");
});

app.use('/api/v1/products', productRoutes)

app.use(notFound);
app.use(errorHandler);

//Running the server
app.listen(port, () => {
  console.log("server running on ", port);
});
