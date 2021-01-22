
import React, { useState, useEffect } from 'react';
import {
  Paper,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import MainLayout from '../components/mainLayout';
import OrdersTable from '../components/ordersTable';
import ScreenLocker from '../components/screenLocker';
import { backendService as backend } from '../services/backendService';

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
  },
}));

const OrderPage = props => {

  const classes = useStyles();

  const [initStartedState, setInitStarted] = useState(false);
  const [ordersReadyState, setOrdersReady] = useState(false);
  const [ordersState, setOrders] = useState([]);
  const [errorState, setError] = useState(false);


  useEffect(() => {
    if (!initStartedState) {
        setInitStarted(true);
        backend.getUserOrdersList().then(resp => {
            setOrders(resp);
            setOrdersReady(true);
        }, setError);
    }
  });

  if (!ordersReadyState) {
    return <ScreenLocker />;
  }

  return (
    <MainLayout>
      <Box className={classes.root}>
        <div className={classes.paper}>
            <OrdersTable
                ordersList={ordersState}
            />
        </div>
      </Box>
    </MainLayout>
  );

};

export default OrderPage;
