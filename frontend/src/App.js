import "./App.css";
import { useState, useEffect } from "react";
import ZoomVideo from "@zoom/videosdk";

const ZOOM_TOKEN = process.env.REACT_APP_ZOOM_TOKEN;

function App() {
  const [zoomClient, setZoomClient] = useState();
  const [zoomStream, setZoomStream] = useState();

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
    const topic = "Ike0001";
    const token = ZOOM_TOKEN;
    const userName = "user2";

    try {
      await zoomClient.join(topic, token, userName);
      const stream = zoomClient.getMediaStream();
      setZoomStream(stream)
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
            480,
            0,
            0,
            2
          );
        }
      });
      zoomClient.getRecordingClient().startCloudRecording()
    } catch (error) {
      console.log(error);
    }
  };

  const selfViewStyle = {
    width: "320px",
  };

  const participantViewStyle = {
    height: "480px",
    width: "720px",
  };

  const screenViewStyle = {
    height: "480px",
    width: "720px",
  };

  const endVideoCall = async () => {
    try {
      zoomClient.getRecordingClient().stopCloudRecording()
      await zoomClient.leave(true);
    } catch (error) {
      console.log(error);
    }
  };

  const startShareScreen = ()  => {
    zoomStream.startShareScreen(document.querySelector("#screen-view"))
  }

  return (
    <div className="App">
      <canvas id="participant-view" style={participantViewStyle}></canvas>
      <video id="self-view" style={selfViewStyle}></video>
      <video id="screen-view" style={screenViewStyle}></video>
      <button onClick={recieveVideoCall}>Recieve Call</button>
      <button onClick={endVideoCall}>End Call</button>
      <button onClick={startShareScreen}>Start Share Screen</button>
    </div>
  );
}

export default App;
