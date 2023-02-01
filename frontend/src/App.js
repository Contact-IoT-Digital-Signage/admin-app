import "./App.css";
import { useState, useEffect } from "react";
import ZoomVideo from "@zoom/videosdk";

const ZOOM_TOKEN = process.env.REACT_APP_ZOOM_TOKEN;

function App() {
  const [zoomClient, setZoomClient] = useState();
  const [callStarted, setCallStarted] = useState(false);

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

  const startVideoCall = () => {
    const topic = "MYTOPIC";
    const token = ZOOM_TOKEN;
    const userName = "user1";

    zoomClient
      .join(topic, token, userName)
      .then(() => {
        const stream = zoomClient.getMediaStream();
        setCallStarted(true);
        stream.startAudio();

        zoomClient.on("auto-play-audio-failed", () => {
          console.log("auto play failed, waiting for a user interaction");
        });
        stream.startVideo({
          videoElement: document.querySelector("#self-view"),
        });
        zoomClient.on("connection-change", (payload) => {
          console.log('connection-change', payload);
        });
        zoomClient.on("peer-video-state-change", (payload) => {
          console.log('peer-video-state-change', payload)
          if (payload.action === "Start") {
            stream.renderVideo(
              document.querySelector("#participant-canvas"),
              payload.userId,
              1920,
              1080,
              0,
              0,
              2
            );
          } else if (payload.action === "Stop") {
            stream.stopRenderVideo(
              document.querySelector("#participant-canvas"),
              payload.userId
            );
          }
        });
        zoomClient.getAllUser().forEach((user) => {
          if (user.bVideoOn) {
            stream.renderVideo(
              document.querySelector("#participant-canvas"),
              user.userId,
              1920,
              1080,
              0,
              0,
              2
            );
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selfViewStyle = {
    position: "absolute",
    bottom: "0px",
    left: "320px",
    height: "360px",
    width: "480px",
  };

  const selfViewHidden = {
    visibility: "hidden",
  };

  const participantViewStyle = {
    position: "absolute",
    top: "0px",
    left: "0px",
    height: "1080px",
    width: "1920px",
  };

  const participantViewHidden = {
    visibility: "hidden",
  };

  return (
    <div className="App">
      <canvas
        id="participant-canvas"
        style={callStarted ? participantViewStyle : participantViewHidden}
      ></canvas>
      <video
        id="self-view"
        style={callStarted ? selfViewStyle : selfViewHidden}
      ></video>

      <button onClick={startVideoCall}>Recieve Call</button>
    </div>
  );
}

export default App;
