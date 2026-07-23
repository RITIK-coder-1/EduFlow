/* ---------------------------------------------------------------------------------------
OTP.model.ts
This file builds the schema for OTP data fields for user verification
------------------------------------------------------------------------------------------ */

import mongoose from "mongoose";
import { mailSender } from "../../utils/index.utils.ts";
import type { Document } from "mongoose";

/* ---------------------------------------------------------------------------------------
The Domain Interface
------------------------------------------------------------------------------------------ */

interface OTPDomain {
  email: string;
  code: string;
}

/* ---------------------------------------------------------------------------------------
The Contract Interface 
------------------------------------------------------------------------------------------ */

interface OTPContract extends Document, OTPDomain {
  createdAt: Date;
}

/* ---------------------------------------------------------------------------------------
The Schema 
------------------------------------------------------------------------------------------ */

const OTPSchema = new mongoose.Schema<OTPContract>({
  email: {
    type: String,
    required: true,
  },
  code: {
    type: String, // prevents mongodb from automatically removing 0 as the first digit
    // exactly 6 digits
    min: 100000,
    max: 999999,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // after 5 mins
  },
});

/* ---------------------------------------------------------------------------------------
Send an email to the user before saving the OTP
------------------------------------------------------------------------------------------ */

// function to handle the email sending logic
async function sendVerificationEmail(
  email: string,
  code: string
): Promise<void> {
  try {
    const mailResponse = await mailSender(
      // the email of the user
      email,
      // the subject of the email
      "Verification Code from Ritik's Learning Management System",
      // the body
      `<h1>Please verify your email</h1>
       <p>Here is your OTP code: <b>${code}</b></p>`
    );
    console.log("OTP Model: Email sent successfully: ", mailResponse);
  } catch (error: unknown) {
    error instanceof Error
      ? console.error(
          "OTP Model Error: Problem occurred while sending email: ",
          error.message
        )
      : console.error(
          "OTP Model Error: Problem occurred while sending email: ",
          error
        );
    throw error; // Stop the save process if email fails
  }
}

// The middleware
OTPSchema.pre<OTPContract>("save", async function (this: OTPContract) {
  // Only send email if the document is new (not being updated)
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.code);
  }
});

/* ---------------------------------------------------------------------------------------
The Model
------------------------------------------------------------------------------------------ */

const OTP = mongoose.model<OTPContract>("OTP", OTPSchema);

export default OTP;
