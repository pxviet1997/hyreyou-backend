import Business from "../../models/Business.js";
import Talent from "../../models/Talent.js";
import mongoose from 'mongoose';

export const createRoles = async (req, res) => {
  try {
    // const obj = req.body;
    // const _id = obj._id;
    // console.log(obj._id);
    // console.log(obj);
    // delete obj._id;
    // const obj1 = obj;
    // console.log(obj1);
    const { _id, title, description, skillSet } = req.body;
    const newRole = { title, description, skillSet };
    await Business.updateOne(
      { _id },
      { $push: { roles: newRole } },
      (err, business) => {
        console.log(business);
        res.status(200).json(business);
      }
    );
    // const business = await Business.findOne({ _id });
    // let roles = business.roles;
    // console.log('roles:', roles);
    // roles.push(newRole);
    // console.log('roles:', roles);
    // business.roles = roles;
    // await business.save();
    // const business = await Business.updateOne({ _id }, { $push: obj1 });
    // console.log(business);
  } catch (error) {
    console.log(error);
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

    talents = talents.map((talent) => mongoose.Types.ObjectId(talent));

    const roleTalents = await Talent.aggregate([
      { $match: { _id: { $in: talents } } },
      { $project: { firstName: 1, lastName: 1, email: 1 } }

    ]);
    // console.log(roleTalents);
    res.status(200).json(roleTalents);


  } catch (error) {
    res.status(409).json({ message: error.message })

  }

}




export const listAllRoleAndNoCandidate = async (req, res) => {
  try {
    const _id = req.body;
    console.log(_id);
    // const ObjectId = mongoose.Types.ObjectId;

    // const business = await Business.findOne({ roles: roleId });
    const business = await Business.findOne(_id);
    // const business = await Business.aggregate([
    //     {
    //         $match: { _id: mongoose.Types.ObjectId(_id) }
    //     }
    // ]);
    console.log(business);
    let returnedRoles = [];
    console.log('-------------------');
    const roles = business.roles;
    console.log(roles);
    // for (let i = 0; i < roles.length; i++) {
    //     const talents = roles[i].talents;
    //     const numberOfTalents = talents.length;
    //     returnedRoles.unshift({ roleTitle: roles[i].title, numberOfTalents });
    // }
    roles.map((role) => {

      const talents = role.talentIds;
      //console.log(talents);
      const numberOfTalents = talents.length;

      returnedRoles.unshift({ roleTitle: role.title, numberOfTalents, id: role._id });

    })
    console.log("business----" + returnedRoles);
    // const role = business.roles.filter((role) => role._id == roleId);
    // let talents = role[0].talentIds;
    // console.log("role--" + role);
    // console.log(talents);

    // talents = talents.map((talent) => mongoose.Types.ObjectId(talent));

    // const roleTalents = await Talent.aggregate([
    //     { $match: { _id: { $in: talents } } },
    //     { $project: { firstName: 1, lastName: 1 } }

    // ]);
    // console.log(roleTalents);
    res.status(200).json(returnedRoles);


  } catch (error) {
    res.status(409).json({ message: error.message })

  }

}

export const shortlistingCandidate = async (req, res) => {
  try {
    const { candidateId, roleId, _id } = req.body;
    console.log("candidateId----" + candidateId);

    // const business = await Business.findOne({ _id });
    // console.log(business);
    const business = await Business.findOneAndUpdate(
      { _id },
      // { roles: { $elemMatch: { _id: roleId } } },
      {
        $pull: {
          "roles.$[e].talentIds": candidateId
        }
      },
      {
        arrayFilters: [{ "e._id": roleId }], new: true,
      }
    );
    //   const business = await Business.findOne({ roles: { $elemMatch: { _id: roleId } } });
    //   business.roles.filter((role) => role._id == roleId)[0].shortlistTalentId.push(candidateId);
    //   const t =business.roles.filter((role) => role._id == roleId)[0].talentIds.indexOf(candidateId);
    //   business.roles.filter((role) => role._id == roleId)[0].talentIds.splice(t,1);
    //   //let tI = role[0].talentIds.filter(item => item !== candidateId);
    //  await business.save();
    res.status(200).json(business);


  } catch (error) {
    res.status(409).json({ message: error.message })

  }

}
