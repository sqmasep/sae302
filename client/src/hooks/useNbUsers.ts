import { useState } from "react";
import socket from "../lib/socket";

const useNbUsers = () => {
  const [nbUsers, setNbUsers] = useState(1);
  socket.on("nbUsers", nbUsers => {
    setNbUsers(nbUsers);
  });

  return nbUsers;
};

export default useNbUsers;
