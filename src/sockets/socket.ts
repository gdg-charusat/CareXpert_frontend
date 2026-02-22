import { io, Socket } from "socket.io-client";
import axios from "axios";

const URL = import.meta.env.VITE_SOCKET_URL;
const API_URL = import.meta.env.VITE_BASE_URL;

export const socket: Socket = io(URL, {
  // transports : ["websocket"],
  withCredentials: true,
});

interface DmMessageData {
  roomId: string;
  senderId: string;
  receiverId: string;
  username: string;
  text: string;
  image?: string;
}

interface RoomMessageData {
  roomId: string;
  senderId: string;
  username: string;
  text: string;
  image?: string;
}

export interface FormattedMessage {
  roomId: string;
  senderId: string;
  receiverId?: string;
  username: string;
  text: string;
  time: string;
  messageType?: string;
  imageUrl?: string;
}

export const joinRoom = (roomId: string) => {
  // Join a DM room (1:1)
  socket.emit("joinDmRoom", roomId);
};

export const joinCommunityRoom = (
  roomId: string,
  userId: string,
  username: string
) => {
  // Join a community/city room and notify others
  socket.emit("joinRoom", {
    event: "joinRoom",
    data: { roomId, userId, username },
  });
};

export const sendMessage = (message: DmMessageData) => {
  socket.emit("dmMessage", {
    event: "dmMessage",
    data: message,
  });
};

export const onMessage = (callback: (msg: FormattedMessage) => void) => {
  socket.on("message", (msg) => {
    // console.log(msg);
    callback(msg);
  });
};

export const offMessage = () => {
  socket.off("message");
};

export const SendMessageToRoom = (message: RoomMessageData) => {
  socket.emit("roomMessage", {
    event: "roomMessage",
    data: message,
  });
};

// API functions for loading chat history
export const loadOneOnOneChatHistory = async (
  otherUserId: string,
  page: number = 1,
  limit: number = 50
) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/chat/one-on-one/${otherUserId}`,
      {
        params: { page, limit },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error loading 1-on-1 chat history:", error);
    throw error;
  }
};

export const loadCityChatHistory = async (
  cityName: string,
  page: number = 1,
  limit: number = 50
) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/chat/city/${encodeURIComponent(cityName)}`,
      {
        params: { page, limit },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error loading city chat history:", error);
    throw error;
  }
};

export const loadRoomChatHistory = async (
  roomId: string,
  page: number = 1,
  limit: number = 50
) => {
  try {
    const response = await axios.get(`${API_URL}/api/chat/room/${roomId}`, {
      params: { page, limit },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error loading room chat history:", error);
    throw error;
  }
};

export const loadDmChatHistory = async (
  roomId: string,
  page: number = 1,
  limit: number = 50
) => {
  try {
    const response = await axios.get(`${API_URL}/api/chat/dm/${roomId}`, {
      params: { page, limit },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error loading DM chat history:", error);
    throw error;
  }
};
