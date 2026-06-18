const morgan=require("morgan");
const express = require("express");
const cors = require("cors");
const dotenv=require("dotenv");
const connectDB=require("./config/db");
const errorHandler = require(
  "./middleware/errorMiddleware"
);
dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/users",require("./routes/userRoutes")
);
app.use("/api/tasks",require("./routes/taskRoutes")
);

app.get("/", (req, res) => {
  res.send("Server Running");
});
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT}`);
});