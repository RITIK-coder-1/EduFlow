/* ---------------------------------------------------------------------------------------
Login.jsx
The page to login a user
------------------------------------------------------------------------------------------ */

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../api/index.api";
import { useDispatch } from "react-redux";
import { setUser } from "../../../features/authSlice";
import {
  CommonButton,
  FieldInput,
  Form,
  SpinnerCustom,
} from "@/components/index.components";
import { toast } from "sonner";

function Login() {
  const navigate = useNavigate();

  /* ---------------------------------------------------------------------------------------
  The states of the page 
  ------------------------------------------------------------------------------------------ */

  // the data for otp creation
  const [loginData, setLoginData] = useState({
    credential: "",
    password: "",
  });

  /* ---------------------------------------------------------------------------------------
  The Redux Toolkit Query hooks for login 
  ------------------------------------------------------------------------------------------ */

  const [loginUser, { isLoading: isLoginLoading, isSuccess }] =
    useLoginMutation();

  const dispatch = useDispatch();

  /* ---------------------------------------------------------------------------------------
  The methods to manipulate the states 
  ------------------------------------------------------------------------------------------ */

  // set the value of each login field
  const setValue = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  /* ---------------------------------------------------------------------------------------
  sending data to the server
  ------------------------------------------------------------------------------------------ */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data: user, message } = await loginUser(loginData).unwrap();
      dispatch(setUser({ id: user?._id, accountType: user?.accountType })); // changing the value of the authentication state
      toast.success(message, { position: "top-right" });
    } catch (error) {
      toast.error(error.message, { position: "top-right" });
    }
  };

  // navigate to the dashboard once login is successful
  if (isSuccess) {
    navigate("/app/dashboard", { replace: true });
  }

  return (
    <Form onSubmit={handleSubmit} className="my-20">
      {/* Credential */}
      <FieldInput
        name="credential"
        onChange={setValue}
        label="Enter email/username"
        placeholder="username/email"
        value={loginData.credential}
      />

      {/* Password */}
      <FieldInput
        name="password"
        onChange={setValue}
        label="Password"
        inputType="password"
        placeholder="••••••••••••••••"
        value={loginData.password}
      />

      {/* Submit */}
      <CommonButton
        type="submit"
        label={isLoginLoading ? <SpinnerCustom /> : "Log in"}
      />

      {/* Registration CTA */}
      <div className="mt-6 text-center text-sm text-gray-400">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-purple-500 hover:text-purple-400 font-medium transition-colors"
        >
          Register here
        </Link>
      </div>
    </Form>
  );
}

export default Login;
