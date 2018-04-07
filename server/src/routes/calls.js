import express from 'express';
import authenticate from '../middlewares/authenticate';
import User from '../models/user';

let router = express.Router();

router.get('/', authenticate, (req, res) => { //check token
    // console.log(req);
    // res.status(201).json({ success: req.currentUser }); //currentUser from authenticate
    // res.status(201).json({ success: true });

    console.log("router calls");
    // const { identifier, password } = req.body;

    User.query({
        select: ['id', 'username', 'email']
    }).fetchAll().then(user => {
        // console.log(user);
        if (user) {
            res.json({ user });
            // if (bcrypt.compareSync(password, user.get('password_digest'))) {
            //     const token = jwt.sign({
            //         id: user.get('id'),
            //         username: user.get('username')
            //     }, config.jwtSecret);
            //     res.json({ token });
            // } else {
            //     res.status(401).json({ errors: { form: "Неверные данные авторизации"} });
            // }
        } else {
            res.status(401).json({ errors: { form: "Неверные данные авторизации"} });
        }
    });
});

export default router;