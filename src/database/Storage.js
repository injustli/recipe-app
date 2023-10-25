const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const bucket = storage.bucket('recipe_photos');

const uploadImage = (file) =>
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

module.exports = { uploadImage };
