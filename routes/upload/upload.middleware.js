import multer from "multer";
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync('./Files');
    cb(null, 'Files');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
})
export const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' ||
      file.mimetype == 'application/pdf' || file.mimetype == 'application/msword' ||
      file.mimetype == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      console.log(' File format supported ! .');
      cb(null, true);
    } else {
      console.log('file format not supported ! .');
      cb(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 8
  }
});

