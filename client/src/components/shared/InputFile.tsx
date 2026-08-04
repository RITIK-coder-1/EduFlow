/* ---------------------------------------------------------------------------------------
InputFile.tsx
The input field to upload files
------------------------------------------------------------------------------------------ */

import React from "react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface InputFileProps {
  name?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  accept?: string;
}

function InputFile({
  name,
  label,
  description,
  onChange,
  required = true,
  disabled = false,
  accept,
}: InputFileProps) {
  return (
    <Field>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Input
        id={name}
        type="file"
        name={name}
        onChange={onChange}
        disabled={disabled}
        required={required}
        accept={accept}
      />
      {description && (
        <FieldDescription className="text-xs">{description}</FieldDescription>
      )}
    </Field>
  );
}

export default InputFile;
