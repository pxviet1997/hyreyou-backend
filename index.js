import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/StartRoutes/start_index.js';
import talentRoutes from './routes/TalentRoutes/talent_index.js';
import businessRoutes from './routes/BusinessRoutes/business_index.js';
import { CONNECTION_URL, PORT } from './constants/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", userRoutes);
app.use('/talent', talentRoutes);
app.use('/business', businessRoutes);

// const CONNECTION_URL = "mongodb+srv://HyreYou:HyreYou@cluster0.qm47w.mongodb.net/HyreYou?retryWrites=true&w=majority";
// const PORT = process.env.PORT || 5000;

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

// mongoose.set('useFindAndModify', false);

