const ProductCategorySchema = require("../../models/products.category.model")

const createTreeHelper = require("../../helpers/createTree")

module.exports.category = async (req, res, next) => {
  const productsCategory = await ProductCategorySchema.find({
    deleted: false
  });

  const newProductsCategory = createTreeHelper.tree(productsCategory);


  res.locals.layoutProductsCategory = newProductsCategory;

  next();
};