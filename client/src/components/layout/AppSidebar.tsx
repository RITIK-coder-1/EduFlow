/* ----------------------------------------------------------------------------------------------
AppSidebar.tsx
The navigation sidebar
------------------------------------------------------------------------------------------------- */

import { Sidebar, SidebarContent, SidebarGroupLabel } from "../ui/sidebar.jsx";
import { Navlink } from "../index.components.js";
import useUserStatus from "../../hooks/useUserStatus.js";

interface NavigationItem {
  path: string;
  label: string;
  id: string;
  className?: string;
}

const instructorNavigationList: NavigationItem[] = [
  { path: "/app/dashboard", label: "Dashboard", id: crypto.randomUUID() },
  {
    path: "/app/enrolled-courses",
    label: "Enrolled Courses",
    id: crypto.randomUUID(),
  },
  { path: "/app/courses", label: "Explore", id: crypto.randomUUID() },
  {
    path: "/app/created-courses",
    label: "Created Courses",
    id: crypto.randomUUID(),
    className: "border-0",
  },
];

const studentNavigationFilter = instructorNavigationList.filter(
  (ele) => ele.label !== "Created Courses"
);

const adminNavigationFilter = studentNavigationFilter.filter(
  (ele) => ele.label !== "Enrolled Courses"
);

export function AppSidebar() {
  const { accountType } = useUserStatus();

  const getNavigationList = (): NavigationItem[] => {
    if (accountType === "Instructor") return instructorNavigationList;
    if (accountType === "Student") return studentNavigationFilter;
    if (accountType === "Admin") return adminNavigationFilter;
    return [];
  };

  return (
    <Sidebar side="left" className="md:shadow-2xl shadow-black">
      <SidebarContent className="rounded-br-lg rounded-tr-lg border border-l-0 border-white/50">
        {getNavigationList().map((ele) => (
          <SidebarGroupLabel
            className={ele.className || ""}
            title={
              ele.label === "Explore" ? "Explore Courses" : `Visit ${ele.label}`
            }
            key={ele.id}
          >
            <Navlink
              to={ele.path}
              nonActiveColor="text-yellow-200"
              className="w-full h-full flex justify-start items-center"
            >
              {ele.label}
            </Navlink>
          </SidebarGroupLabel>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
