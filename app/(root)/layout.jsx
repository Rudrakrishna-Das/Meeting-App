import StremVideoProvider from "@/providers/StreamClientProviders";
import React from "react";

const RootLayout = ({ children }) => {
  return (
    <main>
      <StremVideoProvider>{children}</StremVideoProvider>
    </main>
  );
};

export default RootLayout;
