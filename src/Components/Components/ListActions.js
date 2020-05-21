import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const useStyles = makeStyles(() => ({
    root: {
        background: '#e0e0e0',
        padding: '15px',
        fontSize: '1.5em'
    },
  }));



export default function ListActions( props ) {
    const classes = useStyles();
    const {section, onClickAdd} = props

    return (
        <Grid className={classes.root} container justify="space-between" alignItems="flex-start">
            <Grid item onClick={() => onClickAdd(section)}>
                <Typography><FontAwesomeIcon icon="plus-square"></FontAwesomeIcon> Add</Typography>
            </Grid>
            <Grid item >
                <Typography><FontAwesomeIcon icon="thumbs-up"></FontAwesomeIcon> Follow</Typography>
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
