/* ----------------------------------------------------------------------------------------------
cloudinary.ts
This utility stores the server files in the cloudinary cloud and deletes them from the local machine.
------------------------------------------------------------------------------------------------- */

import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

// configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* ----------------------------------------------------------------------------------------------
Function to delete the file from the local server
------------------------------------------------------------------------------------------------- */

const deleteLocalFile = async (filepath: string): Promise<void> => {
  if (!filepath) return;

  try {
    await fs.unlink(filepath);
    console.log(`Local file deleted successfully: ${filepath}`);
  } catch (error: unknown) {
    const err = error as NodeJS.ErrnoException;
    if (err.code !== "ENOENT") {
      console.warn(
        `UTILITY FILE DELETION ERROR: Could not delete local file: ${err.message}`
      );
    }
  }
};

/* ----------------------------------------------------------------------------------------------
Function to upload the file on cloudinary 
------------------------------------------------------------------------------------------------- */

export interface CloudinaryUploadResult {
  url: string;
  public_id: string;
}

export const uploadOnCloudinary = async (
  filepath: string
): Promise<CloudinaryUploadResult | null> => {
  if (!filepath) return null;

  try {
    const response = await cloudinary.uploader.upload(filepath, {
      resource_type: "auto",
    });

    console.log("The file has been successfully uploaded");

    // Explicitly return only the fields I defined in my interface
    return {
      url: response.secure_url,
      public_id: response.public_id,
    };
  } catch (error: unknown) {
    console.error(
      "CLOUDINARY ERROR: Error while uploading file:",
      error instanceof Error ? error.message : error
    );
    return null;
  } finally {
    await deleteLocalFile(filepath);
  }
};
