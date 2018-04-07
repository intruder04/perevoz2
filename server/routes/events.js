import express from 'express';
import authenticate from '../middlewares/authenticate';


let router = express.Router();

router.post('/', authenticate, (req, res) => { //check token
    // console.log(req);
    // res.status(201).json({ success: req.currentUser }); //currentUser from authenticate
    res.status(201).json({ success: true });
});

export default router;