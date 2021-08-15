import Talent from "../../models/Talent.js";


export const getTalent =async (req,res) => {
    try {
       const talent = await Talent.find(); 
       console.log(talent);
       res.status(200).json(talent);
    } catch (error) {
       res.status(404).json({message:error.message})
    }

}

export const createTalent = async (req,res) => {
    const body = req.body;

    const newTalent =new Talent(body);
   try {
       await newTalent.save();
       res.status(201).json(newTalent);
   } catch (error) {
       res.status(409).json({message:error.message});
   }
}
