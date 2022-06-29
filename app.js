const express = require("express");
const path = require("path");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

app.set("view engine", "pug");

// Body parser middleware
app.use(express.json());

// static folder (absolute path)
app.use(express.static(path.join(__dirname, "public/styles")));

app.get("/", (req, res) =>
  res.render("index", {
    title: "Member App",
  })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
