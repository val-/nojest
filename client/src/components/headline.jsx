import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import InputIcon from '@material-ui/icons/Input';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { backendService as backend } from '../services/backendService';

const useStyles = makeStyles(theme => ({
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    background: theme.palette.background.paper,
  },
  logoBox: {
    padding: theme.spacing(1, 0)
  },
  logoIcon: {
    display: 'block',
    width: '150px',
  },
  logoutBox: {
    display: 'block',
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
        <a href="/" className={classes.logoBox}>
          <Logo className={classes.logoIcon} />
        </a>
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
