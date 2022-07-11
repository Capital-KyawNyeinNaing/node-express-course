const express = require("express");
const path = require("path");
const app = express();
const dotenv = require("dotenv");
const logger = require("./middleware/logger");
const sassConfig = require("./configs/scssConfig");
const apiRoutes = require("./routes/api.routes");
const globalErrHandler = require("./controller/error.controller");

dotenv.config();

app.set("view engine", "pug");

// Body parser middleware
app.use(express.json());

// scss
app.use(sassConfig);

// static folders (absolute path)
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "../public/css")));
app.use(express.static(path.join(__dirname, "../public/js")));

app.get("/", (req, res) =>
  res.render("index", {
    title: "Member App",
  })
);

app.use("/api", apiRoutes);

app.use(logger);

app.use(globalErrHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
