/* ----------------------------------------------------------------------------------------------
useCourseCompletion.js
The hook for getting the course completion data 
------------------------------------------------------------------------------------------------- */

import { useGetCourseProgressQuery, useGetCourseQuery } from "@/api/index.api";
import { useState } from "react";

function useCourseCompletion(courseId, videoId) {
  // the course data
  const { data: courseData } = useGetCourseQuery({ courseId });
  const course = courseData?.data;
  const sections = course?.sections;

  // the course progress data
  const { data: courseProgressData } = useGetCourseProgressQuery({
    courseId,
    videoId,
  });
  const completedVideos = courseProgressData?.data?.completedVideos;

  // the state to hold the course videos
  const [numberOfCourseVideos, setNumberOfCourseVideos] = useState([]);

  // adding each video to the numberOfCourseVideos array
  sections?.forEach((section) => {
    section?.courseVideos.forEach((video) => {
      // add only if the video isn't present already
      if (!numberOfCourseVideos.includes(video?._id)) {
        setNumberOfCourseVideos([...numberOfCourseVideos, video?._id]);
      }
    });
  });

  console.log(numberOfCourseVideos);
}

export default useCourseCompletion;
