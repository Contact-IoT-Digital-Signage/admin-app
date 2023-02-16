import { useState, useEffect } from "react";
import ZoomVideo from "@zoom/videosdk";
import { Button, Typography } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import Title from "./layout/Title";
import { getAuth } from "firebase/auth";

import activecallService from "../api/activecallService";
import callhistoryService from "../api/callhistoryService";

function CallPortal({ activecallInfo, refresh, setRefresh }) {
  const [zoomClient, setZoomClient] = useState();
  const [zoomStream, setZoomStream] = useState();

  const [activeCall, setActiveCall] = useState(false);
  const [activeScreenShare, setActiveScreenShare] = useState(false);

  useEffect(() => {
    const init = async () => {
      const client = ZoomVideo.createClient();
      client.init("en-US", "CDN");
      setZoomClient(client);
    };
    init();
    return () => {
      ZoomVideo.destroyClient();
    };
  }, []);

  const recieveVideoCall = async () => {
    // this is how to use id_token of firebase example
    const auth = getAuth();
    auth.currentUser
      .getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        console.log(idToken);
        // Send token to your backend via HTTPS
        // ...
      })
      .catch(function (error) {
        // Handle error
      });

    setActiveCall(true);

    try {
      await zoomClient.join(
        activecallInfo.tpc,
        activecallInfo.token,
        activecallInfo.signageName
      );
      const stream = zoomClient.getMediaStream();
      setZoomStream(stream);
      stream.startAudio();
      stream.startVideo({
        videoElement: document.querySelector("#self-view"),
      });
      zoomClient.getAllUser().forEach((user) => {
        if (user.bVideoOn) {
          stream.renderVideo(
            document.querySelector("#participant-view"),
            user.userId,
            720,
            540,
            0,
            0,
            2
          );
        }
      });
      zoomClient.getRecordingClient().startCloudRecording();
    } catch (error) {
      console.log(error);
    }
  };

  const callBackendWhenCallEnds = async () => {
    console.log(activecallInfo);
    await callhistoryService.createCallhistory({
      tpc: activecallInfo.tpc,
      caller: activecallInfo.signageName,
      catcher: "Admin 001",
      callStart: Math.floor(
        new Date(activecallInfo.creationTime).getTime() / 1000
      ),
      callEnd: Math.floor(new Date().getTime() / 1000),
      transcription: "Processing...",
      category: "Processing...",
    });
    await activecallService.deleteActivecalls(activecallInfo.tpc);
    setRefresh(!refresh)
  };

  const endVideoCall = async () => {
    setActiveCall(false);
    setActiveScreenShare(false);
    try {
      await callBackendWhenCallEnds();
      zoomClient.getRecordingClient().stopCloudRecording();
      await zoomClient.leave(true);
    } catch (error) {
      console.log(error);
    }
  };

  const startShareScreen = () => {
    setActiveScreenShare(true);
    zoomStream.startShareScreen(document.querySelector("#screen-view"));
  };

  const callData = {
    id: activecallInfo.tpc,
    location: activecallInfo.signageName,
    startTime: new Date(activecallInfo.creationTime).toISOString(),
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Title>Call ID: {callData.id}</Title>
      <Typography>Location: {callData.location}</Typography>
      <Typography>Start: {callData.startTime}</Typography>
      {activeCall ? (
        <>
          <video
            style={{ width: "420px", height: "420px" }}
            id="self-view"
          ></video>
        </>
      ) : (
        <></>
      )}
      {activeScreenShare ? (
        <>
          <video
            style={{ width: "420px", height: "420px" }}
            id="screen-view"
          ></video>
        </>
      ) : (
        <></>
      )}

      <div>
        {activeCall ? (
          <>
            <Button
              variant="outlined"
              sx={{ margin: 1 }}
              color="error"
              onClick={endVideoCall}
            >
              <PhoneDisabledIcon />
            </Button>
            <Button
              variant="outlined"
              sx={{ margin: 1 }}
              color="primary"
              onClick={startShareScreen}
            >
              <ScreenShareIcon />
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outlined"
              sx={{ margin: 1 }}
              color="success"
              onClick={recieveVideoCall}
            >
              <CallIcon />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default CallPortal;
