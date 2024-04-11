"use client";
import React from "react";
import Image from "next/image";

const HomeCard = ({
  title,
  imageUrl,
  imageAlt,
  description,
  color,
  handleClick,
}) => {
  return (
    <div
      className={`flex flex-col justify-between w-full min-h-[260px] ${color} rounded-[20px] px-4 py-6 cursor-pointer`}
      onClick={handleClick}
    >
      <div className="glass rounded-lg size-10 flex items-center justify-center">
        <Image src={imageUrl} alt={imageAlt} height={27} width={27} />
      </div>
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal">{description}</p>
      </div>
    </div>
  );
};

export default HomeCard;
