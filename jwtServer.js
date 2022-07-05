const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

app.use(express.json());

console.log(process.env.JWT_ACCESS_TOKEN_SECRET);

// token
// login
app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username };
  const accessToken = jwt.sign(user, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "5s",
  });

  res.json({ token: accessToken });
});
// logout

app.listen(4000);
