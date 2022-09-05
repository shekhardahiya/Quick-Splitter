

const mongoose = require("mongoose");
const connectDB = async () =>
  await mongoose.connect(
    "mongodb+srv://shekhar:shekhar@cluster0.dllxsbh.mongodb.net/splitbill?retryWrites=true&w=majority",
    {
      useNewurlParser: true,
      useUnifiedTopology: true,
    },
    (err, client) => {
      if (err) {
        console.log(err);
      } else {
        console.log("connected now");
      }
    }
  );

module.exports = connectDB;


