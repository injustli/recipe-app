/*const {Storage} = require("@google-cloud/storage");
const storage = new Storage();
const util = require("util");
const bucket = storage.bucket("recipe_photos");

const uploadImage = (file) => new Promise((resolve, reject) => {
  if (!file || Object.keys(file) == 0) {
    resolve("");
  }
  const {originalname, buffer} = file;

  const blob = bucket.file(originalname);
  const blobStream = blob.createWriteStream({
    resumable: false
  });
  blobStream.on("finish", () => {
    return blob.makePublic()
      .then(() => {
        const publicUrl = util.format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        resolve(publicUrl);
      });
  })
  .on("error", () => {
    reject("Unable to upload image. Something went wrong.");
  })
  .end(buffer);
})

module.exports = {
  uploadImage
}
*/