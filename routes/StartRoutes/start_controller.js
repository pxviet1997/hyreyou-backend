import bcrypt from 'bcrypt';
import express from 'express';
//import UserLogin from "../../models/UserLogin.js";
import Business from "../../models/Business.js";
import Talent from "../../models/Talent.js";

//import router = express.Router();
// signup route
export const signupAuthVerification = async (req, res) => {
  const { firstName, lastName, email, password, userType, mobileNumber } = req.body;
  // first_name, last_name, email, userType, password

  if (!(email && password)) {
    return res.status(400).send({ error: "Data not formatted properly" });
  }
  const checkUserExist = await Talent.findOne({ email }).countDocuments();
  console.log(checkUserExist);

  if (!checkUserExist == 1) {
    // const user = new User({email, password});
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    const hashPassword = await bcrypt.hash(password, salt);
    //  user.save().then((doc) => res.status(201).send(doc));
    if (userType === 'Talent') {
      const newTalent = new Talent({ firstName, lastName, email, password: hashPassword, mobileNumber });
      newTalent.save().then((doc) => res.status(201).send(doc));
    }
    else {
      const newBusiness = new Business({ firstName, lastName, email, password: hashPassword, mobileNumber });
      newBusiness.save().then((doc) => res.status(201).send(doc));
    }
    // generate salt to hash password


  } else {
    res.status(401).json({ error: "User already exist" });

  }


}

// login route
export const loginAuthVerification = async (req, res) => {
  const body = req.body;
  console.log(req.body);
  const user = await Talent.findOne({ email: body.email });


  // console.log(user);
  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (validPassword) {
      res.status(200).json({ message: "Valid password" });
    } else {
      res.status(400).json({ error: "Invalid Password" });
    }
  } else {
    res.status(401).json({ error: "User does not exist" });
  }
}



