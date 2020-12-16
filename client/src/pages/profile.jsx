
import React, { useState, useEffect } from 'react';
import {
  Paper,
  Button,
  TextField,
  Box,
  Avatar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    width: theme.spacing(120),
    display: 'flex',
    padding: theme.spacing(5),
  },
  cellLeft: {
    paddingRight: theme.spacing(5),
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  cellRight: {
    flexGrow: 1,
  },
  textField: {
    marginBottom: theme.spacing(4),
  },
}));

const ProfilePage = props => {

  const classes = useStyles();

  const [formState, setFormState] = useState({ values: {
    name: 'Valentin Agafonov',
    email: 'webkoder@ya.ru',
    phone: '+7 916 024 49 13'
  } });

  useEffect(() => {
    setFormState(formState => ({
      ...formState
    }));
  }, [formState.values]);

  return (
    <Box className={classes.root}>
      <Paper square className={classes.paper}>
        <Box className={classes.cellLeft}>
          <Avatar
            className={classes.avatar}
            alt="Avatar"
            src="/static/images/avatar.jpg"
          />
        </Box>
        <Box className={classes.cellRight}>
          <form
            className={classes.form}
          >
            <TextField
              className={classes.textField}
              fullWidth
              label="Full name"
              name="name"
              type="text"
              value={formState.values.name || ''}
            />
            <TextField
              className={classes.textField}
              fullWidth
              label="Email address"
              name="email"
              type="text"
              value={formState.values.email || ''}
            />
            <TextField
              className={classes.textField}
              fullWidth
              label="Phone number"
              name="phone"
              type="text"
              value={formState.values.phone || ''}
            />
            <Button
              className={classes.saveButton}
              color="primary"
              size="large"
              type="submit"
              variant="contained"
            >
              Save
            </Button>
          </form>
        </Box>
      </Paper>
    </Box>
  );

};

export default ProfilePage;
