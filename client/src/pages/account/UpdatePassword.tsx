/* ----------------------------------------------------------------------------------------------
UpdatePassword.tsx
The page to update the user password 
------------------------------------------------------------------------------------------------- */

import { useState, ChangeEvent, SubmitEvent } from "react";
import { useUpdateUserPasswordMutation } from "../../api/index.api";
import {
  Form,
  CommonButton,
  FieldInput,
  SpinnerCustom,
} from "@/components/index.components";
import { toast } from "sonner";
import { ApiErrorResponse } from "@/types/index.types";

function UpdatePassword() {
  /* ---------------------------------------------------------------------------------------
  Interfaces
  ------------------------------------------------------------------------------------------ */
  interface PasswordStateContract {
    oldPassword: string;
    newPassword: string;
  }

  /* ---------------------------------------------------------------------------------------
  The Redux Toolkit Data
  ------------------------------------------------------------------------------------------ */
  const [update, { isLoading }] = useUpdateUserPasswordMutation();

  /* ---------------------------------------------------------------------------------------
  The passwords  
  ------------------------------------------------------------------------------------------ */
  const [passwords, setPasswords] = useState<PasswordStateContract>({
    oldPassword: "",
    newPassword: "",
  });

  /* ---------------------------------------------------------------------------------------
  The method to set the new and old passwords 
  ------------------------------------------------------------------------------------------ */
  const setValue = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  /* ---------------------------------------------------------------------------------------
  The API call to update the password 
  ------------------------------------------------------------------------------------------ */
  const updatePassword = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { message } = await update(passwords).unwrap();
      toast.success(message, { position: "top-right" });
    } catch (error: unknown) {
      toast.error((error as ApiErrorResponse).message, {
        position: "top-right",
      });
    }
  };

  return (
    <Form onSubmit={updatePassword} className="flex flex-col gap-2">
      <FieldInput
        name="oldPassword"
        label="Old Password "
        inputType="password"
        onChange={setValue}
        placeholder="Old Password"
        value={passwords?.oldPassword}
      />

      <FieldInput
        name="newPassword"
        label="New Password "
        inputType="password"
        onChange={setValue}
        placeholder="New Password"
        value={passwords?.newPassword}
      />

      <CommonButton
        label={isLoading ? <SpinnerCustom /> : "Update Password"}
        type="submit"
        title="Update Password"
      />
    </Form>
  );
}

export default UpdatePassword;
