/* ----------------------------------------------------------------------------------------------
ProgressBar.jsx
The UI of the course progress 
------------------------------------------------------------------------------------------------- */

import useCourseCompletion from "@/hooks/useCourseCompletion";

function ProgressBar({courseId}) {
  const courseProgress = useCourseCompletion(courseId); // course progress %
  return (
    <div>
      <div className="w-full bg-gray-700 h-2 rounded-full">
        <div
          className={"bg-purple-500 h-2 rounded-full"}
          style={{ width: `${courseProgress}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-400 mt-2">{courseProgress}% Completed</p>
    </div>
  );
}

export default ProgressBar;
