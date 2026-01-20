import { useEffect, useState } from "react";
import { feedApi } from "../api/feedApi";
import type { RecentFeedApiResponse } from "../model/feedApiModel";

export const useFeedTabViewModel = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [recentFeeds, setRecentFeeds] = useState<RecentFeedApiResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | undefined>(undefined);
  const [hasNext, setHasNext] = useState(false);

  const updateTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    setCurrentTime(`${hours}:${minutes}`);
  };

  const loadRecentFeeds = async (cursor?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await feedApi.getRecentFeeds(20, cursor);

      if (cursor) {
        setRecentFeeds((prev) => [...prev, ...response.items]);
      } else {
        setRecentFeeds(response.items);
      }

      setNextCursor(response.nextCursor ?? undefined);
      setHasNext(response.hasNext);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load recent feeds");
      console.error("Error loading recent feeds:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    if (!isLoading && hasNext && nextCursor) {
      loadRecentFeeds(nextCursor);
    }
  };

  useEffect(() => {
    updateTime();

    const timer = setInterval(updateTime, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    loadRecentFeeds();
  }, []);

  return {
    currentTime,
    recentFeeds,
    isLoading,
    error,
    hasNext,
    loadMore,
  };
};
