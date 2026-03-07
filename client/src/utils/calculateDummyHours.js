/* ----------------------------------------------------------------------------------------------
calculateDummyHours.js
utility to provide a dummy hour completion data to the user 
------------------------------------------------------------------------------------------------- */

const calculateDummyHours = (enrolledCount) => {
  // If they have 0 courses, show 0 hours or give them a realistic "base" + some variation.
  return enrolledCount > 0 ? (enrolledCount * 4.5).toFixed(1) : 0;
};

export default calculateDummyHours;
