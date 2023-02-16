import { useState, useEffect } from "react";

// MUI
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';


// components
import CallPortal from '../components/CallPortal';
import Copyright from '../components/layout/Footer'

// api
import activecallService from '../api/activecallService'

export default function CallCenter() {
    const [activecalls, setActivecalls] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(()=>{
      const getActivecalls = () => {
        activecallService.listActivecalls().then((data)=> {
          console.log(data)
          const filteredData = data.filter((element)=>{
            // only uncatched calls
            return element.isActive === false
          })
          setActivecalls(filteredData)
        })
      }
      const processId = window.setInterval(getActivecalls, 1000)

      return () => {
        window.clearInterval(processId)
      }
      
    }, [refresh])

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {activecalls.map((activecall) => {
                return (
                  <Grid key={activecall.tpc} item xs={12} md={6}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <CallPortal activecallInfo={activecall} refresh={refresh} setRefresh={setRefresh} />
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
            <Copyright sx={{ pt: 4 }} />
        </Container>
    )
}