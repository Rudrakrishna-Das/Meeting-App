"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import Image from "next/image";
import Link from "next/link";
import { sidebarLabels } from "@/constants";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathName = usePathname();
  return (
    <section>
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.svg"
            alt="Humber Icon"
            width={32}
            height={32}
            className="cursor-pointer sm:hidden"
          />
        </SheetTrigger>
        <SheetContent side="left" className="bg-dark-1 border-none">
          <Link className="flex items-center gap-2" href="/">
            <Image
              src="/icons/logo.png"
              alt="Vidi Mate"
              height={32}
              width={32}
            />
            <p className="text-lg font-semibold text-white">Vidi Mate</p>
          </Link>
          <SheetClose className="my-20 flex flex-col gap-6 overflow-y-auto">
            {sidebarLabels.map((link) => {
              const isActive =
                pathName === link.url || pathName.startsWith(`${link.route}/`);
              return (
                <SheetClose asChild key={link.label}>
                  <Link
                    href={link.url}
                    className={`hover:bg-purple-950 rounded-md p-2 flex gap-3 transition-all duration-500 ${
                      isActive ? "bg-purple-950" : ""
                    }`}
                  >
                    <Image
                      src={link.img}
                      alt={link.label}
                      width={20}
                      height={20}
                    />
                    <p className="font-semibold text-white transition-all duration-500">
                      {link.label}
                    </p>
                  </Link>
                </SheetClose>
              );
            })}
          </SheetClose>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
