import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CallIcon from '@mui/icons-material/Call';

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';


export function MainListItems() {
  const selectedPage = useLocation().pathname;
  return (<>
    <Link to='/dashboard' style={{color: 'black', textDecoration: 'none'}}>
      <ListItemButton selected={'/dashboard' === selectedPage} >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>

    <Link style={{color: 'black', textDecoration: 'none'}} to='/call-center'>
      <ListItemButton selected={'/call-center' === selectedPage}>
        <ListItemIcon>
          <CallIcon />
        </ListItemIcon>
        <ListItemText primary="Call Center" />
      </ListItemButton>
    </Link>

    <Link style={{color: 'black', textDecoration: 'none'}} to='/reports'>
      <ListItemButton selected={'/reports' === selectedPage}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItemButton>
    </Link>

    <Link style={{color: 'black', textDecoration: 'none'}} to='/call-history'>
      <ListItemButton selected={'/call-history' === selectedPage}>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Call History" />
    </ListItemButton>
    </Link>
  </>
);
  }

export const secondaryListItems = (
  <>
    <ListSubheader component="div" inset>
      Docs
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Call Script" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Employee Handbook" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Etc" />
    </ListItemButton>
  </>
);