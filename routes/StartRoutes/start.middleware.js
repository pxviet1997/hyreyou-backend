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

  // console.log(user);

  // return { user, userType };
}