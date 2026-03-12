/* ----------------------------------------------------------------------------------------------
EnrollmentStats.jsx
The enrollment stats of a course
------------------------------------------------------------------------------------------------- */

import React, { useState, useEffect } from "react";
import {
  useGetCourseInstructorQuery,
} from "@/api/index.api";

const EnrollmentStats = ({ courseId }) => {
  const { data } = useGetCourseInstructorQuery({ courseId });
  const course = data?.data;
  const [stats, setStats] = useState({ total: 0, rate: 0 });

  useEffect(() => {
    setStats({
      total: course?.enrolledBy?.length,
      rate: course?.revenue,
    });
  }, [course]);

  return (
    <div className="bg-[#1a1c2e] border border-gray-800 rounded-lg p-5 mb-6 flex gap-8 items-center">
      <div>
        <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">
          Enrolled Students
        </p>
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            {stats.total}
          </h2>
        </div>
      </div>

      <div className="h-8 w-px bg-gray-700"></div>

      <div>
        <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">
          Total Revenue
        </p>
        <h2 className="text-xl font-semibold text-gray-200">₹{stats.rate}</h2>
      </div>
    </div>
  );
};

export default EnrollmentStats;
