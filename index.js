const express = require("express");
const exphbs = require("express-handlebars");
const dotenv = require("dotenv");
const cors = require("cors");
const cp = require("cookie-parser");

dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cp());

app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./public/");

app.get("/", (req, res, next) => {
  res.send("index page");
  next();
});

app.use("/public", express.static("public"));
app.use("/auth", require("./routers/authRouter"));
app.use("/getlink", require("./routers/linkRedirectsRouter.js")); //redirects to the appropriate links
app.use("/batch", require("./routers/batchRouter.js")); //batch render

app.use((err, req, res, next) => {
  if (err.code === 404) {
    res.status(err.code).send(err.message);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("listening on port 3000");
});
