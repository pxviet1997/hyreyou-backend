import express from 'express';
const router = express.Router();
import Talent from "../../models/Talent.js";
import Business from "../../models/Business.js";
import fs from 'fs';

export const uploadImage = async (req, res) => {
    console.log("upload----------- data   ==" + req.body.Type);

    if (req.file === undefined) {
        return res.send("you must select a file.");
    }
    const Type = req.body.Type;
    const _id = req.body._id;

    const data = fs.readFileSync(`./Images/${req.file.filename}`);
    //console.log("upload----------- data   ==" + data);
    //var encImg = data.toString('base64');
    const contentType = req.file.mimetype;
    const fileName = req.file.filename;
    //const img = Buffer.from(encImg, 'base64');
    if (Type === "Talent") {
        console.log("uploadTalent   ==" + req.body.Type);

        await Talent.findByIdAndUpdate({ _id }, { profilePhoto: { data, contentType, fileName } });
        fs.unlinkSync(`./Images/${req.file.filename}`);
        res.cookie('Profile', req.file.filename, { maxAge: 1 * 60 * 60 * 1000, httpOnly: true });
        res.status(201).json(req.file);
    } else {
        console.log("uploadBusiness   ==" + req.body._id);

        await Business.findByIdAndUpdate({ _id }, { logo: { data, contentType, fileName } },
            function (err, docs) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("Updated User : ", docs);
                    fs.unlinkSync(`./Images/${req.file.filename}`);
        res.cookie('Profile', req.file.filename, { maxAge: 1 * 60 * 60 * 1000, httpOnly: true });
        res.status(201).json(req.file);
                }
            });
        

    }



    // const imgUrl = `http://localhost:5000/file/${req.file.filename}`;
    // return res.send(imgUrl);
}



export default router;