const User = require("../../models/user.model");

const md5 = require("md5")

// [GET] /user/register
module.exports.register = async (req, res) => {

  res.render("client/pages/user/register.pug", {
    pageTitle: "Đăng ký tài khoản"
  });
};

// [Post] /user/registerPost
module.exports.registerPost = async (req, res) => {

  const existMail = await User.findOne({
    email: req.body.email,
    deleted: false
  })

  if (existMail) {
    req.flash("error", `Email ${req.body.email} đã tồn tại!`);
    res.redirect(req.get("Referer") || "back");
  }

  req.body.password = md5(req.body.password)

  const user = await new User(req.body)
  await user.save();;

  res.cookie("tokenUser", user.tokenUser)

  res.redirect("/")
};

// [GET] /user/login
module.exports.login = async (req, res) => {

  res.render("client/pages/user/login.pug", {
    pageTitle: "Đăng nhập"
  });
};

// [Post] /user/loginPost
module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({
    email: email,
    deleted: false
  })

  if(!user) {
    req.flash("error", `Email ${email} không tồn tại!`);
    res.redirect(req.get("Referer") || "back");
  }

  if(md5(password) != user.password) {
    req.flash("error","Sai mật khẩu");
    res.redirect(req.get("Referer") || "back");
  }

  if(user.status == "inactive"){
    req.flash("error","Tài khoản đã bị khóa");
    res.redirect(req.get("Referer") || "back");
  }

  res.cookie("tokenUser", user.tokenUser)

  res.redirect("/")
};

// [GET] /user/logOut
module.exports.logOut = async (req, res) => {

  res.clearCookie("tokenUser");

  res.redirect("/user/login")
};