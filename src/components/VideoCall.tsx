import { useState } from "react";   
import {
  MeetingProvider,
  useMeeting,
} from "@videosdk.live/react-sdk";

function ParticipantView({ participantId }: { participantId: string }) {
  return <div>Participant: {participantId}</div>
}

function MeetingView() {
const [joined, setJoined] = useState<string | null>(null);
//Get the method which will be used to join the meeting.
//We will also get the participants list to display all participants
const { join, participants } = useMeeting({
  //callback for when meeting is joined successfully
  onMeetingJoined: () => {
    setJoined("JOINED");
  }
});
const joinMeeting = () => {
  setJoined("JOINING");
  join();
};

return (
  <div className="container">
    {joined && joined == "JOINED" ? (
      <div>
        {[...participants.keys()].map((participantId) => (
          <ParticipantView
            participantId={participantId}
            key={participantId}
          />
        ))}
      </div>
    ) : joined && joined == "JOINING" ? (
      <p>Joining the meeting...</p>
    ) : (
      <button onClick={joinMeeting}>Join the meeting</button>
    )}
  </div>
);
}
interface VideoCallProps {
  meetingId: string;
  token: string;
  name: string;
}

const VideoCall = ({ meetingId, token, name }: VideoCallProps) => {
 return (
  <MeetingProvider
  config={{
    meetingId: meetingId,
    micEnabled: true,
    webcamEnabled: true,
    name: name,
    debugMode : false
  }}
  token={token}
>
  <MeetingView />
</MeetingProvider>
 )
};
export default VideoCall;