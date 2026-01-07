const Product = require("../../models/products.model")
const fillterStatusHelper = require("../../helpers/fillterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system")
const createTreeHelper = require("../../helpers/createTree")
const ProductCategorySchema = require("../../models/products.category.model")

// [GET] /admin/products
module.exports.index = async (req, res) => {
   // console.log(req.query.status);

   // bộ lọc in helpers
   const fillterStatus = fillterStatusHelper(req.query);


   // end


   let find = {
      deleted: false

   }

   if (req.query.status) {
      find.status = req.query.status;
   }


   // tìm kiếm in helper
   const objectSearch = searchHelper(req.query);

   if (objectSearch.regex) {
      find.title = objectSearch.regex;
      // End Regex
   }
   // End

   // phân trang (pagination)
   const countProducts = await Product.countDocuments(find);
   let objectPagination = paginationHelper({
      currentPage: 1,
      limitItem: 5
   }, req.query, countProducts)
   // End phân trang

   // Sort
   let sort = {}

   if(req.query.sortKey && req.query.sortValue){
      sort[req.query.sortKey] = req.query.sortValue
   } else {
      sort.position = "desc"
   }
   // End Sort

   const products = await Product.find(find)
   .sort(sort)
   .limit(objectPagination.limitItem)
   .skip(objectPagination.skip);
   // console.log(products);

   res.render("admin/pages/products/index.pug", {
      pageTitle: "Danh sách sản phẩm",
      products: products,
      fillterStatus: fillterStatus,
      keyword: objectSearch.keyword,
      pagenation: objectPagination
   })
}

/// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
   try {
      const status = req.params.status;
      const id = req.params.id;

      await Product.updateOne({ _id: id }, { status: status });

      req.flash("success","Cập nhật trạng thái thành công !");

      // Quay lại đúng trang trước đó
      res.redirect(req.get("Referer"));
   } catch (err) {
      console.error(err);
      res.redirect("/admin/products"); // fallback nếu lỗi
   }
};

/// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
   const type = req.body.type;
   const ids = req.body.ids.split(", ")

   switch (type) {
      case "active":
         await Product.updateMany({ _id: { $in: ids } }, { status: "active" })
         req.flash("success",`Cập nhật trạng thái thành công ${ids.length} sản phẩm !`);

         break;
      case "inactive":
         await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" })
          req.flash("success",`Cập nhật trạng thái thành công ${ids.length} sản phẩm !`);
         break;
      case "change-position":
         for (const item of ids) {
            // console.log(item)
            let [id, position] = item.split("-");
            position = parseInt(position);

            await Product.updateOne({ _id: id }, {
                position: position });
         }
         break;

      default:
         break;
      
   }

   res.redirect("/admin/products");

};


/// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
   const id = req.params.id;

   // xóa vĩnh viễn
   await Product.deleteOne({_id:id})

   // xóa mềm
   // await Product.updateOne({_id:id}, {deleted:true});

    req.flash("success",`Xóa thành công thành công sản phẩm !`);

   res.redirect("/admin/products");
};

// [GET] /admin/products/create
module.exports.create = async (req, res) => {

   const find = {
      deleted: false
   }

   function createTree(arr, parentId = "") {
   const tree = [];

   arr.forEach((item) => {
      if (item.parent_id === parentId) {
         const newItem = item;

         const children = createTree(arr, item.id);

         if (children.length > 0) {
         newItem.children = children;
         }

         tree.push(newItem);
      }
   });

   return tree;
   }

   const category = await ProductCategorySchema.find(find);

   // Nhúng mixins createTreeHelper
   const newCategory = createTreeHelper.tree(category)


   res.render("admin/pages/products/create.pug", {
      pageTitle: "Danh sách sản phẩm",
      category: newCategory
   })
}

// [POSt] /admin/products/create
module.exports.createPost = async (req, res) => {
   req.body.price = parseInt( req.body.price);
   req.body.discountPercentage = parseInt( req.body.discountPercentage);
   req.body.stock = parseInt( req.body.stock);

   if(req.body.position == ""){
      const countProducts = await Product.countDocuments();
      req.body.position = countProducts + 1;
   } else{
      req.body.position = parseInt( req.body.position);
   }

   if(req.file){
      req.body.thumbnail = `/uploads/${req.file.filename}`; 
   }

   const product = new Product(req.body)
   await product.save()

   req.flash("success","Tạo mới thành công thành công !");
  
   res.redirect(`${systemConfig.prefixAdmin}/products`)
   
}

// [GET] /admin/products/edit
module.exports.edit = async (req, res) => {
   
   try {
      const find = {
      deleted: false,
      _id: req.params.id
   }

   const product = await Product.findOne(find)

   const findd = {
      deleted: false
   }

   function createTree(arr, parentId = "") {
   const tree = [];

   arr.forEach((item) => {
      if (item.parent_id === parentId) {
         const newItem = item;

         const children = createTree(arr, item.id);

         if (children.length > 0) {
         newItem.children = children;
         }

         tree.push(newItem);
      }
   });

   return tree;
   }

   const category = await ProductCategorySchema.find(findd);

   // Nhúng mixins createTreeHelper
   const newCategory = createTreeHelper.tree(category)
   

   res.render("admin/pages/products/edit.pug", {
      pageTitle: "Chỉnh sửa sản phẩm",
      product: product,
      category: newCategory
   
   })
   } catch (error){
      res.redirect(`${systemConfig.prefixAdmin}/products`)
   }
}

// [PATCH] /admin/products/edit
module.exports.editPatch = async (req, res) => {

   const id = req.params.id;

   req.body.price = parseInt(req.body.price);
   req.body.discountPercentage = parseInt(req.body.discountPercentage);
   req.body.stock = parseInt(req.body.stock);

   if (req.file) {
      req.body.thumbnail = `/uploads/${req.file.filename}`;
   }

   try {
      await Product.updateOne({ _id: id }, req.body);
      req.flash("success",`Update sản phẩm thành công !`);

      return res.redirect("back"); 
   } catch (error) {
      req.flash("error",`Update sản phẩm thất bại !`);
      return res.redirect("back");
   }
};

// [GET] /admin/products/detail
module.exports.detail = async (req, res) => {

   try {
      const find = {
      deleted: false,
      _id: req.params.id
   }

   const product = await Product.findOne(find)
   

   res.render("admin/pages/products/detail.pug", {
      pageTitle: product.title,
      product: product
   
   })
   } catch (error){
      res.redirect(`${systemConfig.prefixAdmin}/products`)
   }
}