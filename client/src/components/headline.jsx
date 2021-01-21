import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useHistory } from 'react-router-dom';
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
}));

const Headline = () => {

  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleLogout = () => {
    backend.logout().then(() => {
      window.location.reload();
    });
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openProfile = () => {
    history.push('/profile');
  };

  return (
    <AppBar>
      <Toolbar className={classes.row}>
        <a href="/" className={classes.logoBox}>
          <Logo className={classes.logoIcon} />
        </a>
        <div className={classes.rightBox}>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={openProfile}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );

}

export default Headline;
