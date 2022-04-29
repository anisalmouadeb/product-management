import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import productRoutes from "./routes/products.js";
import dotenv from "dotenv";
const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/", productRoutes);

const PORT = process.env.PORT || 5000;
const CONNECTION_URL =
  "mongodb+srv://anismeddeb1997:anismeddeb1997@cluster0.zt7t7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// setting up database
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));
