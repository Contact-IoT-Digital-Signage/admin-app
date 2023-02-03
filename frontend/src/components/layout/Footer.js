import Link from '@mui/material/Link';
import { Typography } from '@mui/material';

export default function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link target={'_blank'} color="inherit" href="https://developerweek-2023-hackathon.devpost.com/?ref_content=default&ref_feature=challenge&ref_medium=portfolio">
          Our Team
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}