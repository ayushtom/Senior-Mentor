import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Card,CardActionArea ,CardActions,CardContent,CardMedia,Button,Typography } from '@material-ui/core';

import defaultUser from '../../assets/img/defaultUser.jpg'

const useStyles = makeStyles({
    root: {
      maxWidth: 250,
      margin:"auto",
      marginTop:"1rem", 
      marginBottom:"1rem"

    },
    media: {
      height: 150,
      width: '100%',
      objectFit:"contain"
    },

    // Card: {
    //   width: 250,
    //   margin: 'auto'
    // },
    // Media: {
    //   height: 550,
    //   width: '100%'
    // }
  });

export default function ProfileCard({profile}) {
    const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={defaultUser}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {profile.firstName} {profile.lastName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Branch: {profile.branch}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Year: {profile.year} 
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Add Friend
        </Button>
        <Button size="small" color="primary">
          Message
        </Button>
      </CardActions>
    </Card>
  );
}
