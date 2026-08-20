import express from 'express';
import { isAdmin, isAuth } from '../middleware/auth.js';
import { uploadImage, uploadFile } from '../config/cloudinary.js';

const router = express.Router();

router.post('/image', isAuth, isAdmin, uploadImage.single('image'),
(req, res) => {
    if(!req.file) {
        return res.status(400).send({message: 'No image file provided.'});
    }
    res.send({url: req.file.path, publicId: req.file.filename});
});

router.post('/file', isAdmin, isAuth, uploadFile.single('file'), (req, res) =>{
    if(!req.file) {
        return res.status(400).send({
            message: 'No file provided.'
        })
    }
    res.send({
        url: req.file.path, publicId: req.file.filename
    })
});

router.use((err, req, res, next) => {
    if(err) {
        return res.status(400).send( {
            message: err.message || 'Upload failed'
        })
    }
    next()
});
export default router