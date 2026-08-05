/* ----------------------------------------------------------------------------------------------
UpdateEmail.tsx
The page to update the user email 
------------------------------------------------------------------------------------------------- */

import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import {
  useUpdateUserEmailMutation,
  useUpdateUserEmailOtpMutation,
} from "../../api/index.api";
import {
  Form,
  FieldInput,
  CommonButton,
  OtpInput,
  SpinnerCustom,
} from "@/components/index.components";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import type { ApiErrorResponse } from "@/types/index.types";

function UpdateEmail() {
  const navigate = useNavigate();

  /* ---------------------------------------------------------------------------------------
  Interfaces
  ------------------------------------------------------------------------------------------ */
  interface EmailStateContract {
    newEmail: string;
    password: string;
  }

  /* ---------------------------------------------------------------------------------------
  The Redux Toolkit Data
  ------------------------------------------------------------------------------------------ */
  const [getUpdateOtp, { isLoading: isOtpLoading }] =
    useUpdateUserEmailOtpMutation();
  const [updateEmail, { isLoading: isUpdateLoading }] =
    useUpdateUserEmailMutation();

  /* ---------------------------------------------------------------------------------------
  The states  
  ------------------------------------------------------------------------------------------ */
  const [userData, setUserData] = useState<EmailStateContract>({
    newEmail: "",
    password: "",
  });
  const [isOtp, setIsOtp] = useState(false);
  const [userOtp, setUserOtp] = useState("");

  /* ---------------------------------------------------------------------------------------
  The method to set the states 
  ------------------------------------------------------------------------------------------ */
  const setValue = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const setOtpFunction = (otp: string) => {
    setUserOtp(otp);
  };

  /* ---------------------------------------------------------------------------------------
  The API call to update the email 
  ------------------------------------------------------------------------------------------ */
  const update = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isOtp) {
      try {
        const { message } = await getUpdateOtp(userData).unwrap();
        setIsOtp(true);
        toast.success(message, { position: "top-right" });
      } catch (error: unknown) {
        toast.error((error as ApiErrorResponse).message, {
          position: "top-right",
        });
      }
    } else {
      try {
        const newEmail = userData.newEmail;
        const { message } = await updateEmail({
          userOtp,
          newEmail,
        }).unwrap();
        toast.success(message, { position: "top-right" });
        navigate(-1);
      } catch (error: unknown) {
        toast.error((error as ApiErrorResponse).message, {
          position: "top-right",
        });
      }
    }
  };
  return (
    <Form onSubmit={update}>
      {/* The new email */}
      <FieldInput
        label="New Email"
        name="newEmail"
        inputType="email"
        placeholder="New Email"
        onChange={setValue}
        disabled={isOtp}
        value={userData?.newEmail}
      />

      {/* Password */}
      <FieldInput
        label="Password"
        name="password"
        inputType="password"
        placeholder="Password"
        onChange={setValue}
        disabled={isOtp}
        value={userData?.password}
      />

      {/* OTP */}
      {isOtp && (
        <OtpInput
          name="userOtp"
          required={isOtp}
          setterFunction={setOtpFunction}
          value={userOtp}
        />
      )}
      <CommonButton
        type="submit"
        label={
          isOtpLoading || isUpdateLoading ? <SpinnerCustom /> : "Update Email"
        }
      />
    </Form>
  );
}
export default UpdateEmail;
