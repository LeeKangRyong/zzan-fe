import { useEffect, useState } from "react";

export const useFeedTabViewModel = () => {
  const [currentTime, setCurrentTime] = useState("");

  const updateTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    setCurrentTime(`${hours}:${minutes}`);
  };

  useEffect(() => {
    updateTime();

    const timer = setInterval(updateTime, 60000);

    return () => clearInterval(timer);
  }, []);

  return { currentTime };
};
