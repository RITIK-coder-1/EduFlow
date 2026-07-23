/* ---------------------------------------------------------------------------------------
courseSection.model.ts
This file builds the schema for the course lessons
------------------------------------------------------------------------------------------ */

import mongoose, { Schema, Model } from "mongoose";
import type { CourseSectionContract } from "../../types/course.types.ts";

/* ---------------------------------------------------------------------------------------
The Schema 
------------------------------------------------------------------------------------------ */

const courseSectionSchema = new Schema<CourseSectionContract>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    // the actual video lessons
    courseVideos: [
      {
        type: Schema.Types.ObjectId,
        ref: "CourseVideo",
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

const CourseSection: Model<CourseSectionContract> =
  mongoose.model<CourseSectionContract>("CourseSection", courseSectionSchema);

export default CourseSection;
