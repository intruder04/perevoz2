import express from 'express';
import authenticate from '../middlewares/authenticate';
import User from '../models/user';

let router = express.Router();

router.get('/', authenticate, (req, res) => { //check token
    console.log("router calls");
    User.query({
        select: ['id', 'username', 'email']
    }).fetchAll().then(calls => {
        if (calls) {
            res.json({ calls });
        } else {
            res.status(401).json({ errors: { form: "Неверные данные авторизации"} });
        }
    });
});

export default router;