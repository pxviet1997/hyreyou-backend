import Business from "../../models/Business.js";

export const createBusiness = async (req,res) => {
    const body = req.body;

    const newBusiness = new Business(body);
   try {
       await newBusiness.save();
       res.json(
           new successModal({
               data:newBusiness,
               msg:"new Business is Added successfully",
           })
           );
   } catch (error) {
       //res.status(409).json({message:error.message});
       res.json(
        new ErrorModal({
            msg:"The Business Already Exist ",
        })
        );
   }
}

export const getBusiness =async (req,res) => {
    try {
       const business = await Business.find(); 
       res.json(
        new successModal({
            data:business,
            msg:"Business is obtained successfully",
        })
        );

      // console.log(business);
      // res.status(200).json(business);
    } catch (error) {
       //res.status(404).json({message:error.message})
       res.json(
        new ErrorModal({
            msg:"Error fetching data",
        })
        );
    }

}

export const updateBusiness =async (req,res) => {
    try {
        const {id :_id} = req.params;
        const body = req.body;
        const business = await Business.findOneAndUpdate(_id,body,{new:true}); 

       res.json(
        new successModal({
            data:business,
            msg:"Business updated successfully",
        })
        );

    //    console.log(business);
    //    res.status(200).json(business);
    } catch (error) {
       //res.status(404).json({message:error.message})
       res.json(
        new ErrorModal({
            msg:"Update Business failed ",
        })
        );
    }

}
