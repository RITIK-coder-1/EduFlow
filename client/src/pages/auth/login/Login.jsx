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

      {/* --- DEMO CREDENTIALS SECTION --- */}
      <div className="mt-5 p-5 border border-purple-500/20 bg-purple-500/5 rounded-xl backdrop-blur-sm">
        <h3 className="text-sm font-semibold text-purple-400 mb-3 text-center uppercase tracking-wider">
          Demo Access
        </h3>
        <div className="space-y-3 text-xs">
          {[
            { role: "Admin", id: "admin_core", pass: "1234567890" },
            { role: "Instructor", id: "learnwithjane", pass: "1234567890" },
            { role: "Student", id: "ishaan_malhotra", pass: "1234567890" },
          ].map((demo) => (
            <div
              key={demo.role}
              className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0"
            >
              <span className="text-gray-400 font-medium w-16">
                {demo.role}
              </span>
              <code className="text-purple-300 bg-purple-500/10 px-2 py-1 rounded">
                {demo.id}
              </code>
              <code className="text-gray-500 select-all">{demo.pass}</code>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-500 text-center italic">
          * Use these to explore the pre-populated courses and analytics.
        </p>
      </div>
    </Form>
  );
}

export default Login;
