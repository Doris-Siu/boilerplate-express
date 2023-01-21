let express = require("express");
let app = express();

let bodyParser = require("body-parser");

console.log("Hello World");

app.use("/public", express.static(__dirname + "/public"));
app.use(function (req, res, next) {
  const result = `${req.method} ${req.path} - ${req.ip}`;
  console.log(result);
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", function (req, res) {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "HELLO JSON" });
  }

  res.json({ message: "Hello json" });
});

app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString(); // Hypothetical synchronous operation
    next();
  },
  function (req, res) {
    res.send({ time: req.time });
  }
);

app.get("/name", function (req, res) {
  const firstname = req.query.first;
  const lastname = req.query.last;
  res.send({ name: `${firstname} ${lastname}` });
});

app.post("/name", function (req, res) {
  const firstname = req.body.first;
  const lastname = req.body.last;
  res.send({ name: `${firstname} ${lastname}` });
});

app.get("/:word/echo", function (req, res) {
  res.send({ echo: req.params.word });
});

module.exports = app;
