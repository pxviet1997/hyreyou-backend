import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Business from "../../models/Business.js";
import Talent from "../../models/Talent.js";
import { smtpTransport } from '../../emailServer/index.js';
import { JWT_SECRET } from '../../constants/index.js';

//verify Token
export const verifyToken = (token) => {
  try {
    const verify = jwt.verify(token, JWT_SECRET);
    if (verify.type === 'user') { return true; }
    else { return false };
  } catch (error) {
    console.log(JSON.stringify(error), "error");
    return false;
  }
}

const createTokenLogin = async (email, password, id) => {
  try {
    const token = jwt.sign({ id, email }, JWT_SECRET)
    return { status: 'ok', token }

  } catch (error) {
    console.log(error);
    return { status: 'error', error: 'timed out' }
  }
}

// send a verification email
// export const sendVerificationEmail = async (sendTo, id) => {

// }

// signup route
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
  // console.log(password);
  let id = '', user = null;
  try {
    if (userType === 'Talent') {
      const newTalent = new Talent({ firstName, lastName, email, password, mobileNumber });
      await newTalent.save();
      user = newTalent;
      id = newTalent._id;

    }
    else {
      const newBusiness = new Business({ email, password, mobileNumber });
      await newBusiness.save();
      user = newBusiness;
      id = newBusiness._id;
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Unable to sign up! Please try again!' });
  }


  const host = 'http://localhost:3000';
  const link = `${host}/verify?_id=${id}&userType=${userType}`;
  const mailOptions = {
    to: email,
    // to: 'vietphamtesting@gmail.com',
    subject: "Please confirm your Email account",
    html: `<p>Please Click on the link to verify your email</p>
           <a href=${link}>Verify</a>`,
  }
  // console.log(mailOptions);
  try {
    const response = await smtpTransport.sendMail(mailOptions);
    console.log("Message sent: " + response.messageId);
    res.status(201).json({ message: 'An email has been sent. Please check you email inbox for account verification instruction' });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Unable to send verification email. Please check your email again!' });
  }
}

// login route
export const loginTalentAuthVerification = async (req, res) => {
  const body = req.body;
  try {
    const user = await Talent.findOne({ email: body.email });

    if (!user) return res.status(401).json({ error: "User does not exist! Please check your email" });
    if (!user.verified) return res.status(401).json({ error: "User is not verified! Please check your email for verification" });

    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (!validPassword) return res.status(400).json({ error: "Invalid Password! Please check your password" });

    const response = await createTokenLogin(user.email, body.password, user._id);
    if (response.status === 'ok') {
      // storing our JWT web token as a cookie in our browser
      res.cookie('token', response.token, { maxAge: 1 * 60 * 60 * 1000, httpOnly: true });  // maxAge: 1 hours

      res.status(200).json({
        status: 'ok',
        token: response.token,
        user
      });
    }
  } catch (error) {
    return res.status(500).send({ message: error });
  }


}

export const loginBusinessAuthVerification = async (req, res) => {
  try {
    const body = req.body;
    const user = await Business.findOne({ email: body.email });

    if (!user) return res.status(401).json({ error: "User does not exist! Please check your email" });
    if (!user.verified) return res.status(401).json({ error: "User is not verified! Please check your email for verification" });

    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (!validPassword) return res.status(400).json({ error: "Invalid Password! Please check your password" });

    const response = await createTokenLogin(user.email, body.password, user._id);
    if (response.status === 'ok') {
      // storing our JWT web token as a cookie in our browser
      res.cookie('token', response.token, { maxAge: 1 * 60 * 60 * 1000, httpOnly: true });  // maxAge: 1 hours

      res.status(200).json({
        status: 'ok',
        token: response.token,
        user
      });
    }
  } catch (error) {
    return res.status(500).send({ message: error });
  }

}

export const resetPasword = async (req, res) => {
  const { email } = req.body;
  const userTalent = await Talent.aggregate([{ $match: { email } }]);
  const userBusiness = await Business.aggregate([{ $match: { email } }]);

  if (!userTalent && !userBusiness) return res.status(401).json({ message: 'User does not exist!' });

  const id = userTalent ? userTalent._id : userBusiness._id;
  const userType = userTalent ? 'talent' : 'business';

  const host = 'http://localhost:3000';
  const link = `${host}/forgot?id=${id}&usertype=${userType}`;
  const mailOptions = {
    to: email,
    subject: "Reset Password",
    html: `<p>Please Click on the link to reset your password</p>
           <a href=${link}>Verify</a>`,
  }

  try {
    const response = await smtpTransport.sendMail(mailOptions);
    console.log('Message sent: ' + response.messageId);
    res.status(200).json({ message: 'An email has been sent! Please check your email inbox for reset password instruction' });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Unable to email for resetting. Please check your email again!' })
    // res.end("error");
  }
}

export const verifyEmail = async (req, res) => {
  console.log("Domain is matched. Information is from Authentic email");
  const { _id, userType } = req.query;

  try {
    const user = userType === 'Talent' ? await Talent.findOne({ _id }) : await Business.findOne({ _id });

    if (!user) {
      res.status(400).json({ error: "Unable to verify user!" });
      return;
    }

    user.verified = true;
    await user.save();

    res.status(200).send('User verified!');
  } catch (error) {
    res.status(400).json({ message: 'There is an error with verification. Please try again' });
  }


}

export const changePassword = async (req, res) => {
  let { _id, password, userType } = req.body;
  console.log(_id);

  const user = userType === 'talent' ? await Talent.findById(_id) : await Business.findById(_id);

  if (!user) return res.status(401).json({ message: 'Unable to change password' });

  const validPassword = await bcrypt.compare(password, user.password)

  if (validPassword) return res.status(201).json({ message: 'Same password' });

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  user.password = password;
  await user.save();

  res.status(201).json({ message: 'Password updated!' });

}



