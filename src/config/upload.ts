/* eslint-disable @typescript-eslint/ban-types */
import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'public/tmp');

interface IUploadConfig {
  tmpFolder: string;
  uploadsFolder: string;
  multer: {
    storage: StorageEngine;
  };
}

export const uploadConfig = {
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder),
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename: (request, file, callback) => {
        const fileHash = crypto.randomBytes(16).toString('hex');
        const formattedOriginalName = file.originalname
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^.A-Z0-9]+/gi, '');

        const filename = `${fileHash}-${formattedOriginalName}`;

        return callback(null, filename);
      },
    }),
  },
} as IUploadConfig;
