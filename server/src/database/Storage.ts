import { Storage } from '@google-cloud/storage';

const storage = new Storage();
const bucket = storage.bucket('recipe_photos');

// Handles image uploading for recipe
export const uploadImage = (file: Express.Multer.File) =>
  new Promise((resolve, reject) => {
    const { originalname, buffer } = file;
    const blob = bucket.file(originalname);
    const blobStream = blob.createWriteStream({ resumable: false });

    blobStream
      .on('finish', () => {
        const publicUrl = blob.publicUrl();
        resolve(publicUrl);
      })
      .on('error', () => {
        reject('Unable to upload image. Something went wrong!');
      })
      .end(buffer);
  });
