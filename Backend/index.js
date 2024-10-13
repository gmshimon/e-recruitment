import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import path from 'path'
import { fileURLToPath } from 'url';
import fs from 'fs'

// Define __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const port = process.env.PORT || 5000

const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))

app.use(express.json())
app.use(bodyParser.json());

const uri = 'mongodb://localhost:27017/e-recruitment'
mongoose.connect(uri).then(()=>{
    console.log("Connected to MongoDB")
})

import UserRouter from './Modules/User/user.routes.js'

app.use('/api/v1/user',UserRouter)

app.get('/',(req,res)=>{
    res.send("Hello World!")
})

app.get('/images/User/image/:filename',async(req,res)=>{
    const {filename} = req.params
    const imagePath = path.join(__dirname,'./images/User/image',filename)   
    res.sendFile(imagePath)
})

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})

export default app