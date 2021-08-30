import bcrypt from 'bcrypt';
import express from 'express';
import Business from "../../models/Business.js";
import Talent from "../../models/Talent.js";
import { smtpTransport } from '../../emailServer/index.js';

export const signupAuthVerification = async (req, res) => {
  let { firstName, lastName, email, password, userType, mobileNumber } = req.body;

  if (!(email && password)) {
    res.status(400).send({ error: "Data not formatted properly" });
    return;
  }
  const checkUserExist = await Talent.findOne({ email }).countDocuments();
  console.log(checkUserExist);

  if (!checkUserExist === 0) {
    res.status(401).json({ error: "User already exist" });
    return;
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

  await sendVerificationEmail(email, id);


}

// login route
export const loginAuthVerification = async (req, res) => {
  const body = req.body;
  // console.log(req.body);
  const userTalent = await Talent.findOne({ email: body.email });
  const userBusiness = await Business.findOne({ email: body.email });
  let user = null;

  // console.log(userTalent);
  // console.log(userBusiness);

  if (!userTalent && !userBusiness) {
    // console.log(null);
    res.status(401).json({ error: "User does not exist", login: false, });
    return;
  }

  if (!userTalent.verified || !userBusiness.verified) {
    console.log('not verify');
    res.status(401).json({ error: "User is not verified!", login: false, });
    return;
  }

  console.log('hi');

  userTalent ? user = userTalent : user = userBusiness;

  const validPassword = await bcrypt.compare(body.password, user.password);
  if (!validPassword) {
    res.status(400).json({ message: "Invalid Password!", login: false, });
    return;
  }
  res.status(200).json({
    message: "Valid password",
    login: true,
    data: user
  });
  // check user password with hashed password stored in the database

}

export const resetPasword = async (req, res) => {
  const { email } = req.body;
  const userTalent = await Talent.findOne({ email });
  const userBusiness = await Business.findOne({ email });
  let id = '';

  if (!userTalent && !userBusiness) {
    res.status(200).json({
      message: 'User does not exist!'
    });
    return;
  }
  if (userTalent) {
    id = userTalent._id;
  }
  else {
    id = userBusiness._id;
  }

  const host = 'http://localhost:3000';
  const link = `${host}/auth/resetPassword?user=${id}`;
  const mailOptions = {
    // to: email,
    to: 'vietphamtesting@gmail.com',
    subject: "Reset Password",
    html: `<p>Please Click on the link to reset your password</p>
           <a href=${link}>Verify</a>
    `,
  }

  try {
    const response = await smtpTransport.sendMail(mailOptions);
    console.log("Message sent: " + response.messageId);
    // res.end("sent");
  } catch (error) {
    console.log(error);
    // res.end("error");
  }
}

// send a verification email
export const sendVerificationEmail = async (sendTo, id) => {
  const host = 'http://localhost:3000';
  const link = `${host}/verify/${id}`;
  const mailOptions = {
    to: sendTo,
    // to: 'vietphamtesting@gmail.com',
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
  console.log("Domain is matched. Information is from Authentic email");
  const { _id } = req.query;
  const userTalent = await Talent.findOne({ _id });
  const userBusiness = await Business.findOne({ _id });

  if (!userTalent && !userBusiness) {
    res.status(400).json({ error: "Unable to verify user!" });
    return;
  }

  if (userTalent) {
    await Talent.findOneAndUpdate({ _id }, { verified: true });
  }
  else await Business.findOneAndUpdate({ _id }, { verified: true });

  res.status(200).send('User verified!');

}



