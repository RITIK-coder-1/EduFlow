/* ----------------------------------------------------------------------------------------------
UpdateEmail.jsx
The page to update the user email 
------------------------------------------------------------------------------------------------- */

import { useState } from "react";
import {
  useUpdateUserEmailMutation,
  useUpdateUserEmailOtpMutation,
} from "../../api/index.api";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/authSlice";
import {
  Form,
  FieldInput,
  CommonButton,
  OtpInput,
  SpinnerCustom,
} from "@/components/index.components";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function UpdateEmail() {
  const navigate = useNavigate()
  /* ---------------------------------------------------------------------------------------
  The Redux Toolkit Data
  ------------------------------------------------------------------------------------------ */
  const [getUpdateOtp, { isLoading: isOtpLoading }] =
    useUpdateUserEmailOtpMutation();
  const [updateEmail, { isLoading: isUpdateLoading }] =
    useUpdateUserEmailMutation();
  const dispatch = useDispatch();

  /* ---------------------------------------------------------------------------------------
  The states  
  ------------------------------------------------------------------------------------------ */
  const [userData, setUserData] = useState({
    newEmail: "",
    password: "",
  });
  const [isOtp, setIsOtp] = useState(false);
  const [userOtp, setUserOtp] = useState("");

  /* ---------------------------------------------------------------------------------------
  The method to set the states 
  ------------------------------------------------------------------------------------------ */
  const setValue = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const setOtpFunction = (otp) => {
    setUserOtp(otp);
  };

  /* ---------------------------------------------------------------------------------------
  The API call to update the email 
  ------------------------------------------------------------------------------------------ */
  const update = async (e) => {
    e.preventDefault();
    if (!isOtp) {
      try {
        const { message } = await getUpdateOtp(userData).unwrap();
        setIsOtp(true);
        toast.success(message, { position: "top-right" });
      } catch (error) {
        toast.error(error.message, { position: "top-right" });
      }
    } else {
      try {
        const newEmail = userData.newEmail;
        const { data, message } = await updateEmail({
          userOtp,
          newEmail,
        }).unwrap();
        dispatch(setUser(data));
        toast.success(message, { position: "top-right" });
        navigate(-1)
      } catch (error) {
        toast.error(error.message, { position: "top-right" });
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
