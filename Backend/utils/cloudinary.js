const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
    });
    fs.unlink(localFilePath, (err) => {
      err && console.log("unlink: ", err);
    });
    return response;
  } catch (error) {
    fs.unlink(localFilePath, (err) => {
      err && console.log("unlink2: ", err);
    });
  }
};

const deleteOnCloudinary = async (imageUrl) => {
  try {
    if (!imageUrl) return null;
    const response = await cloudinary.uploader.destroy(imageUrl);
    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { uploadOnCloudinary, deleteOnCloudinary };
