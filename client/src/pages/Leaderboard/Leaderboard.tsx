import React, { useEffect, useState } from "react";
import socket from "../../lib/socket";
import { Helmet } from "react-helmet-async";

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  useEffect(() => {
    socket.on("leaderboard", (data: any) => {});
  });

  return (
    <>
      <Helmet>
        <title>Interférences - Leaderboard</title>
      </Helmet>
      leaderboard
    </>
  );
};

export default Leaderboard;
