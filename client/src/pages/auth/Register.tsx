/* ---------------------------------------------------------------------------------------
Register.tsx
The page to register a user
------------------------------------------------------------------------------------------ */
import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import {
  useRegisterMutation,
  useRegisterOtpMutation,
} from "../../api/index.api";
import getFormData from "../../utils/getFormData";
import {
  CommonButton,
  FieldInput,
  Form,
  InputFile,
  SelectInput,
  DatePicker,
  OtpInput,
  SpinnerCustom,
} from "../../components/index.components";
import { NativeSelectOption } from "@/components/ui/native-select.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type {
  ApiErrorResponse,
  RegisterRequestBody,
} from "@/types/index.types";

function Register() {
  // navigation
  const navigate = useNavigate();

  /* ---------------------------------------------------------------------------------------
  The states of the page 
  ------------------------------------------------------------------------------------------ */

  // The user object
  const [userData, setUserData] = useState<RegisterRequestBody>({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    dateOfBirth: "",
    accountType: "Student",
    userOTP: "", // the otp entered by the user
    profilePic: null,
  });

  // the profile pic of the user: I'm separating this state to keep track of the user file object if the user wants to re-register later
  const [profilePic, setProfilePic] = useState<File | null>(null);

  // condition to show the OTP box
  const [isOtp, setIsOtp] = useState(false);

  /* ---------------------------------------------------------------------------------------
  The Redux Toolkit Query hooks for registeration 
  ------------------------------------------------------------------------------------------ */

  const [createRegisterOtp, { isLoading: isCreateOtpLoading }] =
    useRegisterOtpMutation();
  const [registerUser, { isLoading: isRegisterUserLoading, isSuccess }] =
    useRegisterMutation();

  /* ---------------------------------------------------------------------------------------
  The methods to manipulate the states 
  ------------------------------------------------------------------------------------------ */

  // setting the user text data
  const setRegisteringData = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // update the value of every single field as per the input value
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // setting the user profile image
  const fileData = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0] ?? null; // checking for TS-specific configuration: if the value is null, return null

    setProfilePic(image); // set the value of the profile pic as the file object
    setUserData({ ...userData, profilePic: image }); // explictly setting the value as image because the state changes are async and not immediate
  };

  // the method to set the date selected by the user using the shadcn date picker component
  const selectDate = (date: string) => {
    setUserData({ ...userData, dateOfBirth: date });
  };

  // setting the otp code
  const otpCodeFunction = (value: string) =>
    setUserData({ ...userData, userOTP: value });

  // re-registering option
  const reRegister = () => {
    setIsOtp(false);
    setUserData({ ...userData, profilePic, userOTP: "" }); // reset the value of the profile pic (from the server local file path to the user file object) and remove the old otp
  };

  /* ---------------------------------------------------------------------------------------
  sending data to the server
  ------------------------------------------------------------------------------------------ */

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if otp is not generated, send the form data including the profile pic. If otp is generated, send the registeration data with the otp

    if (!isOtp) {
      const formData = getFormData(userData);

      try {
        const { data, message } = await createRegisterOtp(formData).unwrap();
        setIsOtp(true);
        setUserData({ ...userData, profilePic: data?.profilePic }); // resetting the value of the profile pic to the server local file path so that it gets uploaded to cloudinary
        toast.success(message, { position: "top-right" });
      } catch (error: unknown) {
        toast.error((error as ApiErrorResponse).message, {
          position: "top-right",
        });
      }
    } else {
      try {
        const { message } = await registerUser(userData).unwrap();
        toast.success(message, { position: "top-right" });
      } catch (error: unknown) {
        toast.error((error as ApiErrorResponse).message, {
          position: "top-right",
        });
      }
    }

    // navigate to the dashboard once the user successfully registers
    if (isSuccess) {
      navigate("/login", { replace: true });
    }

    return (
      // the form element
      <Form onSubmit={handleSubmit} className="mb-2">
        {/* First Name */}
        <FieldInput
          label="First Name"
          name="firstName"
          onChange={setRegisteringData}
          disabled={isOtp}
          placeholder="Ritik"
          value={userData.firstName}
        />

        {/* Account type */}
        <SelectInput
          disabled={isOtp}
          onChange={setRegisteringData}
          name={"accountType"}
        >
          <NativeSelectOption value="" className="text-foreground">
            Choose Account Type
          </NativeSelectOption>
          <NativeSelectOption value="Student">Student</NativeSelectOption>
          <NativeSelectOption value="Instructor">Instructor</NativeSelectOption>
        </SelectInput>

        {/* Last Name */}
        <FieldInput
          label="Last Name"
          name="lastName"
          onChange={setRegisteringData}
          disabled={isOtp}
          placeholder="Mahapatra"
          required={false}
          value={userData.lastName}
        />

        {/* Username */}
        <FieldInput
          label="Username"
          name="username"
          onChange={setRegisteringData}
          disabled={isOtp}
          description="Enter a unique username (Must be more than 6 characters)"
          placeholder="ritik123"
          value={userData.username}
        />

        {/* Email */}
        <FieldInput
          label="Email"
          name="email"
          inputType="email"
          onChange={setRegisteringData}
          disabled={isOtp}
          placeholder="ritik@gmail.com"
          value={userData.email}
        />

        {/* Password */}
        <FieldInput
          label="Password"
          name="password"
          inputType="password"
          onChange={setRegisteringData}
          disabled={isOtp}
          description="At least 10 characters"
          placeholder="••••••••••••••••"
          value={userData.password}
        />

        {/* DOB */}
        <DatePicker disabled={isOtp} dateSelectionMethod={selectDate} />

        {/* Profile pic */}
        <InputFile
          label="Upload Profile"
          name="profilePic"
          description="Important: Instructors are required to upload a profile picture."
          disabled={isOtp}
          onChange={fileData}
          required={userData.accountType === "Instructor" ? true : false}
          accept="image/*"
        />

        {/* OTP */}
        <div className={isOtp ? "visible" : "hidden"}>
          <OtpInput
            setterFunction={otpCodeFunction}
            name="userOTP"
            required={isOtp}
            value={userData.userOTP}
          />
        </div>

        <div className="flex flex-col gap-2 lg:flex-row">
          {/* Submit */}
          <CommonButton
            type="submit"
            label={
              isCreateOtpLoading || isRegisterUserLoading ? (
                <SpinnerCustom />
              ) : isOtp ? (
                "Register"
              ) : (
                "Submit"
              )
            }
          />

          {/* Re-register */}
          <CommonButton
            label="Re-submit"
            onClick={reRegister}
            className={`${
              isOtp ? "visible" : "hidden"
            } bg-blue-950 hover:bg-blue-900`}
          />
        </div>
      </Form>
    );
  };
}

export default Register;
