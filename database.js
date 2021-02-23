const mongoose = require("mongoose");

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose
      .connect(
        "mongodb+srv://matthijsBoet:e44fLKqZ7PVL6TG@twittercluster.attuc.mongodb.net/twitterDB?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
      )
      .then(() => {
        console.log("Connected to twitterDB");
      })
      .catch((error) => {
        console.log(`Connection to twitterDB Failed: ${error}`);
      });
  }
}

module.exports = new Database();
