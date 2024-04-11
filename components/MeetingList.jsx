"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const MeetingList = () => {
  const router = useRouter();
  const [meetingState, setMettingState] = useState(undefined);
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState();
  const { toast } = useToast();

  const { user } = useUser();
  const client = useStreamVideoClient();

  const createMeeting = async () => {
    if (!user || !client) return;
    try {
      if (!values.dateTime) {
        toast({ title: "Failed to create meeting" });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create Call");
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({ title: "Meeting created" });
    } catch (error) {
      console.log(error);
      toast({ title: "Failed to create meeting" });
    }
  };

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 ">
      <HomeCard
        imageAlt="add-meeting"
        imageUrl="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start instant meeting"
        color="bg-orange-600"
        handleClick={() => setMettingState("isInstantMeeting")}
      />
      <HomeCard
        imageAlt="schedule"
        imageUrl="/icons/schedule.svg"
        title="Schedule"
        description="Plan your meeting"
        color="bg-blue-600"
        handleClick={() => {
          setMettingState("");
        }}
      />
      <HomeCard
        imageAlt="recording"
        imageUrl="/icons/recordings.svg"
        title="View Recodings"
        description="Check your recordings"
        color="bg-green-600"
        handleClick={() => {
          setMettingState("");
        }}
      />
      <HomeCard
        imageAlt="join-meeting"
        imageUrl="/icons/join-meeting.svg"
        title="Join Meeting"
        description="Via invitation link"
        color="bg-yellow-600"
        handleClick={() => {
          setMettingState("");
        }}
      />

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMettingState(undefined)}
        title="Start an instant meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingList;
