require("dotenv").config();

const express = require("express");
const connectDb = require("./db");
const router = require("./routes/url.route");

const app = express();
app.use(express.json());
connectDb(process.env.MONGODB_URL);

app.use("/", router);
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
});
