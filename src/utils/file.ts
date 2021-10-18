import fs from 'fs';
import { resolve } from 'path';

export const deleteFile = async (
  folder: string,
  filename: string,
): Promise<void> => {
  const filePath = resolve(__dirname, '..', '..', `tmp/${folder}`, filename);

  try {
    await fs.promises.stat(filePath);
  } catch (err) {
    return;
  }
  await fs.promises.unlink(filePath);
};
