import express from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config.js';

let router = express.Router();

router.post('/', (req, res) => {
    console.log("router auth");
    const { identifier, password } = req.body;

    User.query({
        where: { username: identifier },
        orWhere: { email: identifier }
    }).fetch().then(user => {
        if (user) {
            if (bcrypt.compareSync(password, user.get('password_digest'))) {
                const token = jwt.sign({
                    id: user.get('id'),
                    username: user.get('username'),
                    role: user.get('role')
                }, config.jwtSecret);
                res.json({ token });
            } else {
                res.status(401).json({ errors: { form: "Неверные данные авторизации"} });
            }
        } else {
            res.status(401).json({ errors: { form: "Неверные данные авторизации"} });
        }
    });
});

export default router;