import Talent from "../../models/Talent.js";
import Business from "../../models/Business.js";
import fs from 'fs';

export const uploadImage = async (req, res) => {
  // console.log("upload----------- data   ==" + req.body.Type);

  if (req.file === undefined) {
    return res.send("you must select a file.");
  }
  // const Type = req.body.Type;
  // const _id = req.body._id;
  const { type, _id } = req.body;

  const data = fs.readFileSync(`./Files/${req.file.filename}`);
  //console.log("upload----------- data   ==" + data);
  // var encImg = data.toString('base64');
  const contentType = req.file.mimetype;
  const fileName = req.file.filename;
  // const img = Buffer.from(encImg, 'base64');

  type === "Talent"
    ? await Talent.findByIdAndUpdate({ _id }, { profilePhoto: { data, contentType, fileName } })
    : await Business.findByIdAndUpdate({ _id }, { logo: { data, contentType, fileName } });

  fs.unlinkSync(`./Files/${req.file.filename}`);
  fs.rmdirSync('./Files');

  res.status(201).json({ message: type === "Talent" ? 'Your Avatar is updated!' : 'Your Logo is updated!' });

}
