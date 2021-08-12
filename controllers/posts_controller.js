import PostTalent from "../models/postTalents.js";

export const getPosts =async (req,res) => {
    try {
       const getposts = await PostTalent.find(); 
       console.log(getposts);
       res.status(200).json(getposts);
    } catch (error) {
       res.status(404).json({message:error.message})
    }

}

export const createTalents = async (req,res) => {
    const createtalent = req.body;

    const newTalent =new postTalents(cratetalent);
   try {
       await newTalent.save();
       res.status(201).json(newTalent);
   } catch (error) {
       res.status(409).json({message:error.message});
   }
}