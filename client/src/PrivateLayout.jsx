/* ----------------------------------------------------------------------------------------------
PrivateLayout.jsx
It contains the routing for every single private page that requires authentication
It also renders the public course pages to visit without logging in 
------------------------------------------------------------------------------------------------- */

import { TopBar, MainSection, AppSidebar } from "./components/index.components";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import useUserStatus from "./hooks/useUserStatus";

function PrivateLayout() {
  const { isAuthenticated } = useUserStatus();
  const location = useLocation();
  const navigate = useNavigate();

  // if the user is authentication or any public user is accessing the courses, return the layout or redirect the user to the homepage
  if (isAuthenticated || location.pathname.includes("/app/courses")) {
    return (
      <>
        {/* The top bar for the logged in users*/}
        {isAuthenticated && <TopBar />}

        <SidebarProvider>
          {/* The side bar for navigation for logged in users */}
          {isAuthenticated && <AppSidebar />}

          {/* The sidebar trigger */}
          {isAuthenticated && <SidebarTrigger className="fixed z-50" />}

          {/* The main section of the page */}
          <MainSection>
            {/* The children */}
            <Outlet />
          </MainSection>
        </SidebarProvider>
      </>
    );
  } else {
    navigate("/", { replace: true });
  }
}

export default PrivateLayout;
