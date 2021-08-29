import bcrypt from 'bcrypt';
import express from 'express';
import Business from "../../models/Business.js";
import Talent from "../../models/Talent.js";
import { smtpTransport } from '../../emailServer/index.js';

export const signupAuthVerification = async (req, res) => {
  let { firstName, lastName, email, password, userType, mobileNumber } = req.body;

  if (!(email && password)) {
    return res.status(400).send({ error: "Data not formatted properly" });
  }
  const checkUserExist = await Talent.findOne({ email }).countDocuments();
  console.log(checkUserExist);

  if (!checkUserExist === 0) {
    return res.status(401).json({ error: "User already exist" });
  }

  const salt = await bcrypt.genSalt(10);

  // now we set user password to hashed password
  password = await bcrypt.hash(password, salt);
  console.log(password);
  let id = '';

  if (userType === 'Talent') {
    const newTalent = new Talent({ firstName, lastName, email, password, mobileNumber });
    await newTalent.save();
    res.status(201).send(newTalent);
    // console.log(newTalent);
    id = newTalent._id;

  }
  else {
    const newBusiness = new Business({ firstName, lastName, email, password, mobileNumber });
    await newBusiness.save();
    res.status(201).send(newBusiness);
    id = newBusiness._id;
  }

  await sendVerificationEmail(id)


}

// login route
export const loginAuthVerification = async (req, res) => {
  const body = req.body;
  console.log(req.body);
  const user = await Talent.findOne({ email: body.email });

  if (!user) {
    return res.status(401).json({ error: "User does not exist" });
  }

  if (!user.verified) {
    return res.status(401).json({ error: "User is not verified" });
  }

  // check user password with hashed password stored in the database
  const validPassword = await bcrypt.compare(body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: "Invalid Password" });
  }
  res.status(200).json({
    message: "Valid password",
    data: user
  });

}

export const resetPasword = async (req, res) => {

}

// send a verification email
export const sendVerificationEmail = async (id) => {
  // const rand = Math.floor((Math.random() * 100) + 54);
  const host = 'http://localhost:5000';
  const link = `${host}/auth/verify?id=${id}`;
  const mailOptions = {
    // to: sendTo,
    to: 'vietphamtesting@gmail.com',
    subject: "Please confirm your Email account",
    html: `<p>Please Click on the link to verify your email</p>
           <a href=${link}>Verify</a>
    `,
  }
  // console.log(mailOptions);
  try {
    const response = await smtpTransport.sendMail(mailOptions);
    console.log("Message sent: " + response.messageId);
    // res.end("sent");
  } catch (error) {
    console.log(error);
    // res.end("error");
  }
}

export const verifyEmail = async (req, res) => {
  // console.log(req.protocol + ":/" + req.get('host'));
  // if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
  console.log("Domain is matched. Information is from Authentic email");
  const _id = req.query.id;
  const userTalent = await Talent.findOne({ _id });
  const userBusiness = await Business.findOne({ _id });

  if (!userTalent && !userBusiness) {
    return res.status(400).json({ error: "Unable to verify user!" });
  }

  if (userTalent) {
    await Talent.findOneAndUpdate({ _id }, { verified: true });
  }
  else await Business.findOneAndUpdate({ _id }, { verified: true });

  res.status(200).send('User verified!');


}



