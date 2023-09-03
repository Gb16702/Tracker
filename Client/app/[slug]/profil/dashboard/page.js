import ProfilePictureForm from "@/app/components/common/Global/Forms/ProfilePictureForm";
import ProfileFormSection from "@/app/components/common/Global/ProfileFormSection";
import ProfilePictureSection from "@/app/components/common/Global/ProfilePictureSection";
import UserProfileCredentials from "@/app/components/common/Global/UserProfileCredentials";
import { decodeSession } from "@/lib/decodeSession";

const page = async () => {
  const session = await decodeSession();

  return (
    <div className="py-5 px-10 max-sm:px-2 h-full flex flex-col gap-y-4">
      <ProfilePictureSection session={session} />
      <ProfileFormSection />
    </div>
  );
};

export default page;
