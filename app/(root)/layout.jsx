import StremVideoProvider from "@/providers/StreamClientProviders";
import React from "react";

export const metadata = {
  title: "Vidi Met",
  description: "A Person to person video call app",
};

const RootLayout = ({ children }) => {
  return (
    <main>
      <StremVideoProvider>{children}</StremVideoProvider>
    </main>
  );
};

export default RootLayout;
