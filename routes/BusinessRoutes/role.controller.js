import Business from "../../models/Business.js";
import Talent from "../../models/Talent.js";
import mongoose from 'mongoose';

export const createRoles = async (req, res) => {
  try {
    const { _id, title, description, skillSet } = req.body;
    let newRole = { title, description, skillSet };
    newRole = { ...newRole, talentIds: [] }

    const business = await match(newRole, _id);

    res.status(200).json({
      message: 'New Role is created successfully!',
      user: business
    });

  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
}

const match = async (role, businessId) => {
  const { skillSet, talentIds } = role;

  let talents = await Talent.find(
    {
      $and: [
        { expectedSkillSet: { $in: skillSet } },
        { _id: { $nin: talentIds } }
      ],
    },
    { _id: 1 }
  );

  let talIds = [];
  talents.map(async (talent) => {
    talIds.push(talent._id);
  });

  const newRole = { ...role, talentIds: talIds };

  const business = await Business.findOneAndUpdate(
    { _id: businessId },
    { $push: { roles: newRole } },
    { new: true }
  );

  talents.map(async (talent) => {
    const t = await Talent.findOneAndUpdate(
      { _id: talent._id },
      { $push: { matchesRoles: { ...newRole, businessId } } },
      { new: true }
    );
  });

  return business;
}

export const matchToTalent = async (req, res) => {
  const { _id } = req.body;
  const business = await Business.findById(_id);

  const { roles } = business;
  roles.map(async (role) => {
    await match(role, business._id);
  });

  res.status(200).json({
    // message: 'New Role is created successfully!',
    user: business
  });
  // await business.save();

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
    console.log("role--" + talents);
    console.log(talents);

    talents = talents.map((talent) => mongoose.Types.ObjectId(talent));

    const roleTalents = await Talent.aggregate([
      { $match: { _id: { $in: talents } } },
      { $project: { firstName: 1, lastName: 1, email: 1 } }

    ]);
    console.log(roleTalents);
    res.status(200).json(roleTalents);


  } catch (error) {
    res.status(409).json({ message: error.message })

  }

}

export const listAllRoleAndNoCandidate = async (req, res) => {
  try {
    const _id = req.body;
    // const ObjectId = mongoose.Types.ObjectId;

    // const business = await Business.findOne({ roles: roleId });
    const business = await Business.findOne(_id);
    // const business = await Business.aggregate([
    //     {
    //         $match: { _id: mongoose.Types.ObjectId(_id) }
    //     }
    // ]);
    // console.log(business);
    let returnedRoles = [];
    const roles = business.roles;
    // console.log(rol//es);

    roles.map((role) => {

      const talents = role.talentIds;
      //console.log(talents);
      const numberOfTalents = talents.length;

      returnedRoles.unshift({ roleTitle: role.title, numberOfTalents, id: role._id });

    })
    // console.log("business----" + returnedRoles);
    res.status(200).json(returnedRoles);


  } catch (error) {
    res.status(409).json({ message: error.message })

  }

}

export const shortlistingCandidate = async (req, res) => {
  try {
    const { candidateId, roleId } = req.body;
    console.log("candidateId----" + candidateId);

    // const business = await Business.findOneAndUpdate(
    //   {_id},

    //   {$pull: { "roles.$[elem].talentIds": candidateId}},
    //   {arrayFilter: [{"elem._id": roleId}], new: true}
    //   // {new: true}
    // );
    const business = await Business.findOne({ roles: { $elemMatch: { _id: roleId } } });
    console.log(business);
    business.roles.filter((role) => role._id == roleId)[0].shortlistTalentId.push(candidateId);
    const t = business.roles.filter((role) => role._id == roleId)[0].talentIds.indexOf(candidateId);
    business.roles.filter((role) => role._id == roleId)[0].talentIds.splice(t, 1);
    //let tI = role[0].talentIds.filter(item => item !== candidateId);
    await business.save();
    res.status(200).json(business);


  } catch (error) {
    res.status(409).json({ message: error.message })

  }

}

export const rejectCandidate = async (req, res) => {
  try {
    const { candidateId, roleId } = req.body;
    console.log("candidateId----" + candidateId);

    // const business = await Business.findOneAndUpdate(
    //   {_id},

    //   {$pull: { "roles.$[elem].talentIds": candidateId}},
    //   {arrayFilter: [{"elem._id": roleId}], new: true}
    //   // {new: true}
    // );
    const business = await Business.findOne({ roles: { $elemMatch: { _id: roleId } } });
    console.log(business);
    const t = business.roles.filter((role) => role._id == roleId)[0].talentIds.indexOf(candidateId);
    business.roles.filter((role) => role._id == roleId)[0].talentIds.splice(t, 1);
    //let tI = role[0].talentIds.filter(item => item !== candidateId);
    await business.save();
    res.status(200).json(business);


  } catch (error) {
    res.status(409).json({ message: error.message })

  }

}

// export const shortlistingCandidate = async (req, res) => {
//   try {
//     const { candidateId, roleId, _id } = req.body;
//     console.log("candidateId----" + candidateId);

//     // const business = await Business.findOne({ _id });
//     // console.log(business);
//     const business = await Business.findOneAndUpdate(
//       { _id },
//       // { roles: { $elemMatch: { _id: roleId } } },
//       {
//         $pull: {
//           "roles.$[e].talentIds": candidateId
//         }
//       },
//       {
//         arrayFilters: [{ "e._id": roleId }], new: true,
//       }
//     );
//     //   const business = await Business.findOne({ roles: { $elemMatch: { _id: roleId } } });
//     //   business.roles.filter((role) => role._id == roleId)[0].shortlistTalentId.push(candidateId);
//     //   const t =business.roles.filter((role) => role._id == roleId)[0].talentIds.indexOf(candidateId);
//     //   business.roles.filter((role) => role._id == roleId)[0].talentIds.splice(t,1);
//     //   //let tI = role[0].talentIds.filter(item => item !== candidateId);
//     //  await business.save();
//     res.status(200).json(business);


//   } catch (error) {
//     res.status(409).json({ message: error.message })

//   }

// }
