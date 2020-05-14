import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'block',
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));

export default function Assignment( {assignment}) {
    const classes = useStyles();
    return (
        
          <ListItem key={assignment.ID} button className={classes.nested}>
            <ListItemText primary={assignment.post_date+assignment.post_title} />
          </ListItem>
    )

}
