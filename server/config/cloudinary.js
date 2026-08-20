import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Article covers, sermon thumbnails, book covers, profile-style photos.

const imageStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'GCBC/images',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transfomation: [{width:1600, crop:'limit'}],
    },
});

// Book PDFs 
const fileStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder:'GCBC/books',
        resource_type:'raw',
        allowed_formats:['pdf'],

    },
});

export const uploadImage = multer({ storage: imageStorage});
export const uploadFile = multer({ storage: fileStorage});

export default cloudinary;