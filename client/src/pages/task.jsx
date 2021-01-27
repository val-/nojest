
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import {
  CardHeader,
  Button,
  Box,
  Card,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import MainLayout from '../components/mainLayout';
import Chat from '../components/chat';
import UserPic from '../components/userPic';
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
  card: {
    width: theme.spacing(120),
    marginBottom: theme.spacing(2),
  },
  cardActionButton: {
    marginLeft: theme.spacing(2),
  },
}));

const TaskPage = props => {

  const classes = useStyles();
  const history = useHistory();
  let { taskId } = useParams();

  const [initStartedState, setInitStarted] = useState(false);
  const [taskState, setTask] = useState({});
  const [errorState, setError] = useState(false);

  useEffect(() => {
    if (!initStartedState) {
        setInitStarted(true);
        backend.getTask(taskId).then(setTask, setError);
    }
  }, [initStartedState, taskId, taskState]);

  const handleTaskAction = nextStatus => {
    console.log('handleTaskAction: ', nextStatus);
  };

  const openOrder = orderId => {
    history.push(`/order/${orderId}`);
  }

  const generateTaskCardActions = nextStatusVariants => (
    <>
      {
        nextStatusVariants.map(
          nextStatus => (
            <Button
            className={classes.cardActionButton}
            color="primary"
            variant="contained"
            key={nextStatus}
            onClick={() => { handleTaskAction(nextStatus) }}
          >
            { nextStatus }
          </Button>
          )
        )
      }
    </>
  );

  const generateOrderCard = order => (
    !order ? '':
    <Card square className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <UserPic userId={order.authorId}/>
        }
        action={
          <Button
            className={classes.cardActionButton}
            color="primary"
            variant="contained"
            onClick={() => { openOrder(order.id) }}
          >
            Go to order
          </Button>
        }
        title={order.title}
        subheader={`order #${order.id}`}
      >
      </CardHeader>
    </Card>
  );

  const generateTaskCard = task => (
    task.id === undefined ? '':
    <Card square className={classes.card}>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <UserPic userId={task.contractorId}/>
        }
        action={
          generateTaskCardActions(task.nextStatusVariants)
        }
        title={task.status}
        subheader={`task #${task.id}`}
      >
      </CardHeader>
    </Card>
  );

  return (
    <MainLayout>
      <Box className={classes.root}>
        { generateOrderCard(taskState.order) }
        { generateTaskCard(taskState) }
        <Card square className={classes.card}>
          <Chat taskId={taskId}/>
        </Card>
      </Box>
    </MainLayout>
  );

};

export default TaskPage;
