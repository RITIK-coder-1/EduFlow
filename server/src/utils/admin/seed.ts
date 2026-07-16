/* ---------------------------------------------------------------------------------------
seed.ts
This file hardcodes the admin into the system. It runs only once.
------------------------------------------------------------------------------------------ */

import "dotenv/config.js";
import connectDB from "../../db/index.ts";
import { User, UserContract } from "../../models/index.model.ts";

(async () => {
  try {
    // connect to the database
    await connectDB();

    // checking if an admin already exists
    const user: UserContract | null = await User.findOne({
      accountType: "Admin",
    });

    if (user) {
      // terminate the program if the user exists
      console.log("The admin already exists...");
      process.exit(0);
    }

    const admin: UserContract = await User.create({
      firstName: "System",
      lastName: "Admin",
      username: "admin_core",
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      dateOfBirth: "2004-08-20",
      accountType: "Admin",
      profilePic: "https://api.dicebear.com/5.x/initials/svg?seed=Admin",
    });

    if (!admin) {
      console.error("SEEDING FAILURE: admin didn't create");
    }

    console.log("The admin has been successfully created: ", admin);
  } catch (error: unknown) {
    error instanceof Error
      ? console.error("SEEDING FAILURE: ", error.message)
      : console.error("SEEDING FAILURE: ", error);
    // terminate the program
    process.exit(1);
  }
})();
