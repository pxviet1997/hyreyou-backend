import Business from "../../models/Business.js";
import Talent from "../../models/Talent.js";
import mongoose from 'mongoose';

export const createRoles = async (req, res) => {
  try {
    const obj = req.body;
    const _id = obj._id;
    console.log(obj._id);
    console.log(obj);
    delete obj._id;
    const obj1 = obj;
    console.log(obj1);
    const business = await Business.updateOne({ _id }, { $push: obj1 });
    console.log(business);
    res.status(200).json(business);
  } catch (error) {
    res.status(409).json({ message: error.message })

  }
}

export const AddRoleCandidate = async (req, res) => {
  try {
    // const obj = req.body;
    // const businessId = req.
    // const _id = obj._id;
    // console.log(obj._id);
    const { businessId, talentId, roleId } = req.body;


    // const business = await Business.findByIdAndUpdate({ _id }, { 'roles': { $elemMatch: { _id } });
    const business = await Business.findOne({ _id: businessId });
    business.roles.filter((role) => role._id == roleId)[0]
      .talentIds.push(talentId);
    await business.save();
    // console.log(role);


    // console.log("fggggggg----" + business);
    res.status(200).json(business);
  } catch (error) {
    res.status(409).json({ message: error.message })

  }
}


export const listRoleCandidate = async (req, res) => {
  try {
    const { roleId } = req.body;
    console.log("roleId----" + roleId);
    // const business = await Business.findOne({ roles: roleId });
    const business = await Business.findOne({ roles: { $elemMatch: { _id: roleId } } });
    const role = business.roles.filter((role) => role._id == roleId);
    let talents = role[0].talentIds;
    console.log("role--" + role);
    console.log(talents);
    // console.log("fgggggggs----" + business);
    // res.status(200).json(role);
    // const _id = '611744672319f01bd7c11769';
    // let _id = mongoose.Types.ObjectId('611744672319f01bd7c11769');
    talents = talents.map((talent) => mongoose.Types.ObjectId(talent));

    const roleTalents = await Talent.aggregate([
      { $match: { _id: { $in: talents } } },
      { $project: { firstName: 1, lastName: 1 } }

    ]);
    // console.log(roleTalents);
    res.status(200).json(roleTalents);


  } catch (error) {
    res.status(409).json({ message: error.message })

  }

}




