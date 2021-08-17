import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import talentRoutes from './routes/TalentRoutes/talent_index.js';
import businessRoutes from './routes/BusinessRoutes/business_index.js';

const app = express();

app.use('/talent', talentRoutes);
//app.use('/business', businessRoutes);

app.use(bodyParser.json({size: "30mb" , extended : true}));
app.use(bodyParser.urlencoded({size: "30mb", extended : true}));
app.use(cors());

const CONNECTION_URL = "mongodb+srv://HyreYou:HyreYou@cluster0.qm47w.mongodb.net/HyreYou?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`server running on port : ${PORT}`)))
.catch((error) => console.log("error.message"));

mongoose.set('useFindAndModify' , false);

