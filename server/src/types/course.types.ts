/* ---------------------------------------------------------------------------------------
course.types.ts
------------------------------------------------------------------------------------------ */
import { Document, Types } from "mongoose";

/* ---------------------------------------------------------------------------------------
COURSE INTERFACE 
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
  sections: Types.ObjectId[];
  owner: Types.ObjectId;
  enrolledBy: Types.ObjectId[];
}

// interface segreggation to avoid tight coupling
export interface CourseContract extends CourseDomain, Document {
  createdAt: Date;
  updatedAt: Date;
}

/* ---------------------------------------------------------------------------------------
COURSE PROGRESS INTERFACE 
------------------------------------------------------------------------------------------ */
interface CourseProgressDomain {
  course: Types.ObjectId;
  user: Types.ObjectId;
  completedVideos: Types.ObjectId[];
}

// interface segreggation to avoid tight coupling
export interface CourseProgressContract extends CourseProgressDomain, Document {
  createdAt: Date;
  updatedAt: Date;
}

/* ---------------------------------------------------------------------------------------
COURSE CATEGORY INTERFACE 
------------------------------------------------------------------------------------------ */

interface CourseCategoryDomain {
  name: string;
  courses: Types.ObjectId[];
}

// interface segreggation to avoid tight coupling
export interface CourseCategoryContract extends CourseCategoryDomain, Document {
  createdAt: Date;
  updatedAt: Date;
}

/* ---------------------------------------------------------------------------------------
COURSE SECTION INTERFACE 
------------------------------------------------------------------------------------------ */

interface CourseSectionDomain {
  title: string;
  course: Types.ObjectId;
  courseVideos: Types.ObjectId[];
}

export interface CourseSectionContract extends Document, CourseSectionDomain {
  createdAt: Date;
  updatedAt: Date;
}

/* ---------------------------------------------------------------------------------------
COURSE VIDEO INTERFACE 
------------------------------------------------------------------------------------------ */

interface CourseVideoDomain {
  title: string;
  videoUrl: string;
  duration: number;
  courseSection: Types.ObjectId;
}

export interface CourseVideoContract extends Document, CourseVideoDomain {
  createdAt: Date;
  updatedAt: Date;
}
