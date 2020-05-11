import React, {useContext} from 'react';
import {Context} from '../../Context/Context.js';
import { Container, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MyGoogleLogin from '../Forms/components/MyGoogleLogin.js';
import MyFacebookLogin from '../Forms/components/MyFacebookLogin.js';
import SetUpForm from '../Forms/SetUpForm.js'

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        height: '100vh',
        width: '100vw',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        background: "url('https://msp-media.org/wp-content/images/robert-collins-tvc5imO5pXk-unsplash.jpg')",
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
    const [state, setState] = useContext(Context);
    const { profileVerified, profileStudents } = state;

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
                    <Paper className={classes.paper} style={{textAlign: 'center'}} >
                        <h1>ScholistIt</h1>

                        <SetUpForm></SetUpForm>
                        <MyGoogleLogin></MyGoogleLogin>
                    </Paper>
                </Grid>
            </Grid>
        </Container> 
    )
}
