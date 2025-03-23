import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Remplace avec l'URL de ton serveur

export default socket;
