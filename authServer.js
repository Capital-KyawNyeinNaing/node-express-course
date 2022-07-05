const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const posts = [
  {
    username: "User1",
    desc: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document",
  },
  {
    username: "User2",
    desc: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document",
  },
];

app.use(express.json());

const authemticateToken = (req, res, next) => {
  const header = req.headers["authorization"];
  console.log(header);
  const token = header && header.split(" ")[1];
  if (token === null) {
    return res.status(401).json({
      message: "Unauthenticated!",
    });
  }
  jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({
        message: "Now allowed!",
      });
    req.user = user;
    next();
  });
};

app.get("/posts", authemticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

app.listen(3000);
