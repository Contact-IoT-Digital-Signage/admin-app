import * as React from "react";
// import Link from "@mui/material/Link";
import Title from "./layout/Title";
import {
  Button,
  Modal,
  Typography,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";

import callhistoryService from "../api/callhistoryService";


const PopUp = ({ transcript }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Button sx={{ textTransform: "none" }} onClick={handleOpen}>
        Transcription
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Transcript
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {transcript}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default function RecentCalls() {
  const [callhistory, setCallhistory] = useState([]);

  useEffect(() => {
    callhistoryService.listCallhistory().then((data) => {
      console.log(data);
      const formatData = data.map((element) => {
        return {
          tpc: element.tpc,
          caller: element.caller,
          catcher: element.catcher,
          callStart: new Date(element.callStart).toDateString(),
          callEnd: new Date(element.callEnd).toDateString(),
          transcription: element.transcription,
          category: element.category,
        };
      });
      let counter = 0;
      const formatDataWithID = formatData.map((element) => {
        counter++;
        return {
          id: counter,
          ...element,
        };
      });
      setCallhistory(formatDataWithID);
    });
  }, []);

  return (
    <React.Fragment>
      <Title>Recent Calls</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Caller</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Dispatcher</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Call Start</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Call End</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Transcription</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {callhistory.map((call) => (
            <TableRow key={call.tpc}>
              <TableCell>{call.caller}</TableCell>
              <TableCell>{call.catcher}</TableCell>
              <TableCell>{call.callStart}</TableCell>
              <TableCell>{call.callEnd}</TableCell>
              <TableCell>
                <PopUp transcript={call.transcription} />
              </TableCell>
              <TableCell>{call.category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
