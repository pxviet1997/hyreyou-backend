import { JWT_SECRET } from "../../constants/index.js";
import jwt from 'jsonwebtoken';
import Business from "../../models/Business.js";
import Talent from "../../models/Talent.js";

export const checkUser = async (req, res, next) => {
  const { email, password } = req.body;

  const userTalent = await Talent.findOne({ email });
  const userBusiness = await Business.findOne({ email });

  const user = userTalent ? userTalent : userBusiness;
  const userType = userTalent ? 'Talent' : 'Business';

  if (!user) return res.status(401).json({ message: 'User does not exist!' });
  if (!user.verified) return res.status(401).json({ message: "User is not verified! Please check your email for verification" });

  req.user = user;
  req.userType = userType;
  if (password) req.password = password;

  next();
};

export const verifyToken = async (req, res, next) => {
  const { authentication } = req.headers;
  const token = authentication.split(' ')[1];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ message: "Unauthorized!" });
    }
    res.token = token;
    next();
  });
};

export const getPayload = async (req, res, next) => {
  const { token } = req.query;
  // console.log(token);
  const base64Payload = token.split('.')[1];
  let payload = Buffer.from(base64Payload, 'base64');
  payload = JSON.parse(payload.toString());

  req._id = payload.id;
  next();
}
