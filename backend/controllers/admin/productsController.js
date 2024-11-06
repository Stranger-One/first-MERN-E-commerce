import { imageUploader } from "../../helpers/cloudinary.js";
import Product from "../../models/ProductModel.js";


const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64')
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await imageUploader(url)

        // const b64 = Buffer.from(req.file.buffer).toString("base64");
        // const url = "data:" + req.file.mimetype + ";base64," + b64;
        // const result = await imageUploadUtil(url);

        res.json({
            success: true,
            result,
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error uploading image",
        })
    }
};


// add a products
const addProduct = async (req, res) => {
    try {
        const { title, price, salePrice, description, image, stock, brand, category } = req.body;

        if (!title || !price || !salePrice || !description || !image || !stock || !brand || !category) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all fields",
            })
        }

        const newProduct = new Product({
            title, price, salePrice, description, image, stock, brand, category
        })

        await newProduct.save()
        res.status(201).json({
            success: true,
            message: "Product created successfully!",
            data: newProduct
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error adding product",
        })
    }
}


// get all products
const getProducts = async (req, res) => {
    try {
        const sort = req.query.sort ? JSON.parse(req.query.sort) : { title: 1 }

        const filters = {}

        req.query.category &&
            JSON.parse(req.query.category).length > 0 &&
            (filters.category = { $in: JSON.parse(req.query.category) });

        req.query.brand &&
            JSON.parse(req.query.brand).length > 0 &&
            (filters.brand = { $in: JSON.parse(req.query.brand) });


        // console.log('sort: ', sort, 'filters: ', filters);

        const products = await Product.find(filters).sort(sort)
        res.status(200).json({
            success: true,
            message: "products fetch successfully.",
            data: products
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error fetching product",
        })
    }
}

// update a product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, price, salePrice, description, image, stock, brand, category } = req.body;
        const findProduct = await Product.findById(id);
        if (!findProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        findProduct.title = title || findProduct.title;
        findProduct.price = price === '' ? 0 : price || findProduct.price;
        findProduct.salePrice = salePrice === '' ? 0 : salePrice || findProduct.salePrice;
        findProduct.description = description || findProduct.description;
        findProduct.image = image || findProduct.image;
        findProduct.stock = stock != null ? stock : findProduct.stock;
        findProduct.brand = brand || findProduct.brand;
        findProduct.category = category || findProduct.category;

        await findProduct.save()
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: findProduct
        })


    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: "Error update product",
        })
    }
}

// delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const findProduct = await Product.findByIdAndDelete(id);
        if (!findProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: findProduct
        })

    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false,
            message: "Error delete product",
        })
    }
}

// get product details
const getProductDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const findProduct = await Product.findById(id)

        if (!findProduct) {
            return res.status(404).json({
                success: false,
                message: "product not found!"
            })
        }

        // console.log(findProduct);
        res.status(200).json({
            success: true,
            message: "products got succcessfully.",
            data: findProduct
        })

    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: "Error finding product",
        })
    }
}




export { handleImageUpload, addProduct, getProducts, updateProduct, deleteProduct, getProductDetails }