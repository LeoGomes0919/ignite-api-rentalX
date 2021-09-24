import fs from 'fs';
import path from 'path';
import upload from '../config/upload';

export const deleteFile = async (filename: string): Promise<void> => {
  const filePath = path.resolve(upload.tempFolder, filename);

  try {
    await fs.promises.stat(filePath);
  } catch (err) {
    return;
  }
  await fs.promises.unlink(filePath);
};
