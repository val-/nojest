
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Avatar,
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
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import MainLayout from '../components/mainLayout';
import ScreenLocker from '../components/screenLocker';
import { backendService as backend } from '../services/backendService';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: theme.spacing(120),
  },
  media: {
    whiteSpace: 'pre',
    padding: theme.spacing(2, 9),
    background: 'rgba(0,0,0,0.17)',
  },
  content: {
    padding: theme.spacing(2, 9),
  },
  textField: {
    marginBottom: theme.spacing(4),
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
}));

const OrderPage = props => {

  const classes = useStyles();
  const history = useHistory();
  let { orderId } = useParams();

  const [initStartedState, setInitStarted] = useState(false);
  const [orderReadyState, setOrderReady] = useState(false);
  const [filedsState, setFields] = useState({});
  const [errorState, setError] = useState(false);


  useEffect(() => {
    if (!initStartedState) {
        setInitStarted(true);
        backend.getOrder(orderId).then(resp => {
            setFields({
                ...resp,
                ...filedsState,
            });
            setOrderReady(true);
        }, setError);
    }
  });


  const handleChange = event => {
    event.persist();
  };

  const handleDeadlineChange = newDate => {
  };

  const handleSubmit = event => {
    event.preventDefault();
  };

  if (!orderReadyState) {
    return <ScreenLocker />;
  }

  return (
    <MainLayout>
      <Box className={classes.root}>
        <Card square className={classes.card}>

          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            action={
              <Typography variant="h4">
                
              </Typography>
            }
            title={filedsState.title}
            subheader={`order #${filedsState.id}`}
          />
          <CardMedia className={classes.media}>
            {filedsState.description}
          </CardMedia>
          <CardContent className={classes.content}>

            <form
              className={classes.form}
              onSubmit={handleSubmit}
            >
              { errorState &&
                <Alert
                  severity="error"
                  className={classes.alert}
                >
                  {errorState}
                </Alert>
              }
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Box className={classes.formRow}>
                  <Box className={classes.formCellHalf}>
                    <TextField
                      className={classes.textFieldInRow}
                      fullWidth
                      label="Expected price"
                      name="expectedPrice"
                      type="number"
                      value={filedsState.expectedPrice || ''}
                      onChange={handleChange}
                    />
                  </Box>
                  <KeyboardDatePicker
                    className={classes.datePicker}
                    label="Deadline"
                    format="dd.MM.yyyy"
                    value={filedsState.deadline}
                    onChange={handleDeadlineChange}
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
                    name="language"
                    value={filedsState.language}
                    onChange={handleChange}
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
                    name="platform"
                    value={filedsState.platform}
                    onChange={handleChange}
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
            </form>
          
          </CardContent>
          
        </Card>
      </Box>
    </MainLayout>
  );

};

export default OrderPage;
