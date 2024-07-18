import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './Routes/route.js';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const app=express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api',apiRoutes);
app.listen(5000, () => {
    console.log('Server started at http://localhost:5000');
}
);
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log("connection error", error.message);
});