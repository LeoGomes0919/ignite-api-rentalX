import multer from 'multer';
import { resolve } from 'path';
import crypto from 'crypto';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder,

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (req, file, cb) => {
      const fileHas = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHas}-${file.originalname}`;

      return cb(null, fileName);
    },
  }),
};
