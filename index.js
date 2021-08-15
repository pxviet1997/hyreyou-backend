import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import talentRoutes from './routes/TalentRoutes';
import businessRoutes from './routes/BusinessRoutes/index_Business.js';

const app = express();

app.use('/talent', talentRoutes);
app.use('/business', businessRoutes);

app.use(bodyParser.json({size: "30mb" , extended : true}));
app.use(bodyParser.urlencoded({size: "30mb", extended : true}));
app.use(cors());

const CONNECTION_URL = "mongodb+srv://HyreYou:HyreYou@cluster0.qm47w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`server running on port : ${PORT}`)))
.catch((error) => console.log("error.message"));

mongoose.set('useFindAndModify' , false);






// async function main(){

//     const uri = 'mongodb+srv://raviaswanth:20440149@cluster0.6dqwv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// const client =new MongoClient(uri);

// try{
//     await client.connect();
//    console.log("connected");
//     await checkUsernameandPassword(client, {
//         loginUserName : 'arroyocolton@gmail.com',
//         loginPasswordName : 'arroyocolton',
//     });

// }catch(e){
//     console.log("error   "+e);
// }finally{
//     console.log("Done Connecting");
//     await client.close();
// }
// }
//  main().catch("err!!!!  "+console.error);

// async function listDatabase(client){
// const databasesList = await client.db().admin().listDatabases();
// console.log("Database :");
// databasesList.databases.forEach(db => {
//     console.log("Printing ____"+`-${db.name}`);

// })

// }


// async function checkUsernameandPassword(client,{
//     loginUserName= "",
//     loginPasswordName= "",
// }){
    
//     const result =await client.db("HyruYou").collection("Talents").findOne({email:loginUserName});
    
//     if (result){
//         console.log(`Found listing : '${loginUserName}'`);
//         console.log(result);
//      } else{
//         console.log("No Listing");
//      }
    
   
    
//     }
    
