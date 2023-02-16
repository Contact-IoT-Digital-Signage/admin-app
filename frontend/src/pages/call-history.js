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
    { field: "tpc", headerName: "tpc", width: 180 },
    { field: "caller", headerName: "caller", width: 150 },
    { field: "catcher", headerName: "catcher", width: 150 },
    { field: "callStart", headerName: "callStart", width: 150 },
    { field: "callEnd", headerName: "callEnd", width: 150 },
    { field: "transcription", headerName: "transcription", width: 150 },
    { field: "category", headerName: "category", width: 150 },
  ];


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
