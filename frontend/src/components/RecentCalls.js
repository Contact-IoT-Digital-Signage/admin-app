import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './layout/Title';

// Generate Order Data
function createData(id, timestamp, location, category, recording, feedback) {
  return { id, timestamp, location, category, recording, feedback };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019 17:00',
    'Station 1',
    'FAQ',
    '••••',
    5.00,
  ),
  createData(
    1,
    '16 Mar, 2019 17:00',
    'Station 1',
    'FAQ',
    '••••',
    5.00,
  ),
  createData(
    3,
    '16 Mar, 2019 17:00',
    'Station 1',
    'FAQ',
    '••••',
    5.00,
  ),
  createData(
    4,
    '15 Mar, 2019 17:00',
    'Station 1',
    'FAQ',
    '••••',
    5.00,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function RecentCalls() {
  return (
    <React.Fragment>
      <Title>Recent Calls</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight: 'bold'}}>Timestamp</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Client Location</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Category</TableCell>
            <TableCell sx={{fontWeight: 'bold'}}>Recording</TableCell>
            <TableCell sx={{fontWeight: 'bold'}} align="right">Feedback Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.timestamp}</TableCell>
              <TableCell>{row.location}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.recording}</TableCell>
              <TableCell align="right">{row.feedback}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more calls
      </Link>
    </React.Fragment>
  );
}