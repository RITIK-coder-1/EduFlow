/* ---------------------------------------------------------------------------------------
courseVideo.model.ts
This file builds the schema for the course videos. Each video is going to be embedded inside a particular section (lesson)
------------------------------------------------------------------------------------------ */

import mongoose, { Schema, Document, Types, Model } from "mongoose";

/* ---------------------------------------------------------------------------------------
The Domain Interface
------------------------------------------------------------------------------------------ */

interface CourseVideoDomain {
  title: string;
  videoUrl: string;
  duration: number;
  courseSection: Types.ObjectId;
}

/* ---------------------------------------------------------------------------------------
The Contract Interface 
------------------------------------------------------------------------------------------ */

interface CourseVideoContract extends Document, CourseVideoDomain {
  createdAt: Date;
  updatedAt: Date;
}

/* ---------------------------------------------------------------------------------------
The Schema 
------------------------------------------------------------------------------------------ */

const courseVideoSchema = new Schema<CourseVideoContract>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    videoUrl: {
      type: String, // cloudinary link,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    courseSection: {
      type: Schema.Types.ObjectId,
      ref: "CourseSection",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/* ---------------------------------------------------------------------------------------
The Model
------------------------------------------------------------------------------------------ */

const CourseVideo: Model<CourseVideoContract> =
  mongoose.model<CourseVideoContract>("CourseVideo", courseVideoSchema);

export default CourseVideo;
