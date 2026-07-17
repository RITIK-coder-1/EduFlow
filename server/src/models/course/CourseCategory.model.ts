/* ---------------------------------------------------------------------------------------
CourseCategory.model.js
This file builds the course category schema 
------------------------------------------------------------------------------------------ */
import mongoose from "mongoose";
import { CourseCategoryContract } from "../../types/course.types.ts";

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
