import * as React from 'react';
import Link from '@mui/material/Link';
import Title from './layout/Title';
import { Button, Modal, Typography, TableRow, TableHead, TableCell, TableBody, Table, Box } from '@mui/material';
import { useState } from 'react';


const data = [
  {
    tpc: "string",
    caller: "signage name",
    catcher: "admin app user id or name",
    callStart: 1676332185,
    callEnd: 1676332285,
    transcription: "processing, it will be updated after AI process is done",
    category: "processing, it will be updated after AI process is done"
  },
  {
    tpc: "string",
    caller: "signage name",
    catcher: "admin app user id or name",
    callStart: 1676332185,
    callEnd: 1676332285,
    transcription: "processing, it will be updated after AI process is done",
    category: "processing, it will be updated after AI process is done"
  },
  {
    tpc: "string",
    caller: "signage name",
    catcher: "admin app user id or name",
    callStart: 1676332185,
    callEnd: 1676332285,
    transcription: "processing, it will be updated after AI process is done",
    category: "processing, it will be updated after AI process is done"
  }
];


const PopUp = ({ transcript }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
    };
  return (
    <>
      <Button sx={{ textTransform: 'none' }} onClick={handleOpen}>Transcription</Button>
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
}

export default function RecentCalls() {
  return (
    <React.Fragment>
      <Title>Recent Calls</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Caller</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Dispatcher</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Call Start</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Call End</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Transcription</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((call) => (
            <TableRow key={call.tpc}>
              <TableCell>{call.caller}</TableCell>
              <TableCell>{call.catcher}</TableCell>
              <TableCell>{call.callStart}</TableCell>
              <TableCell>{call.callEnd}</TableCell>
              <TableCell><PopUp transcript={call.transcription} /></TableCell>
              <TableCell>{call.category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </React.Fragment>
  );
}