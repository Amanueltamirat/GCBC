import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const isAuth = (req, res, next) =>{
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if(!token) {
        return res.status(401).send({
            message: 'Please sign in.'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (
        err, decoded) =>{
            if(err) {
                return res.status(401).send({message: 'Your session has expired. Please sign in again.'});
            }
            req.user = decoded;
            next();
        });
};

export const isAdmin = (req, res, next) =>{
    if(req.user?.role === 'admin') return next();
    return res.status(403).send({ message: 'Admin access required.'})
}

export const isMember = async(req, res, next) =>{
    try {
        const user = await User.findById(req.user._id).
        select('status role');

        if(!user || user.status !== 'approved'){
            return res.status(403).send({ message: 'Members only.'})
        }
        next()
    } catch (error) {
        res.status(500).send({message: 'Could not verify membership.'});
    }
};