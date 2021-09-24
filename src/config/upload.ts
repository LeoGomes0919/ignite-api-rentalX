import multer from 'multer';
import { resolve } from 'path';
import crypto from 'crypto';

const tempFolder = resolve(__dirname, '..', '..', 'tmp', 'avatar');

export default {
  tempFolder,

  storage: multer.diskStorage({
    destination: tempFolder,
    filename: (req, file, cb) => {
      const fileHas = crypto.randomBytes(10).toString('hex');

      const fileName = `${fileHas}-${file.originalname}`;

      return cb(null, fileName);
    },
  }),
};
