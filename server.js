const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const routes = require('./routes');
const PORT = process.env.PORT || 5000;
const app = express();
const config = require('./db');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

if (process.env.NODE_ENV === "production" || PORT === 5000) {
  console.log("entered the if production block")
  console.log("0");
  app.use(express.static("client/build/"));
  console.log("1");
}

app.use(routes);

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);


app.listen(PORT, function () {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});