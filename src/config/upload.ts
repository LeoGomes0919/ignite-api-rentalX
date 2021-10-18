import multer from 'multer';
import { resolve } from 'path';
import crypto from 'crypto';

export default {
  upload(folder: string): any {
    const folderName = resolve(__dirname, '..', '..', 'tmp', folder);
    return {
      storage: multer.diskStorage({
        destination: folderName,
        filename: (req, file, cb) => {
          const fileHas = crypto.randomBytes(10).toString('hex');

          const fileName = `${fileHas}-${file.originalname}`;

          return cb(null, fileName);
        },
      }),
    };
  },
};
