import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoCall from "../components/VideoCall";

interface MeetingResponse {
  roomId: string;
  token: string;
}

const StartCall: React.FC = () => {
  const [meetingId, setMeetingId] = useState<string>("");
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const getRoom = async () => {
      try {
        const res = await axios.post<MeetingResponse>(`${import.meta.env.VITE_BASE_URL}/api/chat/get-token`);
        setMeetingId(res.data.roomId);
        setToken(res.data.token);
      } catch (err) {
        console.error("Error getting meeting token", err);
      }
    };

    getRoom();
  }, []);

  return meetingId && token ? (
    <VideoCall meetingId={meetingId} token={token} name="Dr. Vasu" />
  ) : (
    <div className="text-center mt-10 text-xl">🔄 Starting Video Call...</div>
  );
};

export default StartCall;
