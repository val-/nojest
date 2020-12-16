
import React, { useState, useEffect } from 'react';
import {
  Paper,
  Button,
  TextField,
  Box,
  Typography,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    margin: 'auto',
    width: theme.spacing(60),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    paddingBottom: theme.spacing(5),
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  },
  form: {
    padding: theme.spacing(4, 8),
  },
  alert: {
    margin: theme.spacing(2, 0),
  },
  textField: {
    margin: theme.spacing(2, 0),
  },
  signInButton: {
    margin: theme.spacing(2, 0),
  }
}));

const LoginPage = props => {

  const classes = useStyles();

  const [formState, setFormState] = useState({ values: {} });

  useEffect(() => {
    setFormState(formState => ({
      ...formState
    }));
  }, [formState.values]);

  const handleSignIn = event => {
    event.preventDefault();
    const { email, password } = formState.values;
    if (email && password) {
      // TODO
    }
  };

  const handleChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value
      },
    }));
  };

  return (
    <Box className={classes.root}>

      <Typography
        className={classes.title}
        variant="h4"
      >
        Sign in
      </Typography>

      <Paper square>
        <form
          className={classes.form}
          onSubmit={handleSignIn}
        >
          { props.error &&
            <Alert
              severity="error"
              className={classes.alert}
            >
              props.error
            </Alert>
          }
          <TextField
            className={classes.textField}
            fullWidth
            label="Email address"
            name="email"
            disabled
            type="text"
            value={formState.values.email || ''}
            variant="outlined"
          />
          <TextField
            className={classes.textField}
            fullWidth
            label="Password"
            name="password"
            onChange={handleChange}
            type="password"
            value={formState.values.password || ''}
            variant="outlined"
          />
          <Button
            className={classes.signInButton}
            color="primary"
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Enter
          </Button>
        </form>
      </Paper>
    </Box>
  );

};

export default LoginPage;
