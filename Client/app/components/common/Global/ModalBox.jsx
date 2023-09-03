"use client";

const ModalBox = ({ children }) => {
  return (
    <div className="absolute bg-black/[.5] w-full top-1/2 left-1/2 h-[100vh] -translate-x-1/2 -translate-y-1/2">
      <div className="fixed z-20 top-1/2 left-1/2 w-[500px] max-sm:w-full -translate-x-1/2 -translate-y-1/2 bg-[#1B2733] rounded-xl max-sm:rounded-none p-[20px] border border-[#303742]">
        {children}
      </div>
    </div>
  );
};

export default ModalBox;
