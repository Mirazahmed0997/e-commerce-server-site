const Category = require("../../Models/V0/Category.model/category.model");
const products = require("../../Models/V0/product.model/product.model");

async function createProduct(reqData) {
    let topLevel = await Category.findOne({ name: reqData.topLevelCategory });

    console.log("req data", reqData.sellPrice)
    let calDiscountedPrice = reqData.sellPrice; // Default to sellPrice
    if (reqData.discountedPercent) {
        calDiscountedPrice = reqData.sellPrice - (reqData.sellPrice * reqData.discountedPercent / 100);
    }


    if (!topLevel) {
        topLevel = new Category({
            name: reqData.topLevelCategory,
            level: 1,
        });
        console.log("create", topLevel)

        await topLevel.save()
    }

    console.log("exist", topLevel)

    let secondLevel = await Category.findOne({
        name: reqData.secondLevelCategory,
        parentCategory: topLevel._id,
    });

    if (!secondLevel) {
        secondLevel = new Category({
            name: reqData.secondLevelCategory,
            parentCategory: topLevel._id,
            level: 2
        })
        console.log("create", secondLevel)
        await secondLevel.save()
    }
    console.log("exist", secondLevel)


    let thirdLevel = await Category.findOne({
        name: reqData.thirdLevelCategory,
        parentCategory: secondLevel._id,
    });

    if (!thirdLevel) {
        thirdLevel = new Category({
            name: reqData.thirdLevelCategory,
            parentCategory: secondLevel._id,
            level: 3
        })
        console.log("create", thirdLevel)
        await thirdLevel.save()
    }
    console.log("exist", secondLevel)

    console.log(calDiscountedPrice)

    const Product = new products({
        title: reqData.title,
        color: reqData.color.split(",").map(c => c.trim().toLowerCase()),
        description: reqData.description,
        imageUrl: reqData.imageUrl,
        thumNailImage:reqData.thumNailImage,
        brand: reqData.brand,
        buyPrice: reqData.buyPrice,
        sellPrice: reqData.sellPrice,
        sizes: reqData.sizes,
        stockQuantity: reqData.stockQuantity,
        category: thirdLevel._id,
        categoryName: thirdLevel.name,
        discountedPrice: calDiscountedPrice,
        discountedPercent: reqData.discountedPercent
    })

    console.log("create product", Product)

    return await Product.save()
}

const deleteProduct = async (productId) => {
    const Product = await findProductById(productId)

    await products.findByIdAndDelete(Product)
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

    let query = products.find().populate("category")
    // console.log(Products)

    if (category) {
        const existCategory = await Category.findOne({ name: category });
        console.log("exist ", existCategory._id)
        if (existCategory) {
            query = query.where("category").equals(existCategory._id);
            // console.log("cat query",query)
        } else {
            return { content: [], currentPage: 1, totalPages: 0 };
        }
    }


    if (color) {
        const colorSet = new Set(color.split(",").map(c => c.trim().toLowerCase()));
        if (colorSet.size > 0) {
            query = query.where("color").in([...colorSet]);
        }
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
    console.log("products", Products)

    return { content: Products, currentPage: pageNumber, totalPages }

    // return {  currentPage: pageNumber, totalPages }
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

