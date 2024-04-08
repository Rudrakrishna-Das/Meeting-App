import React from "react";
import Link from "next/link";
import Image from "next/image";
import MobileNav from "./MobileNav";
import { SignIn, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="w-full bg-dark-1 fixed top-0 z-50 p-5 flex justify-between">
      <Link className="flex items-center gap-2" href="/">
        <Image src="/icons/logo.png" alt="Vidi Mate" height={32} width={32} />
        <p className="text-lg font-semibold text-white max-sm:hidden">
          Vidi Mate
        </p>
      </Link>
      <div className="flex gap-5">
        <SignIn>
          <UserButton />
        </SignIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
