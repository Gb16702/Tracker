import ForgotPwStepOne from "@/app/components/common/Global/Forms/ForgotPwStepOne";

const page = () => {
  return (
    <>
      <section className="h-[100vh] flex items-center justify-center  bg-[#0F141A] flex-col">
        <div className="flex items-center justify-center flex-col w-[1000px] max-sm:w-full max-sm:px-4">
          <ForgotPwStepOne />
        </div>
      </section>
    </>
  );
};

export default page;
