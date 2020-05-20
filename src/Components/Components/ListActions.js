import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const useStyles = makeStyles(() => ({
    root: {
        background: '#eeeeee',
        padding: '15px',
        fontSize: '1.5em'
    },
  }));


export default function ListActions() {
    const classes = useStyles();



    return (
        <Grid className={classes.root} container justify="space-between" alignItems="flex-start">
            <Grid item >
                <Typography><FontAwesomeIcon icon="thumbs-up"></FontAwesomeIcon> Like</Typography>
                
            </Grid>
            <Grid item >
                <Typography><FontAwesomeIcon icon="comment-alt"></FontAwesomeIcon> Comment</Typography>
                
            </Grid>
            <Grid item >
                <Typography><FontAwesomeIcon icon="share"></FontAwesomeIcon> Share</Typography>
                
            </Grid>
        </Grid>
    )
}
