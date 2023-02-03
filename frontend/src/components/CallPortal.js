import { useState, useEffect } from "react";
import ZoomVideo from "@zoom/videosdk";
import { Button } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';

const ZOOM_TOKEN = process.env.REACT_APP_ZOOM_TOKEN;

function CallPortal() {
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
        const topic = "Ike0001";
        const token = ZOOM_TOKEN;
        const userName = "user2";

        setActiveCall(true);

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

    const endVideoCall = async () => {
        setActiveCall(false);
        try {
            zoomClient.getRecordingClient().stopCloudRecording()
            await zoomClient.leave(true);
        } catch (error) {
            console.log(error);
        }
    };

    const startShareScreen = () => {
        setActiveScreenShare(true);
        zoomStream.startShareScreen(document.querySelector("#screen-view"))
    }


    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {activeCall ? (
                <>
                    <video style={{ width: '700px', height: '600px' }} id="self-view"></video>
                </>
            ) : (<></>)}
            {activeScreenShare ? (
                <>
                    <video style={{ width: '700px', height: '600px' }} id="screen-view"></video>
                </>
            ) : (<></>)}

            <div>
                {activeCall ? (
                    <>
                        <Button variant="outlined" sx={{ margin: 1 }} color="error" onClick={endVideoCall}>
                            <PhoneDisabledIcon />
                        </Button>
                        <Button variant="outlined" sx={{ margin: 1 }} color="primary" onClick={startShareScreen}>
                            <ScreenShareIcon />
                        </Button>
                    </>
                ) : (
                    <>
                        <Button variant="outlined" sx={{ margin: 1 }} color="success" onClick={recieveVideoCall}>
                            <CallIcon />
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}

export default CallPortal;
