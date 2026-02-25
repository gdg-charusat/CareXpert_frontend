import { io, Socket } from "socket.io-client";
import { chatAPI } from "@/services/endpoints/api";
import type { ChatMessage, DmMessageData, RoomMessageData } from "@/services/types/api";

const URL = import.meta.env.VITE_SOCKET_URL;

export const socket: Socket = io(URL, {
  autoConnect: false, // Prevent immediate connection
  withCredentials: true,
});

export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

export interface FormattedMessage extends ChatMessage {}

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

export const offMessage = (callback?: (msg: FormattedMessage) => void) => {
  if (callback) {
    socket.off("message", callback);
  } else {
    socket.off("message");
  }
};

export const SendMessageToRoom = (message: RoomMessageData) => {
  socket.emit("roomMessage", {
    event: "roomMessage",
    data: message,
  });
};

// API functions for loading chat history using centralized chatAPI service
// Returns the full API response structure for compatibility with existing ChatPage code
export const loadOneOnOneChatHistory = async (
  otherUserId: string,
  page: number = 1,
  limit: number = 50
) => {
  try {
    const response = await chatAPI.loadOnOnOneChatHistory(otherUserId, page, limit);
    // Wrap response to match expected API response structure
    return {
      success: true,
      data: response,
    };
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
    const response = await chatAPI.loadCityChatHistory(cityName, page, limit);
    // Wrap response to match expected API response structure
    return {
      success: true,
      data: response,
    };
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
    const response = await chatAPI.loadRoomChatHistory(roomId, page, limit);
    // Wrap response to match expected API response structure
    return {
      success: true,
      data: response,
    };
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
    // For DM chat, we use the one-on-one chat history
    // assuming roomId can be extracted or userId is passed
    // Note: This might need adjustment based on actual API endpoint
    const response = await chatAPI.loadOnOnOneChatHistory(roomId, page, limit);
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    console.error("Error loading DM chat history:", error);
    throw error;
  }
};
