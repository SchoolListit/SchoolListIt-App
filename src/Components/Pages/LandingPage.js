import React from 'react';
import { Container, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SetUpForm from '../Forms/SetUpForm.js'

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        width: '100vw',
        minHeight: '100vh',
        maxHeight: 'none',
        justifyContent: 'flex-end',
        maxWidth: 'none !important',
        overflow: 'auto'
    },
    paper: {
        padding: '10px',
        paddingTop: '20px',
        margin: '30px'
    },
    muiGridContainerRoot: {
    }
    
  }));

export default function LandingPage() {
    const classes = useStyles();
    
    return (
        <Container 
            fixed={true} 
            maxWidth={false}
            className={classes.root}
            >
            <Grid 
                container 
                spacing={1} 
                alignItems="center"
                justify="space-around"
                >
                <Grid item xs={12} md={8} style={{color: '#eeeeee'}}>
                    <Typography variant="h1" component="h2"  style={{fontWeight: 700, color: '#ffb74d'}}>
                        It takes a village.
                    </Typography>
                    <Typography variant="h3" gutterBottom style={{color: '#eeeeee'}}>
                        contribute, collaborate, communicate
                    </Typography>
                    <p style={{color: '#000'}}>Photo by Robert Collins on Unsplash</p>
                </Grid>
                <Grid item xs={12} md={4} >
                    <Paper className={classes.paper}  >
                        <h1 style={{textAlign: 'center'}}>ScholistIt</h1>
                        <SetUpForm></SetUpForm>
                    </Paper>
                </Grid>
            </Grid>
        </Container> 
    )
}
