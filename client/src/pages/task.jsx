
import React from 'react';
import {
  Box,
  Card,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import MainLayout from '../components/mainLayout';
import Chat from '../components/chat';
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
    marginBottom: theme.spacing(2),
  },
}));

const OrderPage = props => {

  const classes = useStyles();
  let { taskId } = useParams();

  return (
    <MainLayout>
      <Box className={classes.root}>
        <Card square className={classes.card}>
            <Chat taskId={taskId}/>
        </Card>
      </Box>
    </MainLayout>
  );

};

export default OrderPage;
