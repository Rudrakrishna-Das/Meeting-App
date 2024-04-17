import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, User } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "./Loader";

const MeetingRoom = () => {
  const searchparams = useSearchParams();
  const isPersonalRomm = !!searchparams.get("personal");
  const [layout, setLaout] = useState("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const router = useRouter();

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayot = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;

      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;

      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };
  return (
    <section className=" h-[35rem] w-full p-4 relative  text-white">
      <div className=" flex size-full justify-center">
        <div className="flex size-full max-w[1000px]">
          <CallLayot />
        </div>
        <div
          className={`h-[calc(100vh-86px)] hidden ml-2 ${
            showParticipants ? "show-block" : ""
          }`}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      <div className="fixed bottom-0 flex w-full items-center flex-wrap justify-center gap-5">
        <CallControls onLeave={() => router.push("/")} />
        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              {" "}
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent>
            {["Grid", "Speaker-Left", "Speaker-Right"].map((item) => (
              <div key={item}>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => setLaout(item.toLowerCase())}
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button onClick={() => setShowParticipants((prevState) => !prevState)}>
          <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <User size={20} className="text-white" />
          </div>
        </button>
        {!isPersonalRomm && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;
