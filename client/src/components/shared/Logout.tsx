/* ----------------------------------------------------------------------------------------------
Logout.tsx
------------------------------------------------------------------------------------------------- */

import { useLogoutMutation } from "../../api/index.api";
import { disableUser } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/useReduxHooks";

interface LogoutProps {
  className?: string;
}

function Logout({ className }: LogoutProps) {
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  /* ---------------------------------------------------------------------------------------
  Log the user out 
  Disable the user in the global state 
  ------------------------------------------------------------------------------------------ */

  const logoutUserFunction = async () => {
    try {
      await logout().unwrap();
      dispatch(disableUser());
      navigate("/");
      toast.success("Successfully logged out", { position: "bottom-right" });
    } catch (error: any) {
      toast.error(error?.message || "Failed to log out", {
        position: "top-right",
      });
    }
  };

  return (
    <button onClick={logoutUserFunction} className={className} title="log out">
      {isLoading ? "Logging Out..." : "Logout"}
    </button>
  );
}

export default Logout;
