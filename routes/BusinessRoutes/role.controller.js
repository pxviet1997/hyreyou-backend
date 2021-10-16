import Business from "../../models/Business.js";
import Talent from "../../models/Talent.js";
import mongoose from 'mongoose';

export const createRoles = async (req, res) => {
  try {
    const { _id, title, description, skillSet } = req.body;
    let newRole = { title, description, skillSet };
    newRole = { ...newRole, talentIds: [] }

    newRole = await match(newRole, _id);

    const business = await Business.findOneAndUpdate(
      { _id },
      { $push: { roles: newRole } },
      { new: true }
    );

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
  const { skillSet, talentIds, rejectedTalentIds, shortlistedTalentIds } = role;

  let talents = await Talent.find(
    {
      $and: [
        { expectedSkillSet: { $in: skillSet } },
        { _id: { $nin: talentIds } },
        { _id: { $nin: shortlistedTalentIds } },
        { _id: { $nin: rejectedTalentIds } }
      ],
    },
    { _id: 1 }
  );

  talents.map(async (talent) => {
    role.talentIds.push(talent._id);
  });

  talents.map(async (talent) => {
    const t = await Talent.findOneAndUpdate(
      { _id: talent._id },
      { $push: { matchesRoles: { ...role, businessId } } },
      { new: true }
    );
  });

  return role;
}

export const matchToTalent = async (req, res) => {
  const { _id } = req.body;
  let business = await Business.findById(_id);
  const businessId = business._id;
  const { roles } = business;

  let newRoles = [];

  for (let i = 0; i < roles.length; i++) {
    const newRole = await match(roles[i], businessId);
    newRoles.push(newRole);
  }

  business = await Business.findOneAndUpdate(
    { _id: businessId },
    { roles: newRoles },
    { new: true }
  );

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
    // console.log("roleId----" + roleId);
    // const business = await Business.findOne({ roles: roleId });
    const business = await Business.findOne({ roles: { $elemMatch: { _id: roleId } } });
    const role = business.roles.filter((role) => role._id == roleId);
    let talents = role[0].talentIds;
    // console.log("role--" + talents);
    // console.log(talents);

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

export const rejectCandidate = async (req, res) => {
  try {
    const { talentId, roleId, _id } = req.body;

    const business = await Business.findOneAndUpdate(
      { _id },
      {
        $pull: { "roles.$[e].talentIds": talentId },
        $push: { "roles.$[e].rejectedTalentIds": talentId }
      },
      { arrayFilters: [{ "e._id": roleId }], new: true }
    );

    res.status(200).json(business);


  } catch (error) {
    res.status(409).json({ message: error.message })

  }

}

export const shortlistTalent = async (req, res) => {
  try {
    const { talentId, roleId, _id } = req.body;

    const business = await Business.findOneAndUpdate(
      { _id },
      {
        $pull: { "roles.$[e].talentIds": talentId },
        $push: { "roles.$[e].shortlistedTalentIds": talentId }
      },
      { arrayFilters: [{ "e._id": roleId }], new: true }
    );

    res.status(200).json(business);


  } catch (error) {
    res.status(409).json({ message: error.message })
  }

}
