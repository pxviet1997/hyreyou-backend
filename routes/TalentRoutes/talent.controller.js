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
    const { _id } = req.query;
    const body = req.body;
    // console.log(_id);
    // console.log( req.body);
    const talent = await Talent.findOneAndUpdate({ _id }, body, { new: true });

    res.status(201).json(talent);

  } catch (error) {
    res.status(409).json({ message: error.message });
  }

}

