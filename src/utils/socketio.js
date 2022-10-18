import { io } from "socket.io-client";

export const soketInstance = io("http://tm.ellco.ru:6000", {
  //   transports: ["websocket"],
  query: {
    authorization: localStorage.getItem("token"),
  },
});
