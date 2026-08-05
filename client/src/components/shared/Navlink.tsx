/* ----------------------------------------------------------------------------------------------
Navlink.tsx
The common router navigation element 
------------------------------------------------------------------------------------------------- */

import React from "react";
import { NavLink } from "react-router-dom";

interface NavlinkProps {
  to: string;
  children:
    | React.ReactNode
    | ((props: { isActive: boolean }) => React.ReactNode);
  className?: string;
  nonActiveColor?: string;
}

function Navlink({
  to,
  children,
  className,
  nonActiveColor = "text-white",
}: NavlinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${isActive ? "text-blue-900" : nonActiveColor} ${className || ""}`
      }
    >
      {/* 
          We call children as a function if it's provided as one, 
          passing the isActive state down.
      */}
      {({ isActive }) =>
        typeof children === "function" ? children({ isActive }) : children
      }
    </NavLink>
  );
}

export default Navlink;
