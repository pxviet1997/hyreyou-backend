import Talent from "../../models/Talent.js";


export const getTalent =async (req,res) => {
    try {
        var id= "611744672319f01bd7c11769";
       const talent = await Talent.findById(id); 
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
      // res.status(201).json(newTalent);
      res.json(
        new successModal({
            data:newTalent,
            msg:"new Talent is Added successfully",
        })
        );
   } catch (error) {
       res.status(409).json({message:error.message});
   }
}


export const updateTalent = async (req,res) => {
    try {
        const {_id} = req.params;
        const body = req.body;
        console.log(req.params);
        console.log( req.body);
        const talent = await Talent.findOneAndUpdate(_id,body,{new:true}); 

        res.status(201).json(talent);

    } catch (error) {
        res.status(409).json({message:error.message});
    }

}

