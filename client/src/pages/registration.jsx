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

const RegistrationPage = props => {

  const classes = useStyles();

  const [formState, setFormState] = useState({ values: {} });

  useEffect(() => {
    setFormState(formState => ({
      ...formState
    }));
  }, [formState.values]);

  const handleSignUp = event => {
    event.preventDefault();
    fetch('api/registration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formState.values)
    }).then(resp => {
      console.log('resp: ', resp);
    });
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
          onSubmit={handleSignUp}
        >
          <Typography variant="h3" className={classes.title}>
            Sign up
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
            label="Full name"
            name="fullName"
            onChange={handleChange}
            type="text"
            value={formState.values.fullName || ''}
          />
          <TextField
            className={classes.textField}
            fullWidth
            label="Email address"
            name="email"
            onChange={handleChange}
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
          <Link href="./" variant="body2">
            Already have an account? Sign in
          </Link>
        </form>
      </Paper>
    </Box>
  );

};

export default RegistrationPage;