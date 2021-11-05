import fs from 'fs';
import Talent from "../../models/Talent.js";


export const getTalent = async (req, res) => {
  const { _id } = req.query;

  try {
    const talent = await Talent.findById(_id);
    res.status(200).json(talent);
  } catch (error) {
    res.status(404).json({ message: 'Unable to get Talent!' })
  }
}

export const createTalent = async (req, res) => {
  const body = req.body;

  const newTalent = new Talent(body);
  try {
    const checkUserExist = await Talent.findOne({ $or: [{ email }, { mobileNumber }] }).countDocuments();
    if (!checkUserExist == 1) {
      await newTalent.save();
      res.status(201).json(newTalent);
    } else {

      res.status(401).json({ message: 'Talent already exist with this Details' });
    }
  } catch (error) {
    res.status(409).json({ message: 'Unable to create Talent!' });
  }
}


export const updateTalent = async (req, res) => {
  try {
    const { _id, info } = req.body;

    console.log(_id);
    // const talent = await Talent.findById(_id);

    const talent = await Talent.findOneAndUpdate({ _id }, info, { new: true });
    // console.log(talent);
    res.status(201).json({
      user: talent,
      message: 'Updates Successfully!'
    });

  } catch (error) {
    console.log(error);
    res.status(409).json({ message: 'Unable to update the Personal Details!' });
  }
}

export const addJobHistory = async (req, res) => {
  try {
    // console.log(req.body);
    const { _id, newJob } = req.body;
    const user = await Talent.findOneAndUpdate(
      { _id },
      { $push: { jobHistory: newJob } },
      { new: true }
    );
    res.status(200).json({
      user,
      message: 'Job History is added!'
    });

  } catch (error) {
    res.status(409).json({ message: 'Unable to add Job!' });
  }
}

export const addEducationHistory = async (req, res) => {
  try {
    const { _id, newEducation } = req.body
    const user = await Talent.findOneAndUpdate(
      { _id },
      { $push: { education: newEducation } },
      { new: true }
    );
    res.status(200).json({
      user,
      message: 'Education is added!'
    });

  } catch (error) {
    res.status(409).json({ message: 'Unable to add education!' });
  }
}

export const addCertification = async (req, res) => {
  try {
    const { certificationName, _id } = req.body;

    const data = fs.readFileSync(`./Files/${req.file.filename}`);
    const contentType = req.file.mimetype;
    const fileName = req.file.filename;

    const talent = await Talent.findOneAndUpdate(
      { _id },
      {
        $push: {
          certifications: {
            data,
            contentType,
            fileName,
            name: certificationName
          }
        }
      },
      { new: true }
    );

    fs.unlinkSync(`./Files/${fileName}`);
    fs.rmdirSync('./Files');

    res.status(200).json({
      certification: {
        data,
        contentType,
        fileName,
        name: certificationName
      },
      message: 'Certification is added successfully!'
    });
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: 'Unable to add certification' });
  }
}

export const matchToRoles = async (req, res) => {
  const { skillSet } = req;

};

export const download = async (req, res) => {
  const { _id, certificationId } = req.query;
  console.log(certificationId);
  try {
    const talent = await Talent.findById(_id);

    const certification = talent.certifications.filter((certification) => certification._id == certificationId)[0];

    const fileName = certification.fileName.replace(/\s/g, "");
    const writeStream = fs.createWriteStream(fileName);
    writeStream.write(Buffer.from(certification.data), "base64");
    writeStream.on("finish", () => {
      res.download(fileName);
      fs.unlinkSync(fileName);
    });
    writeStream.end();
  } catch (error) {
    console.log(error);
  }
}
