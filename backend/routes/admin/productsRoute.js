import express from 'express'
import { addProduct, deleteProduct, getProductDetails, getProducts, handleImageUpload, updateProduct } from '../../controllers/admin/productsController.js'
import { upload } from '../../helpers/cloudinary.js'

const router = express.Router()

router.post("/upload-image", upload.single("my_file"), handleImageUpload)
router.post("/add", addProduct)
router.put("/update/:id", updateProduct)
router.delete("/delete/:id", deleteProduct)
router.get("/get", getProducts)
router.get("/get/:id", getProductDetails)



export default router