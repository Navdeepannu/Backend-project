import { v2 as cloudinary } from "cloudinary";
import { fs } from "fs"; // File system

// Configration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload to cloudinary
const uloadCloudinary = async (localfilePath) => {
  try {
    // Check if loacal path
    if (!localfilePath) return null;

    // Upload to cloudinary
    const response = await cloudinary.uploader.upload(localfilePath, {
      public_id: "test",
      resource_type: "auto",
    });

    // File has been uploaded to cloudinary successfully
    console.log(`File upload on Cloudinary successfully at : ${response.url}`);
    return response;
  } catch (error) {
    fs.unlinkSync(localfilePath); // remove the locally saved temporary file as the upload operation failed
    return null;
  }
};

export { uloadCloudinary };
