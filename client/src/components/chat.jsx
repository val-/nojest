import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
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
    background: 'none',
    display: 'block',
    border: 'none',
    color: theme.palette.text.primary,
    outline: 'none',
    flexGrow: 1,
    fontSize: '1rem',
    '&::placeholder': {
      color: theme.palette.text.primary,
      opacity: 1,
    }
  },
  sendButton: {
    marginLeft: theme.spacing(4),
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    outline: 'none',
    '&:disabled': {
      opacity: 0.5,
    },
  },
  sendIcon: {
    color: theme.palette.primary.main,
  },
  listItemText: {
    '& .MuiListItemText-secondary': {
      opacity: 0.5,
    }
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
        className={classes.listItemText}
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
        <input
          className={classes.messageField}
          placeholder="Write your message here"
          name="message"
          type="text"
          value={messageState}
          onChange={messageChangeHandler}
        />
        <button
          type="submit"
          disabled={messageState === ''}
          className={classes.sendButton}
        >
          <SendIcon className={classes.sendIcon} fontSize="large"/>
        </button>
      </form>
    </>
  );
}