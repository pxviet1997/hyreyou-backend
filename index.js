const {MongoClient} = require('mongodb');
const express = require('express');
const mongoose =require('mongoose');


// const url = "mongodb+srv://raviaswanth:20440149@cluster0.6dqwv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(url, { useUnifiedTopology: true }); 
// client.connect().then(client =>client.db().admin().listDatabases())
//   .then(dbs => {
//     console.log("Mongo databases", dbs);
//   })
//   .finally(() => client.close()); 


async function main(){

    const uri = 'mongodb+srv://raviaswanth:20440149@cluster0.6dqwv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const client =new MongoClient(uri);

try{
    await client.connect();
   console.log("connected");
    await checkUsernameandPassword(client, {
        loginUserName : 'arroyocolton@gmail.com',
        loginPasswordName : 'arroyocolton',
    });

}catch(e){
    console.log("error   "+e);
}finally{
    console.log("Done Connecting");
    await client.close();
}
}
 main().catch("err!!!!  "+console.error);

async function listDatabase(client){
const databasesList = await client.db().admin().listDatabases();
console.log("Database :");
databasesList.databases.forEach(db => {
    console.log("Printing ____"+`-${db.name}`);

})

}


async function checkUsernameandPassword(client,{
    loginUserName= "",
    loginPasswordName= "",
}){
    
    const result =await client.db("HyruYou").collection("Talents").findOne({email:loginUserName});
    
    if (result){
        console.log(`Found listing : '${loginUserName}'`);
        console.log(result);
     } else{
        console.log("No Listing");
     }
    
   
    
    }
    
