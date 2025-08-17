const mongoose = require("mongoose");

const connectDb = async (url) => {
  await mongoose
    .connect(url)
    .then(() => {
      console.log(`Connected to server ${url}`);
    })
    .catch((err) => {
      console.log(`Connection to server failed. Error = ${err}`);
    });
};

module.exports = connectDb