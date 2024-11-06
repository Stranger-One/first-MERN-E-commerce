import { v2 as cloudinary } from 'cloudinary';
import multer from "multer"


// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new multer.memoryStorage();

// Upload an image
const imageUploader = async (file) => {
    const uploadResult = await cloudinary.uploader.upload(file, {resource_type: 'auto',})
    return uploadResult;
};

const upload = multer({storage})

export {upload, imageUploader}

