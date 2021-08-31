import { } from 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
// import jwt from 'jsonwebtoken';
// import multer from 'multer';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/StartRoutes/start.index.js';
import talentRoutes from './routes/TalentRoutes/talent_index.js';
import businessRoutes from './routes/BusinessRoutes/business_index.js';
import uploadRoutes from './routes/upload/upload_index.js';

import { CONNECTION_URL, PORT } from './constants/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Set EJS as templating engine
app.set("view engine", "ejs");

app.use("/auth", userRoutes);
app.use('/talent', talentRoutes);
app.use('/business', businessRoutes);
app.use('/updateImage', uploadRoutes);

mongoose.connect(CONNECTION_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
).then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`Server running on port : ${PORT}`))
}).catch((error) => console.log(error.message));

