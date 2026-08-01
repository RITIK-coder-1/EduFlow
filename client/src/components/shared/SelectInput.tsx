/* ---------------------------------------------------------------------------------------
SelectInput.tsx
The select input element
------------------------------------------------------------------------------------------ */

import React from "react";
import { NativeSelect } from "@/components/ui/native-select";

interface SelectInputProps {
  name: string;
  children: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string | number;
  className?: string;
}

function SelectInput({
  name,
  children,
  required = true,
  disabled = false,
  onChange,
  value,
  className = "",
}: SelectInputProps) {
  return (
    <NativeSelect
      name={name}
      required={required}
      disabled={disabled}
      onChange={onChange}
      className={`bg-black sm:h-10 sm:text-md cursor-pointer ${className}`}
      value={value}
    >
      {children}
    </NativeSelect>
  );
}

export default SelectInput;
