/* ---------------------------------------------------------------------------------------
course.types.ts
------------------------------------------------------------------------------------------ */

import { UserContract } from "./index.types";

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
  createdAt?: string;
  updatedAt?: string;
}

/* ---------------------------------------------------------------------------------------
COURSE CATEGORY INTERFACE 
------------------------------------------------------------------------------------------ */

export interface CourseCategoryContract {
  _id: string;
  name: string;
  courses: CourseContract[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

/* ---------------------------------------------------------------------------------------
COURSE SECTION INTERFACE 
------------------------------------------------------------------------------------------ */

export interface CourseSectionContract {
  _id: string;
  title: string;
  course: string;
  courseVideos: CourseVideoContract[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
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
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

/* ---------------------------------------------------------------------------------------
MINIMAL INTERFACES 
------------------------------------------------------------------------------------------ */

export interface MinimalCourse {
  title?: string;
  description?: string;
  price?: number;
  category?: string;
  sections?: CourseSectionContract[];
  tags?: string[];
  courseId?: string;
  status?: string;
  thumbnail?: File | null | string;
}

export interface MinimalCourseVideoContract {
  title?: string;
  sectionId?: string;
  videoId?: string;
  courseId?: string;
}

export interface MinimalSectionContract {
  title?: string;
  courseId?: string;
  sectionId?: string;
}
