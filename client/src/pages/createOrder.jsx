
import React, { useState, useEffect } from 'react';
import {
  Paper,
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
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
  formCellHalf: {
    width: '47%',
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
    platform: 'web',
    language: 'RU'
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
              <Box className={classes.formCellHalf}>
                <TextField
                  className={classes.textFieldInRow}
                  fullWidth
                  label="Expected price"
                  name="expectedPrice"
                  multiline
                  type="text"
                  value={formState.values.expectedPrice || ''}
                />
              </Box>
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
          <Box className={classes.formRow}>
            <FormControl className={classes.formControlSelect}>
              <InputLabel id="language-select-label">Target language</InputLabel>
              <Select
                labelId="language-select-label"
                id="language-select"
                className={classes.select}
                value={formState.values.language}
              >
                <MenuItem value={'RU'}>Russian</MenuItem>
                <MenuItem value={'EN'}>English</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControlSelect}>
              <InputLabel id="platform-select-label">Target platform</InputLabel>
              <Select
                labelId="platform-select-label"
                id="platform-select"
                className={classes.select}
                value={formState.values.platform}
              >
                <MenuItem value={'ios'}>IOS</MenuItem>
                <MenuItem value={'android'}>Android</MenuItem>
                <MenuItem value={'tv'}>TV</MenuItem>
                <MenuItem value={'mac'}>Mac</MenuItem>
                <MenuItem value={'pc'}>PC</MenuItem>
                <MenuItem value={'web'}>Web</MenuItem>
              </Select>
            </FormControl>
          </Box>
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
