/* ---------------------------------------------------------------------------------------
course.types.ts
------------------------------------------------------------------------------------------ */

/* ---------------------------------------------------------------------------------------
COURSE INTERFACE 
------------------------------------------------------------------------------------------ */

export interface CourseContract {
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  tags: string[];
  status: string;
  category: string;
  revenue: number;
  sections: string[];
  owner: string;
  enrolledBy: string[];
}

/* ---------------------------------------------------------------------------------------
COURSE CATEGORY INTERFACE 
------------------------------------------------------------------------------------------ */

export interface CourseCategoryContract {
  name: string;
  courses: string[];
}

/* ---------------------------------------------------------------------------------------
COURSE SECTION INTERFACE 
------------------------------------------------------------------------------------------ */

export interface CourseSectionContract {
  title: string;
  course: string;
  courseVideos: string[];
}

/* ---------------------------------------------------------------------------------------
COURSE VIDEO INTERFACE 
------------------------------------------------------------------------------------------ */

export interface CourseVideoContract {
  title: string;
  videoUrl: string;
  duration: number;
  courseSection: string;
}
