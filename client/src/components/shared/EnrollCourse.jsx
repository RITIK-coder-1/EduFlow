/* ----------------------------------------------------------------------------------------------
EnrollCourse.jsx
The enrollment logic 
------------------------------------------------------------------------------------------------- */

import { useEnrollCourseMutation } from "@/api/index.api";
import { CommonButton, SpinnerCustom } from "@/components/index.components";
import { useNavigate } from "react-router-dom";
import useUserStatus from "@/hooks/useUserStatus";
import { toast } from "sonner";

const EnrollCourse = ({ courseId }) => {
  const navigate = useNavigate();

  // the user stats
  const { isAuthenticated, isOwner, isEnrolled, accountType } =
    useUserStatus(courseId);

  // the enroll course mutation
  const [enroll, { isLoading }] = useEnrollCourseMutation();

  // the enroll course API call
  const enrollIntoCourse = async () => {
    try {
      const {message} = await enroll({ courseId }).unwrap();
      toast.success(message, { position: "top-right" });
    } catch (error) {
      toast.error(error.message, { position: "top-right" });

    }
  };

  // if the user isn't logged in, forward them to the login page to enroll
  if (!isAuthenticated) {
    return (
      <CommonButton
        label="Login To Enroll"
        className="w-full"
        title="Enroll"
        onClick={() => navigate("/login")}
      />
    );
  }

  if (isAuthenticated && accountType !== "Admin") {
    switch (isOwner) {
      // if the user is the instructor themselves, forward them to the edit page
      case true:
        return (
          <CommonButton
            label="Edit Course"
            className="w-full"
            title="Edit"
            onClick={() => navigate(`/app/created-courses/${courseId}`)}
          />
        );
      case false:
        return isLoading ? (
          <CommonButton label={<SpinnerCustom />} className="w-full" />
        ) : isEnrolled ? (
          // if the user has already enrolled, forward them to the enrolled course page
          <CommonButton
            label="ENROLLED"
            className="w-full bg-[#1e293b] border-2 border-transparent bg-linear-to-r from-orange-500 to-blue-500 bg-origin-border [box-shadow:inset_2px_1000px_1px_#0f172a] text-white font-bold py-3 rounded-lg transition-all duration-500 cursor-text"
            title="Enrolled"
          />
        ) : (
          // if the user hasn't enrolled, enroll them
          <CommonButton
            label="Enroll Course"
            className="w-full"
            title="Enroll"
            onClick={enrollIntoCourse}
          />
        );
    }
  }
};

export default EnrollCourse;
