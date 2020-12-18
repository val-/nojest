
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
    display: 'flex',
    padding: theme.spacing(8),
  },
  cellLeft: {
    paddingRight: theme.spacing(8),
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
  cellRight: {
    flexGrow: 1,
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

const ProfilePage = props => {

  const classes = useStyles();

  const [formState, setFormState] = useState({ values: {
    name: 'Valentin Agafonov',
    email: 'webkoder@ya.ru',
    phone: '+7 916 024 49 13',
    dateOfBirth: new Date('1988-08-29T21:11:54'),
    gender: 'MALE',
    country: 'RU',
    city: 'MOW',
  } });

  useEffect(() => {
    setFormState(formState => ({
      ...formState
    }));
  }, [formState.values]);

  const handleDelete = () => {};

  return (
    <Box className={classes.root}>
      <Paper square className={classes.paper}>
        <Box className={classes.cellLeft}>
          <Avatar
            className={classes.avatar}
            alt="Avatar"
            src="/static/images/avatar.jpg"
          />
          <Box className={classes.ratingBox}>
            <Rating
              name="profile-rating"
              value={4.5}
              precision={0.5}
              readOnly
              size="large"
            />
          </Box>
          <Box className={classes.chipsBox}>
            <Chip
              className={classes.chips}
              label="English"
              color="secondary"
              size="small"
              onDelete={handleDelete}
              icon={<LanguageIcon />}
            />
          </Box>
          <Box className={classes.chipsBox}>
            <Chip
              label="Russian"
              color="secondary"
              size="small"
              onDelete={handleDelete}
              icon={<LanguageIcon />}
            />
          </Box>
          <Box className={classes.chipsBox}>
            <Chip
              label="Software engineer"
              color="primary"
              size="small"
              onDelete={handleDelete}
              icon={<WorkIcon />}
            />
          </Box>
        </Box>
        <Box className={classes.cellRight}>
          <Typography variant="h3">
            User profile
          </Typography>
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
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Box className={classes.formRow}>
                  <KeyboardDatePicker
                    className={classes.datePicker}
                    label="Date of birth"
                    format="dd.MM.yyyy"
                    value={formState.values.dateOfBirth}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                  <FormControl className={classes.formControlSelect}>
                    <InputLabel id="gender-select-label">Gender</InputLabel>
                    <Select
                      labelId="gender-select-label"
                      id="gender-select"
                      className={classes.select}
                      value={formState.values.gender}
                    >
                      <MenuItem value={'MALE'}>Male</MenuItem>
                      <MenuItem value={'FEMALE'}>Female</MenuItem>
                    </Select>
                  </FormControl>
              </Box>
            </MuiPickersUtilsProvider>
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
            <Box className={classes.formRow}>
              <FormControl className={classes.formControlSelect}>
                <InputLabel id="country-select-label">Country</InputLabel>
                <Select
                  labelId="country-select-label"
                  id="country-select"
                  className={classes.select}
                  value={formState.values.country}
                >
                  <MenuItem value={'RU'}>Russian Federation</MenuItem>
                  <MenuItem value={'US'}>USA</MenuItem>
                  <MenuItem value={'UK'}>United Kingdom</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControlSelect}>
                <InputLabel id="city-select-label">City</InputLabel>
                <Select
                  labelId="city-select-label"
                  id="city-select"
                  className={classes.select}
                  value={formState.values.city}
                >
                  <MenuItem value={'MOW'}>Moscow</MenuItem>
                  <MenuItem value={'LED'}>Saint Petersburg</MenuItem>
                  <MenuItem value={'AER'}>Sochi</MenuItem>
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
                Save pfofile
              </Button>
              <Button
                className={classes.saveButton}
                color="primary"
                size="large"
                variant="contained"
              >
                Add profession
              </Button>
              <Button
                className={classes.saveButton}
                color="primary"
                size="large"
                variant="contained"
              >
                Add language
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
    </Box>
  );

};

export default ProfilePage;
