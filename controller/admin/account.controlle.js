const Account = require("../../models/account.model")
const md5 = require("md5");

const systemConfig = require("../../config/system")

// [GET] /admin/account
module.exports.index = async (req, res) => {
   let find = {
      deleted: false,
   }

   const record = await Account.find(find).select("-password -token")


   res.render("admin/pages/accounts/index.pug", {
      pageTitle: "Danh sách tài khoản",
      record: record
   })
}

// [GET] /admin/products-catelory/create
module.exports.create = async (req, res) => {

   res.render("admin/pages/accounts/create.pug", {
      pageTitle: "Tạo danh mục sản phẩm",
   })
}

// [POST] /admin/products-catelory/createPost
module.exports.createPost = async (req, res) => {
   const emailExist = await Account.findOne({
      email: req.body.email,
      deleted: false
   })

   if (emailExist) {
      req.flash("error", `Email ${req.body.email} đã tồn tại`)

      res.redirect(req.get("Referer"));

   } else {
      req.body.password = md5(req.body.password)

      const record = new Account(req.body)

      await record.save()

      res.redirect(`${systemConfig.prefixAdmin}/accounts`)

      req.flash("Tạo mới thành công")
   }
}

// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
   let find = {
      _id: req.params.id,
      deleted: false,
   };

   try {
      const data = await Account.findOne(find);

      res.render("admin/pages/accounts/edit", {
         pageTitle: "Chỉnh sửa tài khoản",
         data: data,
      });
   } catch (error) {
      res.redirect(`${systemConfig.prefixAdmin}/accounts`);
   }
};

// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;

  try {
    const emailExist = await Account.findOne({
      _id: { $ne: id },
      email: req.body.email,
      deleted: false
    });

    if (emailExist) {
      req.flash("error", `Email ${req.body.email} đã tồn tại!`);
      return res.redirect("/admin/auth/login");
    }
    if (req.body.password) {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password;
    }

    await Account.updateOne({ _id: id }, req.body);

    req.flash("success", "Cập nhật tài khoản thành công!");
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);

  } catch (error) {
     res.redirect(req.get("Referer") || "back");
  }
};