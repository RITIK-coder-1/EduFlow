/* ---------------------------------------------------------------------------------------
Course.model.js
This file builds the course schema for defining the course data points
------------------------------------------------------------------------------------------ */

import mongoose from "mongoose";
import type { Document } from "mongoose";

/* ---------------------------------------------------------------------------------------
The Interface 
------------------------------------------------------------------------------------------ */

interface CourseDomain {
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  tags: string[];
  status: string;
  category: string;
  revenue: number;
  sections: mongoose.Types.ObjectId[];
  owner: mongoose.Types.ObjectId;
  enrolledBy: mongoose.Types.ObjectId[];
}

// interface segreggation to avoid tight coupling
interface CourseContract extends CourseDomain, Document {
  createdAt: Date;
  updatedAt: Date;
}

/* ---------------------------------------------------------------------------------------
The Schema 
------------------------------------------------------------------------------------------ */

const courseSchema = new mongoose.Schema<CourseContract>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Database Error: The price can't be negative!"],
      default: 0,
    },
    thumbnail: {
      type: String, // cloudinary link
      required: true,
    },
    tags: {
      type: [String], // array of strings
      required: true, // for searching efficiency
    },
    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    revenue: {
      type: Number,
      default: 0,
      min: 0,
    },

    // SEPERATED DOCUMENTS (I've seperated the documents to keep them light individually)
    sections: [
      // The chapters of the course.
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseSection",
        required: true,
      },
    ],

    // USER REFERENCES
    owner: {
      // Who created the course
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    enrolledBy: [
      // Who bought the course
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

/* ---------------------------------------------------------------------------------------
The Model
------------------------------------------------------------------------------------------ */

const Course = mongoose.model<CourseContract>("Course", courseSchema);

export default Course;
