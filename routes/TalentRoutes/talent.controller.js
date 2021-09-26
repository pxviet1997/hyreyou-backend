import Business from "../../models/Business.js";
import Talent from "../../models/Talent.js";


export const getTalent = async (req, res) => {
  const { _id } = req.body;

  try {

    const talent = await Talent.findById(_id);
    res.status(200).json(talent);
  } catch (error) {
    res.status(404).json({ message: error.message })
  }

}

export const createTalent = async (req, res) => {
  const body = req.body;

  const newTalent = new Talent(body);
  try {
    const checkUserExist = await Talent.findOne({ $or: [{ email }, { mobileNumber }] }).countDocuments();
    if (!checkUserExist == 1) {
      await newTalent.save();
      res.status(201).json(newTalent);
    } else {

      res.status(401).json({ message: "Talent already exist with this Details" });
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}


export const updateTalent = async (req, res) => {
  try {
    const { _id, info } = req.body;

    const talent = await Talent.findOneAndUpdate({ _id }, info, { new: true });

    res.status(201).json({
      user: talent,
      message: 'Personal Details are updated!'
    });

  } catch (error) {
    console.log(error);
    res.status(409).json({ message: 'Unable to update the Personal Details!' });
  }
}

export const addJobHistory = async (req, res) => {
  try {
    console.log(req.body);
    const { _id, newJob } = req.body;
    const user = await Talent.findOneAndUpdate(
      { _id },
      { $push: { jobHistory: newJob } },
      { new: true }
    );
    res.status(200).json({
      user,
      message: 'Job History is added!'
    });

  } catch (error) {
    console.log(error);
  }
}



