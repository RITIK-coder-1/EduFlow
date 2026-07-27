/* ---------------------------------------------------------------------------------------
course.types.ts
------------------------------------------------------------------------------------------ */

import { UserContract } from "./index.types.ts";

/* ---------------------------------------------------------------------------------------
COURSE INTERFACE 
------------------------------------------------------------------------------------------ */

export interface CourseContract {
  _id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  tags: string[];
  status: string;
  category: string;
  revenue: number;
  sections: CourseSectionContract[];
  owner: UserContract;
  enrolledBy: string[];
}

/* ---------------------------------------------------------------------------------------
COURSE CATEGORY INTERFACE 
------------------------------------------------------------------------------------------ */

export interface CourseCategoryContract {
  _id: string;
  name: string;
  courses: CourseContract[];
}

/* ---------------------------------------------------------------------------------------
COURSE SECTION INTERFACE 
------------------------------------------------------------------------------------------ */

export interface CourseSectionContract {
  _id: string;
  title: string;
  course: string;
  courseVideos: CourseVideoContract[];
}

/* ---------------------------------------------------------------------------------------
COURSE VIDEO INTERFACE 
------------------------------------------------------------------------------------------ */

export interface CourseVideoContract {
  _id: string;
  title: string;
  videoUrl: string;
  duration: number;
  courseSection: string;
}
