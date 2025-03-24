import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL); // Remplace avec l'URL de ton serveur

export default socket;
