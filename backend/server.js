import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRoute.js";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRouter.js";

dotenv.config();
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true}))
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amzona');

app.use('/api/uploads/',uploadRouter);
app.use('/api/users',userRouter);
app.use('/api/products',productRouter);
app.use('/api/orders',orderRouter);
app.get('/api/config/paypal',(req,res)=>{
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
})
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use((err,req,res,next)=>{
  res.status(500).send({message:err.message});
})

const port = process.env.port || 5000;

app.listen(port, () => {
  console.log(`server running at http://localhost:${5000}`);
});
