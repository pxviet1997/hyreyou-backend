import { } from 'dotenv/config';
//require('dotenv/config');
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import multer from 'multer';
//require ('dotenv').config();
import cookieParser from 'cookie-parser';
import userRoutes from './routes/StartRoutes/start_index.js';
import talentRoutes from './routes/TalentRoutes/talent_index.js';
import businessRoutes from './routes/BusinessRoutes/business_index.js';
import uploadRoutes from './routes/upload/upload_index.js';

const app = express();



app.use(bodyParser.json({ size: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ size: "30mb", extended: true }));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Set EJS as templating engine
app.set("view engine", "ejs");

app.use("/auth", userRoutes);
app.use('/talent', talentRoutes);
app.use('/business', businessRoutes);
//app.use('/updateImage',multer(uploadRoutes));
app.use('/updateImage', uploadRoutes);

const CONNECTION_URL = "mongodb+srv://HyreYou:HyreYou@cluster0.qm47w.mongodb.net/HyreYou?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;



mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`server running on port : ${PORT}`)))
    .catch((error) => console.log("error.message"));

mongoose.set('useFindAndModify', false);

