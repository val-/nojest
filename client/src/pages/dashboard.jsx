import React from 'react';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
import MainLayout from '../components/mainLayout';

const useStyles = makeStyles(theme => ({

  card: {
    width: theme.spacing(60),
    margin: theme.spacing(2, 4),
  },

  media: {
    height: 160,
  },

}));

const DashboardPage = props => {

  const classes = useStyles();

  return (
    <MainLayout>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia className={classes.media} title="New order">
            <img src="static/images/clip/order.jpg" alt="New order"/>
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Create new order
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Fill in you project description and respondents conditions.
              <br/>
              We will notify you about the requests for the order.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            New order
          </Button>
        </CardActions>
      </Card>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia className={classes.media} title="Let`s get working">
            <img src="static/images/clip/work.jpg" alt="Let`s get working"/>
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Actual orders
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              View personal tasks by orders. Direct task team chat.
              <br/>
              We will notify you about task changes.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            View orders
          </Button>
        </CardActions>
      </Card>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia className={classes.media} title="New order">
            <img src="static/images/clip/create.jpg" alt="New order"/>
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Search new task
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              View actual available tasks.
              <br/>
              We will notify you about new orders.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            New task
          </Button>
        </CardActions>
      </Card>
    </MainLayout>
  );

};

export default DashboardPage;