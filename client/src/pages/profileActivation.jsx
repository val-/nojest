
import React, { useEffect } from 'react';
import {
  Paper,
  Box,
  Typography,
  Link,
} from '@material-ui/core';
import { useParams } from "react-router-dom";
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/styles';
import { backendService as backend } from '../services/backendService';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    margin: 'auto',
    width: theme.spacing(80),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    paddingBottom: theme.spacing(2),
    textAlign: 'center',
  },
  paper: {
    padding: theme.spacing(4, 8),
  },
  alert: {
    margin: theme.spacing(2, 0),
  },
}));

const ProfileActivationPage = props => {

  const classes = useStyles();
  let { token } = useParams();

  console.log('token: ', token);

  useEffect(() => {
    backend.activation(token).then(
      resp => {
        console.log(resp);
      },
      error => {
        console.log(error);
      }
    );
  });


  return (
    <Box className={classes.root}>

      <Paper square className={classes.paper}>

          <Typography variant="h4" className={classes.title}>
            Your email is confirmed!
          </Typography>
          <Link href="/login" variant="body2">
            Sign in here
          </Link>
        
      </Paper>
    </Box>
  );

};

export default ProfileActivationPage;
