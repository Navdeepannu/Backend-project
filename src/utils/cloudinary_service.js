import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
  try {
    // Validate local file path
    if (!localFilePath) {
      console.error("Invalid file path provided.");
      return null;
    }

    // Check if file exists
    try {
      await fs.access(localFilePath); // Throws if the file does not exist
    } catch {
      console.error("File does not exist at the specified path.");
      return null;
    }

    // Upload to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // Automatically detect file type (image/video/etc.)
    });

    // Log successful upload
    console.log(`File uploaded successfully to Cloudinary: ${response.url}`);
    // unlink the local file
    await fs.unlink(localFilePath);
    return response;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error.message);

    // Remove the local file if upload fails
    try {
      await fs.unlink(localFilePath);
      console.log("Temporary file deleted successfully.");
    } catch (unlinkError) {
      console.error("Error deleting local file:", unlinkError.message);
    }

    return null;
  }
};

//TODO: Delete from cloudinary

export { uploadOnCloudinary };
