const Product = require("../../models/products.model");
// [GET] /products
module.exports.index = async (req, res) => {
    const product = await Product.find({
        status: "active",
        deleted: false
    }).sort({ position: "desc"});

    const newProduct = product.map(item =>{
        item.priceNew = (item.price * (100 - item.discountPercentage)/100).toFixed(0);
        return item;
    })

    console.log(newProduct);

    res.render("client/pages/products/index.pug",{
        pageTitle : "Trang sản phẩm",
        product: newProduct
    });
}

// [GET] /products/:slug
module.exports.detail = async (req, res) => {
    try {
      const find = {
      deleted: false,
      slug: req.params.slug,
      status: "active"
   }

   const product = await Product.findOne(find)
   

   res.render("client/pages/products/detail.pug", {
      pageTitle: product.title,
      product: product
   
   })
   } catch (error){
      res.redirect(`/products`)
   }
}
