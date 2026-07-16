/* ----------------------------------------------------------------------------------------------
deleteFromCloudinary.ts
This utility deletes a specific file from cloudinary 
------------------------------------------------------------------------------------------------- */

import { v2 as cloudinary } from "cloudinary";

// configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// extra type safety for the file resource type
type CloudinaryResourceType = "image" | "video" | "raw" | "auto";

const deleteFromCloudinary = async (
  fileUrl: string | undefined,
  resource: CloudinaryResourceType = "image"
): Promise<void> => {
  if (!fileUrl) {
    console.error("CLOUDINARY ERROR: The file doesn't exist on cloudinary!");
  }

  try {
    // firstly, I have to extract the public id out of the file url
    const subStrings: string[] | undefined = fileUrl?.split("/"); // an array of split url strings and the last string is the public id
    const lastString: string | undefined = subStrings?.pop(); // the public id
    const publicId: string | undefined = lastString?.split(".")[0]; // we need the public id without the extension

    if (publicId) {
      // destroy parameter has to be a valid string
      const response = await cloudinary.uploader.destroy(publicId, {
        resource_type: resource,
      });
      console.log(
        "The file has been successfully deleted from cloudinary!: ",
        response
      );
    }
  } catch (error: unknown) {
    error instanceof Error
      ? console.error(
          "CLOUDINARY ERROR: There was an error while deleting the file from cloudinary: ",
          error.message
        )
      : console.error(
          "CLOUDINARY ERROR: There was an error while deleting the file from cloudinary: ",
          error
        );
    throw error; // stop the execution
  }
};

export default deleteFromCloudinary;
