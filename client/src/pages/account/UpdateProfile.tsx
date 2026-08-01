/* ----------------------------------------------------------------------------------------------
UpdateProfile.tsx
The page to update the user profile 
------------------------------------------------------------------------------------------------- */

import { useEffect, useState, ChangeEvent, SubmitEvent } from "react";
import {
  useDeleteUserProfilePicMutation,
  useUpdateUserDetailsMutation,
  useGetUserQuery,
} from "../../api/index.api";
import getFormData from "../../utils/getFormData";
import {
  CommonButton,
  FieldInput,
  Form,
  InputFile,
  UserProfilePic,
  SpinnerCustom,
} from "@/components/index.components";
import { toast } from "sonner";
import { TrashIcon } from "lucide-react";
import { ApiErrorResponse } from "@/types/index.types";

function UpdateProfile() {
  /* ---------------------------------------------------------------------------------------
  Interfaces
  ------------------------------------------------------------------------------------------ */
  interface UserDetailsContract {
    firstName: string;
    lastName: string;
    username: string;
    profilePic: File | null;
  }

  /* ---------------------------------------------------------------------------------------
  The Redux Toolkit Data
  ------------------------------------------------------------------------------------------ */
  const [update, { isLoading: isUpdateLoading }] =
    useUpdateUserDetailsMutation();
  const { data, isLoading: isUserLoading } = useGetUserQuery();
  const user = data?.data;
  const [deleteProfilePic, { isLoading: isDeleteProfileLoading }] =
    useDeleteUserProfilePicMutation();

  /* ---------------------------------------------------------------------------------------
  The user details 
  ------------------------------------------------------------------------------------------ */
  const [userDetails, setUserDetails] = useState<UserDetailsContract>({
    firstName: "",
    lastName: "",
    username: "",
    profilePic: null,
  });

  // const [profilePic, setProfilePic] = useState<File | null>(null);

  // setting the current value for better UX
  useEffect(() => {
    setUserDetails({
      firstName: user?.firstName || "", // || "" for avoiding the uncontrolled to controller bug
      lastName: user?.lastName || "",
      username: user?.username || "",
      profilePic: null,
    });
  }, [user]);

  /* ---------------------------------------------------------------------------------------
  The method to change the value of the fields 
  ------------------------------------------------------------------------------------------ */

  // text value
  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  // the profile pic
  const updateProfilePic = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null; // checking for TS-specific configuration: if the value is null, return null

    // setProfilePic(selectedFile);
    setUserDetails({ ...userDetails, profilePic: selectedFile });
  };

  /* ---------------------------------------------------------------------------------------
  The API call to update the details 
  ------------------------------------------------------------------------------------------ */
  const updateDetails = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // upload the simple object if the profile pic isn't updated
      if (!userDetails.profilePic) {
        const { message } = await update(userDetails).unwrap();
        toast.success(message, { position: "top-right" });
      } else {
        // else upload a form data
        const formData = getFormData<UserDetailsContract>(userDetails);
        const { message } = await update(formData).unwrap();
        toast.success(message, { position: "top-right" });
      }
    } catch (error: unknown) {
      toast.error((error as ApiErrorResponse).message, {
        position: "top-right",
      });
    }
  };

  /* ---------------------------------------------------------------------------------------
  The API call to delete the profile pic 
  ------------------------------------------------------------------------------------------ */
  const deletePicFunction = async () => {
    try {
      const { message } = await deleteProfilePic().unwrap();
      toast.success(message, { position: "top-right" });
    } catch (error: unknown) {
      toast.error((error as ApiErrorResponse).message, {
        position: "top-right",
      });
    }
  };

  return (
    <>
      {isUserLoading ? (
        <SpinnerCustom className="size-9" />
      ) : (
        <>
          <UserProfilePic />
          <Form onSubmit={updateDetails} className="mb-3">
            {/* The profile pic */}
            <InputFile
              description="Update Your Profile Pic"
              required={false}
              name="profilePic"
              onChange={updateProfilePic}
              accept="image/*"
            />

            {/* Only students can delete the profile pics */}
            {user?.accountType === "Student" && user?.profilePic !== "" && (
              <span className="w-full">
                <CommonButton
                  label={
                    isDeleteProfileLoading ? (
                      <SpinnerCustom />
                    ) : (
                      <div className="flex items-center gap-2">
                        <TrashIcon className="w-4 h-4" />{" "}
                        <span>Delete Pic</span>
                      </div>
                    )
                  }
                  onClick={deletePicFunction}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-all duration-200 active:scale-95 disabled:opacity-50 w-32 text-sm"
                  title="Delete Pic"
                  disabled={isDeleteProfileLoading}
                />
              </span>
            )}

            <hr className="border-b border-white/10 w-full" />

            {/* The username */}
            <FieldInput
              label="Username"
              name="username"
              value={userDetails.username}
              onChange={changeValue}
              required={false}
            />

            {/* The first name */}
            <FieldInput
              label="First Name"
              name="firstName"
              value={userDetails.firstName}
              onChange={changeValue}
              required={false}
            />

            {/* The last name */}
            <FieldInput
              label="Last Name"
              name="lastName"
              value={userDetails.lastName}
              onChange={changeValue}
              required={false}
              placeholder="lastname"
            />

            {/* The button */}
            <CommonButton
              type="submit"
              label={isUpdateLoading ? <SpinnerCustom /> : "Update"}
              title="Update Details"
            />
          </Form>
        </>
      )}
    </>
  );
}

export default UpdateProfile;
