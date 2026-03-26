/* ----------------------------------------------------------------------------------------------
Dashboard.jsx
The user dashboard
------------------------------------------------------------------------------------------------- */

import StudentDashboard from "./StudentDashboard";
import InstructorDashboard from "./InstructorDashboard";
import AdminDashboard from "./AdminDashboard";
import useUserStatus from "@/hooks/useUserStatus";

function Dashboard() {
  const { accountType } = useUserStatus();

  if (accountType === "Student") return <StudentDashboard />;
  else if (accountType === "Instructor") return <InstructorDashboard />;
  else if (accountType === "Admin") return <AdminDashboard />;
}

export default Dashboard;
