const sassMiddleware = require("node-sass-middleware");
const path = require("path");

const sassConfig = sassMiddleware({
  src: path.join(__dirname, "../scss"),
  dest: path.join(__dirname, "../../public/css"),
  indentedSyntax: false,
  sourceMap: true,
  debug: false,
  outputStyle: "compressed",
});

module.exports = sassConfig;
