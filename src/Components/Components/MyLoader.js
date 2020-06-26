import React from 'react';
import { CircularProgress, Grid } from '@material-ui/core';

export default function MyLoader() {
        return (    
            <Grid
                container 
                alignContent="center" 
                justify="center" 
                alignItems="center"
                style={{height: '100vh'}}
                >
                <Grid item >
                    <CircularProgress  />
                </Grid>
            </Grid>
    )
}
