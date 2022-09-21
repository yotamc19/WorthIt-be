const express = require("express");
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const cookieParser = require("cookie-parser");
const connectDb = require("./config/db");
require("dotenv").config();
connectDb();
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/user", userRoute);
// app.use("/worthit", worthitRoute);
// app.use(notFound);
// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
