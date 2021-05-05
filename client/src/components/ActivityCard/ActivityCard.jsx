import React from 'react';

import {Card,CardHeader,Typography,CardActions,Button,Divider} from '@material-ui/core'
import {Link} from 'react-router-dom'

import useStyles from './styles';


export default function ActivityCard() {
    const classes = useStyles();

    return (
      <Card className={classes.card}>
        <CardHeader title="Activity Tab"/>
        <Divider />
        <CardActions>
          <Link to="/notifications">
          <Button size="small">Show More</Button>

          </Link>
        </CardActions>
      </Card>
  );
}
