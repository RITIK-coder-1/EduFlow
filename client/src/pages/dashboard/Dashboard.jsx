/* ----------------------------------------------------------------------------------------------
Dashboard.jsx
The user dashboard
------------------------------------------------------------------------------------------------- */

import { useSelector } from "react-redux";
import StudentDashboard from "./StudentDashboard";
import InstructorDashboard from "./InstructorDashboard";
import AdminDashboard from "./AdminDashboard";

function Dashboard() {
  const user = useSelector((state) => state.auth.user);

  if (user?.accountType === "Student") return <StudentDashboard />;
  else if (user?.accountType === "Instructor") return <InstructorDashboard />;
  else if (user?.accountType === "Admin") return <AdminDashboard />;
}

export default Dashboard;
