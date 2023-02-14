// MUI
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

// components
import RecentCalls from '../components/RecentCalls';
import CallPortal from '../components/CallPortal';
import Copyright from '../components/layout/Footer'
import Title from '../components/layout/Title';

export default function Dashboard() {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <RecentCalls />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
        </Container>
    )
}