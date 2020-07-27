import React from 'react';
import { AppBar, Typography, Grid, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Search from './Search.js';

const useStyles = makeStyles((theme) => ({
    
    })
);

const options = []

const getSearchResults = () => {
    
}

export default function Header() {
    const classes = useStyles();
    
    const profile = {

    }

    const profileClick = {

    }

    return (
        <AppBar>
           <Grid container justify="space-between" >
                <Grid item xs={9}  >
                    <Typography style={{ color: '#424242', fontWeight: '700'}} variant="h5" component="h1" >SchoolListIt</Typography>
                </Grid>
                <Grid item xs={3} >
                    <Typography variant="h4" style={{color: '#eeeeee', textAlign: 'right', margin: '10px'}}>
                        <FontAwesomeIcon icon="bell"></FontAwesomeIcon>
                    </Typography>
                </Grid>
           </Grid>
        </AppBar>
    )
}
