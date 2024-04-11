"use client";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { tokenProvider } from "@/actions/stream.actions";
import Loader from "@/components/Loader";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const StremVideoProvider = ({ children }) => {
  const [videoClient, setVideoClient] = useState();
  const { user, isLoaded } = useUser();
  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!apiKey) throw new Error("Stream Api key missing");

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user?.id,
        name: user?.name || user?.id,
        image: user?.imageUrl,
      },
      tokenProvider,
    });
    setVideoClient(client);
  }, [user, isLoaded]);

  if (!videoClient) return <Loader />;
  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};
export default StremVideoProvider;
