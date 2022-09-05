const express = require("express");
const connectDB = require("./config/db");
const group = require('./routes/groups')
const transaction = require('./routes/transaction')
const user = require('./routes/user')
const comments = require('./routes/comments')

connectDB();
const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.json());
const PORT = process.env.PORT || 5000;


app.use("/api/v1/bills", group)
app.use("/api/v1/bills", transaction)
app.use("/api/v1/bills", user)
app.use("/api/v1/bills", comments)
app.get("/", (req, res) => {
  res.send("Hello world")
})

const server = app.listen(
  PORT,
  console.log(`Server running on port
  ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error:${err.message}`);
  server.close(() => process.exit(1));
});
