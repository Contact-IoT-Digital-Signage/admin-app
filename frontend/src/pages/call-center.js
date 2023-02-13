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

    useEffect(()=>{
      activecallService.listActivecalls().then((data)=> {
        console.log(data)
        setActivecalls(data.list)
      })
    }, [])

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <CallPortal activecallInfo={activecalls[0]} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <CallPortal />
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <CallPortal />
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <CallPortal />
                </Paper>
              </Grid> */}
              {activecalls.map((activecall) => {
                return (
                <Grid key={activecall.tpc} item xs={12} md={6}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <CallPortal activecallInfo={activecall} />
                  </Paper>
                </Grid>
                )
              })}
            </Grid>
            <Copyright sx={{ pt: 4 }} />
        </Container>
    )
}