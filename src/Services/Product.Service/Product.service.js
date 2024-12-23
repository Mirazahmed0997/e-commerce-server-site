 const category = require("../../Models/V0/Category.model/category.model");
const products = require("../../Models/V0/product.model/product.model");

async function createProduct(reqData) {
    let topLevel = await category.findOne({ name: reqData.topLevelCategory });

    if (!topLevel) {
        topLevel = new category({
            name: reqData.topLevelCategory,
            level: 1,
        });
    }

    let secondLevel = await category.findOne({
        name: reqData.secondLevelCategory,
        parentCategory: topLevel._id,
    });

    if (!secondLevel) {
        secondLevel = new category({
            name: reqData.secondLevelCategory,
            parentCategory: topLevel._id,
            level: 2
        })
    }

    let thirdLevel = await category.findOne({
        name: reqData.thirdLevelCategory,
        parentCategory: secondLevel._id,
    });

    if (!thirdLevel) {
        thirdLevel = new category({
            name: reqData.thirdLevelCategory,
            parentCategory: secondLevel._id,
            level: 3
        })
    }

    const Product = new products({
        title: reqData.title,
        color: reqData.color,
        description: reqData.description,
        imageUrl: reqData.imageUrl,
        brand: reqData.brand,
        buyPrice: reqData.buyPrice,
        sellPrice: reqData.sellPrice,
        sizes: reqData.sizes,
        stockQuantity: reqData.stockQuantity,
        category: thirdLevel._id,
    })

    return await Product.save()
}

const deleteProduct = async (productId) => {
    const Product = await findProductById(productId)

    await products.findByIdAndDelete(productId)
    return "Product Deleted Successfully"

}

const updateProduct = async (productId, reqData) => {
    return await products.findByIdAndUpdate(productId, reqData)
}

const findProductById = async (id) => {
    const product = await products.findById(id).populate("category").exec();

    if (!product) {
        throw new Error("Product not found with id " + id);
    }

    return product;
}

const getAllProducts = async (reqQuery) => {
    let { category, color, sizes, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize } = reqQuery;

    pageSize = pageSize || 10;

    let query = products.find().populate("category");

    if (category) {
        const existCategory = await category.findOne({ name: category });
        if (existCategory) {
            query = query.where("category").equals(existCategory._id);
        } else {
            return { content: [], currentPage: 1, totalPages: 0 };
        }
    }


    if (color) {
        const colorSet = new Set(color.split(",").map(color => color.trim().toLowerCase()));

        const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;

        query = query.where("color").regex(colorRegex);
    }

    if (sizes) {
        const sizesSet = new Set(sizes);
        query = query.where("sizes.name").in([...sizesSet]);
    }

    if (minPrice && maxPrice) {
        query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
    }
    if (minDiscount) {
        query = query.where("discountedPersent").gt(minDiscount);
    }

    if (stock) {
        if (stock == "in_stock") {
            query = query.where("stockQuantity").gt(0);
        } else if (stock == "out_of_stock") {
            query = query.where("stockQuantity").lte(0);
        }
    }

    if (sort) {
        const sortDirection = sort == "price_hight" ? -1 : 1;
        query = query.sort({ discountedPrice: sortDirection });
    }

    const totalProducts = await products.countDocuments(query)
    const skip = (pageNumber - 1) * pageSize
    query = query.skip(skip).limit(pageSize)

    const Products = await query.exec();

    const totalPages = Math.ceil(totalProducts / pageSize)

    return { content: Products, currentPage: pageNumber, totalPages }
}

const createMultipleProducts = async (Products) => {
    for (let Product of Products) {
        await createProduct(Product)
    }
}

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    findProductById,
    createMultipleProducts
}

