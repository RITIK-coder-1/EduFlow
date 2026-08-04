/* ---------------------------------------------------------------------------------------
FieldInput.tsx
The input field along with its label 
------------------------------------------------------------------------------------------ */

import React from "react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface FieldInputProps {
  label?: React.ReactNode;
  name?: string;
  inputType?: string;
  placeholder?: string;
  description?: React.ReactNode;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  isLabel?: boolean;
  min?: number | string;
  value?: string | number;
  useParentValue?: boolean;
}

function FieldInput({
  label,
  name,
  inputType = "text",
  placeholder,
  description = "",
  required = true,
  onChange = () => {},
  onBlur = () => {},
  disabled = false,
  isLabel = true,
  min,
  value = "",
  useParentValue = true,
}: FieldInputProps) {
  return (
    <Field>
      {isLabel && (
        <FieldLabel htmlFor={name}>
          {label}
          {required && <span className="text-destructive text-red-600">*</span>}
        </FieldLabel>
      )}
      <Input
        id={name}
        type={inputType}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        disabled={disabled}
        className="sm:py-5 text-md sm:text-lg lg:text-xl border-0"
        min={min}
        {...(useParentValue ? { value } : { defaultValue: value })}
      />
      {description && (
        <FieldDescription className="text-xs md:text-sm">
          {description}
        </FieldDescription>
      )}
    </Field>
  );
}

export default FieldInput;
