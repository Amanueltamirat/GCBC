import jwt from 'jsonwebtoken';

export const generateToken  = (user) =>
    jwt.sign(
        {_id: user._id, name: user.name, email: user.email, role:user.role},
        process.env.JWT_SECRET,
        { expiresIn: '7d'}
    )