const authRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const { repToken } = require("../utilities/genToken");
const visitors = require("../models/visitorSchema");
const users = require("../models/userSchema");
const { verifyLogin } = require("../utilities/authentication");
const jwt_decode = require("jwt-decode");
const { saveVisitor } = require("../utilities/saveVisitor");

authRouter.get("/login/:auth/:token", saveVisitor, (req, res, next) => {
  res.render("login.hbs", { layout: false });
});

authRouter.post("/login/:auth/:token", async (req, res, next) => {
  console.log(
    jwt_decode(req.params.token).iat,
    new Date().getTime() / 1000 - 2 * 86400
  );
  if (
    jwt_decode(req.params.token).iat <
    new Date().getTime() / 1000 - 2 * 86400
  ) {
    res.send("Token expired");
    return next();
  }

  const token = req.params.token;
  let verify = await jwt.verify(token, process.env.REP_SECRET);
  if (!verify) {
    next(new Error("Invalid Token"));
  }
  let user = {};
  user.email = req.body.email;
  user.name = req.body.name || null;
  user.auth = req.params.auth;
  if (!(await users.findOne({ email: user.email }))) {
    User = await users.create(user).catch((err) => {
      console.log("can not create user", err);
    });
  }
  try {
    let Visitor = await visitors.findOne({ ip: user.ip });
    Visitor.user = User._id;
    Visitor.markModified("user");
    await Visitor.save();
  } catch (error) {
    console.log(error);
  }
  const login_token = repToken(user);
  res.cookie("sid", login_token, {
    httpOnly: true,
    path: "/",
    expires: new Date(Date.now() + 4 * 365 * 86400000),
  });
  res.redirect("/batch/" + req.body.email.slice(0, 5));
});

authRouter.get("/Tokenlogin", verifyLogin, async (req, res, next) => {
  res.send("true");
});

module.exports = authRouter;
