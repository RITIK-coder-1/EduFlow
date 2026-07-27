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
