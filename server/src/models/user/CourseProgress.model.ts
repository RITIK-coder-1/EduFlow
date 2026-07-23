/* ---------------------------------------------------------------------------------------
CourseProgress.model.ts
This file builds the schema for tracking the course progress for each user. Each completed video of a particular course will be added to this document. 
------------------------------------------------------------------------------------------ */

import mongoose from "mongoose";
import type { CourseProgressContract } from "../../types/index.types.ts";

/* ---------------------------------------------------------------------------------------
The Schema 
------------------------------------------------------------------------------------------ */

const courseProgressSchema = new mongoose.Schema<CourseProgressContract>(
  {
    // which course is being tracked
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },

    // who is watching the course
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // number of completed videos
    completedVideos: [
      {
        type: mongoose.Schema.Types.ObjectId,
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

const CourseProgress = mongoose.model<CourseProgressContract>(
  "CourseProgress",
  courseProgressSchema
);

export default CourseProgress;
