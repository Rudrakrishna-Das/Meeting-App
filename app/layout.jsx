import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vidi Met",
  description: "A Person to person video call app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          layout: {
            logoImageUrl: "/icons/logo.png",
            socialButtonsVariant: "iconButton",
          },
          variables: {
            colorText: "white",
            colorBackground: "black",
          },
        }}
      >
        <body className={`${inter.className} bg-dark-2`}>
          {children} <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
