import { io } from "socket.io-client";

export const soketInstance = io(import.meta.env.VITE_SOCKET_URL, {
  //   transports: ["websocket"],
  query: {
    authorization: localStorage.getItem("token"),
  },
});
