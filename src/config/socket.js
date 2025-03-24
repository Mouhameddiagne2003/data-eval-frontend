import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL,{
    transports: ["websocket", "polling"], // Active WebSocket et fallback en polling
}); // Remplace avec l'URL de ton serveur

export default socket;
