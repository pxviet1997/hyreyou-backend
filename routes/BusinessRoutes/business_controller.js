import Business from "../../models/Business.js";


export const getBusiness = async (req, res) => {

  const { _id } = req.body;
  try {

    const business = await Business.findById(_id);
    console.log(business);
    res.status(200).json(business);
  } catch (error) {
    res.status(404).json({ message: error.message })

  }

}

export const createBusiness = async (req, res) => {
  const body = req.body;

  const newBusiness = new Business(body);
  try {
    await newBusiness.save();
    res.status(200).json(newBusiness);
  } catch (error) {
    res.status(409).json({ message: error.message });

  }
}




export const updateBusiness = async (req, res) => {
  try {
    const { _id } = req.body;
    const body = req.body;
    const business = await Business.findOneAndUpdate(_id, body, { new: true });

    console.log(business);
    res.status(200).json(business);
  } catch (error) {
    res.status(404).json({ message: error.message })

  }

}
