
import React, { useState, useEffect } from 'react';
import {
  Paper,
  Button,
  TextField,
  Box,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Typography,
} from '@material-ui/core';
import LanguageIcon from '@material-ui/icons/Language';
import WorkIcon from '@material-ui/icons/Work';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Rating from '@material-ui/lab/Rating';
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
    padding: theme.spacing(8),
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  ratingBox: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  textField: {
    marginBottom: theme.spacing(4),
  },
  form: {
    paddingTop: theme.spacing(5),
  },
  formRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(4),
  },
  formRowButtons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  formControlSelect: {
    width: '47%',
  },
  datePicker: {
    width: '47%',
  },
  saveButton: {
    marginTop: theme.spacing(4),
  },
  chipsBox: {
    paddingTop: theme.spacing(2),
  },
}));

const CreateOrderPage = props => {

  const classes = useStyles();

  const [formState, setFormState] = useState({ values: {
    title: '',
    description: '',
  } });

  useEffect(() => {
    setFormState(formState => ({
      ...formState
    }));
  }, [formState.values]);


  return (
    <Box className={classes.root}>
      <Paper square className={classes.paper}>
        <Typography variant="h3">
          New order
        </Typography>
        <form
          className={classes.form}
        >
          <TextField
            className={classes.textField}
            fullWidth
            label="Title"
            name="title"
            type="text"
            value={formState.values.title || ''}
          />
          <TextField
            className={classes.textField}
            fullWidth
            label="Description"
            name="description"
            multiline
            type="text"
            value={formState.values.description || ''}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Box className={classes.formRow}>
                <KeyboardDatePicker
                  className={classes.datePicker}
                  label="Timelimit"
                  format="dd.MM.yyyy"
                  value={formState.values.timelimit}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
            </Box>
          </MuiPickersUtilsProvider>
          <Box className={classes.formRowButtons}>
            <Button
              className={classes.saveButton}
              color="primary"
              size="large"
              type="submit"
              variant="contained"
            >
              Create order
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );

};

export default CreateOrderPage;
