import fs from 'fs';
import path from 'path';
import mime from 'mime';
import aws, { S3 } from 'aws-sdk';
import { uploadConfig } from '@config/upload';
import { AppError } from '@shared/error/AppError';
import { IStorageProvider } from '../models/IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({ region: 'us-east-1' });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const ContentType = mime.lookup(originalPath);

    if (!ContentType) {
      throw new Error('File not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    try {
      await this.client
        .upload({
          Bucket: uploadConfig.config.aws.bucket,
          Key: file,
          ACL: 'public-read',
          Body: fileContent,
          ContentType,
        })
        .promise();
    } catch (err) {
      throw new AppError(`Erro ao realizar upload`);
    }

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
      })
      .promise();
  }

  public async deleteFileInTmpFolder(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.tmpFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export { S3StorageProvider };
