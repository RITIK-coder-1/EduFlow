/* ----------------------------------------------------------------------------------------------
useGetVideoData.ts
The hook to provide the important data for course videos
------------------------------------------------------------------------------------------------- */

import { useGetCourseQuery } from "../api/index.api";
import { useMemo } from "react";
import type { CourseVideoContract } from "../types/index.types";

/* ----------------------------------------------------------------------------------------------
INTERFACE
------------------------------------------------------------------------------------------------- */

interface VideoDataContract {
  courseTitle: string;
  sectionTitle: string;
  videoTitle: string;
  videoUrl: string;
}

/* ----------------------------------------------------------------------------------------------
FUNCTION
------------------------------------------------------------------------------------------------- */

function useGetVideoData(
  courseId: string,
  videoId: string
): VideoDataContract | null {
  // the course
  const { data } = useGetCourseQuery({ courseId });
  const course = data?.data;

  // using useMemo to trigger a re-render only when the dependencies change
  const videoData = useMemo(() => {
    // Return early if the data hasn't loaded yet
    if (!course?.sections) return null;

    // the desired video
    for (const section of course.sections) {
      const video = section?.courseVideos?.find(
        (v: CourseVideoContract) => v?._id === videoId
      );

      if (video) {
        return {
          courseTitle: course.title,
          sectionTitle: section.title,
          videoTitle: video.title,
          videoUrl: video.videoUrl,
        };
      }
    }

    // Return null if the loop finishes without finding the video
    return null;
  }, [course, videoId]);

  return videoData;
}

export default useGetVideoData;
