"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import { sidebarLabels } from "@/constants";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathName = usePathname();
  return (
    <section className="sticky top-0 left-0 bg-dark-1 h-screen w-80 text-white flex flex-col justify-center p-5 max-sm:hidden max-lg:w-20 transition-all duration-500">
      <ul className="flex flex-col gap-8">
        {sidebarLabels.map((link) => {
          const isActive =
            pathName === link.url || pathName.startsWith(`${link.route}/`);
          return (
            <li key={link.label}>
              <Link
                href={link.url}
                className={`hover:bg-purple-950 rounded-md p-2 flex gap-3 transition-all duration-500 ${
                  isActive ? "bg-purple-950" : ""
                }`}
              >
                <Image src={link.img} alt={link.label} width={24} height={24} />
                <p className="text-lg font-semibold max-lg:hidden transition-all duration-500">
                  {link.label}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Sidebar;
