import Business from "../../models/Business.js";

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

export const getBusiness = async (req, res) => {
  try {
    const business = await Business.find();


    console.log(business);
    res.status(200).json(business);
  } catch (error) {
    res.status(404).json({ message: error.message })

  }

}

export const updateBusiness = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const body = req.body;
    const business = await Business.findOneAndUpdate(_id, body, { new: true });



    console.log(business);
    res.status(200).json(business);
  } catch (error) {
    res.status(404).json({ message: error.message })

  }

}
