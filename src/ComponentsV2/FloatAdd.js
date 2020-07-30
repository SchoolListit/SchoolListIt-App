import React from 'react';
import { Fab, Typography }from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const useStyles = makeStyles(() => ({
    root: {
        position: 'fixed',
        right: '30px' ,
        bottom: '110px'
    }
  }));

export default function FloatAdd() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Fab color="secondary">
                <FontAwesomeIcon icon="pencil-alt"></FontAwesomeIcon>
            </Fab>
        </div>
              
    )
}
