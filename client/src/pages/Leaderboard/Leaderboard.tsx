import React, { useEffect, useState } from "react";
import socket from "../../lib/socket";

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  useEffect(() => {
    socket.on("leaderboard", (data: any) => {});
  });

  return <>leaderboard</>;
};

export default Leaderboard;
