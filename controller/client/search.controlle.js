const Product = require("../../models/products.model")

const newPrice = require("../../helpers/newPrice")

// [GET] /search
module.exports.index = async(req, res) => {

    const keyword = req.query.keyword

    let newProduct = []

    if(keyword){
        const keywordRegex = new RegExp(keyword,"i")

        const product = await Product.find({
            title: keywordRegex,
            status: "active",
            deleted: false
        })

        newProduct = newPrice.priceNewProducts(product)
    }

    res.render("client/pages/search/index.pug", {
        pageTitle: "Trang chủ",
        keyword: keyword,
        products: newProduct
    });
}