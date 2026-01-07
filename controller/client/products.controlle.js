const Product = require("../../models/products.model");
const ProductCategory = require("../../models/products.category.model");
const productsCategoryHelper = require("../../helpers/products-category");

// [GET] /products
module.exports.index = async (req, res) => {
  try {
    const products = await Product.find({
      status: "active",
      deleted: false
    })
      .sort({ position: "desc" })
      .lean();

    const newProducts = products.map(item => {
      item.priceNew = item.price
        ? (item.price * (100 - (item.discountPercentage || 0)) / 100).toFixed(0)
        : 0;
      return item;
    });

    res.render("client/pages/products/index.pug", {
      pageTitle: "Trang sản phẩm",
      product: newProducts
    });

  } catch (error) {
    console.error("Lỗi trang products:", error);
    res.redirect("/");
  }
};


// [GET] /products/:slugProduct
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      slug: req.params.slugProduct,
      status: "active"
    };

    const product = await Product.findOne(find);

    // console.log(product);

    res.render("client/pages/products/detail", {
      pageTitle: product.title,
      product: product
    });
  } catch (error) {
    res.redirect(`/products`);
  }
};

// [GET] /products/:slugCategory
module.exports.category = async (req, res) => {
  try {
    const category = await ProductCategory.findOne({
      slug: req.params.slugCategory,
      status: "active",
      deleted: false
    }).lean();

    if (!category) {
      return res.redirect("/products");
    }

    const subCategories =
      await productsCategoryHelper.getSubCategory(category._id);

    const subCategoryIds = subCategories.map(item => item._id);

    const products = await Product.find({
      product_category_id: {
        $in: [category._id, ...subCategoryIds]
      },
      status: "active",
      deleted: false
    })
      .sort({ position: "desc" })
      .lean();

    const newProducts = products.map(item => {
      item.priceNew = item.price
        ? (item.price * (100 - (item.discountPercentage || 0)) / 100).toFixed(0)
        : 0;
      return item;
    });

    res.render("client/pages/products/index.pug", {
      pageTitle: category.title,
      product: newProducts
    });

  } catch (error) {
    console.error("Lỗi trang category:", error);
    res.redirect("/products");
  }
};
