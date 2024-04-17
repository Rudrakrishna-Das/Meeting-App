"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import ReactDatePicker from "react-datepicker";
import { Input } from "@/components/ui/input";

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
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

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
          setMettingState("isScheduleMeeting");
        }}
      />
      <HomeCard
        imageAlt="recording"
        imageUrl="/icons/recordings.svg"
        title="View Recodings"
        description="Check your recordings"
        color="bg-green-600"
        handleClick={() => router.push("/recording")}
      />
      <HomeCard
        imageAlt="join-meeting"
        imageUrl="/icons/join-meeting.svg"
        title="Join Meeting"
        description="Via invitation link"
        color="bg-yellow-600"
        handleClick={() => {
          setMettingState("isJoiningMeeting");
        }}
      />
      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMettingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base leading-[22px]">
              {" "}
              Add a description{" "}
            </label>
            <Textarea
              className="border-none border-dark-2 bg-dark-2"
              onChange={(e) => {
                setValues({ ...values, description: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col w-full gap-2.5">
            <label className="text-base leading-[22px]">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-2"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMettingState(undefined)}
          title="Meeting Created"
          buttonText="Copy Meeting Link"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link Copied" });
          }}
        />
      )}

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMettingState(undefined)}
        title="Start an instant meeting"
        handleClick={createMeeting}
        buttonText="Start new meeting"
      />
      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMettingState(undefined)}
        title="Type the link here"
        buttonText="Join meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting Link"
          className="bg-dark-2 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
        />
      </MeetingModal>
    </section>
  );
};

export default MeetingList;
