const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const express = require("express");
const app = express();

app.use(helmet());

app.use(express.static(path.join(__dirname, "../build")));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());

app.use(morgan("combined"));

// Test API method 
app.get("/test", (req, res) => {
  res.status(200).send("Hello World!");
});

// Add API methods here

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});
module.exports = app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
