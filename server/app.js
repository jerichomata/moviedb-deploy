const express = require("express");
require("dotenv").config();
const app = express();
const connectDb = require("./config/connection");
connectDb();
const path = require("path");
const PORT = process.env.PORT || 3001;

const cookieParser = require("cookie-parser");
app.use(express.static(path.join(__dirname, "../client/build")));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/", require("./routes/movieRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
