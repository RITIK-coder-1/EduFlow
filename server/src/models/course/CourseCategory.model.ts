/* ---------------------------------------------------------------------------------------
CourseCategory.model.js
This file builds the course category schema 
------------------------------------------------------------------------------------------ */
import mongoose from "mongoose";
import type { Document } from "mongoose";

/* ---------------------------------------------------------------------------------------
The Interface 
------------------------------------------------------------------------------------------ */

interface CourseCategoryDomain {
  name: string;
  courses: mongoose.Types.ObjectId[];
}

// interface segreggation to avoid tight coupling
interface CourseCategoryContract extends CourseCategoryDomain, Document {
  createdAt: Date;
  updatedAt: Date;
}

/* ---------------------------------------------------------------------------------------
The Schema 
------------------------------------------------------------------------------------------ */

const courseCategorySchema = new mongoose.Schema<CourseCategoryContract>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
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

const CourseCategory = mongoose.model<CourseCategoryContract>(
  "CourseCategory",
  courseCategorySchema
);

export default CourseCategory;
