import bcrypt from 'bcrypt';
import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
//import UserLogin from "../../models/UserLogin.js";
import Business from "../../models/Business.js";
import Talent from "../../models/Talent.js";
import Login from "../../models/Login.js";
const jwttoken="HyreYouMongo@123456789^-abcdefghij";

//const JWT_SECRET=process.env.jwttoken;
const JWT_SECRET=jwttoken;

// signup route
export const signupAuthVerification = async (req, res) => {
  const {firstName, lastName, email, password, userType, mobileNumber} = req.body;

  if (!(email && password)) {
    return res.status(400).send({ error: "No Data  properly" });
  }
  const checkUserExist = await Talent.findOne({ email }).countDocuments();
console.log(checkUserExist);

 if(!checkUserExist ==1){

const salt = await bcrypt.genSalt(10);
const hashPassword = await bcrypt.hash(password, salt);

  if (userType === 'Talent') {
      const newTalent = new Talent({firstName, lastName,email, password: hashPassword,mobileNumber});
      newTalent.save().then((doc) => res.status(201).send(doc));
  }
  else {
      const newBusiness = new Business({firstName, lastName,email, password: hashPassword,mobileNumber});
      newBusiness.save().then((doc) => res.status(201).send(doc));
  }
  }else{
    res.status(401).json({ error: "User already exist" });

 }
}

const createTokenLogin = async (email,password,_id)=>{
  try {
    const token = jwt.sign({id:_id,email},JWT_SECRET)
          //console.log("token---"+token);
            return {status:'ok',data:token}
        
  } catch (error) {
      console.log(error);
      return {status:'error',error:'timed out'}
  }
}

// login route
export const loginAuthVerification = async (req, res) => {
  const body = req.body;
 
  const user = await Talent.findOne({ email: body.email });

  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(body.password, user.password);
   
    if (validPassword) {
      const response = await createTokenLogin(user.email,body.password,user._id);
    if(response.status==='ok'){
        // storing our JWT web token as a cookie in our browser
        res.cookie('token',response.data,{ maxAge: 1 * 60 * 60 * 1000, httpOnly: true });  // maxAge: 1 hours
       
        res.status(200).json({status:'ok',data:response.data});
    }
          } else {
      res.status(400).json({ error: "Invalid Password" });
    }
  } else {
    res.status(401).json({ error: "User does not exist" });
  }
}

export const loginBusinessAuthVerification = async (req, res) => {
    const body = req.body;
    console.log(req.body);
    const user = await Business.findOne({ email: body.email });
  
    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        const response = await createTokenLogin(user.email,body.password,user._id);
    if(response.status==='ok'){
        // storing our JWT web token as a cookie in our browser
        res.cookie('token',response.data,{ maxAge: 1 * 60 * 60 * 1000, httpOnly: true });  // maxAge: 1 hours
       
        res.status(200).json({status:'ok',data:response.data});
    }
        //res.status(200).json({ message: "Valid password" });
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
  }



