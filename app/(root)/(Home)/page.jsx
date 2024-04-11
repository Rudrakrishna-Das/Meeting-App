import MeetingList from "@/components/MeetingList";
import React from "react";

const Home = () => {
  const date = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "numeric",
  };

  const fullDateAndTime = date.toLocaleString("default", options).split("at");

  return (
    <section className="flex flex-col gap-6 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex flex-col justify-between h-full max-sm:p-3 p-11">
          <h2 className="bg-slate-600 max-w-[270px] p-2 rounded-md backdrop-blur-sm">
            Upcoming meeting at 12:30 p.m.
          </h2>
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-extrabold lg:text-7xl">
              {fullDateAndTime[1]}
            </h1>
            <p className="text-lg font-medium text-blue-400 lg:text-2xl">
              {fullDateAndTime[0]}
            </p>
          </div>
        </div>
      </div>

      <MeetingList />
    </section>
  );
};

export default Home;
