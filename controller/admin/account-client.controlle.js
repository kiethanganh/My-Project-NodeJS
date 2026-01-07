const User = require("../../models/user.model")

// [GET] /admin/account-client
module.exports.index = async (req, res) => {
   
    let find = {
      deleted: false,
   }

   const record = await User.find(find).select("-password -token")


   res.render("admin/pages/account-client/index.pug", {
      pageTitle: "Danh sách tài khoản khách hàng",
      record: record
   })
}