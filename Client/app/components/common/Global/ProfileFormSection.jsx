"use client";

import EmailForm from "./Forms/EmailForm";
import PasswordForm from "./Forms/PasswordForm";
import UsernameForm from "./Forms/usernameForm";
import UserProfileCredentials from "./UserProfileCredentials";

const ProfileFormSection = () => {
  return (
    <div className="w-full  flex items-center gap-x-4 bg-[#1B2733] border border-[#303742] p-3 rounded-md flex-col max-sm:border-none">
      <div className="w-full">
        <div className="w-fit">
          <UsernameForm />
        </div>
        <div className="w-fit mt-3">
          <EmailForm />
        </div>
        <div className="w-fit mt-3">
          <PasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ProfileFormSection;
