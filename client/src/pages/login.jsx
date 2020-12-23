
import React, { useState, useEffect } from 'react';
import {
  Paper,
  Button,
  TextField,
  Box,
  Typography,
  Link,
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
    paddingBottom: theme.spacing(2),
    textAlign: 'center',
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
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
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

      <Paper square>
        <form
          className={classes.form}
          onSubmit={handleSignIn}
        >
          <Typography variant="h3" className={classes.title}>
            Sign in
          </Typography>
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
            type="text"
            value={formState.values.email || ''}
          />
          <TextField
            className={classes.textField}
            fullWidth
            label="Password"
            name="password"
            onChange={handleChange}
            type="password"
            value={formState.values.password || ''}
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
          <Link href="/registration" variant="body2">
            Don't have an account? Sign Up
          </Link>
        </form>
      </Paper>
    </Box>
  );

};

export default LoginPage;
