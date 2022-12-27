import { useState } from "react";
import socket from "../lib/socket";

const useNbUsers = () => {
  const [nbUsers, setNbUsers] = useState(1);
  socket.on("nbUsers", nbUsers => {
    setNbUsers(nbUsers);
    console.log("nbUsers: ", nbUsers);
  });

  return nbUsers;
};

export default useNbUsers;
