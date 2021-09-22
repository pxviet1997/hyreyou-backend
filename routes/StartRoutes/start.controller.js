import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Business from "../../models/Business.js";
import Talent from "../../models/Talent.js";
import { smtpTransport } from '../../emailServer/index.js';
import { JWT_SECRET } from '../../constants/index.js';

//verify Token
// export const verifyToken = (token) => {
//   try {
//     const verify = jwt.verify(token, JWT_SECRET);
//     if (verify.type === 'user') { return true; }
//     else { return false };
//   } catch (error) {
//     console.log(JSON.stringify(error), "error");
//     return false;
//   }
// }

// signup route
export const signupAuthVerification = async (req, res) => {
  let { firstName, lastName, email, password, userType, mobileNumber } = req.body;

  const checkUserExist = userType === 'Talent'
    ? await Talent.findOne({ email })
    : await Business.findOne({ email });

  if (checkUserExist) return res.status(401).json({ message: "An user with this email has already existed! Please try again with different email" });

  const salt = await bcrypt.genSalt(10);

  // now we set user password to hashed password
  password = await bcrypt.hash(password, salt);

  let id = '';
  try {
    const newUser = userType === 'Talent'
      ? new Talent({ firstName, lastName, email, password, mobileNumber, userType })
      : new Business({ email, password, mobileNumber, userType });
    await newUser.save();
    //   user = newTalent;
    id = newUser._id;

  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Unable to sign up! Please try again!' });
  }

  const host = 'http://localhost:3000';
  const link = `${host}/verify?_id=${id}&userType=${userType}`;
  const mailOptions = {
    to: email,
    subject: "Please confirm your Email account",
    html: `<p>Please Click on the link to verify your email</p>
           <a href=${link}>Verify</a>`,
  }

  try {
    const response = await smtpTransport.sendMail(mailOptions);
    console.log("Message sent: " + response.messageId);
    res.status(201).json({ message: 'An email has been sent. Please check you email inbox for account verification instruction' });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Unable to send verification email. Please check your email again!' });
  }
}

export const loginAuthVerification = async (req, res) => {
  try {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(req.password, req.user.password);
    if (!validPassword) return res.status(400).json({ message: "Invalid Password! Please check your password" });

    const token = jwt.sign({ id: req.user._id, email: req.body.email }, JWT_SECRET);

    // storing our JWT web token as a cookie in our browser
    res.cookie('token', token, { maxAge: 1 * 60 * 60 * 1000, httpOnly: true });  // maxAge: 1 hours

    res.status(200).json({
      token,
      user: req.user,
      // userType: req.userType
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
}

export const resetPasword = async (req, res) => {
  const id = req.user._id;

  const host = 'http://localhost:3000';
  const link = `${host}/forgot?id=${id}&type=${req.userType}`;
  const mailOptions = {
    to: req.body.email,
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
      res.status(400).json({ message: "Unable to verify user!" });
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

  const user = userType === 'Talent' ? await Talent.findById(_id) : await Business.findById(_id);
  // console.log(user);

  if (!user) return res.status(401).json({ message: 'Unable to change password' });

  const validPassword = await bcrypt.compare(password, user.password)

  if (validPassword) return res.status(201).json({ message: 'Same password' });

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  user.password = password;
  await user.save();

  res.status(201).json({ message: 'Your Password is updated!', changed: true });

}



