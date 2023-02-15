import Copyright from "../components/layout/Footer";
import { Container } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import callhistoryService from "../api/callhistoryService";
import { useState, useEffect } from "react";

export default function CallHistory() {
  const [callhistory, setCallhistory] = useState([])

  useEffect(() => {
    callhistoryService.listCallhistory().then((data) => {
      console.log(data);
      const formatData = data.map((element) => {
        return {
            tpc: element.tpc,
            caller: element.caller,
            catcher: element.catcher,
            callStart: (new Date(element.callStart)).toDateString(),
            callEnd: (new Date(element.callEnd)).toDateString(),
            transcription: element.transcription,
            category: element.category
        }
      })
      let counter = 0
      const formatDataWithID = formatData.map(element => {
        counter++
        return {
            id: counter,
            ...element
        }
      });
      setCallhistory(formatDataWithID);
    });
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 30 },
    { field: "tpc", headerName: "tpc" },
    { field: "caller", headerName: "caller" },
    { field: "catcher", headerName: "catcher" },
    { field: "callStart", headerName: "callStart" },
    { field: "callEnd", headerName: "callEnd" },
    { field: "transcription", headerName: "transcription" },
    { field: "category", headerName: "category" },
  ];

//   const data = [
//     {
//       id: "1",
//       tpc: "string1",
//       caller: "signage name",
//       catcher: "admin app user id or name",
//       callStart: 1676332185,
//       callEnd: 1676332285,
//       transcription: "processing, it will be updated after AI process is done",
//       category: "processing, it will be updated after AI process is done",
//     },
//     {
//       id: "2",
//       tpc: "string2",
//       caller: "signage name",
//       catcher: "admin app user id or name",
//       callStart: 1676332185,
//       callEnd: 1676332285,
//       transcription: "processing, it will be updated after AI process is done",
//       category: "processing, it will be updated after AI process is done",
//     },
//     {
//       id: "3",
//       tpc: "string3",
//       caller: "signage name",
//       catcher: "admin app user id or name",
//       callStart: 1676332185,
//       callEnd: 1676332285,
//       transcription: "processing, it will be updated after AI process is done",
//       category: "processing, it will be updated after AI process is done",
//     },
//   ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <div style={{ height: 800, width: "100%" }}>
        <DataGrid
          key={callhistory.tpc}
          rows={callhistory}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          sx={{ backgroundColor: "white" }}
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
        />
      </div>
      <Copyright sx={{ pt: 4 }} />
    </Container>
  );
}
