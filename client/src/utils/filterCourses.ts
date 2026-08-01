/* ----------------------------------------------------------------------------------------------
filterCourse.ts
The utility to filter the course fields for display 
------------------------------------------------------------------------------------------------- */

import { CourseContract } from "../types/index.types";

export interface FilteredCourseContract {
  courseId: string;
  title: string;
  desc: string;
  img: string;
  price: number;
  instructorFirstName: string;
  instructorLastName: string;
}

function filterCourses(courseArray: CourseContract[]) {
  const courses: FilteredCourseContract[] = courseArray?.map((course) => {
    return {
      courseId: course?._id,
      title: course?.title,
      desc: course?.description,
      img: course?.thumbnail,
      price: course?.price,
      instructorFirstName: course?.owner?.firstName,
      instructorLastName: course?.owner?.lastName,
    };
  });

  return courses;
}

export default filterCourses;
