"use client";

import Button from "./Button";

const ConnectButton = ({ children, variant }) => {
  return (
    <Button
      className={`${
        variant === "admin"
          ? "bg-slate-800 h-[50px] mt-2"
          : "bg-[#FF4655] h-[41px] mt-4"
      } text-white w-full ] gap-4 flex items-center justify-center text-base font-medium transition-color disabled:opacity-50 disabled:pointer-events-none px-3  rounded-md`}
    >
      {children}
    </Button>
  );
};

export default ConnectButton;
