import { io } from "socket.io-client"


export const soketInstance = io('http://tm.ellco.ru/', {
   transports: ['websocket'],
   query: {
      "authorization": localStorage.getItem('token')
   }
})
