const ProductCategorySchema = require("../../models/products.category.model")

const systemConfig = require("../../config/system")

const createTreeHelper = require("../../helpers/createTree")


// [GET] /admin/products-catelory
module.exports.index = async (req, res) => {

   const find = {
      deleted: false
   }


   const product = await ProductCategorySchema.find(find);

   // nhúng mixins createTreeHelper
   const newProduct = createTreeHelper.tree(product)
   
   res.render("admin/pages/products-category/index.pug", {
      pageTitle: "Danh mục sản phẩm",
      productscategory: newProduct
   })
}

// [GET] /admin/products-catelory/create
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

   const product = await ProductCategorySchema.find(find);

   // Nhúng mixins createTreeHelper
   const newProduct = createTreeHelper.tree(product)
   
   res.render("admin/pages/products-category/create.pug", {
      pageTitle: "Tạo danh mục sản phẩm",
      productscategory: newProduct
   })
}

// [GET] /admin/products-cateory/createPost
module.exports.createPost = async (req, res) => {

   if(req.body.position == ""){
      const countProducts = await ProductCategorySchema.countDocuments();
      req.body.position = countProducts + 1;
   } else{
      req.body.position = parseInt( req.body.position);
   }

   if(req.file){
      req.body.thumbnail = `/uploads/${req.file.filename}`; 
   }

   const product = new ProductCategorySchema(req.body)
   await product.save()

   res.redirect(`${systemConfig.prefixAdmin}/products-category`)
}

// [GET] /admin/products-catelory/edit/:id
module.exports.edit = async (req, res) => {

   try {
      const id = req.params.id;

      const data = await ProductCategorySchema.findOne({
         _id: id,
         deleted: false
      })

      const product = await ProductCategorySchema.find({
         deleted: false
      });

      const newProduct = createTreeHelper.tree(product)
      
      res.render("admin/pages/products-category/edit.pug", {
         pageTitle: "Chỉnh sửa danh mục sản phẩm",
         data: data,
         productscategory: newProduct

      })
   } catch (error) {
      res.redirect(`${systemConfig.prefixAdmin}/products-category`)
   }

   
}

// [PATCH] /admin/products-catelory/edit/:id
module.exports.editPatch = async (req, res) => {

   try {
      const id = req.params.id;

   req.body.position = parseInt(req.body.position);

   await ProductCategorySchema.updateOne({_id: id}, req.body)

   res.redirect("back")

   } catch (error) {
      res.redirect(`${systemConfig.prefixAdmin}/products-category`)
   }
}


