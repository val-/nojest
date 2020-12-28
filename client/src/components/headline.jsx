import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import InputIcon from '@material-ui/icons/Input';
import WorkIcon from '@material-ui/icons/Work';
import { backendService as backend } from '../services/backendService';

const useStyles = makeStyles(theme => ({
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    background: theme.palette.background.paper,
  },
  logoBox: {
    padding: theme.spacing(1)
  },
  logoIcon: {
    display: 'block',
    width: '125px',
    height: '29px',
    '& *': {
      fill: theme.palette.white
    }
  },
  logoutBox: {
    padding: theme.spacing(1),
    cursor: 'pointer',
  },
  logoutIcon: {
    display: 'block'
  },
  logoutBoxAndSwitcher: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const Headline = () => {

  const classes = useStyles();

  const handleLogout = () => {
    backend.logout().then(() => {
      window.location.reload();
    });
  }

  return (
    <AppBar>
      <Toolbar className={classes.row}>
        <Box className={classes.logoBox}>
          <WorkIcon className={classes.logoIcon} />
        </Box>
        <Box className={classes.logoutBoxAndSwitcher}>
          <Box className={classes.logoutBox} onClick={handleLogout}>
            <InputIcon className={classes.logoutIcon} />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );

}

export default Headline;
