import multer from "multer";
import express from "express";
import { isAuth } from "../utils.js";

const uploadRouter = express();

const storage = multer.diskStorage({
    destination(req,res,cb){
        cb(null, 'uploads/');
    },
    filename(req, file, cb){
        cb(null, `${Date.now()}.jpg`)
    },
})

const upload = multer({storage});

uploadRouter.post('/', isAuth, upload.single('image'), (req, res ) => {
    res.send(`/${req.file.path}`);
})

export default uploadRouter;
