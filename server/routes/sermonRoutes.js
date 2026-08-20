import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Sermon from '../models/Sermon.js';
import { isAuth, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get(
    '/',
    expressAsyncHandler( async(req, res) => {
        const sermons = await Sermon.find({}).sort({ createdAt: -1});
        res.send(sermons)
    })
);

router.get(
    '/:id',
    expressAsyncHandler(async(req, res) =>{
        const sermon = await Sermon.findOne(req.params.id);
        if(!sermon) return res.status(404).send({
            message:'Sermon not found.'
        });
        res.send(sermon);
    })
);

router.post(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async(req, res) =>{
        const {title, preacher, series, scripture, youtubeId, description} = req.body;
        if(!title || !preacher) {
            return res.status(400).send({
                message: 'Title and preacher are required'
            })
        }

        const sermon = await Sermon.create({
            title,
            preacher,
            series,
            scripture,
            youtubeId,
            description
        })
        res.status(201).send(sermon)
    })
)

router.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async(req, res) => {
        const sermon = await Sermon.findById(req.params.id);
        if(!sermon) return res.status(404).send({
            message:'Sermon not found.'
        });

        const { title, preacher, series, scripture, youtubeId, description} = req.body;
        if(title !== undefined) sermon.title = title;
        if(preacher !== undefined) sermon.preacher = preacher;
        if(series !== undefined) sermon.series = series;
        if(scripture !== undefined) sermon.scripture = scripture;
        if( youtubeId !== undefined) sermon.youtubeId = youtubeId;
        if(description !== undefined) sermon.description = description;

        const updated = await sermon.save();
        res.send(updated);

    })
);

router.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async(req, res) => {
        const sermon = await Sermon.findByIdAndDelete(req.params.id);
        if(!sermon) return res.status(404).send({
            message: 'Sermon not found.'
        });
        res.send({message: 'Sermon deleted.'})
    })
);

export default router;