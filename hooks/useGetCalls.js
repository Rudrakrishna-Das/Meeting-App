import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useState, useEffect } from "react";

const useGetCalls = () => {
  const [allCalls, setAllCalls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const client = useStreamVideoClient();
  const { user } = useUser();
  useEffect(() => {
    const loadCalls = async () => {
      if (!client || !user?.id) return;
      setIsLoading(true);
      try {
        console.log("click");
        const { calls } = await client.queryCalls({
          sort: [{ field: "starts_at", direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user_id: user.id },
              { members: { $in: [user.id] } },
            ],
          },
        });
        console.log("cjkc", calls);
        setAllCalls(calls);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadCalls();
  }, [client, user?.id]);

  const now = new Date();
  const endedCalls = allCalls.filter(({ state: { startsAt, endedAt } }) => {
    return (startsAt && new Date(startsAt) < now) || !!endedAt;
  });
  const upcomingCalls = allCalls.filter(({ state: { startsAt } }) => {
    return startsAt && new Date(startsAt) > now;
  });

  return {
    endedCalls,
    upcomingCalls,
    callRecordings: allCalls,
    isLoading,
  };
};

export default useGetCalls;
