import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
export const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
            console.log(' jpg and Png format supported ! .');
            cb(null, true)
        } else {
            console.log('only jpg and Png format supported ! .');
            cb(null, true)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 8
    }
});

