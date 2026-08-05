/* ---------------------------------------------------------------------------------------
Button.jsx
------------------------------------------------------------------------------------------ */

import { Button } from "@/components/ui/button";
import React from "react";

type ButtonType = "button" | "submit" | "reset" | undefined;

interface CommonButtonContract {
  type?: ButtonType;
  label: string | React.ReactNode;
  className?: string;
  title?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

function CommonButton({
  type = "button",
  label,
  onClick = () => {},
  className,
  title,
  disabled,
}: CommonButtonContract) {
  return (
    <Button
      type={type}
      className={`text-lg w-50 p-5 shadow-2xl shadow-black hover:bg-purple-950 border border-black/90 ${className}`}
      onClick={onClick}
      title={title}
      disabled={disabled}
    >
      {label}
    </Button>
  );
}

export default CommonButton;
