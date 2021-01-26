import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  TextField,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  List,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import moment from 'moment';
import UserPic from '../components/userPic';

import { backendService as backend } from '../services/backendService';

const useStyles = makeStyles(theme => ({
  messagesContainer: {
    borderTop: 'rgba(0,0,0,0.3) 1px solid',
    background: 'rgba(0,0,0,0.17)',
  },
  messageForm: {
    borderTop: 'rgba(0,0,0,0.3) 1px solid',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2, 2, 9),
  },
  messageField: {
      
  },
  sendIcon: {
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(2),
    cursor: 'pointer',
  },
}));

export default function Chat({ taskId }) {
  const classes = useStyles();
  const [messageState, setMessage] = useState('');
  const [lettersState, setLetters] = useState([]);
  const [initStartedState, setInitStarted] = useState(false);

  useEffect(() => {
    if (!initStartedState) {
        setInitStarted(true);
        updateLetters();
    }
  }, [initStartedState, taskId]);


  const updateLetters = () => {
    backend.getLettersByTask(taskId).then(resp => {
      setLetters(resp);
      backend.waitLettersByTask(taskId).then(updateLetters);
    });
  };

  const sendHandler = event => {
    event.preventDefault();
    backend.sendMessage({
      taskId,
      letter: messageState,
    }).then(() => {
      setMessage('');
      backend.getLettersByTask(taskId).then(setLetters);
    });
  };

  const messageChangeHandler = event => {
    event.persist();
    setMessage(event.target.value);
  };

  const renderLetter = message => (
    <ListItem key={message.id}>
      <ListItemAvatar>
        <UserPic userId={message.authorId}/>
      </ListItemAvatar>
      <ListItemText
        primary={message.letter}
        secondary={ moment(message.dateTime).fromNow() }
      />
    </ListItem>
  );

  return (
    <>
      {
        lettersState.length !== 0 &&
        (
          <List className={classes.messagesContainer}>
            { lettersState.map(renderLetter) }
          </List>
        )
      }
      <form
        className={classes.messageForm}
        onSubmit={sendHandler}
      >
        <TextField
          className={classes.messageField}
          fullWidth
          label="Write your message here"
          name="message"
          type="text"
          value={messageState}
          onChange={messageChangeHandler}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.sendIcon}
          endIcon={<SendIcon/>}
        >
          Send
        </Button>
      </form>
    </>
  );
}