/* ----------------------------------------------------------------------------------------------
useGetVideoData.ts
The hook to provide the important data for course videos
------------------------------------------------------------------------------------------------- */

import { useGetCourseQuery } from "../api/index.api.js";
import { useEffect, useState } from "react";

function useGetVideoData(courseId: string, videoId: string) {
  // the course
  const {
    data: { course },
  } = useGetCourseQuery({ courseId });

  // the video details to send
  const [videoData, setVideoData] = useState({
    courseTitle: course?.title,
    sectionTitle: "",
    videoTitle: "",
    videoUrl: "",
  });

  useEffect(() => {
    if (!course || !videoId) return;

    // returns an array of sections where one element has the video details if it matches the video the user wants to watch and the other elements are undefined
    const sectionsArray = course?.sections?.flatMap((section) => {
      return section?.courseVideos?.flatMap((video) => {
        if (video?._id === videoId) {
          return {
            courseTitle: course?.title,
            sectionTitle: section?.title,
            videoTitle: video?.title,
            videoUrl: video?.videoUrl,
          };
        }
      });
    });

    // remove the unwanted undefined elements
    const videoDetailsArray = sectionsArray?.filter((ele) => ele !== undefined);

    // update the video details with the array element
    if (videoDetailsArray !== undefined) {
      setVideoData(videoDetailsArray[0]);
    }
  }, [course, videoId]);

  return videoData;
}

export default useGetVideoData;
