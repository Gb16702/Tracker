"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

const AuthProvider = ({ children }) => {
  return (
    <SessionProvider>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            height: "60px",
          },
        }}
      />
      {children}
    </SessionProvider>
  );
};

export default AuthProvider;
